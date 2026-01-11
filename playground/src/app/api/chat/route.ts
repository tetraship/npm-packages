import { createDataStreamResponse } from 'ai';

export async function POST(req: Request) {
  return createDataStreamResponse({
    execute: async (dataStream) => {
      dataStream.writeData('initialized');
      
      const { messages } = await req.json();
      const lastMessage = messages[messages.length - 1];

      if (lastMessage.content === 'ping') {
        dataStream.writeMessageAnnotation({ type: 'status', value: 'pong' });
        dataStream.merge('Pong!');
        return;
      }

      dataStream.merge('Hello from the agent!');
    },
  });
}
