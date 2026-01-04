# AGENTS.md

## AI Agent Workflows for npm-packages

This document describes the AI agent workflows and automation used in this repository.

## 🤖 GitHub Copilot Workspace

This repository is optimized for use with GitHub Copilot Workspace. The workspace provides intelligent assistance for:

- Package development and maintenance
- Automated testing and building
- Code review and suggestions
- Documentation generation

## 🔄 Automated Workflows

### copilot-setup-steps Workflow

The main CI/CD workflow (`copilot-setup-steps.yml`) automates the following tasks:

#### 1. Change Detection
- Uses [tj-actions/changed-files](https://github.com/tj-actions/changed-files) to detect which packages have been modified
- Only builds and tests packages that have changed, improving CI efficiency
- Determines which packages need to be released

#### 2. Build and Test
- Runs build and test commands for changed packages
- Ensures code quality before merging
- Validates that changes don't break existing functionality

#### 3. Semantic Release
- Uses [cycjimmy/semantic-release-action](https://github.com/marketplace/actions/action-for-semantic-release) for automated versioning
- Follows [Conventional Commits](https://www.conventionalcommits.org/) specification
- Automatically generates changelogs
- Publishes packages to npm registry when changes are merged to main

## 📋 Commit Convention

This repository follows the Conventional Commits specification:

- `feat:` - New feature (triggers minor version bump)
- `fix:` - Bug fix (triggers patch version bump)
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `test:` - Test updates
- `refactor:` - Code refactoring
- `perf:` - Performance improvements

Example:
```
feat(backend): add new authentication module
fix(threads): resolve race condition in worker pool
docs(react-glass): update component usage examples
```

## 🔧 Agent Tasks

### Code Review Agent
- Automatically reviews pull requests
- Checks for code quality issues
- Suggests improvements and best practices
- Validates commit messages follow conventions

### Build Agent
- Monitors changed files
- Triggers builds for affected packages
- Runs tests in parallel
- Reports build status

### Release Agent
- Analyzes commits since last release
- Determines version bump based on commit types
- Generates changelog entries
- Publishes packages with new versions
- Creates GitHub releases with notes

## 🚀 Best Practices

1. **Commit Messages**: Always use conventional commit format
2. **Testing**: Write tests for new features and bug fixes
3. **Documentation**: Update README files when adding features
4. **Dependencies**: Keep dependencies up to date
5. **Versioning**: Let semantic-release handle version bumps automatically

## 🛠️ Troubleshooting

### Workflow Issues

If the workflow fails:
1. Check the GitHub Actions logs for detailed error messages
2. Verify all required secrets are configured in repository settings
3. Ensure commit messages follow the conventional format
4. Check that package.json files are valid

### Release Issues

If a package isn't being released:
1. Verify commits follow conventional commit format
2. Check that changes were made to the package directory
3. Ensure the package has a valid package.json with correct version
4. Verify npm token is valid and has publish permissions

## 📚 Resources

- [pnpm Workspace Documentation](https://pnpm.io/workspaces)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://semantic-release.gitbook.io/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [tj-actions/changed-files](https://github.com/tj-actions/changed-files)
