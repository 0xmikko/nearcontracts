@nearBindgen
export class Milestone {
  name: string;
  description: string; // Things to be done
  payment: u64;
  deadline: u64;
  disputeShare: u64;
  submitted: bool;
  submittedDate: u64;
  paid: bool;
  paidDate: u64;
}

@nearBindgen
export class Agreement {
  ownerID: string;
  ownerIsSupplier: bool;

  partner: string;
  status: string;

  signedByOwner: bool;
  signedByPartner: bool;

  currentMilestone: u64;
  milestones: Array<Milestone>;

  constructor(ownerID: string, ownerIsSupplier: bool) {
    this.ownerID = ownerID;
    this.ownerIsSupplier = ownerIsSupplier;
  }

  public addMilestone(m: Milestone) : void {
    if (this.status !== "Deployed") {
      this.milestones.push(m);
    }
  }

  public submitMilestone() :void {
    this.milestones[this.currentMilestone].submitted = true;
    // this.milestones[this.currentMilestone].submittedDate = Date.now();
  }

  public nextMilestone() : void {
    this.milestones[this.currentMilestone].paid = true;
    // this.milestones[this.currentMilestone].paidDate = Date.now();
    if (this.currentMilestone < this.milestones.length - 1) {
      this.currentMilestone++;
    }
  }

  public checkIsOwner(id: string) : void{
    if (this.ownerID !== id) throw "Allowed for agreement owner only";
  }

  public checkIsPartner(id: string): void {
    if (this.partner !== id) throw "Allowed for agreement partner only";
  }

  public checkIsSupplier(id: string) : void {
    if (this.ownerIsSupplier) {
      this.checkIsOwner(id);
    } else {
      this.checkIsPartner(id);
    }
  }

  public signByOwner() :void {
    this.signedByOwner = true;
    this.checkSign();
  }
  //
  public signByPartner() :void{
    this.signedByPartner = true;
    this.checkSign();
  }
  //
  private checkSign() :void {
    if (this.signedByOwner && this.signedByPartner) {
      this.status = "Signed";
    }
  }
}

