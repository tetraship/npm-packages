import { useCombobox } from 'downshift';
import { useState } from 'react';
import type React from 'react';
import { cn } from './utils';
import { GlassSurface } from './GlassSurface';

export interface ComboboxItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Display label for the item
   */
  label: string;
  /**
   * Optional description or subtitle
   */
  description?: string;
}

export interface GlassComboboxProps {
  /**
   * List of items to display in the combobox
   */
  items: ComboboxItem[];
  /**
   * Callback when an item is selected
   */
  onSelect?: (item: ComboboxItem | null) => void;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Glass intensity - defaults to 'strong' for heavy blur
   */
  intensity?: 'light' | 'medium' | 'strong';
  /**
   * Additional className for the container
   */
  className?: string;
  /**
   * Label for the combobox
   */
  label?: string;
  /**
   * Initial selected item
   */
  initialSelectedItem?: ComboboxItem;
}

/**
 * GlassCombobox component with glass-morphism styling and search functionality
 * Uses downshift for accessibility and autocomplete behavior
 */
export function GlassCombobox({
  items,
  onSelect,
  placeholder = 'Search...',
  intensity = 'strong',
  className,
  label,
  initialSelectedItem,
}: GlassComboboxProps) {
  const [inputItems, setInputItems] = useState(items);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items: inputItems,
    itemToString: (item) => item?.label || '',
    initialSelectedItem,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.label.toLowerCase().includes(inputValue?.toLowerCase() || '')
        )
      );
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onSelect?.(selectedItem || null);
    },
  });

  return (
    <div className={cn('relative w-full', className)}>
      {label && (
        <label
          {...getLabelProps()}
          className="block text-sm font-medium text-on-surface mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <GlassSurface<'input'>
          as="input"
          intensity={intensity}
          bordered
          shadowed
          className={cn(
            'w-full px-4 py-2 rounded-lg',
            'text-on-surface placeholder:text-on-surface-variant',
            'focus:outline-none focus:ring-2 focus:ring-primary',
          )}
          {...getInputProps()}
          placeholder={placeholder}
        />
        <button
          type="button"
          {...getToggleButtonProps()}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <GlassSurface
        as="ul"
        intensity={intensity}
        bordered
        shadowed
        {...getMenuProps()}
        className={cn(
          'absolute z-10 mt-2 w-full rounded-lg overflow-hidden',
          'max-h-60 overflow-y-auto',
          !isOpen && 'hidden'
        )}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              key={item.id}
              {...getItemProps({ item, index })}
              className={cn(
                'px-4 py-2 cursor-pointer transition-colors',
                'text-on-surface',
                highlightedIndex === index && 'bg-white/10',
                selectedItem?.id === item.id && 'bg-primary/20'
              )}
            >
              <div className="font-medium">{item.label}</div>
              {item.description && (
                <div className="text-sm text-on-surface-variant">
                  {item.description}
                </div>
              )}
            </li>
          ))}
        {isOpen && inputItems.length === 0 && (
          <li className="px-4 py-2 text-on-surface-variant">No items found</li>
        )}
      </GlassSurface>
    </div>
  );
}
