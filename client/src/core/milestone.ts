import CryptoJS from "crypto-js";
import { AgreementMilestone } from "./agreement";

export class Milestone {
  private _name: string = "";
  private _description: string = ""; // Things to be done
  private _payment: number = 0;
  private _disputeShare: number = 0;
  private _started: boolean = false;
  private _startedBlock: number | undefined;
  private _submitted: boolean = false;
  private _submittedBlock: number | undefined;
  private _paid: boolean = false;
  private _paidBlock: number | undefined;
  private _isDeployed: boolean = false;

  constructor(text: string) {
    const lines: string[] = text.split("\n");
    for (let line of lines) {
      this.parseLine(line);
    }
  }

  public toMarkdown(): string {
    return `> #### ${this.name}
> Amount: ${this.payment}  
> Dispute share: ${this.disputeShare}  
> Description:  
> ${this.description}  
> Hash: ${this.hash}  `;
  }

  private parseLine(str: string) {
    const items = str.split(" ");
    console.log("MMS---", items);
    if (items.length < 3) return;
    const name = items[1];
    const value = str.substr(str.indexOf(name) + name.length).trim();
    switch (name.toLowerCase()) {
      case "name:":
        this._name = value;
        return;
      case "description:":
        this._description = value;
        return;
      case "payment:":
      case "amount:":
        this._payment = parseFloat(value);
        return;
      case "disputshare:":
        this._disputeShare = parseFloat(value);
        return;
    }
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get payment(): number {
    return this._payment;
  }

  get disputeShare(): number {
    return this._disputeShare;
  }

  get hash(): string {
    return CryptoJS.SHA256(
      this.name + this.description + this.payment + this.disputeShare
    ).toString();
  }

  public augmentMilestone(ams: AgreementMilestone) {
    this._started = ams.started;
    this._startedBlock = ams.startedBlock;
    this._submitted = ams.submitted;
    this._submittedBlock = ams.submittedBlock;
    this._paid = ams.paid;
    this._paidBlock = ams.paidBlock;
    this._isDeployed = true;
  }

  get isStarted(): boolean {
    return this._started;
  }

  get startedBlock(): string {
    return this._startedBlock === undefined || this._startedBlock == 0
      ? "-"
      : this._startedBlock.toString();
  }

  get isSubmitted(): boolean {
    return this._submitted;
  }

  get submittedBlock(): string {
    return this._submittedBlock === undefined || this._submittedBlock == 0
      ? "-"
      : this._submittedBlock.toString();
  }

  get isPaid(): boolean {
    return this._paid;
  }

  get paidBlock(): string {
    return this._paidBlock === undefined || this._paidBlock == 0
      ? "-"
      : this._paidBlock.toString();
  }

  get isDeployed(): boolean {
    return this._isDeployed;
  }
}

export function extractMilestones(contractText: string): Milestone[] {
  const lines: string[] = contractText.split("\n");
  const result: Milestone[] = [];
  let isMilestone = false;
  let buffer = "";
  for (let str of lines) {
    if (isMilestone) {
      if (str.startsWith("$")) {
        buffer += str + "\n";
      } else {
        result.push(new Milestone(buffer));
        isMilestone = false;
        buffer = "";
      }
    } else {
      if (str.startsWith("$")) {
        buffer = str + "\n";
        isMilestone = true;
      }
    }
  }

  if (buffer.length > 0 && isMilestone) result.push(new Milestone(buffer));

  return result;
}

export function convertMarkdown(contractText: string): string {
  const lines: string[] = contractText.split("\n");
  let result: string = "";
  let isMilestone = false;
  let buffer = "";
  for (let str of lines) {
    if (isMilestone) {
      if (str.startsWith("$")) {
        buffer += str + "\n";
      } else {
        const newMS = new Milestone(buffer);
        result += newMS.toMarkdown() + "\n  \n";
        isMilestone = false;
        buffer = "";
      }
    } else {
      if (str.startsWith("$")) {
        buffer = str + "\n";
        isMilestone = true;
      } else {
        result += str + "\n";
      }
    }
  }

  if (buffer.length > 0) {
    const newMS = new Milestone(buffer);
    result += newMS.toMarkdown() + "\n";
  }

  return result;
}
