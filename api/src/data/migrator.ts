import { Express, Request, Response } from "express";
import { KnexService } from "../services/knex-service";
import { join } from "path";

const db = new KnexService().db;

export async function migrateUp() {
  console.log("-------- MIGRATE UP ---------");
  console.log(join(__dirname, "migrations"));
  return await db.migrate.up({ directory: join(__dirname, "migrations") });
}

export async function migrateDown() {
  console.log("-------- MIGRATE DOWN ---------");
  console.log(join(__dirname, "migrations"));
  return await db.migrate.down({ directory: join(__dirname, "migrations") });
}

export async function migrateLatest() {
  console.log("-------- MIGRATE LATEST ---------");
  return await db.migrate.latest({ directory: join(__dirname, "migrations") });
}

export async function CreateMigrationRoutes(app: Express) {
  app.get("/migrate/up", async (req: Request, res: Response) => {
    res.send(await migrateUp());
  });

  app.get("/migrate/down", async (req: Request, res: Response) => {
    res.send(await migrateDown());
  });

  app.get("/migrate/latest", async (req: Request, res: Response) => {
    console.log("Runing Latest Migrations");
    res.send(await migrateLatest());
  });
}
