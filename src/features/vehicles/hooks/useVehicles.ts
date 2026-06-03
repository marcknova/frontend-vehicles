import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createVehicle, getVehicles, getVehiclesById } from "../api/vehicleApi";
import { vehicleKeys } from "../types/user.queries";

export function useGetVehicles() {
  return useQuery({
    queryKey: vehicleKeys.list(),
    queryFn: getVehicles,
    staleTime: 1000 * 30, // 30 seconds, can be adjusted based on how often vehicle data changes
  });
}

export function useGetVehicle(vehicleId: string) {
  return useQuery({
    queryKey: vehicleKeys.detail(vehicleId),
    queryFn: () => getVehiclesById(vehicleId),
    staleTime: 1000 * 30, // 30 seconds, can be adjusted based on how often vehicle data changes
    enabled: !!vehicleId, // Only run this query if vehicleId is provided
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.list() }); // Invalidate the list query to refetch the updated list of vehicles
    },
    onError: (error) => {
      console.error("Error creating vehicle:", error);
    },
  });
  return mutation;
}
