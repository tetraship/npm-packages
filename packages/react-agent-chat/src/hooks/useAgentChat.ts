import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import type { ChatStatus } from "../types";
import type { OnToolCallHandler, AddToolOutputOptions } from "../types";

/**
 * Extended type to include methods potentially missing from UseChatHelpers definition
 * in the installed version, but available at runtime.
 */
type AgentChatHelpers = ReturnType<typeof useChat> & {
  append: (
    message: UIMessage | { role: "user"; content: string },
  ) => Promise<string | null | undefined>;
  setInput: (value: string) => void;
};

/**
 * Options for useAgentChat hook
 */
export interface UseAgentChatOptions {
  /** API endpoint for chat communication */
  apiEndpoint: string;
  /** Optional project ID to include in requests */
  projectId?: string;
  /** Optional session data to include in requests */
  sessionData?: Record<string, unknown>;
  /** Callback when a tool is called by the agent */
  onToolCall?: OnToolCallHandler;
  /** Initial messages to populate the chat */
  initialMessages?: UIMessage[];
}

/**
 * Return type for useAgentChat hook
 */
export interface UseAgentChatReturn {
  /** All messages in the conversation */
  messages: UIMessage[];
  /** Current chat status */
  status: ChatStatus;
  /** Error if any occurred */
  error: Error | undefined;
  /** Send a text message to the agent */
  sendMessage: (text: string) => Promise<void>;
  /** Add output for a tool call */
  addToolOutput: (options: AddToolOutputOptions) => void;
  /** Whether the chat is currently loading (streaming or submitted) */
  isLoading: boolean;
  /** Clear any error state */
  clearError: () => void;
}

/**
 * Hook for managing agent chat interactions
 *
 * Wraps AI SDK's useChat with a simplified API for common use cases.
 *
 * @example
 * ```tsx
 * const { messages, sendMessage, isLoading } = useAgentChat({
 *   apiEndpoint: '/api/chat',
 *   projectId: 'project-123',
 * });
 *
 * return (
 *   <div>
 *     {messages.map(m => <Message key={m.id} message={m} />)}
 *     <button onClick={() => sendMessage('Hello!')}>Send</button>
 *   </div>
 * );
 * ```
 */
export function useAgentChat(options: UseAgentChatOptions): UseAgentChatReturn {
  const { apiEndpoint, projectId, sessionData, onToolCall, initialMessages } =
    options;

  const chat = useChat({
    transport: new DefaultChatTransport({
      api: apiEndpoint,
      body: {
        ...(projectId && { projectId }),
        ...(sessionData && { sessionData }),
      },
    }),
    messages: initialMessages as unknown as UIMessage[],
    onToolCall: onToolCall
      ? ({ toolCall }) =>
          onToolCall({
            toolCall: {
              toolCallId: toolCall.toolCallId,
              toolName: toolCall.toolName,
              input: toolCall.input,
            },
          })
      : undefined,
  }) as AgentChatHelpers;

  const sendMessage = async (text: string) => {
    await chat.append({ role: "user", content: text });
  };

  const addToolOutput = (options: AddToolOutputOptions) => {
    chat.addToolResult({
      toolCallId: options.toolCallId,
      tool: options.toolName,
      output: options.output,
    });
  };

  return {
    messages: chat.messages,
    status: chat.status as ChatStatus,
    error: chat.error,
    sendMessage,
    addToolOutput,
    isLoading: chat.status === "streaming" || chat.status === "submitted",
    clearError: () => chat.setInput(""),
  };
}
