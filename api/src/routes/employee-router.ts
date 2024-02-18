import express, { Request, response, Response } from "express";
import { KnexService } from "../services/knex-service";
import { ReturnValidationErrors } from "../middleware";
import _, { join } from "lodash";
import { DirectoryService } from "../services";
import { Employee, emptyEmployee } from "../data/models";
import { body, param } from "express-validator";
import moment from "moment";

const db = new KnexService("personnel");

export const employeeRouter = express.Router();
const directoryService = new DirectoryService();

////////////////////////////////////
// GET EMPLOYEE'S ROOMS           //
////////////////////////////////////

employeeRouter.get(
  "/:employeeID/rooms",
  async (req: Request, res: Response) => {
    //get the rooms for a given employee
    const q = new KnexService("personnel_room");
    // let result = await q.getAll({});

    const config: any = {
      // fields: ["rooms.name as name", "rooms._id as room_id"],
      fields: "*",
      tableName: "rooms",
      joinTable: "personnel_room",
      joinField: "rooms._id",
      joinTableField: "room_id",
      query: { personnel_id: req.params.employeeID },
    };
    let result = await db.innerJoin(config);
    console.log(result);
    return res.json(result);
  }
);
employeeRouter.post(
  "/:employeeID/rooms",
  async (req: Request, res: Response) => {
    //assign room to an employee
    const q = new KnexService("personnel_room");
    let { employeeID } = req.params;
    let assignments = req.body.rooms.map((x: any) => ({
      personnel_id: employeeID,
      room_id: x,
    }));
    // assignments.forEach(async (x: any) => {
    //   await q.create(x);
    // });
    await q.delete({ personnel_id: employeeID });
    await q.create(assignments);

    return res.json({ Done: true });
  }
);
////////////////////////////////////
// GET EMPLOYEE'S KEYS           //
////////////////////////////////////

employeeRouter.get("/:employeeID/keys", async (req: Request, res: Response) => {
  //get the keys for a given employee
  const q = new KnexService("personnel_key");
  let { employeeID } = req.params;
  console.log(await q.getAll({ personnel_id: employeeID }));
  const config: any = {
    fields: "*",
    tableName: "keys",
    joinTable: "personnel_key",
    joinField: "keys._id",
    joinTableField: "key_id",
    query: { personnel_id: employeeID },
  };
  let result = await db.innerJoin(config);
  return res.json(result);
});
employeeRouter.post(
  "/:employeeID/keys",
  async (req: Request, res: Response) => {
    //assign room to an employee
    const q = new KnexService("personnel_key");
    let { employeeID } = req.params;
    let assignments = req.body.keys.map((x: any) => ({
      personnel_id: employeeID,
      key_id: x,
    }));
    // assignments.forEach(async (x: any) => {
    //   await q.create(x);
    // });
    await q.delete({ personnel_id: employeeID });
    await q.create(assignments);

    return res.json({ Done: true });
  }
);

employeeRouter.get("/empty", async (req: Request, res: Response) => {
  return res.json(emptyEmployee);
});

employeeRouter.get("/", async (req: Request, res: Response) => {
  const query = {};
  const fields = req.body.fields; // if null return all fields
  let result = await db.getAll(query, fields);
  return res.json(result);
});

employeeRouter.get("/:employeeID", async (req: Request, res: Response) => {
  const employeeID = req.params.employeeID;
  const fields = req.body.fields; // if null return all fields
  // const result = await knex.select(fields).from(tableName).where({_id: keyID})
  const result = await db.getAll({ ynet_id: employeeID }, fields);
  if (result.length === 0) {
    res.status(404).send(`No results found for employee ID: ${employeeID}`);
  } else if (result.length === 1) {
    return res.json(result[0]);
  } else {
    return res
      .status(418)
      .send(`Too many results found for Employee ID: ${employeeID}`);
  }
});

employeeRouter.put("/:employeeID", async (req: Request, res: Response) => {
  //update a room
  const employeeID = req.params.employeeID;
  const employee = req.body;
  const result = await db.update({ _id: employeeID }, employee);
  return res.json(result);
});
employeeRouter.get(
  "/:employeeID/assets",
  async (req: Request, res: Response) => {
    const assetDB = new KnexService("assets");
    const employeeID = req.params.employeeID;
    const fields = req.body.fields;

    const result = await assetDB.getAll({ person: employeeID }, fields);
    if (result.length === 0) {
      res.status(404).send(`No assets found for employee ID: ${employeeID}`);
    } else {
      return res.json(result);
    }
  }
);

employeeRouter.post("/", async (req: Request, res: Response) => {
  //create a new employee
  console.log(`Creating employee ${req.body.email}`);
  const employee = req.body;
  let result = await db.create(employee);
  return res.json(result);
});
employeeRouter.delete("/:employeeID", async (req: Request, res: Response) => {
  //create a new employee

  const employeeID = req.params.employeeID;

  try {
    let result = await db.delete({ _id: employeeID });
    return res.json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// employeeRouter.post('/search',
//   [body("terms").notEmpty().trim()], ReturnValidationErrors,
//   async (req: Request, res: Response) => {
//     let { terms } = req.body;

//     //return all the authorites assigned to the account

//     let db = req.store.Employees as GenericService<Employee>;
//     let reg = new RegExp(terms, "i");

//     let list = await db.getAll({
//       $or: [
//         { "first_name": { $regex: reg } },
//         { "last_name": { $regex: reg } },
//         { "ynet_id": { $regex: reg } },
//       ]
//     });

//     //console.log("MATCHES FOR: ", terms, list.length);

//     for (let item of list) {
//       item.display_name = `${item.first_name} ${item.last_name}`;
//       item.long_name = `${item.display_name} (${item.ynet_id}) - ${item.position}`;
//     }

//     return res.json({ data: list });
//   });

employeeRouter.post(
  "/search-directory",
  //[body("terms").notEmpty().trim()], ReturnValidationErrors,
  async (req: Request, res: Response) => {
    let { terms } = req.body;
    console.log("Search Directory");
    await directoryService.connect();
    let results = await directoryService.search(terms);

    return res.json({ data: results });
  }
);

// employeeRouter.get('/:id',
// [param("id").notEmpty()], ReturnValidationErrors,
// async (req: Request, res: Response) => {
//   let empDb = req.store.Employees as GenericService<Employee>;
//   let autDb = req.store.Authorities as GenericService<Authority>;

//   //departments are no longer stored in the DB
//   // let depDb = req.store.Departments as GenericService<Department>;

//   let { id } = req.params;
//   //let item = await empDb.getOne({ ynet_id: id });

//   //if (item) {
//   let item = { authorities: new Array<any>() };
//   let authorities = await autDb.getAll({ "employee.ynet_id": id });

//   if (authorities.length > 0) {
//     let item = _.clone(authorities[authorities.length - 1].employee as any);
//     item.authorities = authorities;

//     for (let auth of item.authorities) {
//       // auth.department = await depDb.getOne({ _id: new ObjectId(auth.department_id) });

//       /*  if (auth.issue_date)
//          auth.issue_date_display = moment(auth.issue_date).utc(false).format("YYYY-MM-DD"); */
//     }
//     return res.json({ data: item });
//   }

//   //return res.json({ data: item });
//   //}

//   res.status(404).send();
// });

// employeeRouter.put('/:id',
//   [param("id").isMongoId()], ReturnValidationErrors,
//   async (req: Request, res: Response) => {
// update local employee
//     let empDb = req.store.Employees as GenericService<Employee>;

//     let { id } = req.params;
//     let { first_name, last_name, employee_id, ynet_id, primary_department } = req.body;
//     let item = await empDb.getOne({ _id: new ObjectId(id) });

//     if (item) {
//       let update = { first_name, last_name, employee_id, ynet_id, primary_department, email: item.email };
//       empDb.update(id, update);

//       return res.json({ data: item });
//     }

//     res.status(404).send();
//   });
