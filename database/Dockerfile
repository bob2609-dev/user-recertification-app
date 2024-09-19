# Use the official MySQL image
FROM mysql:latest

# Set environment variables for MySQL root user and database
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=user_rec_db

# Copy the initialization SQL file to the MySQL init directory
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306
