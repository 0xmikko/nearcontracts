import { context, logging, storage, PersistentMap } from "near-sdk-as";
// available class: context, storage, logging, base58, base64,
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { Agreement, Milestone } from "./model";

const balances = new PersistentMap<string, u64>("a:");
const agreementsRegistry = new PersistentMap<string, u64>("b:");
const agreements = new PersistentMap<string, Agreement>("c:");

// Creates new empty agreement
// Returns: agreement id
export function createNewAgreement(ownerIsSupplier: boolean): string {
  const agreementNo = agreementsRegistry.contains(context.sender)
    ? agreementsRegistry.getSome(context.sender)
    : 0;

  const agreementID = context.sender + agreementNo.toString();

  const agreement = new Agreement(context.sender, ownerIsSupplier);

  agreements.set(agreementID, agreement);
  agreementsRegistry.set(context.sender, agreementNo + 1);
  return agreementID;
}

export function getAgreement(id: string): Agreement {
  assert(agreements.contains(id), "Agreement with this id doesn't excists");
  return agreements.getSome(id);
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

export function submitMilestone(id: string, index: u64): void {
  const agreement = getAgreement(id);
  // agreement.checkIsSupplier(context.sender);
}

export function signByOwner(id: string): void {
  const agreement = getAgreement(id);
  assertOwnerPermissions(agreement);
  agreement.signedByOwner = true;
  agreements.set(id, agreement);
}

export function signAsPartner(id: string): void {
  const agreement = getAgreement(id);
  assertOwnerPermissions(agreement);
  agreement.signedByPartner = true;
  agreements.set(id, agreement);
}

function assertOwnerPermissions(agreement: Agreement) : void {
  assert(
    agreement.ownerID == context.sender,
    "Only agreement owner has permission"
  );
}

function assertNotSigned(agreement: Agreement) : void{
  assert(
    !agreement.signedByOwner && !agreement.signedByPartner,
    "Error! Contract already signed!"
  );
}
