# One Piece: Devil Fruit Database

A comprehensive database application for tracking Devil Fruits from the One Piece universe. This project features a modern web interface for browsing and searching Devil Fruits, their users, and abilities.

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: SQLite with SQLModel ORM
- **Cloud Services**: Google Cloud Platform
  - Google Cloud Storage 
  - Cloud Run 
  - Secret Manager 
- **Other**: Docker

### Frontend
- **Framework**: React.js with TypeScript
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Styling**: styled-components
- **Other**: React Query

## Local Development

### Prerequisites
- Docker and Docker Compose
- Bun (or Node.js)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create your environment file:
```bash
cp .env.example .env
```

3. Start the backend service with database population:
```bash
# Build and start the service with initial data
docker compose -f docker-compose.jobs.yml --profile populate up --build
```

The backend API will be available at: http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Create your environment file:
```bash
cp .env.example .env
```

2. Install dependencies:
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

3. Start the development server:
```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

The frontend will be available at: http://localhost:5173/devil-fruit-database/

## Features
- Comprehensive Devil Fruit database
- Search and filter functionality
- Spoiler protection system
- Responsive design
- RESTful API

## Project Structure

```
devil-fruit-app-v1/
├── backend/              # FastAPI backend
│   ├── app/              # Application code
│   ├── Dockerfile        # Container configuration
│   └── docker-compose.*  # Environment configurations
├── frontend/             # React frontend
│   ├── src/              # Source code
│   └── public/           # Static assets
└── README.md             # Project documentation
```

## API Documentation
When running locally, API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Configuration

### Backend (.env)
Required environment variables for local development:
```properties
# Info 
PROJECT_NAME="Devil Fruit Database"

# Domain
DOMAIN=localhost

# Environment: dev, staging, prod
ENVIRONMENT=dev

# Backend
IS_ALLOWED_CREDENTIALS=True

# Database
SQLITE_DB_PATH=data/db/devil_fruits.db

# Optional: Google Cloud Configuration (not needed for local development)
USE_GCP=false
```

### Frontend (.env)
Required environment variables for local development:
```properties
# Environment: dev, staging, prod
VITE_ENVIRONMENT=dev

# API URL
VITE_API_URL=http://localhost:8000
```

### Production Setup
The production environment is configured to use Google Cloud Platform services. The frontend will automatically connect to the Cloud Run instance when built with production configuration.

Production deployment is handled through GitHub Actions, which:
- Builds and deploys the frontend to GitHub Pages
- Builds and deploys the backend to Cloud Run
- Manages environment-specific configurations

## License
This project is licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](https://creativecommons.org/licenses/by-nc-nd/4.0/) - see the [LICENSE.md](LICENSE.md) file for details.