// Main API and service exports
export {
  maintenanceTypesService,
  initializeMaintenanceTypes,
  getMaintenanceTypes,
  getMaintenanceTypeInArabic,
  type MaintenanceType
} from './api';

// Hook exports
export { useMaintenanceTypes } from './hooks/useMaintenanceTypes';
export { useMaintenanceTypeTranslation } from './hooks/useMaintenanceTypeTranslation';
