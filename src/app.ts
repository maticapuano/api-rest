import { loadControllers } from "awilix-express";
import express, { Application } from "express";
import loadContainer from "./container";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Container
loadContainer(app);

//Load controllers
app.use("/api", loadControllers("controllers/*.controller.ts", { cwd: __dirname }));

export { app };
