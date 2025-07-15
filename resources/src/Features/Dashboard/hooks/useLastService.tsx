import { useState, useEffect } from "react";
import { last_service } from "../api";

type Car = {
  carName: string;
  lastService: string;
  lastServiceDate: string;
  nextServiceInfo: string;
};

type UseLastServiceResult = {
  cars: Car[];
  loading: boolean;
  error: string | null;
};

export function useLastService(): UseLastServiceResult {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await last_service();
        const data = res.data.maintenanceRecords.maintenanceRecordResources;

        function formatDate(dateString: string): string {
          const date = new Date(dateString);
          return date.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }

        function mapType(type: string): string {
          switch (type.toUpperCase()) {
            case "OIL_CHANGE":
              return "تغيير الزيت";
            case "TIRE_ROTATION":
              return "تدوير الإطارات";
            case "BRAKE_INSPECTION":
              return "فحص الفرامل";
            default:
              return "خدمة أخرى";
          }
        }

        const mappedCars = data.map((record: any) => ({
          carName: `${record.vehicleResources.model} - ${record.vehicleResources.license}`,
          lastService: mapType(record.type),
          lastServiceDate: formatDate(record.created),
          nextServiceInfo: `تذكير في ${formatDate(record.reminderDate)}`,
        }));

        setCars(mappedCars);
      } catch (err) {
        setError("تعذر تحميل بيانات الصيانة");
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return { cars, loading, error };
}
