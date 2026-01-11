import React from 'react';
import { GlassCard } from './GlassCard';
import { GlassNav } from './GlassNav';
import { cn } from './utils';

export interface ApplicationLayoutProps {
  /**
   * The header content, typically the application title or logo.
   * Aligned to the left of the sticky header.
   */
  header: React.ReactNode;
  /**
   * The navigation content, typically ApplicationLayoutNav or ResponsiveNav.
   * Aligned to the right of the sticky header on desktop.
   * On mobile, wraps below the header when using flex-wrap.
   */
  nav?: React.ReactNode;
  /**
   * The main content of the application.
   * Renders below the sticky header.
   */
  children: React.ReactNode;
  /**
   * Optional className for the outer container.
   * Useful for layout adjustments or spacing overrides.
   */
  className?: string;
  /**
   * Header layout behavior on mobile:
   * - 'wrap': Header and nav wrap to separate rows on mobile (default)
   * - 'stack': Header and nav always stack vertically
   * - 'inline': Header and nav stay inline (may overflow on mobile - use with ResponsiveNav)
   * @default 'wrap'
   */
  headerLayout?: 'wrap' | 'stack' | 'inline';
  /**
   * Complete navbar content. If provided, overrides header and nav props.
   * Useful for dynamic layouts via TopNav context.
   */
  navbarContent?: React.ReactNode;
}

/**
 * ApplicationLayout component
 *
 * A comprehensive layout shell for glass-morphism applications.
 * Provides a sticky, glass-effect header bar and a main content area.
 *
 * Features:
 * - Sticky header that stays visible on scroll
 * - Glass effect on header for content pass-through visibility
 * - Responsive padding and spacing
 * - Slot-based architecture (header, nav, children)
 *
 * @example
 * ```tsx
 * <ApplicationLayout
 *   header={<h1 className="text-xl font-bold">My App</h1>}
 *   nav={
 *     <ApplicationLayoutNav
 *       activeValue="home"
 *       options={[{ value: 'home', label: 'Home', href: '/' }]}
 *     />
 *   }
 * >
 *   <div className="grid gap-4">
 *     <GlassCard>Content 1</GlassCard>
 *     <GlassCard>Content 2</GlassCard>
 *   </div>
 * </ApplicationLayout>
 * ```
 */
export function ApplicationLayout({
  header,
  nav,
  children,
  className,
  headerLayout = 'wrap',
  navbarContent,
}: ApplicationLayoutProps) {
  // Determine header flex layout based on headerLayout prop
  const headerLayoutClasses = {
    wrap: 'flex flex-wrap items-center justify-between gap-4',
    stack:
      'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4',
    inline: 'flex items-center justify-between gap-4',
  };

  return (
    <div
      className={cn('min-h-screen flex flex-col gap-6 p-4 sm:p-6', className)}
    >
      <GlassNav
        className={cn('sticky top-4 z-50 rounded-xl border border-white/20 dark:border-white/10 p-6', headerLayoutClasses[headerLayout])}
      >
        {navbarContent ? (
          navbarContent
        ) : (
          <>
            <div className="text-lg font-semibold text-on-surface min-w-0 flex-shrink">
              {header}
            </div>
            {nav && <div className="flex-shrink-0">{nav}</div>}
          </>
        )}
      </GlassNav>

      <main className="flex-1">{children}</main>
    </div>
  );
}
