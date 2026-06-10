// VehicleCard.tsx - Componente hijo
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Car, Calendar, DollarSign, Eye, MapPin } from "lucide-react";
import type { Vehicle } from "../types/vehicle.types";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const getStatusBadge = (status: string) => {
    const config = {
      DRAFT: {
        variant: "outline" as const,
        label: "Borrador",
        className: "border-amber-500 text-amber-600",
      },
      PENDING: {
        variant: "secondary" as const,
        label: "Pendiente",
        className: "bg-orange-100 text-orange-700",
      },
      PUBLISHED: {
        variant: "default" as const,
        label: "Publicado",
        className: "bg-green-100 text-green-700",
      },
    };
    return config[status as keyof typeof config] || config.DRAFT;
  };

  const statusConfig = getStatusBadge(vehicle.status);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border bg-background h-full flex flex-col">
      <CardHeader className="pb-3 relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold">
              {vehicle.make} {vehicle.model}
            </CardTitle>
          </div>
          <Badge
            variant={statusConfig.variant}
            className={statusConfig.className}
          >
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>CDMX</span>
            </div>
          </div>
        </div>

        {vehicle.description ? (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {vehicle.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Sin descripción disponible
          </p>
        )}

        <div className="pt-2 border-t border-border">
          <div className="flex items-baseline gap-1">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-3xl font-bold text-primary">
              {vehicle.price.toLocaleString()}
            </span>
            <span className="text-muted-foreground">USD</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Link to={`/vehicles/${vehicle.id}`} className="w-full">
          <Button variant="default" className="w-full gap-2 group/btn">
            <Eye className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            Ver detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
