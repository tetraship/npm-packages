'use client';

import React from 'react';
import {
  ApplicationLayoutNav,
  ApplicationLayoutNavOption,
} from './ApplicationLayoutNav';
import { MobileNavMenu } from './MobileNavMenu';
import { cn } from './utils';

export interface ResponsiveNavProps {
  /** Array of navigation options */
  options: ApplicationLayoutNavOption[];
  /** Currently active value matching one of the options */
  activeValue: string;
  /** Callback fired when a button option (no href) is clicked */
  onSelect?: (value: string) => void;
  /**
   * Accessible label for the navigation
   * @default 'View selection'
   */
  ariaLabel?: string;
  /**
   * Component to use for rendering links.
   * Useful for integrating with Next.js Link, React Router Link, etc.
   * @default 'a'
   */
  linkComponent?: React.ElementType;
  /**
   * Breakpoint at which to switch from mobile to desktop nav.
   * Uses Tailwind breakpoint classes.
   * @default 'sm'
   */
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Mobile nav display mode:
   * - 'menu': Shows a hamburger menu with dropdown (default)
   * - 'scroll': Shows a horizontally scrollable pill nav
   * @default 'menu'
   */
  mobileMode?: 'menu' | 'scroll';
  /**
   * Optional className for the container
   */
  className?: string;
}

/**
 * ScrollableNav component for horizontal scrolling on mobile
 */
function ScrollableNav({
  options,
  activeValue,
  onSelect,
  ariaLabel = 'View selection',
  linkComponent: LinkComponent = 'a',
}: Omit<ResponsiveNavProps, 'breakpoint' | 'mobileMode' | 'className'>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="overflow-x-auto scrollbar-hide -mx-4 px-4"
    >
      <div className="inline-flex gap-2 p-2 rounded-lg bg-surface-container border border-outline-variant">
        {options.map((option) => {
          const isActive = option.value === activeValue;
          const className = cn(
            'px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors',
            isActive
              ? 'bg-primary text-on-primary'
              : 'text-on-surface-variant hover:text-on-surface',
          );

          if (option.href) {
            return (
              <LinkComponent
                key={option.value}
                href={option.href}
                role="tab"
                aria-selected={isActive}
                className={className}
              >
                {option.label}
              </LinkComponent>
            );
          }

          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect?.(option.value)}
              className={className}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * ResponsiveNav component
 *
 * A responsive navigation component that displays as a pill-shaped toggle group
 * on desktop and switches to either a hamburger menu or horizontally scrollable
 * nav on mobile.
 *
 * Features:
 * - Automatic desktop/mobile switching based on breakpoint
 * - Two mobile modes: hamburger menu or horizontal scroll
 * - Uses glass-morphism styling from ApplicationLayoutNav
 * - Framework-agnostic link rendering
 *
 * @example
 * ```tsx
 * // Default behavior (hamburger menu on mobile)
 * <ResponsiveNav
 *   linkComponent={Link}
 *   activeValue="home"
 *   options={[
 *     { value: 'home', label: 'Home', href: '/' },
 *     { value: 'about', label: 'About', href: '/about' },
 *     { value: 'contact', label: 'Contact', href: '/contact' }
 *   ]}
 * />
 *
 * // With horizontal scroll on mobile
 * <ResponsiveNav
 *   mobileMode="scroll"
 *   breakpoint="md"
 *   linkComponent={Link}
 *   activeValue="home"
 *   options={[...]}
 * />
 * ```
 */
export function ResponsiveNav({
  options,
  activeValue,
  onSelect,
  ariaLabel = 'View selection',
  linkComponent,
  breakpoint = 'sm',
  mobileMode = 'menu',
  className,
}: ResponsiveNavProps) {
  // Generate the breakpoint visibility classes
  const breakpointClasses = {
    sm: { desktop: 'hidden sm:block', mobile: 'sm:hidden' },
    md: { desktop: 'hidden md:block', mobile: 'md:hidden' },
    lg: { desktop: 'hidden lg:block', mobile: 'lg:hidden' },
    xl: { desktop: 'hidden xl:block', mobile: 'xl:hidden' },
  };

  const { desktop, mobile } = breakpointClasses[breakpoint];

  return (
    <div className={className}>
      {/* Desktop navigation - pill toggle */}
      <div className={desktop}>
        <ApplicationLayoutNav
          options={options}
          activeValue={activeValue}
          onSelect={onSelect}
          ariaLabel={ariaLabel}
          linkComponent={linkComponent}
        />
      </div>

      {/* Mobile navigation */}
      <div className={mobile}>
        {mobileMode === 'scroll' ? (
          <ScrollableNav
            options={options}
            activeValue={activeValue}
            onSelect={onSelect}
            ariaLabel={ariaLabel}
            linkComponent={linkComponent}
          />
        ) : (
          <MobileNavMenu
            options={options}
            activeValue={activeValue}
            onSelect={onSelect}
            ariaLabel={ariaLabel}
            linkComponent={linkComponent}
          />
        )}
      </div>
    </div>
  );
}
