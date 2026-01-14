'use client';
import { GlassCombobox, GlassCard, type ComboboxItem } from '@tetraship/react-glass';
import { useState } from 'react';
import Link from 'next/link';

// Extended type for searchable items with metadata
interface SearchableItem extends ComboboxItem {
  type: 'Blog Post' | 'Entity';
  url: string;
}

// Mock data for blog posts
const blogPosts: SearchableItem[] = [
  {
    id: 'blog-1',
    label: 'Getting Started with React Glass',
    description: 'Learn how to use glassmorphism components in your React app',
    type: 'Blog Post',
    url: '/blog',
  },
  {
    id: 'blog-2',
    label: 'Advanced TypeScript Patterns',
    description: 'Deep dive into TypeScript design patterns and best practices',
    type: 'Blog Post',
    url: '/blog',
  },
  {
    id: 'blog-3',
    label: 'Building Modern Web Applications',
    description: 'A comprehensive guide to modern web development',
    type: 'Blog Post',
    url: '/blog',
  },
  {
    id: 'blog-4',
    label: 'State Management in React',
    description: 'Understanding different state management solutions',
    type: 'Blog Post',
    url: '/blog',
  },
  {
    id: 'blog-5',
    label: 'CSS Grid and Flexbox Mastery',
    description: 'Master modern CSS layout techniques',
    type: 'Blog Post',
    url: '/blog',
  },
];

// Mock data for entities
const entities: SearchableItem[] = [
  {
    id: 'entity-1',
    label: 'Alpha Corporation',
    description: 'Technology company specializing in AI solutions',
    type: 'Entity',
    url: '/entity/1',
  },
  {
    id: 'entity-2',
    label: 'Beta Industries',
    description: 'Manufacturing and logistics provider',
    type: 'Entity',
    url: '/entity/2',
  },
  {
    id: 'entity-3',
    label: 'Gamma Research Lab',
    description: 'Research institution focused on quantum computing',
    type: 'Entity',
    url: '/entity/3',
  },
  {
    id: 'entity-4',
    label: 'Delta Ventures',
    description: 'Venture capital firm investing in startups',
    type: 'Entity',
    url: '/entity/4',
  },
  {
    id: 'entity-5',
    label: 'Epsilon Solutions',
    description: 'Cloud infrastructure and DevOps services',
    type: 'Entity',
    url: '/entity/5',
  },
  {
    id: 'entity-6',
    label: 'Zeta Technologies',
    description: 'Blockchain and cryptocurrency platform',
    type: 'Entity',
    url: '/entity/6',
  },
];

// Combine all searchable items
const allItems: SearchableItem[] = [...blogPosts, ...entities];

export default function SearchPage() {
  const [selectedBlogPost, setSelectedBlogPost] = useState<SearchableItem | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<SearchableItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<SearchableItem | null>(null);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Search Demo</h1>
        <p className="text-gray-300">
          Demonstration of GlassCombobox for searching blog posts and entities
        </p>
      </div>

      {/* Combined search */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Search Everything</h2>
        <GlassCombobox
          items={allItems}
          placeholder="Search blog posts and entities..."
          label="Global Search"
          onSelect={(item) => {
            setSelectedItem(item as SearchableItem | null);
          }}
        />
        {selectedItem && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <p className="text-sm text-gray-400 uppercase tracking-wider">
              {selectedItem.type}
            </p>
            <h3 className="text-lg font-medium text-white mt-1">{selectedItem.label}</h3>
            <p className="text-gray-300 mt-1">{selectedItem.description}</p>
            <Link 
              href={selectedItem.url}
              className="inline-block mt-3 text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Details →
            </Link>
          </div>
        )}
      </GlassCard>

      {/* Blog posts search */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Search Blog Posts</h2>
        <GlassCombobox
          items={blogPosts}
          placeholder="Search blog posts..."
          label="Blog Posts"
          onSelect={(item) => {
            setSelectedBlogPost(item as SearchableItem | null);
          }}
        />
        {selectedBlogPost && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <h3 className="text-lg font-medium text-white">{selectedBlogPost.label}</h3>
            <p className="text-gray-300 mt-1">{selectedBlogPost.description}</p>
            <Link 
              href={selectedBlogPost.url}
              className="inline-block mt-3 text-blue-400 hover:text-blue-300 transition-colors"
            >
              Read Article →
            </Link>
          </div>
        )}
      </GlassCard>

      {/* Entities search */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Search Entities</h2>
        <GlassCombobox
          items={entities}
          placeholder="Search entities..."
          label="Entities"
          intensity="medium"
          onSelect={(item) => {
            setSelectedEntity(item as SearchableItem | null);
          }}
        />
        {selectedEntity && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <h3 className="text-lg font-medium text-white">{selectedEntity.label}</h3>
            <p className="text-gray-300 mt-1">{selectedEntity.description}</p>
            <Link 
              href={selectedEntity.url}
              className="inline-block mt-3 text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Entity →
            </Link>
          </div>
        )}
      </GlassCard>

      {/* Features section */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Real-time filtering as you type</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Keyboard navigation support (arrow keys, Enter, Escape)</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Accessible ARIA attributes via Downshift</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Glassmorphism styling consistent with other components</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            <span>Support for items with descriptions</span>
          </li>
        </ul>
      </GlassCard>
    </div>
  );
}
