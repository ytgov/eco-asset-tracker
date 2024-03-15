import express, { Request, Response } from "express";
import { AUTH_CONFIG } from "../config";

export const configRouter = express.Router();

configRouter.post("/", async (req: Request, res: Response) => {
  //return just the front variables
  //the logic for this could be paramaeterized and we could
  //have a config service that returns the config variables

  const auth = {
    ...AUTH_CONFIG,
  };

  return res.json(auth);
});
