@nearBindgen
export class Milestone {
  hash: string;
  payment: u64;
  disputeShare: u64;
  started: bool;
  startedBlock: i64;
  submitted: bool;
  submittedBlock: i64;
  paid: bool;
  paidBlock: i64;

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

  milestones: Array<Milestone>;

  constructor(ownerID: string, partnerID: string, ownerIsSupplier: bool) {
    this.ownerID = ownerID;
    this.partner = partnerID;
    this.ownerIsSupplier = ownerIsSupplier;
    this.status = "Deployed";
    this.signedByOwner = false;
    this.signedByPartner = false;
    this.milestones = new Array<Milestone>();
  }

}
