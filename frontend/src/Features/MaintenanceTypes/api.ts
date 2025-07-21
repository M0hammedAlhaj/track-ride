import { axiosWithAuth } from "../../Service/axiosInstance";

export interface MaintenanceType {
  id: string;
  name: string;
  nameAr?: string;
  description?: string;
}

// Global cache for maintenance types (similar to auth pattern)
class MaintenanceTypesService {
  private static instance: MaintenanceTypesService;
  private cache: MaintenanceType[] | null = null;
  private typeMap: { [key: string]: string } = {};
  private loading: boolean = false;
  private loadPromise: Promise<MaintenanceType[]> | null = null;

  // Static fallback mapping for when API data is not available
  private static fallbackTypeMap: { [key: string]: string } = {
    'OIL_CHANGE': 'تغيير الزيت',
    'BRAKE_CHECK': 'فحص الفرامل',
    'BRAKE_INSPECTION': 'فحص الفرامل',
    'TIRE_ROTATION': 'تغيير الإطارات',
    'ENGINE_CHECK': 'فحص المحرك',
    'PERIODIC_MAINTENANCE': 'صيانة دورية',
    'GENERAL_INSPECTION': 'فحص عام',
    'GENERAL_MAINTENANCE': 'صيانة عامة',
    'AIR_FILTER': 'تغيير فلتر الهواء',
    'TRANSMISSION': 'صيانة ناقل الحركة',
    'TRANSMISSION_SERVICE': 'صيانة ناقل الحركة',
    'COOLING_SYSTEM': 'صيانة نظام التبريد',
    'ELECTRICAL': 'صيانة كهربائية',
    'BATTERY_CHECK': 'فحص البطارية',
    'SUSPENSION': 'صيانة نظام التعليق',
    'EXHAUST_SYSTEM': 'صيانة نظام العادم',
    'FUEL_SYSTEM': 'صيانة نظام الوقود',
    'CLUTCH_SERVICE': 'صيانة الكلتش',
    'STEERING_CHECK': 'فحص المقود',
    'LIGHTS_CHECK': 'فحص الأضواء'
  };

  private constructor() {}

  static getInstance(): MaintenanceTypesService {
    if (!MaintenanceTypesService.instance) {
      MaintenanceTypesService.instance = new MaintenanceTypesService();
    }
    return MaintenanceTypesService.instance;
  }

  async getMaintenanceTypes(): Promise<MaintenanceType[]> {
    // Return cached data if available
    if (this.cache) {
      return this.cache;
    }

    // If already loading, return the same promise
    if (this.loading && this.loadPromise) {
      return this.loadPromise;
    }

    // Start loading
    this.loading = true;
    this.loadPromise = this.fetchFromAPI();

    try {
      const types = await this.loadPromise;
      this.cache = types;
      this.buildTypeMap(types);
      return types;
    } finally {
      this.loading = false;
      this.loadPromise = null;
    }
  }

  private async fetchFromAPI(): Promise<MaintenanceType[]> {
    try {
      const response = await axiosWithAuth.get('/maintenance-records/types');
      return response.data.data || response.data || [];
    } catch (error) {
      console.error('Error fetching maintenance types:', error);
      return [];
    }
  }

  private buildTypeMap(types: MaintenanceType[]): void {
    this.typeMap = {};
    types.forEach((type) => {
      if (type.nameAr) {
        this.typeMap[type.name] = type.nameAr;
      }
    });
  }

  getTypeInArabic(type: string): string {
    // First try API data if available
    if (this.typeMap[type]) {
      return this.typeMap[type];
    }
    // Fall back to static mapping
    return MaintenanceTypesService.fallbackTypeMap[type] || type;
  }

  // Method to clear cache (useful for refreshing data)
  clearCache(): void {
    this.cache = null;
    this.typeMap = {};
  }

  // Method to check if data is cached
  isCached(): boolean {
    return this.cache !== null;
  }
}

// Export singleton instance
export const maintenanceTypesService = MaintenanceTypesService.getInstance();

// Initialize maintenance types (call this when app starts, similar to auth)
export async function initializeMaintenanceTypes(): Promise<void> {
  try {
    await maintenanceTypesService.getMaintenanceTypes();
    console.log('Maintenance types initialized successfully');
  } catch (error) {
    console.error('Failed to initialize maintenance types:', error);
  }
}

// Convenience functions for backward compatibility
export async function getMaintenanceTypes(): Promise<{ data: MaintenanceType[] }> {
  const types = await maintenanceTypesService.getMaintenanceTypes();
  return { data: types };
}

export function getMaintenanceTypeInArabic(type: string): string {
  return maintenanceTypesService.getTypeInArabic(type);
}
