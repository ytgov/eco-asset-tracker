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
////////////////////////////////
// Keys to Rooms              //
////////////////////////////////
keysRouter.get("/:keyID/rooms", async (req: Request, res: Response) => {
  const q = new KnexService("room_key");
  const { keyID } = req.params;
  console.log(await q.getAll({}));
  const config: any = {
    fields: "*",
    tableName: "rooms",
    joinTable: "room_key",
    joinField: "rooms._id",
    joinTableField: "room_id",
    query: { key_id: keyID },
  };
  let result = await db.innerJoin(config);
  console.log(result.length);
  return res.json(result);
});

keysRouter.post("/:keyID/rooms", async (req: Request, res: Response) => {
  //assign key to a group of rooms
  const q = new KnexService("room_key");
  let { keyID } = req.params;
  let assignments = req.body.rooms.map((x: any) => ({
    key_id: keyID,
    room_id: x,
  }));
  // assignments.forEach(async (x: any) => {
  //   await q.create(x);
  // });
  await q.delete({ key_id: keyID });
  await q.create(assignments);

  return res.json({ Done: true });
});

////////////////////////////////
// Keys to Personnel          //
////////////////////////////////
keysRouter.get("/:keyID/personnel", async (req: Request, res: Response) => {
  const q = new KnexService("personnel_key");
  const { keyID } = req.params;
  const config: any = {
    fields: "*",
    tableName: "personnel",
    joinTable: "personnel_key",
    joinField: "personnel.ynet_id",
    joinTableField: "personnel_id",
    query: { key_id: keyID },
  };
  let result = await db.innerJoin(config);

  return res.json(result);
});

keysRouter.post("/:keyID/personnel", async (req: Request, res: Response) => {
  //assign key to a group of personnel
  const q = new KnexService("personnel_key");
  let { keyID } = req.params;
  let assignments = req.body.personnel.map((x: any) => ({
    key_id: keyID,
    personnel_id: x,
  }));

  await q.delete({ key_id: keyID });
  await q.create(assignments);

  return res.json({ Done: true });
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
