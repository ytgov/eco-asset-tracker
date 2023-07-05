import express, { application, Request, Response } from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";

import { API_PORT, FRONTEND_URL, APPLICATION_NAME, AUTH0_DOMAIN, VUE_APP } from "./config";
// import { doHealthCheck } from "./utils/healthCheck";
// import { userRouter, authoritiesRouter, employeeRouter, departmentRouter, formARouter } from "./routes";

//import { configureLocalAuthentication } from "./routes/auth-local";
// import { RequiresData } from "./middleware";
// import { Seed } from "./data/seed";
import {
  roomsRouter,
  assetsRouter,
  employeeRouter,
  keysRouter,
  userRouter,
  systemRouter,
  configRouter
} from "./routes";
import { isSystemAdministrator } from "./middleware/authz.middleware";

import { CreateMigrationRoutes } from "./data";
// import { migrateLatest, migrateDown, migrateUp } from "./data/migrator";

// runMigrations();

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(fileUpload());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'", AUTH0_DOMAIN],
      "base-uri": ["'self'"],
      "block-all-mixed-content": [],
      "font-src": ["'self'", "https:", "data:"],
      "frame-ancestors": ["'self'"],
      "img-src": ["'self'", "data:"],
      "object-src": ["'none'"],
      "script-src": ["'self'", "'unsafe-eval'"],
      "script-src-attr": ["'none'"],
      "style-src": ["'self'", "https:", "'unsafe-inline'"]
    }
  })
);

// very basic CORS setup
app.use(
  cors({
    origin: FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true
  })
);

CreateMigrationRoutes(app);

// app.get("/seed", RequiresData, async (req: Request, res: Response) => {
//   await Seed(req.store);
//   res.send("Complete")
// })

// app.get("/api/healthCheck", RequiresData, (req: Request, res: Response) => {
//   // app.get("/api/healthCheck",  (req: Request, res: Response) => {
//   doHealthCheck(req, res);
// });

app.use("/api/rooms", roomsRouter);
app.use("/api/assets", assetsRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/keys", keysRouter);
app.use("/api/users", userRouter);
app.use("/api/system", isSystemAdministrator, systemRouter);
app.use("/api/config", configRouter);

// app.use("/api/user", userRouter);

// app.use("/api/departments", departmentRouter);
// app.use("/api/authorities", RequiresData, authoritiesRouter);
// app.use("/api/form-a/", RequiresData, formARouter);

// serves the static files generated by the front-end
app.use(express.static(path.join(__dirname, "web")));

// if no other routes match, just send the front-end
app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "web") + "/index.html");
});

const PORT: number = parseInt(API_PORT as string);

app.listen(PORT, async () => {
  console.log(`${APPLICATION_NAME} API listenting on port ${PORT}`);
});
