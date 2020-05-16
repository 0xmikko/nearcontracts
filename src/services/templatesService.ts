import {
  Template,
  TemplateDTO,
  TemplatesRepositoryI,
  TemplatesServiceI,
} from "../core/template";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class TemplatesService implements TemplatesServiceI {
  private _repository: TemplatesRepositoryI;

  public constructor(
    @inject(TYPES.TemplatesRepository) repository: TemplatesRepositoryI
  ) {
    this._repository = repository;
  }

  create(userId: string, dto: TemplateDTO): Promise<Template> {
    const newDoc = new Template();
    newDoc.content = dto.content;
    newDoc.name = dto.name;
    newDoc.ownerID = userId;
    newDoc.isPublic = dto.isPublic;
    return this._repository.upsert(newDoc);
  }

  list(userId: string): Promise<Template[] | undefined> {
    return this._repository.list();
  }

  findById(userId: string, id: string): Promise<Template | undefined> {
    return this._repository.findOne(id);
  }

  update(id: string, dto: TemplateDTO): Promise<void> {
    return Promise.resolve(undefined);
  }
}
