// Interface to intract with Smartcontract
import * as nearlib from "near-api-js";
import {Agreement, Milestone} from "../../../contract/assembly/model";

export type ContractStage =
    | "Draft"
    | "Signed"
    | "Finished"
    | "Cancelled"
    | "Hidden";


export interface NCContract extends nearlib.Contract {
    getAgreement(id: string): Agreement
    addNewMilestone(id: string, ms: Milestone) : void
    submitMilestone(id: string, index: number) : void
    signByOwner(id: string): void
    signAsPartner(id: string) : void
}
