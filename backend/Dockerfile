# Use the official Node.js 14 image as base
FROM node:21.4.0

# Set working directory
WORKDIR /usr/src/app
RUN chmod 1777 /tmp

# Copy package.json and package-lock.json
COPY package*.json ./
COPY ./custom_hosts /etc/hosts
RUN chmod 1777 /tmp

# Install required packages
RUN apt-get update && apt-get install -y \
    tzdata \
    telnet \
    netcat-openbsd \
    iputils-ping

# Set timezone to Dar es Salaam
ENV TZ=Africa/Dar_es_Salaam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install nodemon globally
RUN npm install -g nodemon

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 5001
EXPOSE 5001

# Command to run the application
CMD ["nodemon", "src/server.js"]
