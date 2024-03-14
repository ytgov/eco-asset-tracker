import * as dotenv from "dotenv";
import { toNumber } from "lodash";

export const NODE_ENV = process.env.NODE_ENV || "development";

let path;

if (process.env.NODE_ENV == "development") {
  console.log("dev!");
  // dotenv.config({ path: ".env.development.local" });
  path = `../.env.development`;
  dotenv.config({ path: path });
} else {
  dotenv.config();
}
let obj = process.env;

let pattern = "VITE_";

export const VUE_APP: any = Object.keys(obj)
  .filter((k) => k.includes(pattern))
  .reduce((cur, key) => {
    return Object.assign(cur, { [key]: obj[key] });
  }, {});
console.log(`LOADING ${NODE_ENV} CONFIG FROM ${path}`);

export const apiBaseUrl =
  process.env.NODE_ENV == "production" ? "" : "http://localhost:3000";
export const API_PORT = process.env.API_PORT || "3000";
export const FRONTEND_URL = process.env.FRONTEND_URL || "";
export const AUTH_REDIRECT = process.env.AUTH_REDIRECT || "";

export const AUTH0_DOMAIN = `${process.env.VUE_APP_AUTH_DOMAIN}/` || "";
export const AUTH0_AUDIENCE = process.env.VUE_APP_AUTH_AUDIENCE || "";

export const APPLICATION_NAME = process.env.APPLICATION_NAME || "";

export const DATABASE_CONFIG = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
};
//Azure AD configuration
export const AD_CLIENT_ID = process.env.AD_CLIENT_ID || "";
export const AD_CLIENT_SECRET = process.env.AD_CLIENT_SECRET || "";
export const AD_TENANT_ID = process.env.AD_TENANT_ID || "";

export const MONGO_DB = process.env.MONGO_DB || "";
export const MONGO_HOST = process.env.MONGO_HOST || "";
export const MONGO_URL = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;

export const API_GATEWAY_KEY = process.env.API_GATEWAY_KEY || "";
export const DEPARTMENT_API_URL =
  "https://api.gov.yk.ca/finance/api/v2/accounts/departments";

export const MAIL_FROM = process.env.MAIL_FROM || "signing-authority@yukon.ca";
export const MAIL_HOST = process.env.MAIL_HOST || "smtp.gov.yk.ca";
export const MAIL_PORT = process.env.MAIL_PORT || 25;
export const MAIL_USER = process.env.MAIL_USER || "";
export const MAIL_PASS = process.env.MAIL_PASS || "";

export const MAIL_CONFIG_DEV = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
};

export const MAIL_CONFIG = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false, // true for 465, false for other ports
};
