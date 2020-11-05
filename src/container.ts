import { SubscriptionMysqlRepository } from "@services/repository/impl/mysql/Subscription.repository";
import { SubscriptionService } from "@services/subscription.service";
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
    subscriptionService: asClass(SubscriptionService).scoped(),
    testService: asClass(TestService).scoped(),
  });

  return app.use(scopePerRequest(container));
};
