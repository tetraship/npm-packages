import fs from "fs";
import path from "path";
import { MarkdownRenderer } from "@tetraship/react-markdown";
import "@tetraship/react-markdown/styles.css";

export default async function BlogPage() {
  const filePath = path.join(process.cwd(), "src/content/hello.mdx");
  const content = fs.readFileSync(filePath, "utf8");

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blog Post</h1>
      <div className="prose dark:prose-invert">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
