import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { GlassCombobox } from './GlassCombobox';
import type { ComboboxItem } from './GlassCombobox';

const meta: Meta<typeof GlassCombobox> = {
  title: 'Glass Components/GlassCombobox',
  component: GlassCombobox,
  tags: ['autodocs'],
  argTypes: {
    intensity: {
      control: { type: 'select' },
      options: ['light', 'medium', 'strong'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassCombobox>;

const sampleItems: ComboboxItem[] = [
  { id: '1', label: 'React', description: 'A JavaScript library for building UIs' },
  { id: '2', label: 'Vue', description: 'The Progressive JavaScript Framework' },
  { id: '3', label: 'Angular', description: 'Platform for building mobile and desktop apps' },
  { id: '4', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { id: '5', label: 'Next.js', description: 'The React Framework for Production' },
  { id: '6', label: 'Nuxt', description: 'The Intuitive Vue Framework' },
  { id: '7', label: 'Remix', description: 'Full stack web framework' },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    placeholder: 'Search frameworks...',
    onSelect: (item) => console.log('Selected:', item),
  },
};

export const WithLabel: Story = {
  args: {
    items: sampleItems,
    label: 'Select Framework',
    placeholder: 'Search frameworks...',
  },
};

export const LightIntensity: Story = {
  args: {
    items: sampleItems,
    intensity: 'light',
    placeholder: 'Search frameworks...',
  },
};

export const WithInitialSelection: Story = {
  args: {
    items: sampleItems,
    initialSelectedItem: sampleItems[0],
    placeholder: 'Search frameworks...',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<ComboboxItem | null>(null);
    
    return (
      <div className="space-y-4">
        <GlassCombobox
          {...args}
          onSelect={(item) => {
            setSelected(item);
            console.log('Selected:', item);
          }}
        />
        {selected && (
          <div className="p-4 bg-white/10 rounded-lg">
            <p className="text-white font-medium">Selected: {selected.label}</p>
            {selected.description && (
              <p className="text-sm text-gray-300">{selected.description}</p>
            )}
          </div>
        )}
      </div>
    );
  },
  args: {
    items: sampleItems,
    label: 'Choose a Framework',
    placeholder: 'Search frameworks...',
  },
};
