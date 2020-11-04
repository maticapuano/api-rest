import { GET, route } from "awilix-express";
import { Request, Response } from "express";
import { TestService } from "@services/test.service";

@route("/")
export class DefaultController {
  constructor(private readonly testService: TestService) {}

  @GET()
  public index(req: Request, res: Response): Response {
    return res.json({
      route: "default",
      date: this.testService.get(),
    });
  }
}
