# AutoWebsite Docker Commands Cheat Sheet

## Starting the Application
docker-compose up --build          # Build and start all services (first time)
docker-compose up -d               # Start services in background (detached)
docker-compose up                  # Start services with logs visible

## Monitoring and Logs
docker-compose logs -f             # View all logs in real-time
docker-compose logs frontend       # View frontend logs only
docker-compose logs backend        # View backend logs only
docker-compose logs mysql          # View database logs only

## Stopping the Application
docker-compose stop                # Stop all services
docker-compose down                # Stop and remove containers
docker-compose down -v             # Stop, remove containers and volumes (clears database)

## Development Commands
docker-compose restart backend     # Restart just the backend service
docker-compose build frontend     # Rebuild just the frontend
docker-compose exec backend sh    # Access backend container shell
docker-compose exec mysql mysql -u root -p  # Access MySQL database

## Troubleshooting
docker ps                          # See running containers
docker-compose ps                  # See compose services status
docker system prune -f             # Clean up unused Docker resources
