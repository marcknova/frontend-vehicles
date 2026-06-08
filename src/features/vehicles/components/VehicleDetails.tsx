import { Link } from "@tanstack/react-router";
import { useGetVehicle } from "../hooks/useVehicles";

export function VehicleDetails({ vehicleId }: { vehicleId: string }) {
  const { data: vehicle, isLoading, error } = useGetVehicle({ vehicleId });

  if (isLoading) return <div>Cargando vehículo...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!vehicle) return <div>Vehículo no encontrado</div>;

  return (
    <div>
      <Link to="/vehicles">← Volver a la lista de vehículos</Link>
      <h2>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </h2>
      <p>
        <strong>Precio:</strong> ${vehicle.price.toLocaleString()}
      </p>
      <p>
        <strong>Estado:</strong> {vehicle.status}
      </p>
      <p>
        <strong>Descripción:</strong> {vehicle.description || "Sin descripción"}
      </p>
      <p>
        <strong>ID:</strong> {vehicle.id}
      </p>
      <p>
        <strong>Creado:</strong>{" "}
        {new Date(vehicle.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
