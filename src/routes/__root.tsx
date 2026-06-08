import { createRootRouteWithContext } from "@tanstack/react-router";
import { RootComponent } from "../components/RootComponent";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
});
