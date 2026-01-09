import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { GlassListItem } from './GlassListItem';

const meta = {
  title: 'Components/GlassListItem',
  component: GlassListItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A mobile-friendly list item component with glass-morphism styling. Optimized for
shopping lists, task lists, and any vertical list of items that needs to work well
on small screens.

**Layout:**
- Top row: Image/icon + Title/subtitle + Controls
- Bottom row (optional): Secondary content, aligned with title

This two-row layout prevents horizontal overflow on mobile while keeping
controls easily accessible.

**Use Cases:**
- Shopping lists with product matching
- Task lists with checkboxes
- Product catalogs
- Settings lists
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant affecting image size and spacing',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the item is checked/selected',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the item is clickable',
    },
  },
} satisfies Meta<typeof GlassListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock image component for stories
const MockImage = ({
  alt,
  color = '#60a5fa',
}: {
  alt: string;
  color?: string;
}) => (
  <img
    src={`https://placehold.co/80x80/${color.replace('#', '')}/${color.replace('#', '')}?text=${alt[0]}`}
    alt={alt}
    className="w-full h-full object-cover"
  />
);

// Simple placeholder for icon
const MockIcon = ({ className }: { className?: string }) => (
  <div
    className={`w-5 h-5 rounded bg-on-surface-variant/30 ${className || ''}`}
  />
);

/**
 * Basic list item with image and title
 */
export const Default: Story = {
  args: {
    image: <MockImage alt="Butter" color="#f59e0b" />,
    title: 'Butter',
    subtitle: '2 tablespoons',
  },
};

/**
 * List item with controls (checkbox)
 */
export const WithCheckbox: Story = {
  args: {
    image: <MockImage alt="Eggs" color="#fbbf24" />,
    title: 'Eggs',
    subtitle: '2 large eggs',
    controls: (
      <input
        type="checkbox"
        className="w-5 h-5 text-primary border-outline rounded"
      />
    ),
  },
};

/**
 * List item with quantity input and checkbox (shopping list pattern)
 */
export const ShoppingListItem: Story = {
  args: {
    image: <MockImage alt="Cheddar" color="#f97316" />,
    title: 'Cheddar Cheese',
    subtitle: '6 oz shredded',
    controls: (
      <>
        <input
          type="number"
          defaultValue={1}
          min={1}
          className="w-12 text-xs px-2 py-1 border border-outline rounded-md bg-surface-container-low text-on-surface-variant text-right"
        />
        <input
          type="checkbox"
          className="w-5 h-5 text-primary border-outline rounded"
        />
      </>
    ),
  },
};

/**
 * List item with secondary content (product match)
 */
export const WithSecondaryContent: Story = {
  args: {
    image: <MockImage alt="Cream" color="#fef3c7" />,
    title: 'Heavy Cream',
    subtitle: '1 cup',
    secondaryContent: (
      <div className="flex flex-col gap-0.5 text-right">
        <span className="text-sm text-on-surface truncate">
          Kroger Heavy Whipping Cream
        </span>
        <div className="flex items-center justify-end gap-1.5 text-xs text-on-surface-variant">
          <span>1 pint</span>
          <span>-</span>
          <span>Qty 1</span>
          <span>-</span>
          <span className="font-medium text-on-surface">$3.49</span>
        </div>
      </div>
    ),
    controls: (
      <>
        <input
          type="number"
          defaultValue={1}
          min={1}
          className="w-12 text-xs px-2 py-1 border border-outline rounded-md bg-surface-container-low text-on-surface-variant text-right"
        />
        <input
          type="checkbox"
          className="w-5 h-5 text-primary border-outline rounded"
        />
      </>
    ),
  },
};

/**
 * List item with fallback icon instead of image
 */
export const WithFallbackIcon: Story = {
  args: {
    fallbackIcon: <MockIcon />,
    title: 'Garlic',
    subtitle: '2 cloves, minced',
    controls: (
      <input
        type="checkbox"
        className="w-5 h-5 text-primary border-outline rounded"
      />
    ),
  },
};

/**
 * Checked/completed state
 */
export const Checked: Story = {
  args: {
    image: <MockImage alt="Milk" color="#e0f2fe" />,
    title: 'Milk',
    subtitle: '1 cup whole milk',
    checked: true,
    controls: (
      <input
        type="checkbox"
        defaultChecked
        className="w-5 h-5 text-primary border-outline rounded"
      />
    ),
  },
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
  args: {
    size: 'sm',
    image: <MockImage alt="Salt" color="#94a3b8" />,
    title: 'Salt',
    subtitle: '1 tsp',
  },
};

/**
 * Large size variant
 */
export const LargeSize: Story = {
  args: {
    size: 'lg',
    image: <MockImage alt="Chicken" color="#fecaca" />,
    title: 'Chicken Breast',
    subtitle: '2 lbs boneless skinless',
    secondaryContent: (
      <div className="text-sm text-on-surface-variant">
        Foster Farms Fresh Chicken - $8.99/lb
      </div>
    ),
  },
};

/**
 * Interactive list item with click handler
 */
export const Interactive: StoryObj = {
  render: function InteractiveStory() {
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="space-y-2">
        <GlassListItem
          image={<MockImage alt="Onion" color="#fef08a" />}
          title="Yellow Onion"
          subtitle="1 medium, diced"
          interactive
          onClick={() => setExpanded(!expanded)}
          secondaryContent={
            expanded ? (
              <div className="text-sm text-on-surface-variant p-2 bg-surface-container/50 rounded-md">
                Click to see product alternatives...
              </div>
            ) : null
          }
        />
        <p className="text-xs text-on-surface-variant">
          Click the item to toggle secondary content
        </p>
      </div>
    );
  },
};

/**
 * Full shopping list example
 */
export const ShoppingList: StoryObj = {
  render: function ShoppingListStory() {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const items = [
      {
        id: '1',
        name: 'Butter',
        amount: '16 oz',
        match: 'Kroger Butter Sticks',
        price: '$3.99',
        color: '#f59e0b',
      },
      {
        id: '2',
        name: 'Cheddar Cheese',
        amount: '6 oz',
        match: 'Kroger Sharp Cheddar Block',
        price: '$3.69',
        color: '#f97316',
      },
      {
        id: '3',
        name: 'Heavy Cream',
        amount: '1 pint',
        match: 'Kroger Heavy Whipping Cream',
        price: '$3.49',
        color: '#fef3c7',
      },
      {
        id: '4',
        name: 'Garlic',
        amount: '2 cloves',
        match: null,
        price: null,
        color: '#d1d5db',
      },
    ];

    const toggleItem = (id: string) => {
      const newChecked = new Set(checkedItems);
      if (newChecked.has(id)) {
        newChecked.delete(id);
      } else {
        newChecked.add(id);
      }
      setCheckedItems(newChecked);
    };

    return (
      <div className="space-y-2 max-w-md">
        {items.map((item) => (
          <GlassListItem
            key={item.id}
            image={<MockImage alt={item.name} color={item.color} />}
            title={item.name}
            subtitle={item.amount}
            checked={checkedItems.has(item.id)}
            secondaryContent={
              item.match ? (
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-sm text-on-surface truncate">
                    {item.match}
                  </span>
                  <div className="flex items-center justify-end gap-1.5 text-xs text-on-surface-variant">
                    <span>Qty 1</span>
                    <span>-</span>
                    <span className="font-medium text-on-surface">
                      {item.price}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-on-surface-variant">
                  No match
                </span>
              )
            }
            controls={
              <>
                <input
                  type="number"
                  defaultValue={1}
                  min={1}
                  className="w-12 text-xs px-2 py-1 border border-outline rounded-md bg-surface-container-low text-on-surface-variant text-right"
                />
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="w-5 h-5 text-primary border-outline rounded"
                />
              </>
            }
          />
        ))}
      </div>
    );
  },
};
