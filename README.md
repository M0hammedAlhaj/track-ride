# Track Ride

Vehicle maintenance management system built with Spring Boot and React.

## Features

- User registration and authentication
- Vehicle management (add, update, track vehicles)
- Maintenance scheduling and reminders
- Cost tracking and analytics
- Maintenance status management (upcoming, completed, canceled)
- Dashboard with maintenance overview
- Overdue maintenance detection

## Tech Stack

- **Backend**: Java 17, Spring Boot, Spring Security, Spring Data JPA
- **Database**: PostgreSQL
- **Frontend**: React, TypeScript, Tailwind CSS
- **Build Tool**: Maven
- **Authentication**: JWT
- **Containerization**: Docker

## Project Structure

```
src/main/java/com/example/trackride/
├── Core/                    # Domain entities and business logic
├── Application/             # Use cases and DTOs
├── Infrastructures/         # Data persistence and security
└── Presentation/           # REST controllers
```

## How to Run

### 1. Clone Repository
```bash
git clone https://github.com/M0hammedAlhaj/track-ride.git
cd track-ride
```

### 2. Setup Database with Docker
```bash
docker run --name postgres-db \
  -e POSTGRES_DB=trackride \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:14
```

### 3. Build and Run Backend
```bash
mvn clean install
mvn spring-boot:run
```

### 4. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

**Access the application:**
- Backend API: `http://localhost:8080`
- Frontend: `http://localhost:5173`

## Example API Endpoints

### Authentication
```bash
# Register
POST /api/v1/auth/registera
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

# Login
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Vehicles
```bash
# Add vehicle
POST /api/v1/vehicles
Authorization: Bearer {token}
{
  "name": "Toyota Camry",
  "licensePlate": "ABC-123",
  "year": 2020
}

# Get user vehicles
GET /api/v1/users/vehicles
Authorization: Bearer {token}
```

### Maintenance
```bash
# Create maintenance record
POST /api/v1/maintenance-records
Authorization: Bearer {token}
{
  "vehicleId": "uuid",
  "type": "OIL_CHANGE",
  "reminderDate": "2025-08-15",
  "price": 50.00
}

# Update status
PUT /api/v1/maintenance-records/{id}/?status=COMPLETED
Authorization: Bearer {token}

# Get total cost
GET /api/v1/maintenance-records/total-cost
Authorization: Bearer {token}
```
