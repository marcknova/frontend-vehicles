import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateVehicleInput, Vehicle } from "../types/vehicle.types";
import { vehicleSchema } from "../schemas/vehicle.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "react-hot-toast";
import { useCreateVehicle } from "../hooks/useVehicles";

export default function VehicleForm({
  onSuccess,
}: {
  onSuccess?: (newVehicle: Vehicle) => void | Promise<void>;
}) {
  const createVehicleMutation = useCreateVehicle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateVehicleInput>({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit: SubmitHandler<CreateVehicleInput> = async (data) => {
    createVehicleMutation.mutate(data, {
      onSuccess: (newVehicle) => {
        toast.success("Vehicle added successfully!");
        reset();
        onSuccess?.(newVehicle);
      },
      onError: (error) => {
        console.error("Error adding vehicle:", error);
        toast.error("Failed to add vehicle. Please try again.");
      },
    });
  };

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="make">Make:</label>
          <input id="make" {...register("make")} />
          {errors.make && <p>{errors.make.message}</p>}
        </div>
        <div>
          <label htmlFor="model">Model:</label>
          <input id="model" {...register("model")} />
          {errors.model && <p>{errors.model.message}</p>}
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            id="year"
            type="number"
            {...register("year", { valueAsNumber: true })}
          />
          {errors.year && <p>{errors.year.message}</p>}
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" {...register("description")} />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
}
