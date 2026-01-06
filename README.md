# npm-packages

A monorepo for Tetraship npm packages, managed with pnpm workspaces.

## 📦 Packages

This repository contains the following packages:

- **[@tetraship/backend](./packages/backend)** - Backend utilities
- **[@tetraship/threads](./packages/threads)** - Threading utilities
- **[@tetraship/react-glass](./packages/react-glass)** - React glassmorphism components
- **[@tetraship/documents](./packages/documents)** - Document management utilities
- **[@tetraship/facets](./packages/facets)** - Facet utilities

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install
```

## 🛠️ Development

### Workspace Commands

```bash
# Build all packages
pnpm build

# Test all packages
pnpm test

# Lint all packages
pnpm lint

# Clean build artifacts
pnpm clean
```

### Working with Individual Packages

```bash
# Run a command in a specific package
pnpm --filter @tetraship/backend build

# Add a dependency to a specific package
pnpm --filter @tetraship/backend add lodash
```

## 📝 Contributing

Please read [AGENTS.md](./AGENTS.md) for details on our AI agent workflows and contribution process.

## 🔄 CI/CD

This repository uses GitHub Actions for continuous integration and deployment:

- **Copilot Setup**: [copilot-setup-steps.yml](./.github/workflows/copilot-setup-steps.yml) - Sets up the environment for GitHub Copilot
- **CI Pipeline**: [ci.yml](./.github/workflows/ci.yml) - Builds and tests changed packages on push and pull requests
  - Uses [tj-actions/changed-files](https://github.com/tj-actions/changed-files) to detect changed packages
  - Only builds and tests packages that have changed
- **Release Pipeline**: [release.yml](./.github/workflows/release.yml) - Automatically versions and publishes packages
  - Uses [cycjimmy/semantic-release-action](https://github.com/marketplace/actions/action-for-semantic-release) for automated releases
  - Runs on pushes to main branch

## 📄 License

MIT - See [LICENSE](./LICENSE) for details