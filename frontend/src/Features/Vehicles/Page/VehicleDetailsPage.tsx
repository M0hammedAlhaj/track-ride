import { useParams, Link } from "react-router-dom"
import { useVehicleById } from "../hooks/useVehicleById"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowLeft,
  Calendar,
  Car,
  Palette,
  Hash,
  Clock,
  Wrench,
} from "lucide-react"

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>()
  const { vehicle, maintenanceRecords, loading, error } = useVehicleById(id || "")

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground text-lg">Loading vehicle details...</p>
        </div>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-destructive text-6xl">⚠️</div>
          <h2 className="text-2xl font-semibold text-destructive">{error || "Vehicle not found"}</h2>
          <p className="text-muted-foreground">
            The vehicle you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button asChild>
            <Link to="/vehicles" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Vehicles
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const getMaintenanceTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "Oil Change": "default",
      "Tire Rotation": "secondary",
      "Brake Service": "destructive",
      "General Inspection": "outline",
    }
    return variants[type] || "outline"
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/vehicles" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicles
          </Link>
        </Button>
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-2 text-muted-foreground">
          <Car className="h-4 w-4" />
          <span className="text-sm">Vehicle Details</span>
        </div>
      </div>

      {/* Vehicle Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <Car className="h-8 w-8 text-primary" />
              {vehicle.name} {vehicle.model}
            </CardTitle>
            <Badge variant="secondary" className="text-sm">
              {vehicle.year}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">License Plate</p>
                <p className="font-semibold">{vehicle.licensePlate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Color</p>
                <p className="font-semibold">{vehicle.color}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="font-semibold">{vehicle.year}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Last Service</p>
                <p className="font-semibold">{vehicle.lastService || "N/A"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Records Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Maintenance Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          {maintenanceRecords.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Service Type</TableHead>
                    <TableHead className="font-semibold">Date Created</TableHead>
                    <TableHead className="font-semibold">Reminder Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceRecords.map((record, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                        {record.type}
                      </TableCell>
                      <TableCell>{record.created}</TableCell>
                      <TableCell>{record.reminderDate}</TableCell>
                      <TableCell>
                        <Badge variant={getMaintenanceTypeBadge(record.type)}>
                          {record.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No maintenance records</h3>
              <p className="text-muted-foreground mb-4">
                This vehicle doesn't have any maintenance records yet.
              </p>
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Maintenance
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
