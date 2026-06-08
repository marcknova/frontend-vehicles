import "./App.css";
import { VehicleList } from "./features/vehicles/components/VehicleList";
import VehicleForm from "./features/vehicles/components/VehicleForm";
import { useGetVehicles } from "./features/vehicles/hooks/useVehicles";

function App() {
  const { data: vehicles, isLoading, error } = useGetVehicles();

  if (isLoading) return <div>Loading vehicles...</div>;
  if (error) return <div className="error">❌ {error.message}</div>;
  if (vehicles?.length === 0)
    return <div>No vehicles found. Add your first vehicle!</div>;

  return (
    <div className="title">
      <h1>Welcome to AutoMarket Pro</h1>
      <p>Your one-stop solution for buying and selling vehicles.</p>

      <VehicleList />
      <VehicleForm />
    </div>
  );
}

export default App;
