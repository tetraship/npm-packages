'use client';

import type React from 'react';
import { useState, useTransition, useEffect, useRef, useCallback } from 'react';
import { cn } from './utils';
import { GlassSurface } from './GlassSurface';

/**
 * Creates a debounced version of a function that delays execution until
 * after `wait` milliseconds have elapsed since the last call.
 */
function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  wait: number,
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced as T & { cancel: () => void };
}

export interface GlassIncrementorProps {
  value: number;
  onChange: (newValue: number) => Promise<void> | void;
  disabled?: boolean;
  min?: number;
  max?: number;
  showAddButton?: boolean;
  /** Debounce delay in milliseconds (default: 300ms) */
  debounceMs?: number;
}

/**
 * Increment/decrement control with glass styling and debounced updates.
 */
export function GlassIncrementor({
  value,
  onChange,
  disabled = false,
  min = 0,
  max = 7,
  showAddButton = true,
  debounceMs = 300,
}: GlassIncrementorProps) {
  const [isPending, startTransition] = useTransition();
  const [isUpdating, setIsUpdating] = useState(false);
  // Track local value for optimistic updates during debounce
  const [localValue, setLocalValue] = useState(value);

  // Sync local value when prop changes (after server update)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Create debounced onChange that persists across renders
  const debouncedOnChange = useRef(
    debounce((newValue: number) => {
      setIsUpdating(true);
      startTransition(async () => {
        try {
          await onChange(newValue);
        } catch (error) {
          console.error('Error updating value:', error);
          // Revert on error
          setLocalValue(value);
        } finally {
          setIsUpdating(false);
        }
      });
    }, debounceMs),
  ).current;

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleValueChange = useCallback(
    (newValue: number) => {
      // Ensure value stays within min/max bounds
      const clampedValue = Math.max(min, Math.min(max, newValue));

      if (clampedValue === localValue) return;

      // Optimistic update for immediate UI feedback
      setLocalValue(clampedValue);
      // Debounced server call
      debouncedOnChange(clampedValue);
    },
    [min, max, localValue, debouncedOnChange],
  );

  const handleIncrement = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleValueChange(localValue + 1);
  };

  const handleDecrement = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleValueChange(localValue - 1);
  };

  const isDisabled = disabled || isPending || isUpdating;
  const displayValue = localValue;

  if (displayValue === min && showAddButton) {
    return (
      <button
        className={cn(
          'h-10 w-10 p-0 rounded-md transition-all',
          'hover:bg-primary/20 active:bg-primary/30',
          'text-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        )}
        onClick={handleIncrement}
        disabled={isDisabled}
        aria-label="Add item"
        data-testid="incrementor"
        type="button"
      >
        <svg
          className="h-5 w-5 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    );
  }

  return (
    <GlassSurface
      intensity="light"
      bordered
      shadowed={false}
      className="inline-flex items-center gap-2 bg-primary/10 rounded-lg p-1 w-auto"
      data-testid="incrementor"
    >
      <button
        className={cn(
          'h-8 w-8 p-0 rounded-md transition-all',
          'hover:bg-primary/20 active:bg-primary/30',
          'text-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        )}
        onClick={handleDecrement}
        disabled={isDisabled || displayValue <= min}
        aria-label="Decrease value"
        type="button"
      >
        <svg
          className="h-4 w-4 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>

      <div className="flex items-center justify-center min-w-[2rem] px-2">
        <span className="text-sm font-medium text-primary">
          {isUpdating ? '...' : displayValue}
        </span>
      </div>

      <button
        className={cn(
          'h-8 w-8 p-0 rounded-md transition-all',
          'hover:bg-primary/20 active:bg-primary/30',
          'text-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        )}
        onClick={handleIncrement}
        disabled={isDisabled || displayValue >= max}
        aria-label="Increase value"
        type="button"
      >
        <svg
          className="h-4 w-4 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </GlassSurface>
  );
}
