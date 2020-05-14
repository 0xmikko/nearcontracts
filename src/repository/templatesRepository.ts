import {Template, TemplatesRepositoryI} from '../core/template';
import {TypeORMRepository} from './typeORMRepository';
import {injectable} from 'inversify';

@injectable()
export class TemplatesRepository extends TypeORMRepository<Template>
    implements TemplatesRepositoryI {
    constructor() {
        super(Template);
    }
}
