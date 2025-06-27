#!/bin/bash

# This script stops and removes all containers, networks, and volumes
# created by `docker-compose up`, then rebuilds the images, and finally
# starts the services again.
#
# It is useful for ensuring a clean environment and applying changes
# that require a full rebuild of Docker images (e.g., Dockerfile changes).
#
# Usage:
# ./stop_and_build.sh

# Stop and remove containers, networks, and volumes
# The -v flag removes named volumes declared in the `volumes` section
# of docker-compose.yml and anonymous volumes attached to containers.
docker-compose down -v && \

# Build (or rebuild) the Docker images for all services
docker-compose build && \

# Create and start the containers in the foreground
# (remove -d to run in detached mode if you prefer)
docker-compose up