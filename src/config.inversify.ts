import { Container } from "inversify";

// Templates
import { TemplatesRepositoryI, TemplatesServiceI } from "./core/template";
import { TemplatesRepository } from "./repository/templatesRepository";
import { TemplatesController } from "./controllers/templatesController";
import { TemplatesService } from "./services/templatesService";

import { TYPES } from "./types";

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


export default container;
