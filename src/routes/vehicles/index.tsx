import { createFileRoute, Link } from "@tanstack/react-router";
import { VehicleList } from "../../features/vehicles/components/VehicleList";
import { vehiclesQueryOptions } from "../../features/vehicles/hooks/useVehicles";

export const Route = createFileRoute("/vehicles/")({
  loader: ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(vehiclesQueryOptions());
  },
  component: () => (
    <>
      <VehicleList />
      <Link to="/vehicles/new">Add New Vehicle</Link>
    </>
  ),
});
