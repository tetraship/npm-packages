import { MarkdownRenderer } from '@tetraship/react-markdown';
import fs from 'fs';
import path from 'path';
import { DocsPageClient } from './client';
import { GlassCard } from '@tetraship/react-glass';

export default async function GettingStartedPage() {
    const filePath = path.join(process.cwd(), 'src/content/getting-started.mdx');
    const content = fs.readFileSync(filePath, 'utf8');

    return (
        <div className="max-w-4xl mx-auto">
             <DocsPageClient />
             <GlassCard>
                <MarkdownRenderer content={content} />
             </GlassCard>
        </div>
    );
}
