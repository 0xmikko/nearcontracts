import { Template } from "../../../src/core/template";
import { convertMarkdown, extractMilestones, Milestone } from "./milestone";
import { Agreement } from "./agreement";


export type ContractStage =
  | "Draft"
  | "Deployed"
  | "Signed"
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
      this._status =
        this._contract.agreement === undefined
          ? "Error"
          : this._contract.agreement.status;
    } else {
      this._status = "Draft";
    }
  }

  get milestones(): Milestone[] {
    return this._milestones;
  }

  get status(): ContractStage {
    return this._status;
  }

  get signedByOwner() : string {
    return this._contract.agreement === undefined ? "undefined" : this._contract.agreement.signedByOwner ? 'yes' : 'no';
  }

  get signedByPartner() : string {
    return this._contract.agreement === undefined ? "undefined" : this._contract.agreement.signedByPartner ? 'yes' : 'no';
  }

  public isOwner(accountID: string): boolean {
    if (this._contract.agreement === undefined) return false;
    return this._contract.agreement.ownerID === accountID
  }

  public isPartner(accountID: string): boolean {
    if (this._contract.agreement === undefined) return false;
    return this._contract.agreement.partner === accountID
  }

  public couldBeSignedByMe(accountID: string): boolean {
    if (this._contract.agreement === undefined) return false;
    if (this.isOwner(accountID)) {
      return !this._contract.agreement.signedByOwner;
    }

    if (this.isPartner(accountID)) {
      return !this._contract.agreement.signedByPartner;
    }

    return false;
  }

  private extractMilestonesFromText(): Milestone[] {
    return extractMilestones(this._contract.content);
  }

  toMarkdown(): string {
    return convertMarkdown(this._contract.content);
  }
}
