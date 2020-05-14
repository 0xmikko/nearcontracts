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

      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      this._service
        .create(req.user.user_id, req.body.content, req.body.isPublic)
        .then((result) => res.json(result))
        .catch(() => res.status(400).send());
    };
  }

  list() {
    return (req: RequestWithUser, res: Response) => {

      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      this._service
          .list(req.user.user_id)
          .then((result) => res.json(result))
          .catch((e) => res.status(400).send(e));
    };
  }

  getOne() {
    return (req: RequestWithUser, res: Response) => {

      if (req.user === undefined || req.user.user_id === undefined) {
        return res.status(400).send("No user id");
      }

      this._service
          .list(req.user.user_id)
          .then((result) => res.json(result))
          .catch(() => res.status(400).send());
    };
  }
}

