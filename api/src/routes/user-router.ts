import express, { Request, Response } from "express";
import { KnexUserService } from "../services";
import { body, param } from "express-validator";

import _ from "lodash";

import { ReturnValidationErrors } from "../middleware";
import { checkJwt, loadUser } from "../middleware/authz.middleware";

const db = new KnexUserService("users");

export const userRouter = express.Router();
//userRouter.use(checkJwt, loadUser);

userRouter.get("/me", async (req: Request, res: Response) => {
  return res.json({
    name: "John Doe",
    email: "john.doe@yukon.ca",
    roles: ["Sytem Administrator"],
  });

  // let person = req.user;
  // let me = await db.getByEmail(person.email);
  // return res.json({ data: Object.assign(req.user, me) });
});

userRouter.get("/", async (req: Request, res: Response) => {
  const query = {};
  const fields = req.body.fields; // if null return all fields
  let result = await db.getAll(query, fields);
  return res.json(result);
});

userRouter.get(
  "/:user",
  [param("email").notEmpty().isString()],
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    //get one, and only one user
    let { email } = req.params;
    const query = { email: email };
    const fields = req.body.fields; // if null return all fields
    let result = await db.getAll(query, fields);
    if (result.length === 0) {
      res.status(404).send(`No results found for: ${email}`);
    } else if (result.length === 1) {
      return res.json(result[0]);
    } else {
      return res.status(418).send(`Too many results found for: ${email}`);
    }
    return res.json(result);
  }
);

userRouter.put(
  "/:email",
  [param("email").notEmpty().isString()],
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    // update a user using email as the key
    const { email } = req.params;

    const query = { email: email };
    let u = await db.getAll(query);
    const user = req.body;
    user._id = u[0]._id;
    console.log(u);
    const result = await db.update({ _id: user._id }, user);
    return res.json(result);
    // return res.json({ messages: [{ variant: "success", text: "User saved" }] });
  }
);
userRouter.post(
  "/",
  [body("email").notEmpty().isString()],
  ReturnValidationErrors,
  async (req: Request, res: Response) => {
    // create a new user
    const user = req.body;
    const result = await db.create(user);
    // return res.json(result);
    return res.json({ messages: [{ variant: "success", text: "User saved" }] });
  }
);

// userRouter.delete("/:id",
//     // [param("id").notEmpty()], ReturnValidationErrors,
//     async (req: Request, res: Response) => {
//         const db = req.store.Users as UserService;
//         let { id } = req.params;

//         //await db.disable(id);

//         let list = await db.getAll();

//         return res.json({ data: list, messages: [{ variant: "success", text: "Location removed" }] });
//     });

// // this will be removed when the application is deployed
// userRouter.get("/make-admin/:email/:key",
//     async (req: Request, res: Response) => {
//         const db = req.store.Users as UserService;
//         let user = await db.getByEmail(req.params.email);

//         let { email, key } = req.params;

//         if (key != process.env.SECRET) {
//             return res.status(403).send("Your key is invalid");
//         }

//         if (user) {
//             console.log(`KEY MATCHES, making ${email} an admin`);
//             user.roles = ["Admin"];
//             await db.update(email, user);
//         }

//         res.send("Done");
//     });
