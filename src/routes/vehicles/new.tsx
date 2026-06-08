import { createFileRoute, Link } from "@tanstack/react-router";
import VehicleForm from "../../features/vehicles/components/VehicleForm";

export const Route = createFileRoute("/vehicles/new")({
  component: () => (
    <>
      <Link
        to="/vehicles"
        className="mt-4 inline-block rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
      >
        ← Back to Vehicle List
      </Link>
      <h1>Add New Vehicle</h1>
      <p>Use the form below to add a new vehicle to your inventory.</p>
      <VehicleForm />
    </>
  ),
});
