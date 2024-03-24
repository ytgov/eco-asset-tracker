import express, { Request, Response } from "express";
import { KnexService } from "../services/knex-service";
import {
  migrateLatest,
  migrateDown,
  migrateUp,
  migrationStatus,
} from "../data/migrator";

//todo change migrations to post

export const systemRouter = express.Router();

systemRouter.get("/migrate", async (req: Request, res: Response) => {
  console.log("-----Checking MIGRATION STATUS-----");
  let y = await migrationStatus();
  console.log(y);
  res.json(y);
});

systemRouter.use("/migrate/latest", async (req: Request, res: Response) => {
  await migrateLatest();
  console.log("Done!");
  res.send("Complete");
});
systemRouter.use("/migrate/down", async (req: Request, res: Response) => {
  await migrateDown();
  console.log("Done!");
  res.json("Complete");
});
systemRouter.use("/migrate/up", async (req: Request, res: Response) => {
  await migrateUp();
  console.log("Done!");
  res.json({ status: "done" });
});
