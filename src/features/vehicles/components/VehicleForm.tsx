import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateVehicleInput } from "../types/vehicle.types";
import { vehicleSchema } from "../schemas/vehicle.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "react-hot-toast";
import { useCreateVehicle } from "../hooks/useVehicles";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, DollarSign, Calendar, FileText, Send } from "lucide-react";

export default function VehicleForm() {
  const createVehicleMutation = useCreateVehicle();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateVehicleInput>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      status: "DRAFT",
    },
  });

  const onSubmit: SubmitHandler<CreateVehicleInput> = async (data) => {
    createVehicleMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Vehicle added successfully!");
        reset();
      },
      onError: (error) => {
        console.error("Error adding vehicle:", error);
        toast.error("Failed to add vehicle. Please try again.");
      },
    });
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="make" className="flex items-center gap-2">
              <Car className="w-4 h-4 text-muted-foreground" />
              Make <span className="text-destructive">*</span>
            </Label>
            <Input
              id="make"
              placeholder="Ej. Toyota, Honda, Ford"
              {...register("make")}
              className={errors.make ? "border-destructive" : ""}
            />
            {errors.make && (
              <p className="text-sm text-destructive">{errors.make.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="model" className="flex items-center gap-2">
              <Car className="w-4 h-4 text-muted-foreground" />
              Model <span className="text-destructive">*</span>
            </Label>
            <Input
              id="model"
              placeholder="Ej. Camry, Civic, F-150"
              {...register("model")}
              className={errors.model ? "border-destructive" : ""}
            />
            {errors.model && (
              <p className="text-sm text-destructive">{errors.model.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="year" className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              Year <span className="text-destructive">*</span>
            </Label>
            <Input
              id="year"
              type="number"
              placeholder="Ej. 2024"
              {...register("year", { valueAsNumber: true })}
              className={errors.year ? "border-destructive" : ""}
            />
            {errors.year && (
              <p className="text-sm text-destructive">{errors.year.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              Price (USD) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="Ej. 25000"
              {...register("price", { valueAsNumber: true })}
              className={errors.price ? "border-destructive" : ""}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the vehicle's condition, features, history..."
            rows={4}
            {...register("description")}
            className={errors.description ? "border-destructive" : ""}
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Optional - Max 500 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            onValueChange={(value) => setValue("status", value as any)}
            defaultValue={watch("status")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft - Save for later</SelectItem>
              <SelectItem value="PENDING">Pending - Under review</SelectItem>
              <SelectItem value="PUBLISHED">
                Published - Visible to buyers
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Draft saves the vehicle without publishing it to the public
          </p>
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto gap-2"
            size="lg"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Adding Vehicle..." : "Add Vehicle"}
          </Button>
        </div>
      </form>
    </>
  );
}
