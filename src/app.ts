import { loadControllers } from "awilix-express";
import express, { Application } from "express";
import loadContainer from "./container";

const app: Application = express();

//Container
loadContainer(app);

//Load controllers
app.use("/api", loadControllers("controllers/*.controller.ts", { cwd: __dirname }));

export { app };
