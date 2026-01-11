import { type ReactNode } from "react";

export interface GlassTabsProps {
  /**
   * Default active tab value
   */
  defaultValue?: string;

  /**
   * CSS class name for the container
   */
  className?: string;

  /**
   * Child components (TabsList and TabsContent)
   */
  children: ReactNode;
}

export interface GlassTabsListProps {
  /**
   * CSS class name for the tabs list
   */
  className?: string;

  /**
   * Child components (TabsTrigger)
   */
  children: ReactNode;
}

export interface GlassTabsTriggerProps {
  /**
   * Value of the tab
   */
  value: string;

  /**
   * CSS class name for the tab trigger
   */
  className?: string;

  /**
   * Child content
   */
  children: ReactNode;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Whether this tab is active
   */
  isActive?: boolean;
}

export interface GlassTabsContentProps {
  /**
   * Value of the tab
   */
  value: string;

  /**
   * CSS class name for the tab content
   */
  className?: string;

  /**
   * Child content
   */
  children: ReactNode;

  /**
   * Whether this tab is active
   */
  isActive?: boolean;

  /**
   * Optional id for the tabpanel
   */
  id?: string;

  /**
   * Optional role (defaults to 'tabpanel')
   */
  role?: string;

  /**
   * Optional aria-labelledby
   */
  "aria-labelledby"?: string;
}

/**
 * GlassTabs - A tabs component with glass-morphism styling
 *
 * This is a controlled component pattern that requires managing state
 * in the parent component.
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('overview');
 *
 * <GlassTabs defaultValue="overview">
 *   <GlassTabsList>
 *     <GlassTabsTrigger
 *       value="overview"
 *       isActive={activeTab === 'overview'}
 *       onClick={() => setActiveTab('overview')}
 *     >
 *       Overview
 *     </GlassTabsTrigger>
 *     <GlassTabsTrigger
 *       value="details"
 *       isActive={activeTab === 'details'}
 *       onClick={() => setActiveTab('details')}
 *     >
 *       Details
 *     </GlassTabsTrigger>
 *   </GlassTabsList>
 *   <GlassTabsContent value="overview" isActive={activeTab === 'overview'}>
 *     Overview content
 *   </GlassTabsContent>
 *   <GlassTabsContent value="details" isActive={activeTab === 'details'}>
 *     Details content
 *   </GlassTabsContent>
 * </GlassTabs>
 * ```
 */
export function GlassTabs({ className = "", children }: GlassTabsProps) {
  return <div className={className}>{children}</div>;
}

export function GlassTabsList({
  className = "",
  children,
}: GlassTabsListProps) {
  return (
    <div
      className={`flex gap-1 border-b border-outline/30 ${className}`}
      role="tablist"
    >
      {children}
    </div>
  );
}

export function GlassTabsTrigger({
  value, // eslint-disable-line @typescript-eslint/no-unused-vars
  className = "",
  children,
  onClick,
  isActive = false,
}: GlassTabsTriggerProps) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? "active" : "inactive"}
      className={`
        px-4 py-3 text-sm font-medium transition-all
        ${
          isActive
            ? "text-primary border-b-2 border-primary bg-primary-container/10"
            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30"
        }
        ${className}
      `}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function GlassTabsContent({
  value, // eslint-disable-line @typescript-eslint/no-unused-vars
  className = "",
  children,
  isActive = false,
  id,
  role = "tabpanel",
  "aria-labelledby": ariaLabelledBy,
}: GlassTabsContentProps) {
  if (!isActive) return null;

  return (
    <div
      id={id}
      role={role}
      aria-labelledby={ariaLabelledBy}
      data-state={isActive ? "active" : "inactive"}
      className={`pt-6 ${className}`}
    >
      {children}
    </div>
  );
}
