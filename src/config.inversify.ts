import { Container } from "inversify";

// Templates
import { TemplatesRepositoryI, TemplatesServiceI } from "./core/template";
import { TemplatesRepository } from "./repository/templatesRepository";
import { TemplatesController } from "./controllers/templatesController";
import { TemplatesService } from "./services/templatesService";

import { TYPES } from "./types";
import {ContractsRepositoryI, ContractsServiceI} from "./core/contract";
import {ContractsRepository} from "./repository/contractsRepository";
import {ContractsService} from "./services/contractsService";
import {ContractsController} from "./controllers/contractsController";

let container = new Container();

// TEMPLATES
container
  .bind<TemplatesRepositoryI>(TYPES.TemplatesRepository)
  .to(TemplatesRepository)
  .inSingletonScope();
container.bind<TemplatesServiceI>(TYPES.TemplatesService).to(TemplatesService);
container
  .bind<TemplatesController>(TYPES.TemplatesController)
  .to(TemplatesController);

// CONTRACTS
container
    .bind<ContractsRepositoryI>(TYPES.ContractsRepository)
    .to(ContractsRepository)
    .inSingletonScope();
container.bind<ContractsServiceI>(TYPES.ContractsService).to(ContractsService);
container
    .bind<ContractsController>(TYPES.ContractsController)
    .to(ContractsController);

export default container;
