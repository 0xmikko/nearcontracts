import { User, UsersRepositoryI, UsersServiceI } from "../core/user";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { UsersRepositoryI } from "../core/user";

@injectable()
export class UsersService implements UsersServiceI {
  private _repository: UsersRepositoryI;

  public constructor(
    @inject(TYPES.UsersRepository) repository: UsersRepositoryI
  ) {
    this._repository = repository;
  }

  create(login: string, password: string): void {
    this._repository.upsert({
      email: login,
      password: password,
      documents: [],
    });
  }
}
