import * as z from "zod";

export const vehicleSchema = z.object({
  make: z
    .string()
    .min(2, "La marca debe tener al menos 2 caracteres")
    .max(100, "La marca no puede exceder 100 caracteres"),
  model: z
    .string()
    .min(2, "El modelo debe tener al menos 2 caracteres")
    .max(100, "El modelo no puede exceder 100 caracteres"),
  year: z
    .number()
    .int("El año debe ser un número entero")
    .min(1900, "El año debe ser mayor o igual a 1900")
    .max(2030, "El año debe ser menor o igual a 2030"),
  price: z
    .number()
    .positive("El precio debe ser un número positivo")
    .multipleOf(0.01, "El precio puede tener máximo 2 decimales"),
  description: z
    .string()
    .max(500, "La descripción no puede exceder 500 caracteres")
    .optional()
    .nullable(),
});

export const vehicleResponseSchema = vehicleSchema.extend({
  id: z.string().uuid("ID inválido"),
  status: z.enum(["DRAFT", "PUBLISHED", "PENDING"]),
  createdAt: z.string(),
});
