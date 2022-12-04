import express, { Request, Response } from "express";
import { KnexService } from "../services/knex-service";
import { migrateLatest, migrateDown, migrateUp } from "../data/migrator";
import { VUE_APP_ } from "../config";

//todo change migrations to post

export const systemRouter = express.Router();

systemRouter.get("/", (req: Request, res: Response) => {
  res.send("System");
});

systemRouter.use("/migrate/latest", async (req: Request, res: Response) => {
  await migrateLatest();
  console.log("Done!");
  res.send("Complete");
});
systemRouter.use("/migrate/down", async (req: Request, res: Response) => {
  await migrateDown();
  console.log("Done!");
  res.send("Complete");
});
systemRouter.use("/migrate/up", async (req: Request, res: Response) => {
  await migrateUp();
  console.log("Done!");
  res.send("Complete");
});
systemRouter.get("/config", async (req: Request, res: Response) => {
  return res.json(VUE_APP_);
});
