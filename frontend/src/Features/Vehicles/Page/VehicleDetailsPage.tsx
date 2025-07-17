import { useParams } from "react-router-dom";
import React, { useMemo, useState } from "react";

const dummyVehicles = [
  {
    id: "1",
    name: "تويوتا كورولا",
    model: "كورولا",
    year: 2022,
    color: "أبيض",
    licensePlate: "1234 XYZ",
    lastService: "2024-12-01",
  },
];

export default function VehicleDetailsPage() {
  const { id } = useParams();
  const vehicle = dummyVehicles.find((v) => v.id === id);

  if (!vehicle) return <p>لم يتم العثور على المركبة</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto text-white" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">تفاصيل المركبة</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <p>الاسم: {vehicle.name}</p>
        <p>الموديل: {vehicle.model}</p>
        <p>السنة: {vehicle.year}</p>
        <p>اللون: {vehicle.color}</p>
        <p>آخر صيانة: {new Date(vehicle.lastService).toLocaleDateString("ar-SA")}</p>
      </div>
    </div>
  );
}
