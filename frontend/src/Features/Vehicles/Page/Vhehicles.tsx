"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Car } from "lucide-react";

import NavBar from "../../../Components/NavBar";
import VehicleCard from "../Components/VehicleCard";
import VehicleDetailsModal from "../Components/VehicleDetailsModal";
import VehicleHeader from "../Components/VehicleHeader";

import { useVehicles } from "../hooks/useVehicles";
import type { Vehicle, MaintenanceRecord } from "../../../types";

export default function Vehicles() {
  const { vehicles: apiVehicles, loading, error } = useVehicles();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract last service date (latest created) from maintenance records
  const getLastServiceDate = (records: MaintenanceRecord[] | null): string | null => {
    if (!records || records.length === 0) return null;
    const sorted = [...records].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
    return sorted[0].created;
  };

  // Transform API data into UI-friendly Vehicle[]
  const transformedVehicles: Vehicle[] = useMemo(() => {
    if (!apiVehicles || !Array.isArray(apiVehicles)) return [];
    return apiVehicles.map((item) => {
      const v = item.vehicle || item;
      return {
        id: v.id || "",
        name: v.name || "غير معروف",
        model: v.model || "",
        licensePlate: v.license || "",
        lastService: getLastServiceDate(v.maintenanceRecords),
        year: v.year,
        color: v.color,
      };
    });
  }, [apiVehicles]);

  // Filter by search term
  const filteredVehicles = transformedVehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // View details modal open
  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };


  // When you add a vehicle, you can call refetch() to update list

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" dir="rtl">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-15">
        {/* Header */}
        <VehicleHeader />

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="البحث بالاسم أو رقم اللوحة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/50 rounded-lg h-12"
            />
          </div>
        </div>

        {loading && <p className="text-gray-300 text-center">جارٍ التحميل...</p>}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && filteredVehicles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
              />
            ))}
          </div>
        )}

        {!loading && !error && filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">لا توجد مركبات</h3>
            <p className="text-gray-500">
              {searchTerm ? "لم يتم العثور على مركبات تطابق البحث" : "ابدأ بإضافة مركبة جديدة"}
            </p>
          </div>
        )}

        <div className="fixed bottom-6 left-6 z-50 md:hidden">
          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110"
            onClick={() => setIsModalOpen(true)}>
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>

    </div>
  );
}
