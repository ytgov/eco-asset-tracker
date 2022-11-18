import express, { Request, Response } from "express";
import { Room, roomPurposes, roomStatuses } from "../data/models/eco-room";
import { roomSeed } from "../data/seed-data/eco-room";
import { KnexService } from "../services/knex-service";

export const roomsRouter = express.Router();

const db = new KnexService("rooms");

const tableName = "rooms";

/// SETUP STUFF ///
// roomsRouter.get('/seed', async (req: Request, res: Response) => {
//   console.log("Building tables...");
//   await knex.schema.createTable(tableName, (table: any ) => {
//     // table.increments();
//     table.integer('_id');
//     table.string('name');
//     table.integer('size');
//     table.string('number');
//     table.string('buildingID');
//     table.string('branchID');
//     table.string('purpose');
//     table.string('status');
//     table.string('sizes');
//     table.string('notes');

//     //audit
//     table.timestamps('modified')
//     table.string('modified_by');
//   })

//   // await knex.schema.createTable('keys', (table: any) => {
//   //   table.integer('_id')
//   //   table.uuid('keyUID').primary()
//   //   table.boolean('active')
//   //   table.string('status') //should actually be an enum

//   //   //assignment information
//   //   table.string('assigned_to')
//   //   table.string('assigned_by')
//   //   table.timestamps('assigned_date')

//   //   //audit information
//   //   table.timestamps('modified')
//   //   table.string('modified_by')

//   // })

//   // await knex.schema.createTable('keys', (table: any) => {
//   //   table.integer('_id');
//   //   table.string('assetNumber');
//   //   table.string('type');
//   //   table.string('make');
//   //   table.string('model');
//   //   table.string('description');
//   //   table.date('puchaseDate');
//   //   table.date('installDate');
//   //   table.string('installStatus');
//   //   table.string('status');
//   //   table.string('statusReason');
//   //   table.boolean('active');
//   //   table.string('room');
//   //   table.person('person');
//   //   table.string('note');

//   // })

//   await knex('rooms').insert (
//     roomSeed
//   )
//   return res.json({done: 'built'});
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

roomsRouter.get("/:roomID/personnel", async (req: Request, res: Response) => {
  //get the rooms for a given employee
  const q = new KnexService("personnel_room");
  // let result = await q.getAll({});

  const config: any = {
    // fields: ["rooms.name as room", "rooms._id as room_id"],
    fields: "*",
    tableName: "personnel",
    joinTable: "personnel_room",
    joinField: "personnel.ynet_id",
    joinTableField: "personnel_id",
    query: { room_id: req.params.roomID },
  };
  let result = await db.innerJoin(config);
  console.log(result);
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

roomsRouter.post("/killit", async (req: Request, res: Response) => {
  //create a new room

  let result = await db.db.schema.dropTable("rooms");
  return res.json(result);
});
