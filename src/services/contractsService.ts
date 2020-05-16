import {
  Contract,
  ContractCreateDTO,
  ContractsRepositoryI,
  ContractsServiceI, ContractUpdateDTO,
} from "../core/contract";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import {TemplatesRepositoryI} from "../core/template";

@injectable()
export class ContractsService implements ContractsServiceI {
  private _repository: ContractsRepositoryI;
  private _templatesRepository: TemplatesRepositoryI;


  public constructor(
    @inject(TYPES.ContractsRepository) repository: ContractsRepositoryI,
    @inject(TYPES.TemplatesRepository) templatesRepository: TemplatesRepositoryI

  ) {
    this._repository = repository;
    this._templatesRepository = templatesRepository;
  }

  async create(userId: string, dto: ContractCreateDTO): Promise<Contract> {
    try {
      const template = await this._templatesRepository.findOne(dto.template_id);
      const newDoc = new Contract();
      newDoc.name = template?.name || '';
      newDoc.content = template?.content || '';
      newDoc.date = new Date();

      newDoc.ownerID = userId;
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
    contract.name = dto.name;
    contract.content = dto.content;

    return this._repository.upsert(contract);
  }
}
