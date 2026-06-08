# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Type-check then bundle for production (tsc -b && vite build)
pnpm lint         # Run ESLint
pnpm preview      # Preview production build locally
```

No test runner is configured yet.

## Architecture

This is the frontend for **AutoMarket Pro**, a vehicle marketplace. It is a React 19 + TypeScript + Vite app using pnpm.

**Key libraries:**
- `@tanstack/react-query` — server state management (QueryClient configured in `src/lib/api/queryClient.ts`)
- `react-hook-form` + `zod` + `@hookform/resolvers` — form validation
- `react-hot-toast` — toast notifications

**Feature-based structure:** all domain logic lives under `src/features/<domain>/` with a consistent layout:

```
src/features/vehicles/
  api/         — raw fetch functions (vehicleApi.ts), hardcoded to http://localhost:8080/api/v1/vehicles
  hooks/       — React Query wrappers (useGetVehicles, useGetVehicle, useCreateVehicle)
  schemas/     — Zod schemas used for both form validation and response typing
  types/       — TypeScript types inferred from Zod schemas; query key factory (vehicleKeys)
  components/  — UI components (VehicleForm, VehicleList)
```

**Data flow:** Zod schemas in `schemas/vehicle.schema.ts` are the single source of truth — `CreateVehicleInput` and `Vehicle` types are inferred from them via `z.infer`. `vehicleResponseSchema` extends `vehicleSchema` adding `id`, `status` (`DRAFT | PUBLISHED | PENDING`), and `createdAt`.

**Query keys** follow a factory pattern in `types/user.queries.ts` (`vehicleKeys.list()`, `vehicleKeys.detail(id)`) — always use these when calling `useQuery`/`invalidateQueries`, never raw strings.

**App.tsx** currently mixes React Query data (`useGetVehicles`) with local state (`localVehicles`) as an optimistic-update workaround — this is a known inconsistency that should be refactored to use the mutation's `onSuccess` invalidation pattern already present in `useCreateVehicle`.

**Backend:** expects a REST API at `http://localhost:8080/api/v1`. No environment variable abstraction exists yet for this base URL.
