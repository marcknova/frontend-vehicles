import * as z from "zod";
import {
  vehicleResponseSchema,
  vehicleSchema,
} from "../schemas/vehicle.schema";

export type CreateVehicleInput = z.infer<typeof vehicleSchema>;
export type Vehicle = z.infer<typeof vehicleResponseSchema>;
