// features/vehicles/components/VehicleDetails.tsx
import { Link } from "@tanstack/react-router";
import { useGetVehicle } from "../hooks/useVehicles";
import { VehicleDetailsSkeleton } from "./VehicleDetailsSkeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Car,
  Calendar,
  DollarSign,
  Hash,
  Clock,
  Edit,
  Trash2,
  MapPin,
  Fuel,
  Gauge,
  Cog,
  FileText,
} from "lucide-react";

interface VehicleDetailsProps {
  vehicleId: string;
}

export function VehicleDetails({ vehicleId }: VehicleDetailsProps) {
  const { data: vehicle, isLoading, error } = useGetVehicle({ vehicleId });

  const getStatusBadge = (status: string) => {
    const config = {
      DRAFT: {
        variant: "outline" as const,
        label: "Draft",
        className: "border-amber-500 text-amber-600",
      },
      PENDING: {
        variant: "secondary" as const,
        label: "Pending",
        className: "bg-orange-100 text-orange-700",
      },
      PUBLISHED: {
        variant: "default" as const,
        label: "Published",
        className: "bg-green-100 text-green-700",
      },
    };
    return config[status as keyof typeof config] || config.DRAFT;
  };

  if (isLoading) return <VehicleDetailsSkeleton />;

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <Card className="bg-destructive/10 border-destructive w-full">
          <CardContent className="pt-6">
            <p className="text-destructive text-center w-full">
              Error loading vehicle: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <Card className="w-full">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center w-full">
              Vehicle not found
            </p>
            <div className="flex justify-center mt-4">
              <Link to="/vehicles">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Vehicle List
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusConfig = getStatusBadge(vehicle.status);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="w-full mb-6">
        <Link to="/vehicles" className="inline-block">
          <Button
            variant="ghost"
            className="gap-2 pl-0 hover:pl-2 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicle List
          </Button>
        </Link>
      </div>

      <Card className="shadow-lg w-full">
        <CardHeader className="space-y-4 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
            <div className="space-y-2 flex-1 min-w-0">
              <CardTitle className="text-2xl md:text-3xl font-bold wrap-break-words">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Hash className="w-3 h-3 shrink-0" />
                <span className="break-all">{vehicle.id}</span>
              </CardDescription>
            </div>
            <Badge
              variant={statusConfig.variant}
              className={`${statusConfig.className} text-sm px-3 py-1 shrink-0`}
            >
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 w-full">
          <div className="bg-primary/5 rounded-lg p-6 w-full">
            <div className="flex items-center gap-3 w-full">
              <DollarSign className="w-8 h-8 text-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-2xl md:text-4xl font-bold text-primary wrap-break-words">
                  ${vehicle.price.toLocaleString()} USD
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="space-y-3 w-full">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Car className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">Make & Model</span>
              </div>
              <p className="text-lg font-semibold wrap-break-words">
                {vehicle.make} {vehicle.model}
              </p>
            </div>

            <div className="space-y-3 w-full">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">Year</span>
              </div>
              <p className="text-lg font-semibold wrap-break-words">
                {vehicle.year}
              </p>
            </div>

            <div className="space-y-3 w-full">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Fuel className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">Fuel Type</span>
              </div>
              <p className="text-lg font-semibold wrap-break-words">Gasoline</p>
            </div>

            <div className="space-y-3 w-full">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">Mileage</span>
              </div>
              <p className="text-lg font-semibold wrap-break-words">0 km</p>
            </div>

            <div className="space-y-3 w-full">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Cog className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">Transmission</span>
              </div>
              <p className="text-lg font-semibold wrap-break-words">
                Automatic
              </p>
            </div>

            <div className="space-y-3 w-full">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="text-lg font-semibold wrap-break-words">
                Mexico City
              </p>
            </div>
          </div>

          <Separator className="w-full" />

          <div className="space-y-3 w-full">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
              Description
            </h3>
            <div className="bg-muted/30 rounded-lg p-4 overflow-hidden">
              <p className="text-muted-foreground leading-relaxed wrap-break-words">
                {vehicle.description ||
                  "No description provided for this vehicle."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-muted-foreground bg-muted/20 rounded-lg p-4 w-full">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 shrink-0" />
              <span>
                Created: {new Date(vehicle.createdAt).toLocaleDateString()}
              </span>
            </div>
            {vehicle.updatedAt && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />
                <span>
                  Updated: {new Date(vehicle.updatedAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full">
            <Button variant="default" className="gap-2 flex-1 sm:flex-none">
              <Edit className="w-4 h-4" />
              Edit Vehicle
            </Button>
            <Button variant="destructive" className="gap-2 flex-1 sm:flex-none">
              <Trash2 className="w-4 h-4" />
              Delete Vehicle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
