# 🚗 Track Ride

**Track Ride** is a smart vehicle maintenance management system that helps users keep track of their cars, schedule maintenance, and analyze costs — all in one place.

---

## ✨ Features

- 📋 Add and manage your vehicles with detailed information.
- 🛠 Create a maintenance schedule for each vehicle.
- 🔔 Get automatic reminders based on recommended service types.
- 🔄 Track the status of each maintenance request (Upcoming, Completed, Canceled).
- 📊 Analyze maintenance costs by month and by service type.

---

## 🛠️ Tech Stack

### Backend:
- Java 17
- Spring Boot
- Clean Architecture
- JWT Authentication
- PostgreSQL
- JUnit (for testing)
- Entity Manager (JPA)

### Frontend:
- React (TypeScript)
- Tailwind CSS

### Infrastructure:
- Docker Compose (for backend, frontend, and database orchestration)

### Tools:
- Postman (for API testing)
- Git (version control)

## 🚀 Running the Project

### With Docker Compose (Recommended)

1. **Clone and start**
   ```bash
   git clone https://github.com/yourusername/track-ride.git
   cd track-ride
   docker-compose up --build -d
