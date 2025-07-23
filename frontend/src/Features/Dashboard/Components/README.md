# Dashboard Components

This directory contains the refactored Dashboard components organized into modular, reusable sub-components.

## Component Structure

### Main Components

#### `DashboardHeader.tsx`
- **Purpose**: Displays the main dashboard title and subtitle
- **Props**: 
  - `title?: string` (default: "لوحة التحكم")
  - `subtitle?: string` (default: "نظرة شاملة على حالة أسطولك وجدولة الصيانة")

#### `DashboardMetrics.tsx`
- **Purpose**: Displays the four main metric cards (vehicles, upcoming, overdue, recent)
- **Props**: Accepts loading states, error states, and values for all four metrics
- **Dependencies**: Uses `MetricCard` component

#### `TotalCostCard.tsx`
- **Purpose**: Displays total maintenance cost with breakdown and statistics
- **Features**: 
  - Shows total cost, last month comparison, and trend indicators
  - Displays detailed cost breakdown by maintenance type
  - Handles loading and error states
- **Hooks Used**: `useTotalCost`, `useLastMonthCost`, `useCostDetails`

#### `UpcomingMaintenanceTable.tsx`
- **Purpose**: Displays upcoming maintenance in a table format with overdue highlighting
- **Features**:
  - Highlights overdue maintenance in red
  - Action buttons for completing/canceling maintenance
  - Arabic maintenance type translation
  - Loading and error state handling
- **Props**: Data array, loading states, status update callback

#### `RecentActivityList.tsx`
- **Purpose**: Shows recent maintenance activities
- **Features**:
  - Lists recent maintenance activities with vehicle names and types
  - Skeleton loading states
  - Arabic maintenance type display

#### `MaintenanceChart.tsx`
- **Purpose**: Vehicle status visualization (pie/bar chart)
- **Features**:
  - Toggle between pie and bar chart views
  - Custom tooltips with Arabic text
  - Responsive design

#### `ErrorDisplay.tsx`
- **Purpose**: Centralized error message display
- **Usage**: Shows error messages in a consistent red-themed alert box

### Utility Components

#### `MetricCard.tsx`
- **Purpose**: Reusable metric display card
- **Features**: Icon, gradient background, title, and value display

## Usage

### Main Dashboard Page

```tsx
import {
  DashboardHeader,
  DashboardMetrics,
  ErrorDisplay,
  TotalCostCard,
  RecentActivityList,
  UpcomingMaintenanceTable
} from "../Components"

export default function Dashboard() {
  // ... hooks and logic
  
  return (
    <div>
      <DashboardHeader />
      <ErrorDisplay error={updateError} />
      <DashboardMetrics {...metricsProps} />
      <TotalCostCard />
      <RecentActivityList data={recentActivity} />
      <UpcomingMaintenanceTable data={upcomingData} />
    </div>
  )
}
```

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be reused in other parts of the application
3. **Maintainability**: Easier to update and debug individual components
4. **Testing**: Components can be tested in isolation
5. **Performance**: Better code splitting and lazy loading opportunities
6. **Readability**: Main dashboard file is much cleaner and easier to understand

## File Organization

```
/Features/Dashboard/
├── Components/
│   ├── index.ts                    # Barrel export
│   ├── DashboardHeader.tsx         # Header component
│   ├── DashboardMetrics.tsx        # Metrics cards wrapper
│   ├── ErrorDisplay.tsx            # Error message display
│   ├── TotalCostCard.tsx           # Cost analysis card
│   ├── MaintenanceChart.tsx        # Vehicle status chart
│   ├── UpcomingMaintenanceTable.tsx # Upcoming maintenance table
│   ├── RecentActivityList.tsx      # Recent activity list
│   └── MetricCard.tsx              # Individual metric card
├── hooks/                          # Custom hooks
├── Pages/
│   └── Dashboard.tsx               # Main dashboard page
└── README.md                       # This documentation
```

## API Integration

Each component manages its own API calls through custom hooks:
- `TotalCostCard` uses `useTotalCost`, `useLastMonthCost`, `useCostDetails`
- `UpcomingMaintenanceTable` uses `useUpcomingMaintenance`, `useUpdateMaintenanceStatus`
- `RecentActivityList` uses `useRecentActivity`
- All components use `useMaintenanceTypes` for Arabic translations

## Styling

All components follow the established design system:
- Dark theme with gray-800/gray-900 backgrounds
- Emerald/teal accent colors
- Consistent spacing and typography
- RTL (right-to-left) text direction support
- Responsive design patterns
