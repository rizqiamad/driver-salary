import dotenv from "dotenv";
dotenv.config();
import { seedDriverAttendances } from "./seeder/driver_attendances.seeder";
import { seedDrivers } from "./seeder/drivers.seeder";
import { seedShipmentCosts } from "./seeder/shipment_costs.seeder";
import { seedShipments } from "./seeder/shipments.seeder";
import { seedVariableConfigs } from "./seeder/variable_configs.seeder";

async function runSeeders() {
  try {
    await seedDrivers();
    await seedDriverAttendances();
    await seedShipments();
    await seedShipmentCosts();
    await seedVariableConfigs();
    console.log("[Seeder]: All seeders ran successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

runSeeders();
