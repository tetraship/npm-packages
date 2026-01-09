'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { cn } from './utils';

export interface MobileNavMenuOption {
  /** Unique value identifier for the option */
  value: string;
  /** Display label for the option */
  label: string;
  /**
   * Optional URL for navigation.
   * If present, renders as a link (using linkComponent).
   * If absent, renders as a button (using onSelect).
   */
  href?: string;
}

export interface MobileNavMenuProps {
  /** Array of navigation options */
  options: MobileNavMenuOption[];
  /** Currently active value matching one of the options */
  activeValue: string;
  /** Callback fired when a button option (no href) is clicked */
  onSelect?: (value: string) => void;
  /**
   * Accessible label for the navigation menu
   * @default 'Navigation menu'
   */
  ariaLabel?: string;
  /**
   * Component to use for rendering links.
   * Useful for integrating with Next.js Link, React Router Link, etc.
   * @default 'a'
   */
  linkComponent?: React.ElementType;
  /**
   * Whether to show the active option label next to the hamburger icon.
   * Set to false to show only the hamburger icon (saves space on narrow screens).
   * @default false
   */
  showActiveLabel?: boolean;
  /**
   * Optional className for the menu button
   */
  buttonClassName?: string;
  /**
   * Optional className for the dropdown container
   */
  dropdownClassName?: string;
}

/**
 * Hamburger menu icon component
 */
function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('w-6 h-6', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

/**
 * Close icon component
 */
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('w-6 h-6', className)}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

/**
 * MobileNavMenu component
 *
 * A hamburger menu for mobile navigation that displays a dropdown with navigation options.
 * Uses glass-morphism styling consistent with the design system.
 *
 * Features:
 * - Hamburger button that toggles dropdown visibility
 * - Glass effect dropdown with navigation options
 * - Closes on outside click or option selection
 * - Supports both links and buttons
 * - Framework-agnostic link rendering via `linkComponent`
 *
 * @example
 * ```tsx
 * // With Next.js Link
 * import Link from 'next/link';
 * <MobileNavMenu
 *   linkComponent={Link}
 *   activeValue="home"
 *   options={[
 *     { value: 'home', label: 'Home', href: '/' },
 *     { value: 'settings', label: 'Settings', href: '/settings' }
 *   ]}
 * />
 * ```
 */
export function MobileNavMenu({
  options,
  activeValue,
  onSelect,
  ariaLabel = 'Navigation menu',
  linkComponent: LinkComponent = 'a',
  showActiveLabel = false,
  buttonClassName,
  dropdownClassName,
}: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleOptionClick = (option: MobileNavMenuOption) => {
    if (!option.href && onSelect) {
      onSelect(option.value);
    }
    setIsOpen(false);
  };

  const activeOption = options.find((o) => o.value === activeValue);

  return (
    <div ref={menuRef} className="relative">
      {/* Menu toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg',
          'text-on-surface-variant hover:text-on-surface',
          'bg-surface-container hover:bg-surface-container-high',
          'border border-outline-variant',
          'transition-colors',
          buttonClassName,
        )}
      >
        {isOpen ? (
          <CloseIcon className="text-on-surface" />
        ) : (
          <HamburgerIcon className="text-on-surface-variant" />
        )}
        {showActiveLabel && activeOption && (
          <span className="text-sm font-medium truncate max-w-[120px]">
            {activeOption.label}
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 z-50 min-w-[200px]',
            dropdownClassName,
          )}
        >
          <GlassCard
            padded={false}
            className="p-2"
            role="menu"
            aria-label={ariaLabel}
          >
            {options.map((option) => {
              const isActive = option.value === activeValue;
              const itemClassName = cn(
                'block w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
              );

              if (option.href) {
                return (
                  <LinkComponent
                    key={option.value}
                    href={option.href}
                    role="menuitem"
                    className={itemClassName}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </LinkComponent>
                );
              }

              return (
                <button
                  key={option.value}
                  type="button"
                  role="menuitem"
                  onClick={() => handleOptionClick(option)}
                  className={itemClassName}
                >
                  {option.label}
                </button>
              );
            })}
          </GlassCard>
        </div>
      )}
    </div>
  );
}
