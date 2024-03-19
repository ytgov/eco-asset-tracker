import * as config from "../config";
import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";

//JWT Checks
//This populates `req.auth` with the decoded token.
export const checkJwt = auth({
  issuerBaseURL: config.ISSUER_BASE_URL,
  audience: config.AUDIENCE,
  authRequired: false,
});

export async function requiresAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.auth) {
    return res.status(401).send();
  }
  next();
}
