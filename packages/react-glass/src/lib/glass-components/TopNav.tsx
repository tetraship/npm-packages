'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { ApplicationLayout } from './ApplicationLayout';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

export interface TopNavContextType {
  setNav: (content: ReactNode) => void;
  reset: () => void;
  state: ReactNode;
}

const TopNavContext = createContext<TopNavContextType | undefined>(undefined);

export function TopNavProvider({ 
    children, 
    initialNav 
}: { 
    children: ReactNode, 
    initialNav?: ReactNode 
}) {
  const [nav, setNav] = useState<ReactNode>(initialNav);

  const reset = useCallback(() => setNav(initialNav), [initialNav]);

  const value = useMemo(() => ({
    setNav,
    reset,
    state: nav
  }), [nav, reset]);

  return <TopNavContext.Provider value={value}>{children}</TopNavContext.Provider>;
}

export function useTopNav() {
  const context = useContext(TopNavContext);
  if (!context) {
    throw new Error('useTopNav must be used within a TopNavProvider');
  }
  return context;
}

export interface DynamicApplicationLayoutProps {
    children: ReactNode;
    className?: string;
    defaultNav?: ReactNode;
}

// A layout wrapper that listens to the context
export function DynamicApplicationLayout({ 
    children, 
    className, 
    defaultNav 
}: DynamicApplicationLayoutProps) {
  const { state } = useTopNav();

  return (
    <ApplicationLayout
      navbarContent={state ?? defaultNav}
      className={className}
      // Pass null/empty for header/nav as navbarContent takes precedence
      header={null}
    >
      {children}
    </ApplicationLayout>
  );
}

// Standard layouts for use with TopNav context

/**
 * RootNav - Standard navigation layout for root pages
 * Renders logo/title on the left and navigation on the right.
 */
export function RootNav({ logo, nav }: { logo: ReactNode, nav?: ReactNode }) {
    return (
        <div className="flex items-center justify-between w-full gap-4">
            <div className="text-lg font-semibold text-on-surface min-w-0 flex-shrink">
                {logo}
            </div>
            {nav && <div className="flex-shrink-0">{nav}</div>}
        </div>
    );
}

/**
 * BreadcrumbNav - Standard navigation layout for sub-pages
 * Renders breadcrumbs on the left and optional actions/nav on the right.
 */
export function BreadcrumbNav({ breadcrumbs, nav }: { breadcrumbs: BreadcrumbItem[], nav?: ReactNode }) {
    return (
        <div className="flex items-center justify-between w-full gap-4">
            <div className="flex-shrink flex items-center min-w-0">
                <Breadcrumbs items={breadcrumbs} />
            </div>
            {nav && <div className="flex-shrink-0 ml-auto">{nav}</div>}
        </div>
    );
}