import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasicRepositoryI } from "../core/basic";
import { Template } from "./template";

export type ContractStage =
  | "Draft"
  | "Negotiating"
  | "Signed"
  | "Finished"
  | "Cancelled"
  | "Hidden";

@Entity()
export class Contract {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "" })
  name: string;

  @Column()
  date: Date;

  @Column({ default: "Draft" })
  status: ContractStage;

  @Column({ default: "" })
  content: string;

  @Column({ default: "" })
  ownerID: string;

  @Column({ default: "" })
  partnerID: string;

  @ManyToOne((type) => Template, (template) => template.contracts)
  template: Template;
}

export interface ContractCreateDTO {
  template_id: string;
}

export interface ContractUpdateDTO {
  id: string;
  name: string;
  date: Date;
  content: string;
}

export const contractCreateDTOSchema = {
  type: "object",
  required: ["template_id"],
  properties: {
    template_id: {
      type: "string",
    },
  },
};

export const contractUpdateDTOSchema = {
  type: "object",
  required: ["id", "name", "date", "content"],
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    date: {
      type: "string",
    },
    content: {
      type: "string",
    },
  },
};

export interface ContractsRepositoryI extends BasicRepositoryI<Contract> {}

export interface ContractsServiceI {
  create(userID: string, dto: ContractCreateDTO): Promise<Contract>;
  list(userID: string): Promise<Contract[] | undefined>;
  findById(userID: string, id: string): Promise<Contract | undefined>;
  update(userId: string, dto: ContractUpdateDTO): Promise<Contract | undefined>;
}
