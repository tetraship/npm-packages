import * as React from 'react';
import { cn } from './utils';
import { GlassSurface, type GlassSurfaceProps } from './GlassSurface';

/**
 * Props for the GlassListItem component
 */
export interface GlassListItemProps
  extends Omit<GlassSurfaceProps, 'onClick' | 'padded'> {
  /**
   * Image element to display on the left side.
   * Should be a React element (e.g., an Image component or img tag).
   */
  image?: React.ReactNode;

  /**
   * Fallback icon when no image is provided.
   * Should be a React element (e.g., an icon component).
   */
  fallbackIcon?: React.ReactNode;

  /**
   * Title of the list item
   */
  title: string;

  /**
   * Optional subtitle or secondary text
   */
  subtitle?: React.ReactNode;

  /**
   * Secondary content to display below the main row.
   * This row is indented to align with the title text.
   * Useful for additional details, match information, etc.
   */
  secondaryContent?: React.ReactNode;

  /**
   * Controls to display on the right side (e.g., checkbox, buttons, inputs).
   * Receives onClick stopPropagation handling.
   */
  controls?: React.ReactNode;

  /**
   * Whether the item is in a checked/selected state
   */
  checked?: boolean;

  /**
   * Whether the item is clickable/interactive
   */
  interactive?: boolean;

  /**
   * Callback when the item is clicked
   */
  onClick?: () => void;

  /**
   * Size variant affecting image size and spacing
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Test ID for testing purposes
   */
  testId?: string;

  /**
   * Data attributes for testing
   */
  dataAttributes?: Record<string, string>;
}

/**
 * GlassListItem - A mobile-friendly list item component with glass-morphism styling.
 *
 * This component provides a flexible layout optimized for mobile devices:
 * - Top row: Image/icon + Title/subtitle + Controls
 * - Bottom row (optional): Secondary content, aligned with title
 *
 * The two-row layout prevents horizontal overflow on small screens
 * while keeping controls easily accessible.
 *
 * @example
 * // Basic usage
 * <GlassListItem
 *   image={<img src="/product.jpg" alt="Product" />}
 *   title="Product Name"
 *   subtitle="$9.99"
 *   controls={<Checkbox checked={checked} onChange={setChecked} />}
 * />
 *
 * @example
 * // With secondary content
 * <GlassListItem
 *   image={<img src="/product.jpg" alt="Product" />}
 *   title="Butter"
 *   subtitle="2 tablespoons"
 *   secondaryContent={<ProductMatch name="Kroger Butter" price="$3.99" />}
 *   controls={
 *     <>
 *       <input type="number" value={1} />
 *       <Checkbox checked={checked} />
 *     </>
 *   }
 * />
 */
export function GlassListItem({
  image,
  fallbackIcon,
  title,
  subtitle,
  secondaryContent,
  controls,
  checked = false,
  interactive = false,
  onClick,
  size = 'md',
  testId,
  dataAttributes,
  className,
  intensity = 'strong',
  ...surfaceProps
}: GlassListItemProps) {
  // Size-based classes
  const sizeClasses = {
    sm: {
      padding: 'p-2',
      gap: 'gap-2',
      image: 'w-8 h-8',
      title: 'text-sm',
      indent: 'pl-10', // 8px image + 8px gap = 40px = pl-10
    },
    md: {
      padding: 'p-3',
      gap: 'gap-3',
      image: 'w-10 h-10',
      title: 'text-base',
      indent: 'pl-[52px]', // 40px image + 12px gap = 52px
    },
    lg: {
      padding: 'p-4',
      gap: 'gap-4',
      image: 'w-12 h-12',
      title: 'text-lg',
      indent: 'pl-16', // 48px image + 16px gap = 64px = pl-16
    },
  };

  const sizes = sizeClasses[size];
  const isInteractive = interactive || onClick !== undefined;

  const handleClick = () => {
    if (isInteractive && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && isInteractive) {
      e.preventDefault();
      handleClick();
    }
  };

  const handleControlsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Build data attributes
  const dataAttrs: Record<string, string> = {
    'data-testid': testId || 'glass-list-item',
    ...dataAttributes,
  };

  return (
    <GlassSurface
      intensity={intensity}
      className={cn(
        'rounded-lg transition-all duration-200',
        checked && 'opacity-50',
        className,
      )}
      {...dataAttrs}
      {...surfaceProps}
    >
      <div
        className={cn(
          'flex flex-col gap-2',
          sizes.padding,
          isInteractive && 'cursor-pointer hover:bg-surface-variant/20',
        )}
        onClick={isInteractive ? handleClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
      >
        {/* Top row: Image + Title + Controls */}
        <div className={cn('flex items-center', sizes.gap)}>
          {/* Image or fallback icon */}
          {image ? (
            <div
              className={cn(
                'relative rounded-md overflow-hidden flex-shrink-0 bg-surface-variant/20',
                sizes.image,
              )}
            >
              {image}
            </div>
          ) : fallbackIcon ? (
            <div className="flex-shrink-0">{fallbackIcon}</div>
          ) : null}

          {/* Title and subtitle */}
          <div className="min-w-0 flex-1">
            <h4
              className={cn(
                'font-medium text-on-surface truncate',
                sizes.title,
                checked && 'line-through',
              )}
            >
              {title}
            </h4>
            {subtitle && (
              <p className="text-xs text-on-surface-variant truncate">
                {subtitle}
              </p>
            )}
          </div>

          {/* Controls */}
          {controls && (
            <div
              className="flex items-center gap-2 flex-shrink-0"
              onClick={handleControlsClick}
            >
              {controls}
            </div>
          )}
        </div>

        {/* Bottom row: Secondary content */}
        {secondaryContent && (
          <div className={sizes.indent}>{secondaryContent}</div>
        )}
      </div>
    </GlassSurface>
  );
}
