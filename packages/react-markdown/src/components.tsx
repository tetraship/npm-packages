import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

export const markdownComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="text-2xl font-bold text-on-surface mb-6" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="text-xl font-bold text-on-surface mt-8 mb-4 pb-2 border-b border-outline/30"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="text-lg font-semibold text-on-surface mt-6 mb-3"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4
      className="text-base font-semibold text-on-surface mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-on-surface leading-relaxed my-4" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a
      className="text-primary hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="space-y-1 my-4 text-on-surface list-disc pl-6" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="space-y-1 my-4 text-on-surface list-decimal pl-6"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="pl-1" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-primary/50 pl-4 italic text-on-surface-variant my-4"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="bg-surface-variant rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono text-on-surface-variant"
      {...props}
    />
  ),
  code: ({
    inline,
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<'code'> & {
    inline?: boolean;
    children?: ReactNode;
  }) => {
    // react-markdown passes 'inline' boolean
    // next-mdx-remote might not, so fall back to checking className
    const isInline = inline ?? !className;

    return (
      <code
        className={`${
          isInline
            ? 'bg-surface-variant px-1.5 py-0.5 rounded text-sm text-on-surface-variant font-mono'
            : ''
        } ${className || ''}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="border-outline/30 my-8" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border border-outline/30 px-3 py-2 text-left font-semibold text-on-surface bg-surface-variant/50"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td
      className="border border-outline/30 px-3 py-2 text-on-surface"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    <img className="max-w-full rounded-lg my-4" {...props} />
  ),
};

/**
 * Pre-process markdown content to make it safer for MDX/Markdown
 */
export function sanitizeMarkdown(markdown: string): string {
  // Strip HTML comments which break MDX parsing (e.g. <!-- comment -->)
  if (!markdown) return '';
  const sanitized = markdown.replace(/<!--[\s\S]*?-->/g, '');
  return sanitized;
}
