import { context, logging, storage, PersistentMap } from "near-sdk-as";
// available class: context, storage, logging, base58, base64,
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { Agreement, Milestone } from "./model";

const START_SUM = 1000;
const balances = new PersistentMap<string, u64>("a:");
const agreementsRegistry = new PersistentMap<string, u64>("b:");
const agreements = new PersistentMap<string, Agreement>("c:");
const milestones = new PersistentMap<string, Milestone>("ms:");

// Creates new empty agreement
// Returns: agreement id
export function createNewAgreement(
  partnerID: string,
  ownerIsSupplier: boolean
): string {
  const agreementNo = agreementsRegistry.contains(context.sender)
    ? agreementsRegistry.getSome(context.sender)
    : 0;

  const agreementID = context.sender + agreementNo.toString();

  const agreement = new Agreement(context.sender, partnerID, ownerIsSupplier);

  agreements.set(agreementID, agreement);
  agreementsRegistry.set(context.sender, agreementNo + 1);
  return agreementID;
}

export function getAgreement(id: string): Agreement {
  assert(agreements.contains(id), "Agreement with this id doesn't exist");
  return agreements.getSome(id);
}

function getMilestoneIndexByHash(agreement: Agreement, hash: string): i32 {
  for (let i: i32 = 0; i < agreement.milestones.length; i++) {
    if (agreement.milestones[i].hash == hash) {
      return i;
    }
  }

  assert(false, "Can find milestone index");
  return 0;
}

export function addNewMilestone(
  id: string,
  hash: string,
  payment: u64,
  disputeShare: i16
): void {
  const agreement = getAgreement(id);
  assertNotSigned(agreement);
  assertOwnerPermissions(agreement);
  const ms = new Milestone(hash, payment, disputeShare);
  agreement.milestones.push(ms);
  agreements.set(id, agreement);
}

export function startMilestone(id: string, hash: string): void {
  const agreement = getAgreement(id);
  assertIsClient(agreement);
  const index: i32 = getMilestoneIndexByHash(agreement, hash);
  agreement.milestones[index].started = true;
  agreement.milestones[index].startedBlock = context.blockIndex;
  agreements.set(id, agreement);
}

export function submitMilestone(id: string, hash: string): void {
  const agreement = getAgreement(id);
  assertIsSupplier(agreement);
  const index: i32 = getMilestoneIndexByHash(agreement, hash);
  agreement.milestones[index].submitted = true;
  agreement.milestones[index].submittedBlock = context.blockIndex;
  agreements.set(id, agreement);
}

export function payMilestone(id: string, hash: string): void {
  const agreement = getAgreement(id);
  assertIsClient(agreement);
  const index: i32 = getMilestoneIndexByHash(agreement, hash);
  agreement.milestones[index].paid = true;
  agreement.milestones[index].paidBlock = context.blockIndex;
  const supplier = agreement.ownerIsSupplier ? agreement.ownerID : agreement.partner;
  transferBalance(supplier, agreement.milestones[index].payment);
  agreements.set(id, agreement);
}

export function signByOwner(id: string): void {
  const agreement = getAgreement(id);
  assertOwnerPermissions(agreement);
  agreement.signedByOwner = true;
  agreements.set(id, agreement);
}

export function signByPartner(id: string): void {
  const agreement = getAgreement(id);
  assertPartnerPermissions(agreement);
  agreement.signedByPartner = true;
  agreements.set(id, agreement);
}

export function getBalance(id: string): u64 {
  if (!balances.contains(id)) {
    return START_SUM;
  }
  return balances.getSome(id);
}

export function transferBalance(to: string, amount: u64) : void {
  assert(getBalance(context.sender) > amount, "You have not enough money");
  const receiverBalance = getBalance(to) + amount;
  const senderBalance = getBalance(context.sender) - amount;
  balances.set(context.sender, senderBalance);
  balances.set(to, receiverBalance);
}

function assertOwnerPermissions(agreement: Agreement): void {
  assert(
    agreement.ownerID == context.sender,
    "Only agreement owner has permission"
  );
}

function assertPartnerPermissions(agreement: Agreement): void {
  assert(
    agreement.partner == context.sender,
    "Only agreement partner has permission"
  );
}

function assertNotSigned(agreement: Agreement): void {
  assert(
    !agreement.signedByOwner && !agreement.signedByPartner,
    "Error! Contract already signed!"
  );
}

function assertIsClient(agreement: Agreement): void {
  if (agreement.ownerIsSupplier) {
    assert(agreement.partner == context.sender, "Allowed for Client only");
  } else {
    assert(agreement.ownerID == context.sender, "Allowed for Client only");
  }
}

function assertIsSupplier(agreement: Agreement): void {
  if (agreement.ownerIsSupplier) {
    assert(agreement.ownerID == context.sender, "Allowed for Supplier only");
  } else {
    assert(agreement.partner == context.sender, "Allowed for Suplier only");
  }
}
