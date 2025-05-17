# Seryu Backend

Driver Salary API.

## Installation

### Pre-requisite

- [NodeJs](https://nodejs.org/en/download/package-manager) `v18.18` or latest
- macOS, Windows (including WSL), and Linux are supported.
- [npm](https://www.npmjs.com/get-npm)
- [Docker](https://www.docker.com/) (optional)

### Setup

1. Clone the project repository:

   ```bash
   git clone https://github.com/rizqiamad/driver-salary.git
   cd driver-salary
   ```

2. Install required packages and dependencies:

   ```bash
   npm install
   ```

3. Check env variable on .env.example

   ```bash
   # OPTIONAL IF USING DOCKER COMPOSE FILE
   POSTGRES_USER="postgres"
   POSTGRES_PASSWORD="secret"
   POSTGRES_DB="postgres"

   # REQUIRED ENV FOR POOL (PG LIBRARY)
   PGUSER="postgres"
   PGPASSWORD="secret"
   PGDATABASE="postgres"
   PGHOST="localhost"
   PGPORT="5432"
   ```

4. Start docker compose

   ```bash
   docker compose up
   ```

5. Start Migration:

   ```bash
   npm run migrate
   ```

6. Start Seeder:

   ```bash
   npm run seeder
   ```

## API

   ```bash
   GET /v1/salary/driver/list
   ```

## Filter Available
| Query Request Key                             | Default Value | Description                                                                                                                                                                                                                                                 |
| --------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| month                                         |               | filter based on the shipment_date month                                                                                                                                                                                                                     |
| year                                          |               | filter based on the shipment_date year                                                                                                                                                                                                                      |
| page_size                                     | 10            | total per page                                                                                                                                                                                                                                              |
| current                                       | 1             | page number                                                                                                                                                                                                                                                 |
| driver_code                                   |               | Get the specific payroll of a driver                                                                                                                                                                                                                        |
| status                                        |               | Possible values : - **PENDING** : returns all drivers that have total_pending >0 - **CONFIRMED** : returns all drivers that have total_confirmed > 0 - **PAID** : returns all drivers that have total_paid >0 but total_confirmed = 0 and total_pending = 0 |
| name                                          |               | filters driver name that contains this string

## Scripts

- **`dev`**: Starts the application in development mode
- **`migrate`**: Migrate migration.sql that took place in /src/database/migrations
- **`seeder`**: Seed database with dummy data that took place in /src/database/seeders
- **`build`**: Compiles typescript then put into dist outdir

## Building the Project

To build the project, run:

```bash
npm run build
```

## Acknowledgement

- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Pg](https://node-postgres.com/)
- [Csv-parser](https://csv.js.org/parse/)
- [Express-validator](https://express-validator.github.io/)
