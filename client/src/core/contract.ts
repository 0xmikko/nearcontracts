import { Template } from "../../../src/core/template";
import {convertMarkdown, extractMilestones, Milestone} from "./milestone";
import {Agreement} from "./agreement";

export type ContractStage =
    | "Draft"
    | 'Deployed'
    | 'Signed'
    | "Finished"
    | "Cancelled"
    | "Error";

export interface Contract {
  id: string;
  name: string;
  isDeployed: boolean;
  address?: string;
  date: Date;
  content: string;
  ownerIsSupplier: boolean;
  ownerID?: string;
  partnerID?: string;
  template?: Template;
  template_id?: string;
  agreement?: Agreement;
}

export const DefaultNewContract: Contract = {
  id: "new",
  name: "",
  date: new Date(),
  content: "",
  ownerIsSupplier: true,
  isDeployed: false,
};

export class ContractManager {
  private _contract: Contract;
  private _milestones: Milestone[];
  private _status: ContractStage;

  constructor(contract: Contract) {
    this._contract = contract;
    this._milestones = this.extractMilestonesFromText();

    if (this._contract.isDeployed) {
        this._status =  this._contract.agreement === undefined ? 'Error' : this._contract.agreement.status;
    } else {
      this._status = 'Draft';
    }
  }

  get milestones(): Milestone[] {
    return this._milestones;
  }

  get status(): ContractStage {
    return this._status;
  }

  private extractMilestonesFromText(): Milestone[] {
    return  extractMilestones(this._contract.content);
  }

  toMarkdown(): string {
    return convertMarkdown(this._contract.content);
  }
}
