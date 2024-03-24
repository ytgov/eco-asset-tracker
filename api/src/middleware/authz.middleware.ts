import * as config from "../config";
import { KnexUserService } from "../services";
import { Request, Response, NextFunction } from "express";

export async function loadUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore
  if (!req.auth) {
    const err = new Error("Not Authenticated");
    // @ts-ignore
    err.status = 401; // HTTP status code for Unauthorized
    return next(err);
  }

  // const db = req.store.Users as KnexUserService;
  //@ts-ignore
  req.user = await loadUserProfileFromIdp(req.auth?.token || "");
  // req.user.roles = await loadUserProfileFromDb(req.user?.email);
  req.user.roles = await loadUserProfileFromDb("Jackie.Taylor@yukon.ca");

  // req.roles await

  // let u = await db.getAll(sub);

  // if (u) {
  //   req.user = { ...req.user, ...u };
  //   return next();
  // }

  next();
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

async function loadUserProfileFromIdp(token: string) {
  const url = `${config.ISSUER_BASE_URL}/userinfo`; // replace with your endpoint
  return await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Bearer token authorization
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function loadUserProfileFromDb(email: string) {
  const db = new KnexUserService("users");
  let u = await db.getAll({ email: email });
  // console.log(u);
  return u;

  // await axios
  //   .get(`${AUTH0_DOMAIN}userinfo`, { headers: { authorization: token } })
  //   .then(async (resp) => {
  //     if (resp.data && resp.data.email) {
  //       let email = resp.data.email;
  //       sub = resp.data.sub;

  //       let u = await db.getAll({ email: email });
  //       if (u.length > 0) {
  //         req.user = u[0];
  //         next();
  //       } else {
  //         req.user = resp.data;
  //         req.user.roles = "System Admin";
  //         //Optionally, you could craete the user in the database and leave them as inactive
  //         // await db.create({ email, sub, status: "Inactive" });
  //         //return res.status(406).send();
  //         next();
  //       }
  //     }
  //   })
  //   .catch();
}
