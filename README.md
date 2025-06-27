# User Recertification App

## Project Overview

This project is a user recertification application. It consists of a Node.js backend service that manages user data and interacts with a MySQL database. The application is containerized using Docker for ease of setup and deployment.

The backend provides RESTful APIs for user management, including creating, retrieving, updating, and deleting users. It appears to be designed to integrate with Active Directory or LDAP for authentication, based on the dependencies in `package.json`.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local backend development or running scripts directly)
- An SQL client (e.g., DBeaver, MySQL Workbench) for interacting with the database directly (optional).

## Getting Started

Follow these instructions to get the project up and running.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd user-recertification-app
```

### 2. Configure Environment Variables

The backend service may require environment variables. A `.env` file is present in the `backend/` directory. Update this file with your specific configuration, especially for database connection details if they differ from the defaults in `docker-compose.yml` and `backend/src/config/dbConfig.js`.

**Default Database Configuration (`backend/src/config/dbConfig.js`):**
The application connects to the MySQL database using the configuration specified in `backend/src/config/dbConfig.js`. Ensure this matches the environment variables used by the `database` service in `docker-compose.yml`.

### 3. Build and Run with Docker Compose

This is the recommended way to run the application.

```bash
docker-compose up --build -d
```

This command will:
- Build the Docker images for the `backend` and `database` services (if they don't exist or if changes are detected).
- Start the containers in detached mode (`-d`).

To stop the services:
```bash
docker-compose down
```

### 4. Accessing the Application

- **Backend API**: The backend service is accessible at `http://localhost:3383`.
- **Database**: The MySQL database is exposed on port `3315` on your host machine. You can connect to it using an SQL client with the following default credentials (from `docker-compose.yml` and `database/init.sql`):
    - **Host**: `localhost`
    - **Port**: `3315`
    - **Username**: `root` (or `appUser` as created in `init.sql`)
    - **Password**: `password` (for `root`) or `appUser_2024` (for `appUser`)
    - **Database Name**: `user_rec_db`

## Services

The application is composed of the following services defined in `docker-compose.yml`:

### `backend`
- **Build context**: `./backend`
- **Dockerfile**: `backend/Dockerfile`
- **Ports**: `3383` (host) mapped to `3000` (container)
- **Volumes**: `./backend:/usr/src/app` (mounts the local backend code into the container for live reloading during development)
- **Depends on**: `database` (ensures the database is healthy before starting the backend)
- **Description**: A Node.js Express application that provides the main API for user management.

### `database`
- **Build context**: `./database`
- **Dockerfile**: `database/Dockerfile`
- **Environment Variables**:
    - `MYSQL_ROOT_PASSWORD`: `password`
    - `MYSQL_DATABASE`: `user_rec_db`
- **Ports**: `3315` (host) mapped to `3306` (container)
- **Healthcheck**: Uses `mysqladmin ping` to ensure the database is responsive.
- **Description**: A MySQL database instance that stores user information.

## Backend API

The backend API provides endpoints for managing users. All API routes are prefixed with `/api`.

**Authentication:**
While dependencies for Active Directory/LDAP (`activedirectory`, `activedirectory2`, `ldap-authentication`, `passport-ldapauth`) are present in `package.json`, the current codebase does not show an explicit implementation of authentication middleware for the defined routes. This might be a planned feature or handled externally.

### User Endpoints

Base path: `/api/users`

| Method | Endpoint     | Description                                  | Request Body                 | Response (Success 2xx)                                      | Response (Error)                                 |
|--------|--------------|----------------------------------------------|------------------------------|-------------------------------------------------------------|--------------------------------------------------|
| POST   | `/`          | Create a new user.                           | JSON object of the user      | `201 Created` - `{ "id": <new_user_id>, ...user_data }`     | `500 Internal Server Error` - `{ "error": <message> }` |
| GET    | `/`          | Get all non-deleted users.                   | None                         | `200 OK` - `[ {user_object_1}, {user_object_2} ]`           | `500 Internal Server Error` - `{ "error": <message> }` |
| GET    | `/:id`       | Get a specific user by their ID.             | None                         | `200 OK` - `{user_object}`                                  | `404 Not Found` - `{ "message": "User not found" }` <br> `500 Internal Server Error` - `{ "error": <message> }` |
| PUT    | `/:id`       | Update an existing user by their ID.         | JSON object with fields to update | `200 OK` - `{ "message": "User updated successfully" }`     | `404 Not Found` - `{ "message": "User not found" }` <br> `500 Internal Server Error` - `{ "error": <message> }` |
| DELETE | `/:id`       | Soft delete a user by their ID.              | None                         | `200 OK` - `{ "message": "User deleted successfully" }`     | `404 Not Found` - `{ "message": "User not found" }` <br> `500 Internal Server Error` - `{ "error": <message> }` |

**User Object Example (for POST/PUT and in responses):**
```json
{
  "ad_username": "johndoe_ad",
  "email": "john.doe@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "active": true,
  "role": "user"
}
```
Note: `id`, `last_login`, `is_deleted`, `created_at`, and `updated_at` are generally managed by the system.

## Database Schema

The application uses a MySQL database. The primary table is `users`.

### `users` Table Schema

The schema is defined and created by the backend application in `backend/src/models/userModel.js` if the table does not already exist.

| Column        | Type          | Constraints                                     | Description                                     |
|---------------|---------------|-------------------------------------------------|-------------------------------------------------|
| `id`          | `INT`         | `AUTO_INCREMENT PRIMARY KEY`                    | Unique identifier for the user.                 |
| `ad_username` | `VARCHAR(255)`| `NOT NULL UNIQUE`                               | Active Directory username.                      |
| `email`       | `VARCHAR(255)`| `UNIQUE`                                        | User's email address.                           |
| `first_name`  | `VARCHAR(255)`|                                                 | User's first name.                              |
| `last_name`   | `VARCHAR(255)`|                                                 | User's last name.                               |
| `active`      | `BOOLEAN`     | `DEFAULT true`                                  | Whether the user account is active.             |
| `role`        | `VARCHAR(50)` |                                                 | Role of the user (e.g., admin, user).           |
| `last_login`  | `TIMESTAMP`   |                                                 | Timestamp of the user's last login.             |
| `is_deleted`  | `BOOLEAN`     | `DEFAULT false`                                 | Flag for soft deletion. `true` if deleted.    |
| `created_at`  | `TIMESTAMP`   | `DEFAULT CURRENT_TIMESTAMP`                     | Timestamp of when the user record was created.  |
| `updated_at`  | `TIMESTAMP`   | `DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP` | Timestamp of the last update to the record. |

## Testing

The `package.json` file for the backend service currently has a placeholder test script:
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}
```
To add tests, you would typically use a testing framework like Jest or Mocha. After writing tests, you would update this script to execute them.

## Bash Scripts

The repository includes the following utility scripts in the `bash_scripts/` directory:

- **`git_push.sh`**: A script to automate Git add, commit, and push operations.
- **`stop_and_build.sh`**: A script to stop running Docker containers, remove them, and then rebuild and restart the services using `docker-compose`.

## Contributing

Contributions are welcome! If you'd like to contribute, please:
1. Fork the repository.
2. Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Add tests for your changes (if applicable).
5. Ensure all tests pass.
6. Commit your changes (`git commit -am 'Add some feature'`).
7. Push to the branch (`git push origin feature/your-feature-name`).
8. Create a new Pull Request.

Please ensure your code follows the existing style and that any new dependencies are justified.

## Future Enhancements / Considerations
- Implement proper authentication and authorization using the LDAP/Active Directory libraries.
- Add comprehensive unit and integration tests for the backend API.
- Implement input validation for API requests.
- Enhance logging for better monitoring and debugging.
- Consider a frontend application to interact with the API.
```
