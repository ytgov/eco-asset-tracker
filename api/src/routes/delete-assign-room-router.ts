import express, { Request, Response } from "express";
import { KnexService } from "../services/knex-service";
import { ReturnValidationErrors } from "../middleware";
import _, { join } from "lodash";
import { Employee, emptyEmployee } from "../data/models";
import { body, param } from "express-validator";
import moment from "moment";

const db = new KnexService("personnel_room");

export const assignRoom = express.Router();

assignRoom.get("/", async (req: Request, res: Response) => {
  //get all personnel_room assignments
  const query = {};
  const fields = req.body.fields; // if null return all fields
  let result = await db.getAll(query, fields);
  return res.json(result);
});

assignRoom.post("/", async (req: Request, res: Response) => {
  //put something into the room join
  const assignment = req.body;
  let result = await db.create(assignment);
  return res.json(result);
});
assignRoom.get(
  "/personnel/:employeeID",
  async (req: Request, res: Response) => {
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
  }
);

assignRoom.get("/room/:roomID", async (req: Request, res: Response) => {
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

assignRoom.put("/:employeeID", async (req: Request, res: Response) => {
  //update a room
  const employeeID = req.params.employeeID;
  const employee = req.body;
  const result = await db.update({ _id: employeeID }, employee);
  return res.json(result);
});

assignRoom.post("/", async (req: Request, res: Response) => {
  //create a new employee
  console.log(`Creating employee ${req.body.email}`);
  const employee = req.body;
  let result = await db.create(employee);
  return res.json(result);
});
assignRoom.delete("/:employeeID", async (req: Request, res: Response) => {
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

// assignRoom.post('/search',
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

// assignRoom.post(
//   "/search-directory",
//   //[body("terms").notEmpty().trim()], ReturnValidationErrors,
//   async (req: Request, res: Response) => {
//     let { terms } = req.body;
//     console.log("Search Directory");
//     await directoryService.connect();
//     let results = await directoryService.search(terms);

//     return res.json({ data: results });
//   }
// );

// assignRoom.get('/:id',
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

// assignRoom.put('/:id',
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
