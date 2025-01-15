# PERN Starter Kit

This is a full-stack starter kit using the PERN (PostgreSQL, Express, React, and Node.js) stack. It includes a modern frontend built with React (using Vite), a RESTful API server with Express, a PostgreSQL database, and a collection of tooling, Docker configurations, and automated tests to streamline development and deployment.

Below is an overview of each part of the project:

---

## Table of Contents

- [Folder Structure](#folder-structure)
- [Features](#features)
- [Setup and Usage](#setup-and-usage)
  - [1. Environment Variables](#1-environment-variables)
  - [2. Installation](#2-installation)
  - [3. Running with Docker](#3-running-with-docker)
  - [4. Running Locally (without Docker)](#4-running-locally-without-docker)
  - [5. Additional Scripts](#5-additional-scripts)
- [Counter Feature](#counter-feature)
- [Testing](#testing)
  - [Frontend Tests (React)](#frontend-tests-react)
  - [Backend Tests (Express)](#backend-tests-express)
  - [End-to-End Tests (Cypress)](#end-to-end-tests-cypress)
- [Security](#security)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

---

## Folder Structure

A high-level look at the folders and their purposes:

- **client/**  
  Contains the React frontend. Uses Vite for bundling and development. Includes:
  - `src/` folder with React components and main entry points:
    - `App.jsx` as the main App component.
    - `main.jsx` to bootstrap React into the DOM.
    - Global styles (`index.css`) and component-level styles (`App.css`).
  - `tests/` folder with:
    - `unit/` (Vitest unit tests).
    - `e2e/` (Cypress end-to-end tests).
  - `Dockerfile` for building an optimized production image with Nginx.

- **server/**  
  Contains the Express backend. Includes:
  - `src/app.js` as the main Express server configuration.  
  - `src/index.js` to start the server on the specified port.  
  - `src/routes/` for Express routes, including `auth.js` to handle user registration and login.  
  - `src/auth/passport.js` configures Passport (LocalStrategy) if needed for session-based authentication.  
  - `tests/` folder with Mocha/Chai integration tests.  
  - `Dockerfile` for building a Node-based backend container.  

- **database/**  
  Contains database-related files:
  - `db.config.js` exports a pooled PostgreSQL connection.  
  - `init.sql` schema for initializing your production database.  
  - `init.test.sql` schema for test databases.  
  - `init.test.db.js` script to create a fresh test database (used before running backend tests).  
  - `Dockerfile` to build a custom PostgreSQL image, if needed.

- **docs/**  
  Contains basic READMEs and placeholders for further documentation (e.g., architecture diagrams, specifications, etc.).

- **scripts/**  
  Several helper shell scripts for Docker management:
  - `start.sh`: Builds and starts containers in detached mode.  
  - `stop.sh`: Stops running containers.  
  - `logs.sh`: Shows logs for all or a specific container.  
  - `cleanup.sh`: Removes containers and prunes unused Docker images.

- **docker-compose.yml**  
  Defines services for the frontend (client), backend (server), and database (PostgreSQL).

- **.gitignore**  
  Specifies files and directories to be ignored by Git.

---

## Features

1. **React Frontend (Vite)**  
   - Fast dev server and production build.  
   - Basic structure with a landing page.

2. **Express.js Backend**  
   - RESTful API ready with routes for user registration, login, and example endpoints.  
   - Uses Helmet, rate-limit, and other security best practices.  
   - Authentication (Passport, bcryptjs, JWT) for secure login and session management if needed.

3. **PostgreSQL Database**  
   - Connection pooling via `pg`.  
   - Example schema with Users and Example tables.  
   - Ready for migrations and seeding scripts.

4. **Docker and Docker Compose**  
   - Containerized setup for client, server, and database.  
   - Nginx serving the production build of the React app.  
   - The database runs on a `postgres:15-alpine` base image (or the included custom Dockerfile in `database/`).

5. **Automated Testing**  
   - **Unit Tests** (frontend) with Vitest.  
   - **Integration Tests** (backend) with Mocha/Chai.  
   - **Unit Tests** (backend) with Mocha/Chai.  
   - **End-to-End Tests** with Cypress in the `client/tests/e2e` folder.

6. **Security and Utility**  
   - Rate limiting (express-rate-limit).  
   - Helmet for HTTP headers security.  
   - CORS configuration and environment-based configurations.

---

## Setup and Usage

### 1. Environment Variables

- Create a `.env` file in the `server/` directory for backend secret keys and DB credentials (e.g., `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`).
- Create a `.env` file in the `client/` directory if needed for any custom environment variables (e.g., `VITE_API_URL`).
- For testing, a separate `.env.test` is typically used (and loaded in `init.test.db.js`).

Example environment variables in `server/.env`:
```
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=database
DB_PORT=5432
DB_NAME=pern_app
SESSION_SECRET=some-secret-key
JWT_SECRET=some-other-secret
CLIENT_URL=http://localhost:5173
```

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/AsherMorse/PernStarterKit.git
cd PernStarterKit
```

### 3. Running with Docker

The easiest way to run the project is using our provided Docker scripts:

1. Start all services:
```bash
./scripts/start.sh
```
This script will:
- Build and start all containers (`database`, `server`, and `client`)
- The React app will be available at [http://localhost:5173](http://localhost:5173)
- The Express backend will run on [http://localhost:5000](http://localhost:5000)
- PostgreSQL will listen on port 5438 (mapped to 5432 in the container)

2. View logs (optional):
```bash
./scripts/logs.sh
```

3. Stop all services:
```bash
./scripts/stop.sh
```

4. Clean up resources (optional):
```bash
./scripts/cleanup.sh
```

### 4. Running Locally (without Docker)

Alternatively, you can run services individually for development:

1. Install dependencies in each directory:
```bash
# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install

# Install database dependencies (if needed)
cd ../database && npm install
```

2. Start services:
- **Database**: Install and start PostgreSQL locally, ensuring your `.env` matches local connection settings.  
- **Backend** (`server/`):
  ```bash
  npm run dev
  ```
  It will start on `localhost:5000` by default.

- **Frontend** (`client/`):
  ```bash
  npm run dev
  ```
  The development server will be at `http://localhost:5173` by default.

### 5. Additional Scripts

In the `scripts/` folder:

- **start.sh**: Builds and starts containers (equivalent to `docker compose up -d --build`).
- **stop.sh**: Stops all containers (`docker compose down`).
- **logs.sh**: Shows logs for all containers or a specified container.
- **cleanup.sh**: Cleans up Docker resources (containers, images, volumes).


## Counter Feature

A simple counter has been added to demonstrate state management, API calls, and associated testing.  
- The counter is displayed in the frontend with a button to increment it.  
- The server exposes the `/api/counter` and `/api/counter/increment` routes:
  - **GET** `/api/counter` returns the current count.  
  - **POST** `/api/counter/increment` increments and returns the count.  
- The counter state persists in memory on the server for demonstration purposes.

### Relevant Files
- Client:
  - `src/App.jsx` to fetch and display the counter, and handle increment actions.
  - `tests/e2e/counter.cy.js` for end-to-end testing of the increment functionality.
  - `tests/unit/App.test.jsx` verifying the UI state updates properly after clicking the increment button.
- Server:
  - `src/routes/counter.js` containing routes for retrieving and incrementing the count.
  - `tests/integration/counter.test.js` for integration tests (ensuring the route logic is correct).

---

## Testing

### Frontend Tests (React)

- **Vitest Unit Tests**  
  - Located in `client/tests/unit`.
  - Use `@testing-library/react` for component rendering and testing.
  - Run them with:
    ```bash
    cd client
    npm run test:unit
    ```
    For coverage:
    ```bash
    npm run test:unit:coverage
    ```

### Backend Tests (Express)

- **Mocha/Chai Integration Tests**  
  - Located in `server/tests/integration`.
  - Use supertest for testing HTTP routes.
  - Run them with:
    ```bash
    cd server
    npm test
    ```

- **Mocha/Chai Unit Tests**  
  - Located in `server/tests/unit`.
  - Designed to test individual functions and modules.
  - You can run them the same way as other backend tests:
    ```bash
    cd server
    npm test
    ```

### End-to-End Tests (Cypress)

- **E2E Tests** for the entire application’s UI flows:
  - Found in `client/tests/e2e`.
  - These include tests for the new counter functionality under `counter.cy.js`.
  - Run in headless mode:
    ```bash
    cd client
    npm run test:e2e
    ```
  - Or open the Cypress GUI:
    ```bash
    npm run test:e2e:dev
    ```
  - Cypress configuration is located at `client/cypress.config.js`.

---

## Security

The server applies the following security measures:

- **Helmet**: Sets HTTP response headers for better security.
- **express-rate-limit**: Limits the number of requests per time window per IP.
- **passport** (Local Strategy) and/or **JWT** authentication (depending on usage).
- **CORS**: Origin controlled via environment variable `CLIENT_URL`.

---

## Authentication

The backend provides routes for user registration and login:

- **POST** `/api/auth/register`  
  Creates a new user with a hashed password.

- **POST** `/api/auth/login`  
  Logs in an existing user and returns a JWT token (stored in the `Authorization` header or application state).

See `server/src/routes/auth.js` for details on how the routes are implemented. The database schema includes a `users` table with fields for `username`, `email`, and a hashed `password`.

---

## Contributing

1. Create a new branch for your feature or bugfix.
2. Make changes, run tests, and ensure everything is passing.
3. Check the status of your codebase:
   ```bash
   git status
   ```
4. Stage all changes:
   ```bash
   git add .
   ```
5. Commit with a concise message:
   ```bash
   git commit -m "Your concise commit message"
   ```
6. Push and create a pull request.

---

## License

This project is provided under the [MIT License](LICENSE). You are free to modify and distribute it, subject to the conditions outlined in the license file.

---

**Happy coding with the PERN Starter Kit! If you have any issues or questions, feel free to open an issue or submit a pull request.** 