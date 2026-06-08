import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: () => (
    <>
      <h1>Hello</h1>
    </>
  ),
});
