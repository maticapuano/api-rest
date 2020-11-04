import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { TestService } from "./services/test.service";

export default (app: Application): Application => {
  const container = createContainer({ injectionMode: "CLASSIC" });

  container.register({
    testService: asClass(TestService).scoped(),
  });

  return app.use(scopePerRequest(container));
};
