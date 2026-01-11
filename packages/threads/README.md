# @tetraship/threads

Universal thread and activity persistence layer for AI-powered applications.

## Overview

This package provides a unified schema and model layer for:

1. **Record Feeds**: Comments or activity logs attached to any entity
2. **Agent Workflows**: Structured logs of AI agents executing tasks (DAGs)
3. **Chat Interfaces**: Traditional conversational UIs (AI SDK compatible)

## Installation

```bash
npm install @tetraship/threads
```

## Quick Start

```typescript
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from 'libsql';
import { createThreadModels } from '@tetraship/threads/models';

// Create database connection
const client = createClient({ url: 'file:local.db' });
const db = drizzle(client);

// Create models bound to your database
const models = createThreadModels(db);


// Create a thread scoped to a ticket
const [thread] = await models.threads.insert([
  {
    projectId: 'proj_123',
    scopeType: 'ticket',
    scopeId: 'T-101',
    title: 'Support Discussion',
  },
]);

// Append messages
await models.items.append({
  threadId: thread.id,
  role: 'user',
  parts: [{ type: 'text', text: 'Hello, I need help with billing.' }],
  requestId: 'req_abc',
});
```

(See full documentation in source repo)