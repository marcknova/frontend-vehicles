import { createFileRoute } from "@tanstack/react-router";
import { VehicleDetails } from "../../features/vehicles/components/VehicleDetails";
import { vehicleDetailQueryOptions } from "../../features/vehicles/hooks/useVehicles";

export const Route = createFileRoute("/vehicles/$vehicleId")({
  loader: ({ context, params }) => {
    const { queryClient } = context;
    const { vehicleId } = params;
    return queryClient.ensureQueryData(vehicleDetailQueryOptions(vehicleId));
  },
  component: function VehicleDetailsRoute() {
    const { vehicleId } = Route.useParams();

    return <VehicleDetails vehicleId={vehicleId} />;
  },
});
