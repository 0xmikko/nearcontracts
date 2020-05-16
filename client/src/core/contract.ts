import {Template} from "../../../src/core/template";

export type ContractStage =
    | "Draft"
    | "Negotiating"
    | "Signed"
    | "Finished"
    | "Cancelled"
    | "Hidden";

export interface Contract {
    id: string;
    name: string;
    date: Date;
    status: ContractStage;
    content: string;
    ownerID: string;
    partnerID: string;
    template: Template;
}
