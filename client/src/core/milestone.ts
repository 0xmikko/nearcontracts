import CryptoJS from "crypto-js";

export class Milestone {
  private _name: string = "";
  private _description: string = ""; // Things to be done
  private _payment: number = 0;
  private _disputeShare: number = 0;
  private _submitted: boolean = false;
  private _submittedDate: number | undefined;
  private _paid: boolean = false;
  private _paidDate: number | undefined;

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

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get submittedDate(): number | undefined {
    return this._submittedDate;
  }

  set submittedDate(value: number | undefined) {
    this._submittedDate = value;
  }

  get paid(): boolean {
    return this._paid;
  }

  set paid(value: boolean) {
    this._paid = value;
  }

  get paidDate(): number | undefined {
    return this._paidDate;
  }

  set paidDate(value: number | undefined) {
    this._paidDate = value;
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
        buffer = '';
      }
    } else {
      if (str.startsWith("$")) {
        buffer = str + "\n";
        isMilestone = true;
      }
    }
    console.log("MMS " + buffer);
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
        buffer = '';
      }
    } else {
      if (str.startsWith("$")) {
        buffer = str + "\n";
        isMilestone = true;
      } else {
        result += str + "\n";
      }
    }
    console.log("MMS " + buffer);
  }

  if (buffer.length > 0) {
    const newMS = new Milestone(buffer);
    result += newMS.toMarkdown() + "\n";
  }

  return result;
}
