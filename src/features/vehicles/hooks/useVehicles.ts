import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createVehicle, getVehicles, getVehiclesById } from "../api/vehicleApi";
import { vehicleKeys } from "../types/user.queries";
import { useNavigate } from "@tanstack/react-router";

export const vehiclesQueryOptions = () =>
  queryOptions({
    queryKey: vehicleKeys.list(),
    queryFn: getVehicles,
    staleTime: 1000 * 30,
  });

export function useGetVehicles() {
  return useQuery(vehiclesQueryOptions());
}

export const vehicleDetailQueryOptions = (vehicleId: string) =>
  queryOptions({
    queryKey: vehicleKeys.detail(vehicleId),
    queryFn: () => getVehiclesById(vehicleId),
    staleTime: 1000 * 30,
  });

export function useGetVehicle({ vehicleId }: { vehicleId: string }) {
  return useQuery(vehicleDetailQueryOptions(vehicleId));
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: vehicleKeys.list() }); // Invalidate the list query to refetch the updated list of vehicles
      navigate({ to: "/vehicles" });
    },
    onError: (error) => {
      console.error("Error creating vehicle:", error);
    },
  });
  return mutation;
}
