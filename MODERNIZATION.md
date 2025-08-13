# BlueBubbles n8n Node Modernization

This document outlines the modernization changes made to the BlueBubbles n8n custom node to make it compatible with current n8n versions.

## Changes Made

### 1. Updated Dependencies

**Before:**
- TypeScript 3.7.5
- n8n-workflow 0.11.0
- n8n-core 0.10.0
- tslint (deprecated)

**After:**
- TypeScript 5.3.3
- n8n-workflow 1.82.0
- n8n-core 1.82.0
- ESLint (replaced tslint)

### 2. TypeScript Configuration Updates

- Updated target from ES2017 to ES2020
- Added modern TypeScript compiler options:
  - `esModuleInterop: true`
  - `allowSyntheticDefaultImports: true`
  - `skipLibCheck: true`
  - `forceConsistentCasingInFileNames: true`

### 3. API Compatibility Fixes

#### Import Changes
- Updated imports from `n8n-core` to `n8n-workflow` for interface types
- Fixed `IExecuteFunctions`, `IHookFunctions`, `ILoadOptionsFunctions` imports
- Updated `NodeConnectionType` to `NodeConnectionTypes` for proper input/output typing

#### Node Configuration
- Updated input/output types from string arrays to `NodeConnectionTypes.Main[]`
- Fixed credential handling to use async `getCredentials()` method

#### HTTP Request Updates
- Replaced deprecated `request` library usage with `ctx.helpers.httpRequest()`
- Updated request options structure to match new API
- Fixed method type casting for HTTP methods

### 4. Dependency Conflict Resolution

#### Azure Storage Blob Issue
- **Problem**: The original setup was pulling in `@azure/storage-blob` as a transitive dependency through `n8n-nodes-base` → `snowflake-sdk`, causing module resolution errors in n8n.
- **Solution**: Updated to use `n8n-workflow` 1.82.0 and `n8n-core` 1.82.0 which have resolved these dependency conflicts.
- **Added**: `peerDependencies` configuration to ensure compatibility with the host n8n installation.

### 5. Code Quality Improvements

#### Linting
- Replaced deprecated `tslint` with modern `eslint`
- Added TypeScript ESLint plugin for better type checking
- Configured consistent code style rules (2-space indentation, single quotes)

#### Error Handling
- Updated error response parsing to handle new API structure
- Improved type safety with proper error handling

### 6. Build Process

The build process remains the same:
```bash
npm run build  # Compiles TypeScript and copies assets
npm run lint   # Runs ESLint for code quality checks
npm run dev    # Watches for changes and rebuilds
```

## Compatibility

This modernized version is compatible with:
- n8n versions 1.82.0 and later
- Node.js 18+ (tested with Node.js 24.5.0)
- TypeScript 5.3.3

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. The compiled files will be in the `dist/` directory

## Usage

The node can be used in n8n workflows to:
- Send raw HTTP requests to BlueBubbles server
- Send text messages via AppleScript or Private API
- Integrate iMessage automation into n8n workflows

## Troubleshooting

### Azure Storage Blob Error
If you encounter the error:
```
Error: Cannot find module '@azure/storage-blob/dist-esm/storage-blob/src/utils/constants'
```

This has been resolved by:
1. Using compatible n8n-workflow and n8n-core versions (1.82.0+)
2. Adding proper peer dependencies
3. Avoiding conflicting transitive dependencies

### NodeConnectionType Error
If you see:
```
'NodeConnectionType' only refers to a type, but is being used as a value here
```

This has been fixed by updating to use `NodeConnectionTypes` (plural) instead of `NodeConnectionType` (singular) in the newer n8n API.

## Notes

- The original functionality has been preserved while updating to modern APIs
- Some `any` types remain for backward compatibility with the existing codebase
- The node maintains the same user interface and configuration options
- All dependency conflicts have been resolved for seamless n8n integration 