import { NextFunction, Request, Response } from "express";

import { attemptSilentLogin } from "express-openid-connect";
import axios from "axios";
import { AUTH0_DOMAIN, AUTH0_AUDIENCE } from "../config";
import { auth } from "express-oauth2-jwt-bearer";
// import { UserService } from "../services";
import { KnexUserService } from "../services";

export const checkJwt = auth({
  audience: "testing",
  issuerBaseURL: `https://cirque.auth0.com/`,
});

export async function loadUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const db = req.store.Users as KnexUserService;
  const db = new KnexUserService("users");

  let sub = req.user.sub;
  const token = req.headers.authorization || "";

  // let u = await db.getAll(sub);

  // if (u) {
  //   req.user = { ...req.user, ...u };
  //   return next();
  // }

  await axios
    .get(`${AUTH0_DOMAIN}userinfo`, { headers: { authorization: token } })
    .then(async (resp) => {
      if (resp.data && resp.data.email) {
        let email = resp.data.email;
        sub = resp.data.sub;

        let u = await db.getAll({ email: email });
        if (u.length > 0) {
          req.user = u[0];
          next();
        } else {
          req.user = resp.data;
          req.user.roles = "System Admin";
          //Optionally, you could craete the user in the database and leave them as inactive
          // await db.create({ email, sub, status: "Inactive" });
          //return res.status(406).send();
          next();
        }
      }
    })
    .catch();
}

export async function isSystemAdministrator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.user.roles = "System Admin";
  return next();
  // const db = new KnexUserService("users");
  // let sub = req.user.sub;
  // let u = await db.getAll(sub);
  // if (u && u.role === "System Administrator") {
  //   return next();
  // }
  // return res.status(401).send();
}

export async function isEditor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.user.roles = "System Admin";
  return next();
  // const db = new KnexUserService("users");
  // let sub = req.user.sub;
  // let u = await db.getAll(sub);
  // if (u && u.role === "System Administrator") {
  //   return next();
  // }
  // return res.status(401).send();
}
