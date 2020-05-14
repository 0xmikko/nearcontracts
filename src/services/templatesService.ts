import {
  Template,
  TemplatesRepositoryI,
  TemplatesServiceI,
} from '../core/template';
import {inject, injectable} from 'inversify';
import {TYPES} from '../types';

@injectable()
export class TemplatesService implements TemplatesServiceI {
  private _repository: TemplatesRepositoryI;

  public constructor(
    @inject(TYPES.TemplatesRepository) repository: TemplatesRepositoryI,
  ) {
    this._repository = repository;
  }

  create(userId: string, content: string): Promise<Template> {
  return new Promise<Template>(async (resolve, reject) => {
    try {
      const newDoc: Template = {
        content,
        userID: userId
      }
      this._repository.upsert(newDoc);
    } catch (e) {
      reject(e);
    }
  })

  }

  list(userId: string): Promise<Template[] | undefined> {
    return this._repository.list();
  }

  findById(userId: string, id: string): Promise<Template | undefined> {
    return this._repository.findOne(id);
  }

  update(id: string, content: string): Promise<void> {
    return Promise.resolve(undefined);
  }


}
