import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import React from 'react';
import { markdownComponents, sanitizeMarkdown } from './components';

/**
 * Markdown Renderer Component (Server Side)
 *
 * Renders markdown/MDX content using next-mdx-remote.
 * Includes custom components to match the application's styling.
 */

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export async function MarkdownRenderer({
  content,
  className = '',
}: MarkdownRendererProps) {
  const sanitizedContent = sanitizeMarkdown(content);

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <MDXRemote
        source={sanitizedContent}
        components={markdownComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
      />
    </div>
  );
}
