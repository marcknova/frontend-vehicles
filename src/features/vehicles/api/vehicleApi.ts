import type { CreateVehicleInput, Vehicle } from "../types/vehicle.types";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch vehicles: ${response.status} - ${error}`);
  }
  return response.json();
}

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetch("http://localhost:8080/api/v1/vehicles");
  return handleResponse(response);
}

export async function getVehiclesById(id: string): Promise<Vehicle> {
  const response = await fetch(`http://localhost:8080/api/v1/vehicles/${id}`);
  return handleResponse(response);
}

export async function createVehicle(
  input: CreateVehicleInput,
): Promise<Vehicle> {
  const response = await fetch("http://localhost:8080/api/v1/vehicles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return handleResponse(response);
}
