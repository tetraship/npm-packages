'use client';
import { DynamicApplicationLayout, ResponsiveNav, ApplicationLayoutNavOption, RootNav } from '@tetraship/react-glass';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navOptions: ApplicationLayoutNavOption[] = [
    { value: '/', label: 'Home', href: '/' },
    { value: '/chat', label: 'Chat', href: '/chat' },
    { value: '/threads', label: 'Threads', href: '/threads' },
    { value: '/docs/getting-started', label: 'Docs', href: '/docs/getting-started' },
    { value: '/entity/1', label: 'Entity 1', href: '/entity/1' },
    { value: '/blog', label: 'Blog', href: '/blog' },
  ];

  // Find the active value based on pathname startsWith to highlight parent routes
  const activeValue = navOptions.find(opt => 
    opt.href === '/' ? pathname === '/' : pathname.startsWith(opt.href!)
  )?.value || '';

  const logo = (
      <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Tetraship
      </Link>
  );

  const nav = (
    <ResponsiveNav
        options={navOptions}
        activeValue={activeValue}
        linkComponent={Link}
        breakpoint="md"
    />
  );

  const defaultNavContent = <RootNav logo={logo} nav={nav} />;

  return (
    <DynamicApplicationLayout defaultNav={defaultNavContent}>
      {children}
    </DynamicApplicationLayout>
  );
}