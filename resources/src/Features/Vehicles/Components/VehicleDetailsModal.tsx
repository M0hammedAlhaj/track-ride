"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Car, Wrench, Plus } from "lucide-react";
import { Vehicle } from "../../../types";
import React from "react";

interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  mileage: number;
  status: "completed" | "pending" | "cancelled";
}

// Dummy Maintenance History
const dummyMaintenanceHistory: MaintenanceRecord[] = [
  { id: "1", date: "2024-12-01", type: "تغيير الزيت", description: "تغيير زيت المحرك", cost: 150, mileage: 15000, status: "completed" },
  { id: "2", date: "2024-10-15", type: "فحص الفرامل", description: "فحص نظام الفرامل", cost: 200, mileage: 14500, status: "completed" },
  { id: "3", date: "2024-08-20", type: "تغيير الإطارات", description: "تركيب إطارات جديدة", cost: 800, mileage: 13000, status: "completed" },
  { id: "4", date: "2024-12-20", type: "صيانة دورية", description: "فحص شامل", cost: 300, mileage: 15200, status: "pending" },
];

export default function VehicleDetailsModal({
  vehicle,
  isOpen,
  onClose,
}: {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!vehicle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700 text-white" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            تفاصيل المركبة
          </DialogTitle>
        </DialogHeader>

        {/* Vehicle Info Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vehicle Image */}
            <div className="relative w-full h-64 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Car className="w-24 h-24 text-gray-500" />
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{vehicle.name}</h3>
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="الموديل" value={vehicle.model} />
                <DetailItem label="السنة" value={vehicle.year} />
                <DetailItem label="اللون" value={vehicle.color} />
                <DetailItem label="رقم اللوحة" value={vehicle.licensePlate} />
                <DetailItem label="آخر صيانة" value={new Date(vehicle.lastService).toLocaleDateString("ar-SA")} />
              </div>
            </div>
          </div>

          {/* Maintenance History Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-white flex items-center">
                <Wrench className="w-6 h-6 ml-2 text-emerald-400" />
                تاريخ الصيانة
              </h4>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 ml-1" />
                إضافة صيانة جديدة
              </Button>
            </div>
            <MaintenanceTable records={dummyMaintenanceHistory} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-700/50 p-4 rounded-lg">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}

function MaintenanceTable({ records }: { records: MaintenanceRecord[] }) {
  return (
    <div className="bg-gray-700/30 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-600 hover:bg-gray-700/50">
            <TableHead className="text-gray-300">التاريخ</TableHead>
            <TableHead className="text-gray-300">نوع الصيانة</TableHead>
            <TableHead className="text-gray-300">الوصف</TableHead>
            <TableHead className="text-gray-300">التكلفة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id} className="border-gray-600 hover:bg-gray-700/30">
              <TableCell className="text-white">{new Date(record.date).toLocaleDateString("ar-SA")}</TableCell>
              <TableCell className="text-white font-medium">{record.type}</TableCell>
              <TableCell className="text-gray-300">{record.description}</TableCell>
              <TableCell className="text-emerald-400 font-semibold">{record.cost} ر.س</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
