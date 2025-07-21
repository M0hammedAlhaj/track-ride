import { maintenanceTypesService } from "../api";
import { useEffect, useState } from "react";

/**
 * Lightweight hook that provides just the translation function
 * without managing loading/error states. Perfect for components
 * that only need translation and not the full types list.
 */
export function useMaintenanceTypeTranslation() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize maintenance types if not already loaded
    const initializeTypes = async () => {
      try {
        await maintenanceTypesService.getMaintenanceTypes();
        setIsReady(true);
      } catch (error) {
        console.warn('Failed to load maintenance types for translation:', error);
        setIsReady(true); // Still set ready to allow fallback translations
      }
    };

    if (!maintenanceTypesService.isCached()) {
      initializeTypes();
    } else {
      setIsReady(true);
    }
  }, []);

  const getTypeInArabic = (type: string): string => {
    return maintenanceTypesService.getTypeInArabic(type);
  };

  return { getTypeInArabic, isReady };
}
