"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Eye, Edit, Trash2 } from "lucide-react";
import { Vehicle } from "../../../types";

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onViewDetails }) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 group">
      <CardHeader className="pb-4">
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <Car className="w-16 h-16 text-gray-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            {vehicle.name}
          </h3>
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-sm">{vehicle.model}</span>
            <span className="text-sm font-mono bg-gray-700/50 px-2 py-1 rounded">
              {vehicle.licensePlate}
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <span>
              آخر صيانة:{" "}
              {vehicle.lastService
                ? new Date(vehicle.lastService).toLocaleDateString("ar-SA")
                : "لا يوجد"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => onViewDetails(vehicle)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
          >
            <Eye className="w-4 h-4 ml-1" />
            تفاصيل
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 bg-transparent"
          >
            <Edit className="w-4 h-4 ml-1" />
            تعديل
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 bg-transparent"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
