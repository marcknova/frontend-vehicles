import { useState } from "react";
import "./App.css";
import { VehicleList } from "./features/vehicles/components/VehicleList";
import VehicleForm from "./features/vehicles/components/VehicleForm";
import type { Vehicle } from "./features/vehicles/types/vehicle.types";
import { getVehicles } from "./features/vehicles/api/vehicleApi";
import { toast } from "react-hot-toast";
import { useGetVehicles } from "./features/vehicles/hooks/useVehicles";

function App() {
  const { data: vehicles, isLoading, error } = useGetVehicles();
  const [localVehicles, setLocalVehicles] = useState<Vehicle[]>(vehicles || []);

  const handleVehicleCreated = (newVehicle: Vehicle) => {
    setLocalVehicles((prev: Vehicle[]) => [...prev, newVehicle]);

    getVehicles()
      .then(setLocalVehicles)
      .catch(() => {
        setLocalVehicles((prev: Vehicle[]) =>
          prev.filter((v: Vehicle) => v.id !== newVehicle.id),
        );
        toast.error("Error al guardar, intenta de nuevo");
      });
  };

  if (isLoading) return <div>Loading vehicles...</div>;
  if (error) return <div className="error">❌ {error.message}</div>;
  if (localVehicles.length === 0)
    return <div>No vehicles found. Add your first vehicle!</div>;

  return (
    <div className="title">
      <h1>Welcome to AutoMarket Pro</h1>
      <p>Your one-stop solution for buying and selling vehicles.</p>

      <VehicleList vehicles={localVehicles} />
      <VehicleForm onSuccess={handleVehicleCreated} />
    </div>
  );
}

export default App;
