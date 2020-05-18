import { context, logging, storage, PersistentMap } from "near-sdk-as";
// available class: context, storage, logging, base58, base64,
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import {Agreement, Milestone} from "./model";

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
  const agreement = agreements.getSome(id);
  if (agreement === null) throw "Agreement with this id not found";
  return agreement;
}

export function addNewMilestone(id: string, ms: Milestone) : void {
  const agreement = getAgreement(id);
  agreement.checkIsOwner(context.sender);
  if (agreement.signedByOwner || agreement.signedByPartner)
    throw "Cant add milestone for signed contract";
  agreement.addMilestone(ms);
}

export function submitMilestone(id: string, index: u64) : void {
  const agreement = getAgreement(id);
  // agreement.checkIsSupplier(context.sender);
}

export function signByOwner(id: string): void {
  const agreement = getAgreement(id);
  if (agreement === null) return;
  if (agreement.ownerID !== context.sender) return;
  agreement.signByOwner();
}

export function signAsPartner(id: string): void {
  const agreement = getAgreement(id);
  if (agreement === null) return;
  if (agreement.partner !== context.sender) return;
  agreement.signByPartner();
}
