import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAssignVehicle } from "../hooks/useAssignVehicle";
import type { VehicleSavePayload } from "../types";
export default function VehicleHeader() {
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState<VehicleSavePayload>({
    name: "",
    model: "",
    year: "",
    license: "",
    color: ""
  });
  const {error, loading, assignVehicle} = useAssignVehicle();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call your hook or API
    assignVehicle(vehicle);
    console.log("Vehicle Data:", vehicle);
    setOpen(false); // Close modal
    setVehicle({ name: "", model: "", year: "", license: "", color: "" }); // Reset form
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
            مركباتي
          </h1>
          <p className="text-gray-400">إدارة وتتبع جميع مركباتك في مكان واحد</p>
        </div>

        <Button
          size="lg"
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
          onClick={() => setOpen(true)}
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة مركبة جديدة
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>إضافة مركبة جديدة</DialogTitle>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              placeholder="اسم المركبة"
              name="name"
              value={vehicle.name}
              onChange={handleInputChange}
            />
            <Input
              placeholder="الموديل"
              name="model"
              value={vehicle.model}
              onChange={handleInputChange}
            />
            <Input
              placeholder="السنة"
              type="number"
              name="year"
              value={vehicle.year}
              onChange={handleInputChange}
            />
            <Input
              placeholder="رقم اللوحة"
              name="license"
              value={vehicle.license}
              onChange={handleInputChange}
            />
            <Input
              placeholder="اللون"
              name="color"
              value={vehicle.color}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={loading}
            >
              {loading ? "جاري الحفظ..." : "حفظ المركبة"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
