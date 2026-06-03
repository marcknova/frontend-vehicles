export const vehicleKeys = {
  all: ["vehicles"] as const,

  lists: () => [...vehicleKeys.all, "list"] as const,
  list: (filters?: string) => [...vehicleKeys.lists(), { filters }] as const,

  details: () => [...vehicleKeys.all, "detail"] as const,
  detail: (id: string) => [...vehicleKeys.details(), id] as const,
};
