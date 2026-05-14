# Payments App

A modern monorepo application built with Next.js and NX for managing payment data with a component-driven UI architecture.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Local Development](#local-development)
- [Building](#building)
- [Running the Application](#running-the-application)
- [Architecture & Design Notes](#architecture--design-notes)
- [Troubleshooting](#troubleshooting)

---

## Project Structure

This is an NX monorepo with the following structure:

```
.
├── apps/
│   └── web/              # Next.js 16 application (main frontend)
│       ├── app/          # Next.js App Router (React 19)
│       ├── .env          # Environment variables (API_URL required)
│       ├── next.config.js
│       └── project.json
├── libs/
│   ├── ui/               # React component library (Vite + Vitest)
│   │   ├── src/          # Reusable UI components
│   │   └── vite.config.mts
│   └── types/            # TypeScript type definitions (Vite)
│       └── src/          # Shared types
├── nx.json               # NX configuration with plugin definitions
├── package.json          # Monorepo dependencies (Yarn 4.14.1)
├── tsconfig.base.json    # Base TypeScript configuration
└── .env                  # Root environment file (for development)
```

### Key Projects

- **`apps/web`** – Production Next.js application with server/client rendering
  - Uses dynamic rendering for the payments page (no prerendering required)
  - Depends on `@ui` (ui library) and `@types` (type definitions)
  
- **`libs/ui`** – Shared React component library
  - Built with Vite in library mode
  - Exports multiple entry points (index, server)
  - Contains UI components (Button, Dialog, PaymentsTable, etc.)
  
- **`libs/types`** – Shared TypeScript types
  - Common data types and interfaces
  - Built with Vite (pure types)

---

## Prerequisites

- **Node.js**: 20.19.9 or later (18+ supported)
- **Yarn**: 4.14.1 (using Corepack or installed globally)
- **Git**: For version control

### Enable Yarn with Corepack (recommended)

```bash
# Enable Corepack (included with Node.js 16.13+)
corepack enable

# Verify Yarn version
yarn --version  # Should show 4.14.1
```

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd payments-app
```

### 2. Install Dependencies

```bash
# Install all monorepo dependencies
yarn install

# This will:
# - Install root-level dev dependencies
# - Install workspace dependencies
# - Link local packages (@ui, @types)
# - Setup Yarn Plug'n'Play (PnP) if configured
```

### 3. Verify Installation

```bash
# Check that NX is available
yarn nx --version

# List all projects in the workspace
yarn nx show projects

# Verify the web app can be built
yarn nx run web:build
```

---

## Local Development

### Start the Development Server

```bash
# Start the Next.js dev server (main application)
yarn nx run web:dev

# The app will be available at http://localhost:3000
```

**What this does:**
- Starts Next.js in watch mode
- Hot module replacement (HMR) enabled
- Watches all library changes and rebuilds automatically
- API calls require `API_URL` environment variable

### Developing Libraries

If you're making changes to `@ui` or `@types` libraries:

```bash
# Watch and rebuild ui library
yarn nx watch ui -- yarn nx run ui:build

# Watch and rebuild types library
yarn nx watch types -- yarn nx run types:build

# Or build a specific library once
yarn nx run ui:build
yarn nx run types:build
```

### Build Dependencies Before Running App

```bash
# Build all dependencies of the web app
yarn nx run web:build-deps

# Then run the app
yarn nx run web:dev
```

### Setting Environment Variables

Create a `.env.local` file in `apps/web/` for local development:

```bash
# apps/web/.env.local
API_URL=http://localhost:8000  # Or your API endpoint
```

The root `.env` file contains defaults and is committed to version control.

---

## Building

### Build the Application

```bash
# Build the web app (dependencies are built automatically)
yarn nx run web:build

# Output:
# - libs/ui/dist/  (Vite build output)
# - libs/types/dist/  (Type definitions)
# - apps/web/.next/  (Next.js production build)
```

### Build with Options

```bash
# Force rebuild (skip cache)
yarn nx run web:build --skip-nx-cache

# Verbose output
yarn nx run web:build --verbose
```

### Build Output

The build produces:
- **UI Library**: `libs/ui/dist/` and `libs/ui/*.d.ts` (TypeScript declarations)
  - Multiple entry points: `index.js` (components) and `server.js` (server-side exports)
  - CSS bundled as `payments-app.css`

- **Types Library**: `libs/types/dist/` and `libs/types/*.d.ts`
  - Pure type definitions module

- **Web App**: `apps/web/.next/`
  - Compiled Next.js pages and static assets
  - Ready to deploy with `next start`

---

## Running the Application

### Development Mode

```bash
# Start dev server with hot reload
yarn nx run web:dev

# App will be available at http://localhost:3000
# Changes to files automatically reload the browser
```

### Production Build & Run

```bash
# Build for production
yarn nx run web:build

# Start production server
yarn nx run web:start

# The app will run at http://localhost:3000
# This runs the compiled Next.js build
```

### Test the Build

```bash
# Build and run locally to verify
yarn nx run web:build
yarn nx run web:start

# Visit http://localhost:3000
# Check that the Payments page loads and displays data
```

---

## Architecture & Design Notes

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js 16 + React 19 | Server-side rendering + dynamic routes |
| **Component Library** | React (Vite-built) | Reusable UI components |
| **Type System** | TypeScript 5.9 | Type safety across monorepo |
| **Styling** | SCSS + Open Props | Modern CSS with design tokens |
| **Monorepo Tool** | NX 22.7.1 | Task orchestration, caching, dep graph |
| **Package Manager** | Yarn 4.14.1 | Fast, reliable dependency management |
| **Testing** | Vitest (libs), Jest (app) | Unit tests for components and app logic |
| **Linting** | ESLint 9 | Code quality |
| **Build Tool (libs)** | Vite 8 | Fast build, library-optimized |

### Key Design Decisions

#### 1. **Dynamic Rendering (No Prerendering)**

The payments page uses `const dynamic = 'force-dynamic'` to avoid prerendering:
- Allows build to succeed even when API is unavailable
- Data fetched at request time (always fresh)
- Suitable for data-heavy pages that change frequently

```tsx
// apps/web/app/page.tsx
const dynamic = 'force-dynamic';

export default async function Index() {
  const response = await fetch(`${process.env.API_URL}/payments`);
  const items = await response.json();
  return <PaymentsTable items={items} />;
}
```

#### 2. **Monorepo Structure**

- **Libs as NPM packages**: `@ui` and `@types` are published modules
  - Cleanly separated concerns (components, types)
  - Easy to extract or share with other projects
  - Build outputs to `libs/{name}/dist/`

- **NX for task orchestration**:
  - Automatic dependency detection (web depends on ui + types)
  - Incremental builds and caching
  - Fast CI/CD with distributed task execution

#### 3. **Component Library Approach**

The `@ui` library exports multiple entry points:
- `@ui` (default) → Components + styling
- `@ui/server` → Server-only exports (if needed)

This allows fine-grained control over what's bundled client vs. server-side.

#### 4. **Environment Configuration**

- **Root `.env`**: Committed, contains defaults/examples
- **`.env.local`**: Local overrides (git-ignored)
- **CI/CD**: Environment variables injected at build/runtime

Example:
```env
# .env (committed)
API_URL=https://example.com

# .env.local (local development, git-ignored)
API_URL=http://localhost:8000
```

---

## Common Tasks

### Run Tests

```bash
# Test the web app
yarn nx run web:test

# Test with coverage
yarn nx run web:test -- --coverage
```

### Lint Code

```bash
# Lint the web app
yarn nx run web:lint
```

### Check Dependency Graph

```bash
# Visualize project dependencies
yarn nx graph

# Opens interactive graph at http://localhost:4211
```

### Clean Build Artifacts

```bash
# Remove dist and .next folders
rm -rf apps/web/.next libs/*/dist

# Reset NX cache
yarn nx reset

# Rebuild from scratch
yarn nx run web:build
```

---

## Troubleshooting

### `API_URL is not defined`

**Problem**: Build fails with API_URL undefined.

**Solution**:
- Ensure `.env` or `.env.local` contains `API_URL`
- The page uses dynamic rendering, so API_URL is only needed at runtime
- Check that your API endpoint is running (if local) or accessible (if remote)

```bash
# Set API_URL for local dev
echo "API_URL=http://localhost:8000" > apps/web/.env.local

# Verify
cat apps/web/.env.local
```

### Build Cache Issues

**Problem**: Changes not reflected after build.

**Solution**:
```bash
# Reset NX cache
yarn nx reset

# Rebuild
yarn nx run web:build
```

### Yarn Resolution Errors

**Problem**: Yarn can't resolve dependencies or workspaces.

**Solution**:
```bash
# Clear Yarn cache and reinstall
rm -rf node_modules
yarn install

# Or use modern Yarn commands
yarn workspaces list
```

### Port Already in Use (3000)

**Problem**: Can't start dev server on port 3000.

**Solution**:
```bash
# Kill the process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Or start on a different port
cd apps/web && next dev -p 3001
```

### TypeScript Errors in IDE

**Problem**: IDE shows TypeScript errors but build succeeds.

**Solution**:
- Make sure you've run `yarn install` to link workspaces
- Restart your IDE/editor
- Verify `tsconfig.base.json` path mappings are correct:
  ```json
  {
    "paths": {
      "@ui": ["libs/ui/src"],
      "@types": ["libs/types/src"]
    }
  }
  ```

### Library Import Failures

**Problem**: Cannot import from `@ui` in web app.

**Solution**:
```bash
# Rebuild ui library
yarn nx run ui:build

# Check that libs/ui/dist exists
ls -la libs/ui/dist

# Check package.json exports are correct
cat libs/ui/package.json | grep -A 5 '"exports"'
```

---

## Development Tips

### Caching & Incremental Builds

NX caches build outputs by default. To leverage this:

```bash
# First build (slow, caches output)
yarn nx run web:build

# Second build with no changes (instant, reads from cache)
yarn nx run web:build

# Modify a file and build (only affected projects rebuild)
yarn nx run web:build
```

### IDE Integration

- **WebStorm/IntelliJ**: Recognizes NX projects automatically
- **VS Code**: Install "Nx Console" extension for UI-based task execution
- **Any IDE**: Use `yarn nx run` commands from terminal

---

## Deployment

### Build for Production

```bash
yarn nx run web:build
```

### Deploy Next.js App

```bash
# Option 1: Deploy to Vercel (recommended for Next.js)
yarn install -g vercel
vercel

# Option 2: Self-host with next start
yarn nx run web:start

# Option 3: Export static site (if using ISR/static routes)
# Requires next.config.js configuration
yarn nx run web:build
```

### Notes

The `web:build` target automatically builds dependencies (@ui, @types) before building the app, so you don't need to build them separately.

---

## Further Reading

- [NX Documentation](https://nx.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vite Documentation](https://vitejs.dev)
- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## License

See LICENSE file for details.
