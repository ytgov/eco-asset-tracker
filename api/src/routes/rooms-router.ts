import axios from "axios";
import express, { Request, Response } from "express";
import { keyStatus } from "src/data/models";
import { Room, roomPurposes, roomStatuses } from "../data/models/eco-room";
import { roomSeed } from "../data/seed-data/eco-room";
import { KnexService } from "../services/knex-service";

export const roomsRouter = express.Router();

const db = new KnexService("rooms");

const tableName = "rooms";

// roomsRouter.get("/system", async (req: Request, res: Response) => {
//   let result = await db.ensureDatabaseConnected();
//   return res.json(result);
// });
roomsRouter.get("/purposes", async (req: Request, res: Response) => {
  return res.json(roomPurposes);
});
roomsRouter.get("/statuses", async (req: Request, res: Response) => {
  return res.json(roomStatuses);
});
roomsRouter.get("/", async (req: Request, res: Response) => {
  const query = {};
  const fields = req.body.fields; // if null return all fields
  // const result = await knex.select(fields).from(tableName);
  let result = await db.getAll(query, fields);
  return res.json(result);
});

roomsRouter.post("/:roomID/personnel", async (req: Request, res: Response) => {
  //assign room to an employee
  const q = new KnexService("personnel_room");
  let { roomID } = req.params;
  let assignments = req.body.people.map((x: any) => ({
    room_id: roomID,
    personnel_id: x,
  }));
  // assignments.forEach(async (x: any) => {
  //   await q.create(x);
  // });
  await q.delete({ room_id: roomID });
  await q.create(assignments);

  return res.json({ Done: true });
});

roomsRouter.get("/:roomID/personnel", async (req: Request, res: Response) => {
  //get the rooms for a given employee
  const q = new KnexService("personnel_room");
  // let result = await q.getAll({});

  const config: any = {
    // fields: [
    //   "rooms.name as name",
    //   "rooms._id as room_id",
    //   "rooms.purpose as purpose",
    // ],
    fields: "*",
    tableName: "personnel",
    joinTable: "personnel_room",
    joinField: "personnel.ynet_id",
    joinTableField: "personnel_id",
    query: { room_id: req.params.roomID },
  };
  let result = await db.innerJoin(config);
  return res.json(result);
});
roomsRouter.get("/:roomID/keys", async (req: Request, res: Response) => {
  //get the keys for a given room
  const q = new KnexService("room_keys");
  // let result = await q.getAll({});

  const config: any = {
    fields: [
      "keys._id as _id",
      "keys.code as code",
      "keys.number as number",
      "keys.assignedUser as assignedUser",
    ],
    // fields: "*",
    tableName: "keys",
    joinTable: "room_key",
    joinField: "keys._id",
    joinTableField: "key_id",
    query: { room_id: req.params.roomID },
  };
  let result = await db.innerJoin(config).then(async (keys) => {
    for (let x in keys) {
      let key = keys[x];
      key.assignedUsers = await axios
        .get(`http://localhost:3000/api/keys/${key._id}/personnel`)
        .then((resp) => {
          return resp.data.map((x: any) => x.display_name);
        });

      return keys;
    }
  });

  // To get the person who are assigned to the keys multiple calls are needed
  // to the keys endpoint - one call for each key assigned to the room.
  // This could take a long time.

  return res.json(result);
});

roomsRouter.get("/:roomID", async (req: Request, res: Response) => {
  const roomID = req.params.roomID;
  const fields = req.body.fields; // if null return all fields
  // const result = await knex.select(fields).from(tableName).where({_id: roomID})
  const result = await db.getAll({ _id: roomID }, fields);
  if (result.length === 0) {
    res.status(404).send(`No results found for room ID: ${roomID}`);
  } else if (result.length === 1) {
    return res.json(result[0]);
  } else {
    return res
      .status(418)
      .send(`Too many results found for room ID: ${roomID}`);
  }
});
roomsRouter.put("/:roomID", async (req: Request, res: Response) => {
  //update a room
  const roomID = req.params.roomID;
  const room = req.body;
  const result = await db.update({ _id: roomID }, room);
  return res.json(result);
});
roomsRouter.delete("/:roomID", async (req: Request, res: Response) => {
  const roomID = req.params.roomID;
  const result = await db.delete({ _id: roomID });
  return res.json(result);
});

roomsRouter.post("/", async (req: Request, res: Response) => {
  //create a new room

  const room = req.body;
  let result = await db.create(room);
  return res.json(result);
});

// roomsRouter.post("/killit", async (req: Request, res: Response) => {
//   //create a new room

//   let result = await db.db.schema.dropTable("rooms");
//   return res.json(result);
// });
