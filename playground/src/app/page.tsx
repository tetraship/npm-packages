import Link from "next/link";
import { GlassCard, GlassButton } from "@tetraship/react-glass";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-24">
      <GlassCard className="max-w-md p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Tetraship Playground</h1>
        <p className="text-gray-300 mb-8">
          Welcome to the playground. This app uses packages from the local workspace.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/blog">
            <GlassButton variant="primary">Visit Blog</GlassButton>
          </Link>
          <Link href="/api/auth/signin">
             <GlassButton variant="secondary">Sign In</GlassButton>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}