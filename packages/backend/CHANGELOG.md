# 1.0.0 (2026-01-20)


### Bug Fixes

* add comment to trigger release workflow ([833f123](https://github.com/tetraship/npm-packages/commit/833f123f5b0d1edc270842b081221ea64d04cd13))
* add debug steps to diagnose OIDC publishing issues ([9ca60c4](https://github.com/tetraship/npm-packages/commit/9ca60c4ed2620035c86ec734082f82c375b5dc59))
* add dummy NPM_TOKEN to bypass semantic-release check for trusted publishing ([c0a31a1](https://github.com/tetraship/npm-packages/commit/c0a31a19950ee19151c6d8d9cf8de73f070ec576))
* add missing releaserc files and complete workflow package coverage ([4c6407c](https://github.com/tetraship/npm-packages/commit/4c6407c5ab6c6c667dd697f64162c979e1a44c01))
* add pnpm override to force @semantic-release/npm v13 ([5b559b0](https://github.com/tetraship/npm-packages/commit/5b559b0acd83588ca54d6d602b02b9dd6a5fd9c2))
* add pnpm-lock.yaml to fix CI workflow failures ([36c958a](https://github.com/tetraship/npm-packages/commit/36c958a6f82f7edfb0ca2a511c6214d3b3384c47))
* add repository field and enable provenance in package.json ([bc1c90f](https://github.com/tetraship/npm-packages/commit/bc1c90ff53da3933734133f1ea658546995afce8))
* align pnpm version to v10 across all CI workflows ([c9ff8b6](https://github.com/tetraship/npm-packages/commit/c9ff8b6e882dafed1cd981ba3cdb865de911da40))
* **backend:** move framework deps to peerDependencies ([d8bb227](https://github.com/tetraship/npm-packages/commit/d8bb227ccbf88c5bf6c408329b887927f275ab5f))
* **backend:** use stable next@16.1.1 and restore peerDep range ([6a6fd42](https://github.com/tetraship/npm-packages/commit/6a6fd42ce18defcb6a4789b7f58d229138aba2c0))
* configure build output for publishing ([7229ea2](https://github.com/tetraship/npm-packages/commit/7229ea25d69b453d19fd124300d3658de3da6b8d))
* configure OIDC trusted publishing for npm releases ([51c1fe3](https://github.com/tetraship/npm-packages/commit/51c1fe3116b72eccda58c506eef48834184bda0a))
* enable npm provenance for trusted publishing ([055865f](https://github.com/tetraship/npm-packages/commit/055865fd196cc62494f7e868cb7841931ee07c46))
* enable provenance in semantic-release config to bypass token check ([ddf87e9](https://github.com/tetraship/npm-packages/commit/ddf87e90bcd041f254cfaf219d4671096bf767c2))
* install semantic-release as root devDependency for OIDC support ([2ceb555](https://github.com/tetraship/npm-packages/commit/2ceb555317e8b9ff732bda2356eef4731b3a1f30))
* **react-markdown:** remove storybook file and fix lint issues ([45b6adb](https://github.com/tetraship/npm-packages/commit/45b6adb9efa4ce7ebf4ed371346c00e2abfe15ab))
* remove broken debug steps, rely on DEBUG env var ([afd5fa3](https://github.com/tetraship/npm-packages/commit/afd5fa353fa9e65568b6e01644d8ca4d0f04242d))
* remove redundant comment from backend exports ([be79165](https://github.com/tetraship/npm-packages/commit/be79165d65cb86a1c390b5510ba72dd2b8f44129))
* resolve CI publishing issues with TypeScript subpath exports ([0c7b577](https://github.com/tetraship/npm-packages/commit/0c7b5773e53c276224a851314e004e704b3504c2))
* run semantic-release directly instead of cycjimmy action ([1e4b83f](https://github.com/tetraship/npm-packages/commit/1e4b83f3d9f1814ef929d42d03f435fd7a5232b2))
* trigger release for packages with configuration updates ([58258a9](https://github.com/tetraship/npm-packages/commit/58258a974c9c96d069be273551a35d02f2359579))
* trigger release with pnpm override in place ([512777c](https://github.com/tetraship/npm-packages/commit/512777c0903a956a765889fb5f861fd11a9dc96d))
* update package.json main entry points to use index.js directly ([df59aaa](https://github.com/tetraship/npm-packages/commit/df59aaaf75ca99388223f23a3b91cdc4ec70b3bd))
* use npx -p to run semantic-release with specific versions ([cd679ec](https://github.com/tetraship/npm-packages/commit/cd679ec174a2cc1c6462955575fe6fcd12327e83))


### Features

* **@tetraship/react-glass:** initial package setup ([89270b5](https://github.com/tetraship/npm-packages/commit/89270b5a2db18374505809b256a5c0bb700688c0))
* add package keywords for npm discoverability ([74fdf3f](https://github.com/tetraship/npm-packages/commit/74fdf3fe2a135f78813c03d6ab9769430538619c))
* create pnpm workspace with packages and CI/CD workflows ([521b4c3](https://github.com/tetraship/npm-packages/commit/521b4c3454bd135516e16516be2471792983eb76))
* initialize backend and environment setup ([5f6b26d](https://github.com/tetraship/npm-packages/commit/5f6b26de895c264fbfe1b44efaf02e5bbc6a3c0c))
* migrate threads and react-agent-chat to tetraship scope ([ea821cf](https://github.com/tetraship/npm-packages/commit/ea821cf81b514ca59f46af695336bc8df76f2ce2))
* **playground:** integration with new workspace packages ([003d502](https://github.com/tetraship/npm-packages/commit/003d50248b35d65aef73cf4ba1efb8539d9d3a65))
* port GlassNav, refactor TopNav context, and fix playground styling ([be5a60f](https://github.com/tetraship/npm-packages/commit/be5a60ff950565d0441b528689122a93290cc3cc))
* update package keywords for better discoverability ([67c8b37](https://github.com/tetraship/npm-packages/commit/67c8b370203866e100343b278d7fd4118bb60202))
