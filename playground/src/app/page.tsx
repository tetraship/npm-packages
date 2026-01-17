import Link from "next/link";
import { GlassCard, GlassButton } from "@tetraship/react-glass";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center p-8">
      <GlassCard className="max-w-md p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Tetraship Playground</h1>
        <p className="text-gray-300 mb-8">
          Welcome to the playground. Explore the new navigation features and components.
        </p>
        <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/docs/getting-started">
                <GlassButton variant="primary">Getting Started (MDX)</GlassButton>
            </Link>
            <Link href="/entity/1">
                <GlassButton variant="secondary">View Mock Entity</GlassButton>
            </Link>
            <Link href="/search">
                <GlassButton variant="secondary">Search Demo</GlassButton>
            </Link>
            </div>
             <Link href="/api/auth/signin" className="opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-sm text-blue-400">Sign In (Auth)</span>
            </Link>
        </div>
      </GlassCard>
    </div>
  );
}