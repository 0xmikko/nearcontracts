import { TemplatesServiceI } from "../core/template";
import { Response } from "express";
import {RequestWithUser} from "./types";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";

@injectable()
export class TemplatesController {
  private _service: TemplatesServiceI;

  constructor(@inject(TYPES.TemplatesService) service: TemplatesServiceI) {
    this._service = service;
  }

  create() {
    return (req: RequestWithUser, res: Response) => {
      this._service
        .create(req.body.login, req.body.password)
        .then((result) => res.json(result))
        .catch(() => res.status(400).send());
    };
  }

  list() {
    return (req: RequestWithUser, res: Response) => {

      this._service
          .list(req.user?.id)
          .then((result) => res.json(result))
          .catch(() => res.status(400).send());
    };
  }

  getOne() {
    return (req: RequestWithUser, res: Response) => {

      this._service
          .list(req.user?.id)
          .then((result) => res.json(result))
          .catch(() => res.status(400).send());
    };
  }
}

