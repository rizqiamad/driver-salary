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

3. Start Migration:

   ```bash
   npm run migrate
   ```

4. Start Seeder:

   ```bash
   npm run seeder
   ```

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
