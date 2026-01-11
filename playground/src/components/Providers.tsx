'use client';
import { TopNavProvider } from '@tetraship/react-glass';

export function Providers({ children }: { children: React.ReactNode }) {
  return <TopNavProvider>{children}</TopNavProvider>;
}
