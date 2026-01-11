import { getThreads } from './actions';
import { ThreadList } from './ThreadList';

export const dynamic = 'force-dynamic'; // For in-memory DB persistence issues

export default async function ThreadsPage() {
    const threads = await getThreads();
    
    return (
        <div className="container mx-auto p-8 h-full">
            <h1 className="text-3xl font-bold mb-6 text-white">Threads Demo</h1>
            <ThreadList threads={threads} />
        </div>
    );
}
