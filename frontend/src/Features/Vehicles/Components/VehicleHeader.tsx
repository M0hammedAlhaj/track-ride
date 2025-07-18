import { Button } from "@/components/ui/button";
import { Plus, Car, Calendar, Hash, Palette, Loader2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAssignVehicle } from "../hooks/useAssignVehicle";
import type { VehicleSavePayload } from "../types";

interface VehicleHeaderProps {
  onVehicleAdded?: () => void;
}

export default function VehicleHeader({ onVehicleAdded }: VehicleHeaderProps) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignVehicle(vehicle);
      console.log("Vehicle Data:", vehicle);
      setOpen(false); // Close modal
      setVehicle({ name: "", model: "", year: "", license: "", color: "" }); // Reset form
      
      // Call the callback to refresh the vehicle list
      if (onVehicleAdded) {
        onVehicleAdded();
      }
      
    } catch (err) {
      console.error("Error adding vehicle:", err);
    }
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
        <DialogContent className="sm:max-w-[500px] bg-gray-800 border-gray-700 text-white" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
              <Car className="h-5 w-5 text-emerald-400" />
              إضافة مركبة جديدة
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              أدخل تفاصيل المركبة الجديدة لإضافتها إلى قائمة مركباتك
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Vehicle Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Car className="h-4 w-4 text-emerald-400" />
                اسم المركبة
              </Label>
              <Input
                id="name"
                placeholder="أدخل اسم المركبة (مثل: سيارتي الشخصية)"
                name="name"
                value={vehicle.name}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Model */}
            <div className="space-y-2">
              <Label htmlFor="model" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Hash className="h-4 w-4 text-emerald-400" />
                الموديل
              </Label>
              <Input
                id="model"
                placeholder="أدخل موديل المركبة (مثل: تويوتا كامري)"
                name="model"
                value={vehicle.model}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-400" />
                سنة الصنع
              </Label>
              <Input
                id="year"
                placeholder="أدخل سنة الصنع (مثل: 2020)"
                type="number"
                name="year"
                value={vehicle.year}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500"
                min="1900"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>

            {/* License Plate */}
            <div className="space-y-2">
              <Label htmlFor="license" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Hash className="h-4 w-4 text-emerald-400" />
                رقم اللوحة
              </Label>
              <Input
                id="license"
                placeholder="أدخل رقم اللوحة (مثل: أ ب ج 123)"
                name="license"
                value={vehicle.license}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label htmlFor="color" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Palette className="h-4 w-4 text-emerald-400" />
                اللون
              </Label>
              <Input
                id="color"
                placeholder="أدخل لون المركبة (مثل: أبيض، أسود، فضي)"
                name="color"
                value={vehicle.color}
                onChange={handleInputChange}
                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-600 rounded-md text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  'حفظ المركبة'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                disabled={loading}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
