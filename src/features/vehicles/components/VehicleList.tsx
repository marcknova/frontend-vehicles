import { Link } from "@tanstack/react-router";
import { useGetVehicles } from "../hooks/useVehicles";
import type { Vehicle } from "../types/vehicle.types";

export function VehicleList() {
  const { data: vehicles, isLoading, error } = useGetVehicles();

  if (isLoading) return <div>Loading vehicles...</div>;
  if (error) return <div className="error">❌ {error.message}</div>;
  if (vehicles?.length === 0)
    return <div>No vehicles found. Add your first vehicle!</div>;

  return (
    <div>
      <h2>Vehicle List</h2>
      {vehicles?.map((v: Vehicle) => (
        <div key={v.id} className="cardContainer">
          <Link to={`/vehicles/${v.id}`}>
            <strong>
              {v.year} {v.make} {v.model}
            </strong>
          </Link>
          <p>
            ${v.price.toLocaleString()} — {v.status}
          </p>
        </div>
      ))}
    </div>
  );
}
