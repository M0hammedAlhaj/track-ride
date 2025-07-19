"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Car, Eye, Edit, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { Vehicle } from "../../../types";
import { useNavigate } from "react-router-dom";
import EditVehicleForm from "./EditVehicleForm";
import { useDeleteVehicle } from "../hooks";

interface VehicleCardProps {
  vehicle: Vehicle;
  onVehicleUpdated?: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onVehicleUpdated }: VehicleCardProps) => {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { deleteVehicle, loading: deleteLoading, error: deleteError } = useDeleteVehicle();
  
  const handleViewDetails = () => {
    navigate(`/vehicles/${vehicle.id}`);
  }

  const handleEdit = () => {
    setIsEditOpen(true);
  }

  const handleDelete = async () => {
    if (!vehicle.id) return;
    
    try {
      await deleteVehicle(vehicle.id);
      setShowDeleteConfirm(false);
      if (onVehicleUpdated) {
        onVehicleUpdated();
      }
    } catch (err: any) {
      // Error is handled by the hook
    }
  }

  const handleVehicleUpdated = () => {
    if (onVehicleUpdated) {
      onVehicleUpdated();
    }
  }

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
        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <Alert className="bg-yellow-900/20 border-yellow-600 mb-4">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-300">
              <strong>تأكيد الحذف:</strong> هل أنت متأكد من حذف هذه المركبة؟ لا يمكن التراجع عن هذا الإجراء.
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {deleteLoading ? (
                    <>
                      <Loader2 className="ml-1 h-3 w-3 animate-spin" />
                      جاري الحذف...
                    </>
                  ) : (
                    'نعم، احذف المركبة'
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleteLoading}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  إلغاء
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {deleteError && (
          <Alert className="bg-red-900/20 border-red-600 mb-4">
            <AlertDescription className="text-red-300">
              <strong>خطأ:</strong> {deleteError}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => handleViewDetails()}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
          >
            <Eye className="w-4 h-4 ml-1" />
            تفاصيل
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleEdit}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 bg-transparent"
          >
            <Edit className="w-4 h-4 ml-1" />
            تعديل
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={deleteLoading || showDeleteConfirm}
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 bg-transparent"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Edit Vehicle Form */}
        <EditVehicleForm
          vehicle={vehicle}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onVehicleUpdated={handleVehicleUpdated}
        />
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
