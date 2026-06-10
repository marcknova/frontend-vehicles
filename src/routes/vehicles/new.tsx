import { createFileRoute, Link } from "@tanstack/react-router";
import VehicleForm from "../../features/vehicles/components/VehicleForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/vehicles/new")({
  component: () => (
    <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <Link to="/vehicles" className="inline-block mb-6">
        <Button
          variant="ghost"
          className="gap-2 pl-0 hover:pl-2 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vehicle List
        </Button>
      </Link>

      <Card className="shadow-lg border-border">
        <CardHeader className="border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PlusCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Add New Vehicle
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Use the form below to add a new vehicle to your inventory
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <VehicleForm />
        </CardContent>
      </Card>
    </div>
  ),
});
