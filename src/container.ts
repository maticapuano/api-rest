import { SubscriptionMysqlRepository } from "@services/repository/impl/mysql/Subscription.repository";
import { TestService } from "@services/test.service";
import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";

export default (app: Application): Application => {
  const container = createContainer({ injectionMode: "CLASSIC" });

  container.register({
    //Repository
    subscriptionRepository: asClass(SubscriptionMysqlRepository).scoped(),

    //Services
    testService: asClass(TestService).scoped(),
  });

  return app.use(scopePerRequest(container));
};
