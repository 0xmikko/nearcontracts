@nearBindgen
export class Milestone {
  hash: string;
  payment: u64;
  disputeShare: u64;
  submitted: bool;
  submittedDate: u64;
  paid: bool;
  paidDate: u64;

  constructor(hash: string, payment: u64, disputeShare: u64) {
    this.hash = hash;
    this.payment = payment;
    this.disputeShare = disputeShare;
  }
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
    this.status = 'Deployed';
    this.currentMilestone=0;
    this.signedByOwner = false;
    this.signedByPartner = false;
    this.milestones = new Array<Milestone>(0)
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

