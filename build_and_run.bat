rem @echo off
cd docker
docker-compose down
cd ..
docker build -f Docker/dockerfile -t my_flask .
cd Docker
docker-compose up -d