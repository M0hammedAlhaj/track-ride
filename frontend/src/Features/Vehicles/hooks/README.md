# Vehicle Management Hooks

This directory contains custom React hooks for managing vehicle-related operations in the Track Ride application.

## Available Hooks

### 1. `useVehicles()`
Fetches and manages the list of all vehicles for the current user.

```tsx
import { useVehicles } from '../hooks'

const MyComponent = () => {
  const { vehicles, loading, error, refetch } = useVehicles()
  
  return (
    <div>
      {loading && <p>Loading vehicles...</p>}
      {error && <p>Error: {error}</p>}
      {vehicles.map(vehicle => (
        <div key={vehicle.vehicle.id}>{vehicle.vehicle.name}</div>
      ))}
    </div>
  )
}
```

**Returns:**
- `vehicles`: `VehicleWithLastService[]` - Array of vehicles with their last service information
- `loading`: `boolean` - Loading state
- `error`: `string | null` - Error message if any
- `refetch`: `() => Promise<void>` - Function to refresh the vehicle list

---

### 2. `useVehicleById(id: string)`
Fetches detailed information for a specific vehicle by ID.

```tsx
import { useVehicleById } from '../hooks'

const VehicleDetails = ({ vehicleId }: { vehicleId: string }) => {
  const { vehicle, maintenanceRecords, loading, error, refetch } = useVehicleById(vehicleId)
  
  return (
    <div>
      {loading && <p>Loading vehicle...</p>}
      {error && <p>Error: {error}</p>}
      {vehicle && (
        <div>
          <h1>{vehicle.name}</h1>
          <p>Model: {vehicle.model}</p>
          <p>License: {vehicle.licensePlate}</p>
        </div>
      )}
    </div>
  )
}
```

**Parameters:**
- `id`: `string` - The vehicle ID

**Returns:**
- `vehicle`: `Vehicle | null` - Vehicle details
- `maintenanceRecords`: `MaintenanceRecord[]` - Array of maintenance records
- `loading`: `boolean` - Loading state
- `error`: `string | null` - Error message if any
- `refetch`: `() => Promise<void>` - Function to refresh the vehicle data

---

### 3. `useCreateVehicle()`
Hook for creating new vehicles.

```tsx
import { useCreateVehicle } from '../hooks'
import type { VehicleSavePayload } from '../types'

const CreateVehicleForm = () => {
  const { createVehicle, loading, error } = useCreateVehicle()
  
  const handleSubmit = async (formData: VehicleSavePayload) => {
    try {
      const result = await createVehicle(formData)
      console.log('Vehicle created:', result)
    } catch (err) {
      console.error('Failed to create vehicle')
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p>Error: {error}</p>}
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Vehicle'}
      </button>
    </form>
  )
}
```

**Returns:**
- `createVehicle`: `(payload: VehicleSavePayload) => Promise<any>` - Function to create a vehicle
- `loading`: `boolean` - Loading state
- `error`: `string | null` - Error message if any

---

### 4. `useUpdateVehicle()`
Hook for updating existing vehicles.

```tsx
import { useUpdateVehicle } from '../hooks'
import type { VehicleSavePayload } from '../types'

const EditVehicleForm = ({ vehicleId }: { vehicleId: string }) => {
  const { updateVehicle, loading, error } = useUpdateVehicle()
  
  const handleUpdate = async (formData: VehicleSavePayload) => {
    try {
      const result = await updateVehicle(vehicleId, formData)
      console.log('Vehicle updated:', result)
    } catch (err) {
      console.error('Failed to update vehicle')
    }
  }
  
  return (
    <form onSubmit={handleUpdate}>
      {error && <p>Error: {error}</p>}
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update Vehicle'}
      </button>
    </form>
  )
}
```

**Returns:**
- `updateVehicle`: `(vehicleId: string, payload: VehicleSavePayload) => Promise<any>` - Function to update a vehicle
- `loading`: `boolean` - Loading state
- `error`: `string | null` - Error message if any

---

### 5. `useCreateMaintenanceRecord()`
Hook for creating maintenance records for vehicles.

```tsx
import { useCreateMaintenanceRecord } from '../hooks'
import type { MaintenanceRecordRequest } from '../../../types'

const AddMaintenanceForm = ({ vehicleId }: { vehicleId: string }) => {
  const { createMaintenanceRecord, loading, error } = useCreateMaintenanceRecord()
  
  const handleSubmit = async (formData: MaintenanceRecordRequest) => {
    try {
      const result = await createMaintenanceRecord(vehicleId, formData)
      console.log('Maintenance record created:', result)
    } catch (err) {
      console.error('Failed to create maintenance record')
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p>Error: {error}</p>}
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Maintenance Record'}
      </button>
    </form>
  )
}
```

**Returns:**
- `createMaintenanceRecord`: `(vehicleId: string, payload: MaintenanceRecordRequest) => Promise<any>` - Function to create a maintenance record
- `loading`: `boolean` - Loading state
- `error`: `string | null` - Error message if any

---

### 6. `useMaintenanceTypes()`
Hook for fetching available maintenance types.

```tsx
import { useMaintenanceTypes } from '../hooks'

const MaintenanceTypeSelector = () => {
  const { maintenanceTypes, loading, error } = useMaintenanceTypes()
  
  return (
    <select>
      {loading && <option>Loading...</option>}
      {error && <option>Error loading types</option>}
      {maintenanceTypes.map(type => (
        <option key={type.key} value={type.key}>
          {type.arabicName}
        </option>
      ))}
    </select>
  )
}
```

**Returns:**
- `maintenanceTypes`: `MaintenanceType[]` - Array of available maintenance types
- `loading`: `boolean` - Loading state
- `error`: `string | null` - Error message if any

---

## Usage Guidelines

### Error Handling
All hooks provide consistent error handling with Arabic error messages:

```tsx
const { data, loading, error } = useAnyHook()

if (error) {
  // Display user-friendly Arabic error message
  console.error(error)
}
```

### Loading States
Handle loading states consistently:

```tsx
const { data, loading } = useAnyHook()

return (
  <div>
    {loading ? (
      <LoadingSpinner />
    ) : (
      <DataComponent data={data} />
    )}
  </div>
)
```

### Auto-refresh
Many hooks provide refetch functions for manual data refresh:

```tsx
const { data, refetch } = useAnyHook()

const handleRefresh = () => {
  refetch()
}
```

## Best Practices

1. **Use hooks at component level**: Don't call hooks inside loops, conditions, or nested functions
2. **Handle loading states**: Always show loading indicators when data is being fetched
3. **Handle errors gracefully**: Display user-friendly error messages in Arabic
4. **Use TypeScript**: All hooks are fully typed for better development experience
5. **Leverage refetch**: Use refetch functions to keep data up-to-date after mutations

## Integration Example

Complete example of using multiple hooks together:

```tsx
import { 
  useVehicles, 
  useCreateVehicle, 
  useUpdateVehicle 
} from '../hooks'

const VehicleManagement = () => {
  const { vehicles, loading: vehiclesLoading, refetch } = useVehicles()
  const { createVehicle, loading: createLoading } = useCreateVehicle()
  const { updateVehicle, loading: updateLoading } = useUpdateVehicle()
  
  const handleCreate = async (data) => {
    await createVehicle(data)
    refetch() // Refresh the list
  }
  
  const handleUpdate = async (id, data) => {
    await updateVehicle(id, data)
    refetch() // Refresh the list
  }
  
  return (
    <div>
      {/* Vehicle list with create/update functionality */}
    </div>
  )
}
```
