import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicRepositoryI } from "../core/basic";

@Entity()
export class Template {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({default: ''})
  name: string;

  @Column({default: ''})
  content: string;

  @Column({default: ''})
  ownerID: string;

  @Column({default: false})
  isPublic: boolean;
}

export interface TemplateDTO {
  id: string;
  name: string;
  content: string;
  isPublic: boolean;
}

export const templateDTOSchema = {
  type: 'object',
  required: ['id', 'name', 'content', 'isPublic'],
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    content: {
      type: 'string',
    },
    isPublic: {
      type: 'boolean',
    }
  },
};

export interface TemplatesRepositoryI extends BasicRepositoryI<Template> {}

export interface TemplatesServiceI {
  create(userID: string, dto: TemplateDTO): Promise<Template>;
  list(userID: string): Promise<Template[] | undefined>;
  findById(userID: string, id: string): Promise<Template | undefined>;
  update(userID: string, dto: TemplateDTO): Promise<Template | undefined>;
}
