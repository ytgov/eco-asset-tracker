import { Express, Request, Response } from "express";
import { KnexService } from "../services/knex-service";
import { join } from "path";

const db = new KnexService().db;

const migrationConfig = {
  directory: join(__dirname, "migrations"),
};

export async function migrateUp() {
  console.log("-------- MIGRATE UP ---------");

  try {
    return await db.migrate.up(migrationConfig);
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
    return error;
  }
}

export async function migrateDown() {
  console.log("-------- MIGRATE DOWN ---------");
  return await db.migrate.down({
    migrationConfig,
  });
}

export async function migrateLatest() {
  console.log("-------- MIGRATE LATEST ---------");
  return await db.migrate.latest({
    migrationConfig,
  });
}

export async function migrationStatus() {
  return await db.migrate.list(migrationConfig);
}

// export async function CreateMigrationRoutes(app: Express) {
//   app.post("/migrate/up", async (req: Request, res: Response) => {
//     res.send(await migrateUp());
//   });

//   app.post("/migrate/down", async (req: Request, res: Response) => {
//     res.send(await migrateDown());
//   });

//   app.post("/migrate/latest", async (req: Request, res: Response) => {
//     console.log("Runing Latest Migrations");
//     res.send(await migrateLatest());
//   });
// }
