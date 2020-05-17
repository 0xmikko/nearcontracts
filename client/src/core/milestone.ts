export class Milestone {
  private _name: string | undefined;
  private _description: string | undefined; // Things to be done
  private _payment: number | undefined;
  private _deadline: number | undefined;
  private _disputeShare: number | undefined;

  constructor(text: string) {
    const lines: string[] = text.split("\n");
    for (let line of lines) {
      this.parseLine(line);
    }
  }

  private parseLine(str: string) {
    const items = str.split(" ");
    console.log("MMS---", items)
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
      case "deadline:":
        this._deadline = Date.parse(value);
        return;
      case "disputShare:":
        this._disputeShare = parseFloat(value);
        return;
    }
  }

  get name(): string | undefined {
    return this._name;
  }

  get description(): string | undefined {
    return this._description;
  }

  get payment(): number | undefined {
    return this._payment;
  }

  get deadline(): number | undefined {
    return this._deadline;
  }

  get disputeShare(): number | undefined {
    return this._disputeShare;
  }
}

export function getMilestones(contractText: string): Milestone[] {
  const lines: string[] = contractText.split("\n");
  console.log("MMS", lines.length);
  const result: Milestone[] = [];
  let isMilestone = false;
  let buffer = "";
  for (let str of lines) {
    if (isMilestone) {
      if (str.startsWith("$")) {
        buffer += str + '\n';
      } else {
        result.push(new Milestone(buffer));
        isMilestone = false;
      }
    } else {
      if (str.startsWith("$")) {
        buffer = str + '\n';
        isMilestone = true;
      }
    }
    console.log("MMS " + buffer);
  }

  if (buffer.length > 0) result.push(new Milestone(buffer));

  return result;
}
