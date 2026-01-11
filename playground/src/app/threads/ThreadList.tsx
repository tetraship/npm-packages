'use client';

import { useState, useEffect } from 'react';
import { GlassCard, GlassButton, GlassInput } from '@tetraship/react-glass';
import { addMessage, createDemoThread, getThreadItems } from './actions';
import type { Thread, Item } from '@tetraship/threads';

export function ThreadList({ threads }: { threads: Thread[] }) {
    const [selectedThread, setSelectedThread] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    const handleCreate = async () => {
        const thread = await createDemoThread();
        setSelectedThread(thread.id);
    };

    const handleSend = async (threadId: string) => {
        if (!message.trim()) return;
        await addMessage(threadId, message);
        setMessage('');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
                <GlassButton onClick={handleCreate} className="w-full">
                    New Thread
                </GlassButton>
                
                <div className="space-y-2">
                    {threads.map(thread => (
                        <GlassCard 
                            key={thread.id} 
                            className={`cursor-pointer hover:bg-surface-variant/10 ${selectedThread === thread.id ? 'ring-2 ring-primary' : ''}`}
                            onClick={() => setSelectedThread(thread.id)}
                            padded
                        >
                            <h3 className="font-medium">{thread.title}</h3>
                            <p className="text-xs text-gray-400">{new Date(thread.createdAt).toLocaleString()}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>

            <div className="md:col-span-2">
                {selectedThread ? (
                    <ThreadView threadId={selectedThread} onSend={handleSend} message={message} setMessage={setMessage} />
                ) : (
                    <GlassCard className="h-full flex items-center justify-center text-gray-400">
                        Select a thread to view
                    </GlassCard>
                )}
            </div>
        </div>
    );
}

interface ThreadViewProps {
    threadId: string;
    onSend: (id: string) => void;
    message: string;
    setMessage: (msg: string) => void;
}

function ThreadView({ threadId, onSend, message, setMessage }: ThreadViewProps) {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        getThreadItems(threadId).then(setItems);
    }, [threadId]);

    // Poll for updates (simple hack for demo)
    useEffect(() => {
        const interval = setInterval(() => {
            getThreadItems(threadId).then(setItems);
        }, 2000);
        return () => clearInterval(interval);
    }, [threadId]);

    return (
        <GlassCard className="h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
                {items.length === 0 && <p className="text-center text-gray-500">No messages yet.</p>}
                {items.map((item) => (
                    <div key={item.id} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-3 ${item.role === 'user' ? 'bg-primary/20 text-on-primary-container' : 'bg-surface-variant text-on-surface'}`}>
                            {item.parts.map((part, i) => (
                                <div key={i}>{part.type === 'text' ? part.text : JSON.stringify(part)}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-4 border-t border-white/10 flex gap-2">
                <GlassInput 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Type a message..." 
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && onSend(threadId)}
                />
                <GlassButton onClick={() => onSend(threadId)}>Send</GlassButton>
            </div>
        </GlassCard>
    );
}