import { createFileRoute, Link } from "@tanstack/react-router";
import { VehicleList } from "../../features/vehicles/components/VehicleList";
import { vehiclesQueryOptions } from "../../features/vehicles/hooks/useVehicles";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const Route = createFileRoute("/vehicles/")({
  loader: ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(vehiclesQueryOptions());
  },
  component: () => (
    <div className="space-y-6">
      <VehicleList />

      <Link to="/vehicles/new">
        <Button className="gap-2 w-full sm:w-auto">
          <PlusCircle className="w-4 h-4" />
          Add New Vehicle
        </Button>
      </Link>
    </div>
  ),
});
