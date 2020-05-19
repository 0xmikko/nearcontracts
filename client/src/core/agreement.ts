import {ContractStage} from "./contract";

export interface Agreement{
    ownerID: string;
    ownerIsSupplier: boolean;
    partner: string;
    status: ContractStage;
    signedByOwner: boolean;
    signedByPartner: boolean;
    currentMilestone: number;
    milestones: AgreementMilestone[];
}

export interface AgreementMilestone {
    hash: string;
    payment: number;
    disputeShare: number;
    started: boolean;
    startedBlock: number;
    submitted: boolean
    submittedBlock: number;
    paid: boolean
    paidBlock: number;

}
