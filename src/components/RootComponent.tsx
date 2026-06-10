// components/RootComponent.tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppShell from "./layout/AppShell";
import { ThemeProvider } from "./theme-provider";

export function RootComponent() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppShell>
        <Outlet />
      </AppShell>

      {/* DevTools - solo se renderizan una vez */}
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}
