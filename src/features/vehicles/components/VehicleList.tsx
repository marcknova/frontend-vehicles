import { useGetVehicles } from "../hooks/useVehicles";
import type { Vehicle } from "../types/vehicle.types";

import VehicleCard from "./VehicleCard";
import SkeletonCard from "./SkeletonCard";

export function VehicleList() {
  const { data: vehicles, isLoading, error } = useGetVehicles();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  if (error) return <div className="error">❌ {error.message}</div>;
  if (vehicles?.length === 0)
    return <div>No vehicles found. Add your first vehicle!</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles?.map((vehicle: Vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
