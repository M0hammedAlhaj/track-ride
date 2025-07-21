import { useEffect, useState } from "react";
import { get_vehicles_with_pagination } from "../api"; 
import type { VehicleWithLastService } from "../types";

interface PaginatedVehiclesResponse {
  content: VehicleWithLastService[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-indexed)
  size: number;
  first: boolean;
  last: boolean;
}

export function useVehiclesPaginated() {
  const [vehicles, setVehicles] = useState<VehicleWithLastService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // 1-indexed for UI
  const [pageSize, setPageSize] = useState(20); // Changed to 20 cards per page
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchVehicles = async (page: number = currentPage, size: number = pageSize) => {
    try {
      setLoading(true);
      const response = await get_vehicles_with_pagination(page, size);
      
      console.log('API Response:', response.data); // Debug log
      
      // Handle the API response structure:
      // { data: Vehicle[], totalElements: number, totalPages: number, currentPage: number, size: number, message: string, first: boolean, last: boolean }
      const { data, totalElements, totalPages, currentPage: responsePage, size: responseSize, message, first, last } = response.data;
      
      // Check if data is wrapped in VehicleCollection or is a direct array
      let vehicleData;
      if (data && data.vehicles) {
        // If wrapped in VehicleCollection: { vehicles: Vehicle[] }
        vehicleData = data.vehicles;
      } else if (Array.isArray(data)) {
        // If data is direct array: Vehicle[]
        vehicleData = data;
      } else {
        vehicleData = [];
      }
      
      console.log('Vehicle Data:', vehicleData); // Debug log
      
      // Transform the vehicle data to match expected structure
      const transformedVehicles = vehicleData.map((vehicle: any) => ({ vehicle }));
      
      setVehicles(transformedVehicles);
      setTotalPages(totalPages || 1);
      setTotalElements(totalElements || 0);
      setCurrentPage(responsePage || page);
      setPageSize(responseSize || size);
      setError(null);
    } catch (err) {
      console.error('Error fetching vehicles:', err); // Debug log
      setError("حدث خطأ أثناء تحميل المركبات");
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchVehicles(page, pageSize);
    }
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    fetchVehicles(1, size); // Reset to first page when changing page size
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return { 
    vehicles, 
    loading, 
    error, 
    currentPage,
    pageSize,
    totalPages,
    totalElements,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    refetch: () => fetchVehicles(currentPage, pageSize)
  };
}
