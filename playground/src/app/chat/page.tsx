'use client';

import { useAgentChat, ChatContainer, MessageList, MessageBubble, ChatInput } from '@tetraship/react-agent-chat';
import { getMessageText } from '@tetraship/react-agent-chat/utils';

export default function ChatPage() {
  const { messages, sendMessage, isLoading } = useAgentChat({
    apiEndpoint: '/api/chat',
  });

  return (
    <div className="container mx-auto p-8 h-[calc(100vh-100px)]">
      <ChatContainer className="h-full flex flex-col border border-white/10 rounded-xl bg-surface/50 backdrop-blur-sm">
        <div className="p-4 border-b border-white/10">
            <h1 className="text-xl font-bold text-white">Agent Chat Demo</h1>
        </div>
        <MessageList className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <MessageBubble 
                    role={message.role === 'system' ? 'assistant' : message.role as 'user' | 'assistant'}
                    className={`max-w-[80%] rounded-lg p-3 ${message.role === 'user' ? 'bg-primary/20 text-on-primary-container' : 'bg-surface-variant text-on-surface'}`}
                >
                    {getMessageText(message)}
                </MessageBubble>
            </div>
          ))}
        </MessageList>
        <div className="p-4 border-t border-white/10">
            <ChatInput 
                onSubmit={sendMessage} 
                disabled={isLoading}
                className="flex gap-2"
                inputClassName="flex-1 bg-surface-variant/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                buttonClassName="bg-primary text-white px-4 py-2 rounded-lg disabled:opacity-50"
            />
        </div>
      </ChatContainer>
    </div>
  );
}
