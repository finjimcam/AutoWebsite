# AutoWebsite 🚗
Commission website for car selling company

A modern car dealership website built with React (TypeScript) frontend, Node.js backend, and MySQL database, fully containerized with Docker.

## 🏗️ Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: MySQL 8.0
- **Deployment**: Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AutoWebsite
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:3306

### Development Setup

#### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

#### Backend Development
```bash
cd backend
npm install
npm run dev
```

## 📁 Project Structure

```
AutoWebsite/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── App.tsx          # Main application component
│   │   ├── App.css          # Styling
│   │   └── main.tsx         # Application entry point
│   ├── Dockerfile           # Frontend container configuration
│   └── package.json         # Frontend dependencies
├── backend/                  # Node.js Express backend
│   ├── src/
│   │   ├── server.ts        # Express server setup
│   │   ├── database/        # Database configuration and migrations
│   │   └── routes/          # API routes
│   ├── Dockerfile           # Backend container configuration
│   └── package.json         # Backend dependencies
├── database/
│   └── init.sql             # Database initialization script
├── docker-compose.yml       # Multi-container setup
└── README.md               # This file
```

## 🛠️ API Endpoints

### Cars API
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get specific car
- `POST /api/cars` - Create new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Health Check
- `GET /health` - Application health status
- `GET /api/test-db` - Database connection test

## 🎨 Features

### Current Features
- ✅ Responsive car listing display
- ✅ Modern UI with CSS Grid and Flexbox
- ✅ RESTful API for car management
- ✅ MySQL database with sample data
- ✅ Docker containerization
- ✅ TypeScript for type safety

### Planned Features
- 🔲 Car search and filtering
- 🔲 Image upload functionality
- 🔲 User authentication
- 🔲 Contact form integration
- 🔲 Admin panel for car management

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build

# Remove all containers and volumes
docker-compose down -v
```

## 🔧 Environment Variables

### Backend (.env)
```
PORT=5000
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=autowebsite
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 5000, and 3306 are available
2. **Database connection**: Wait for MySQL to fully initialize (check with `docker-compose logs mysql`)
3. **Frontend not loading**: Ensure backend is running and accessible

### Useful Commands
```bash
# Check running containers
docker ps

# Access MySQL database
docker exec -it autowebsite_mysql mysql -u root -p

# View backend logs
docker logs autowebsite_backend

# Rebuild specific service
docker-compose up --build frontend
```
