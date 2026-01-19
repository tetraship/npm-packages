/**
 * @tetraship/threads
 *
 * Universal thread and activity persistence layer.
 */

// Types
export * from './types';

// Re-export commonly used types for convenience
export type {
  Thread,
  NewThread,
  Item,
  NewItem,
  Edge,
  NewEdge,
  Stream,
  NewStream,
} from './models';

// Main entry point