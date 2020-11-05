import { ApplicationException } from "@common/exception/Application.exception";
import { Response } from "express";

export abstract class BaseController {
  handlerException(err: ApplicationException, res: Response): void {
    if (err instanceof ApplicationException) {
      res.status(400);
    } else {
      throw new Error(err);
    }
  }
}
