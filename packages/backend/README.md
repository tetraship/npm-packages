# @tetraship/backend

Backend utilities for Tetraship.

## Modules

- **Auth**: Authentication utilities (NextAuth configuration, providers, session management).
- **Database**: Database schemas and connection helpers (Drizzle ORM).
- **Uploads**: S3 upload utilities and client-side helpers.
- **Utils**: General utilities (UUIDv7, slugify, Zod helpers).

## Installation

```bash
npm install @tetraship/backend
```

## Usage

```javascript
import { auth } from '@tetraship/backend/auth';
import { db } from '@tetraship/backend/database';
// ...
```

## License

MIT
