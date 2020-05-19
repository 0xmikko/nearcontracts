import {
  Account,
  AccountsRepositoryI,
  AccountsServiceI,
  AccountUpdateDTO,
} from "../core/accounts";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class AccountsService implements AccountsServiceI {
  private _repository: AccountsRepositoryI;

  public constructor(
    @inject(TYPES.AccountsRepository) repository: AccountsRepositoryI
  ) {
    this._repository = repository;
  }

  list(): Promise<Account[] | undefined> {
    return this._repository.list();
  }

  get(userId: string): Promise<Account> {
    return new Promise<Account>(async (resolve) => {
      try {
        const account = await this._repository.findOne(userId);
        resolve(account);
      } catch (e) {
        const account = new Account();
        account.id = userId;
        account.name = "";
        account.status = "CONNECTING_ACCOUNT";
        await this._repository.insert(account);
        resolve(account);
      }
    });
  }

  async update(
    userId: string,
    dto: AccountUpdateDTO
  ): Promise<Account> {
    const account = await this.get(userId);
    account.name = dto.name;
    account.address = dto.address;

    return this._repository.upsert(account);
  }
}
