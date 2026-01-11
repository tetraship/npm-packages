# @tetraship/react-markdown

A reusable React component for rendering Markdown content using `next-mdx-remote`.

## Features

- Renders Markdown and MDX content.
- Supports GitHub Flavored Markdown (GFM).
- Supports syntax highlighting via `rehype-highlight`.
- Styled with Tailwind CSS (expects `bg-surface-variant`, `text-on-surface`, etc. variables/classes to be available in the consumer).
- Includes GitHub Dark theme for syntax highlighting.

## Installation

```bash
npm install @tetraship/react-markdown
```

## Styling

The components in this package rely on **Tailwind CSS** and a specific **semantic theme**.

### 1. Tailwind Content Scanning

To ensure the Tailwind classes used by this package are generated, you must include the package source in your Tailwind configuration.

**Tailwind CSS v4 (Recommended):**
Add the `@source` directive to your global CSS file:

```css
@import 'tailwindcss';
@source "../path/to/node_modules/@tetraship/react-markdown/src";
```

**Tailwind CSS v3:**
Add the package to your `content` array in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    // ...
    "./node_modules/@tetraship/react-markdown/src/**/*.{ts,tsx}",
  ],
  // ...
}
```

### 2. Semantic Tokens

The markdown components use semantic color tokens. Ensure your theme defines the following (or provides fallbacks):

- `primary`: Main accent color.
- `on-surface`: Primary text color on surfaces.
- `on-surface-variant`: Secondary text color.
- `surface-variant`: Background for code blocks and blockquotes.
- `outline`: Border colors.

### 3. Syntax Highlighting

Syntax highlighting styles (GitHub Dark theme) are **automatically included** when you import the `MarkdownRenderer` component. No additional CSS imports are required for highlighting to work.

## Usage

Import the component and provide the markdown content.

```tsx
import { MarkdownRenderer } from "@tetraship/react-markdown";

export default function MyPage() {
  const content = `
# Hello World

This is a **markdown** example.

```typescript
const x = 1;
```
`;

  return <MarkdownRenderer content={content} />;
}
```

## Props

- `content` (string): The markdown/MDX content to render.
- `className` (string, optional): Additional CSS classes for the container.

```
