import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasicRepositoryI } from "../core/basic";

export type ContractStage = "Draft" | 'Negotiating' | "Signed" | "Finished" | "Cancelled" | 'Hidden';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: "" })
  name: string;

  @Column()
  date: Date;

  @Column({ default: "" })
  content: string;

  @Column({ default: "" })
  ownerID: string;

  @Column({default: ""})
  partnerID: string;
}

export interface ContractDTO {
  id: string;
  name: string;
  content: string;
  isPublic: boolean;
}

export const contractDTOSchema = {
  type: "object",
  required: ["id", "name", "content", "isPublic"],
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    content: {
      type: "string",
    },
    isPublic: {
      type: "boolean",
    },
  },
};

export interface ContractsRepositoryI extends BasicRepositoryI<Contract> {}

export interface ContractsServiceI {
  create(userID: string, dto: ContractDTO): Promise<Contract>;
  list(userID: string): Promise<Contract[] | undefined>;
  findById(userID: string, id: string): Promise<Contract | undefined>;
  update(userID: string, dto: ContractDTO): Promise<Contract | undefined>;
}
