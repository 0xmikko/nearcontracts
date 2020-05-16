import {Contract, ContractsRepositoryI} from '../core/contract';
import {TypeORMRepository} from './typeORMRepository';
import {injectable} from 'inversify';

@injectable()
export class ContractsRepository extends TypeORMRepository<Contract>
    implements ContractsRepositoryI {
    constructor() {
        super(Contract);
    }
}
