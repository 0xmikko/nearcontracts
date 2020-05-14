import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicRepositoryI } from "../core/basic";

@Entity()
export class Template {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @Column()
  owner: string;

  @Column()
  isPublic: boolean;
}

export interface TemplatesRepositoryI extends BasicRepositoryI<Template> {}

export interface TemplatesServiceI {
  create(userID: string, content: string, isPublic: boolean): Promise<Template>;
  list(userID: string): Promise<Template[] | undefined>;
  findById(userID: string, id: string): Promise<Template | undefined>;
  update(id: string, content: string): Promise<void>;
}
