import express, { Request, Response } from "express";
import { Key, keyStatus } from "../data/models";
import { KnexService } from "../services/knex-service";

export const keysRouter = express.Router();

const db = new KnexService("keys");

keysRouter.get("/statuses", async (req: Request, res: Response) => {
  return res.json(keyStatus);
});
keysRouter.get("/empty", async (req: Request, res: Response) => {
  return res.json(new Key());
});

keysRouter.get("/", async (req: Request, res: Response) => {
  const query = {};
  const fields = req.body.fields; // if null return all fields
  // const result = await knex.select(fields).from(tableName);
  let result = await db.getAll(query, fields);
  return res.json(result);
});

keysRouter.get("/:keyID", async (req: Request, res: Response) => {
  const keyID = req.params.keyID;
  const fields = req.body.fields; // if null return all fields
  // const result = await knex.select(fields).from(tableName).where({_id: keyID})
  const result = await db.getAll({ _id: keyID }, fields);
  if (result.length === 0) {
    res.status(404).send(`No results found for room ID: ${keyID}`);
  } else if (result.length === 1) {
    return res.json(result[0]);
  } else {
    return res.status(418).send(`Too many results found for Key ID: ${keyID}`);
  }
});
keysRouter.put("/:keyID", async (req: Request, res: Response) => {
  //update a room
  const keyID = req.params.keyID;
  const room = req.body;
  const result = await db.update({ _id: keyID }, room);
  return res.json(result);
});
keysRouter.delete("/:keyID", async (req: Request, res: Response) => {
  const keyID = req.params.keyID;
  const result = await db.delete({ _id: keyID });
  return res.json(result);
});

keysRouter.post("/", async (req: Request, res: Response) => {
  //create a new room
  console.log(`Creating room key with ID: ${req.body._id}`);
  const key = req.body;
  let result = await db.create(key);
  if (result) {
    return res.status(500).send("Error creating key");
  }
  return res.json(result);
});
