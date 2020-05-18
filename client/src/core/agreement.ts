import {ContractStage} from "./contract";
import {Milestone} from "./milestone";

export interface Agreement{
    ownerID: string;
    ownerIsSupplier: boolean;
    partner: string;
    status: ContractStage;
    signedByOwner: boolean;
    signedByPartner: boolean;
    currentMilestone: number;
    milestones: Milestone[];
}
