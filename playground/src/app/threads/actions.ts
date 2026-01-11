'use server';
import { db, initSchema } from '@/lib/db';
import { createThreadModels } from '@tetraship/threads/models';
import { revalidatePath } from 'next/cache';

const models = createThreadModels(db);

export async function ensureSchema() {
    await initSchema();
}

export async function createDemoThread() {
    await ensureSchema();
    const [thread] = await models.threads.insert([{
        projectId: 'proj_demo',
        scopeType: 'playground',
        scopeId: `demo_${Date.now()}`,
        title: `Demo Thread ${new Date().toLocaleTimeString()}`,
    }]);
    revalidatePath('/threads');
    return thread;
}

export async function addMessage(threadId: string, text: string) {
    await ensureSchema();
    await models.items.append({
        threadId,
        role: 'user',
        parts: [{ type: 'text', text }],
        requestId: `req_${Date.now()}`,
    });
    revalidatePath('/threads');
}

export async function getThreads() {
    await ensureSchema();
    return models.threads.select();
}

export async function getThreadItems(threadId: string) {
    await ensureSchema();
    return models.items.listByThread(threadId);
}
