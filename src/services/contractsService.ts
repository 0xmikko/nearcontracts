import {
  Contract,
  ContractCreateDTO,
  ContractsRepositoryI,
  ContractsServiceI, ContractUpdateDTO,
} from "../core/contract";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import {TemplatesRepositoryI} from "../core/template";
import {AccountsRepositoryI} from "../core/accounts";

@injectable()
export class ContractsService implements ContractsServiceI {
  private _repository: ContractsRepositoryI;
  private _accountsRepository: AccountsRepositoryI;
  private _templatesRepository: TemplatesRepositoryI;


  public constructor(
    @inject(TYPES.ContractsRepository) repository: ContractsRepositoryI,
    @inject(TYPES.TemplatesRepository) templatesRepository: TemplatesRepositoryI,
    @inject(TYPES.AccountsRepository) accountsRepository: AccountsRepositoryI

  ) {
    this._repository = repository;
    this._templatesRepository = templatesRepository;
    this._accountsRepository = accountsRepository;
  }

  async create(userId: string, dto: ContractCreateDTO): Promise<Contract> {
    try {
      const template = await this._templatesRepository.findOne(dto.template_id);
      console.log(userId + "!")
      const owner = await this._accountsRepository.findOne(userId);
      console.log(owner)
      if (owner === undefined) throw 'Cant get account for this user';

      const newDoc = new Contract();
      newDoc.name = template?.name || '';
      newDoc.content = template?.content || '';
      newDoc.date = new Date();

      newDoc.owner = owner;
      return this._repository.upsert(newDoc);
    } catch (e) {
      throw e;
    }

  }

  list(userId: string): Promise<Contract[] | undefined> {
    return this._repository.list();
  }

  findById(userId: string, id: string): Promise<Contract | undefined> {
    return this._repository.findOne(id);
  }

  async update(userId: string, dto: ContractUpdateDTO): Promise<Contract | undefined> {
    const contract = await this._repository.findOne(dto.id);
    if (contract===undefined) {
      throw 'Contract not found'
    }

    const partner = await this._accountsRepository.findOne(dto.partnerID);
    if (partner === undefined) throw 'Cant get account for partner';


    contract.name = dto.name;
    contract.content = dto.content;
    contract.isDeployed = dto.isDeployed;
    contract.address = dto.address;
    contract.ownerIsSupplier = dto.ownerIsSupplier;
    contract.partner = partner;
    contract.date = dto.date

    return this._repository.upsert(contract);
  }
}
