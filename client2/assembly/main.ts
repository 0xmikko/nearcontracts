import { context, logging, storage, PersistentMap } from "near-sdk-as";
// available class: context, storage, logging, base58, base64,
// PersistentMap, PersistentVector, PersistentDeque, PersistentTopN, ContractPromise, math
import { TextMessage } from "./model";

const contracts = new PersistentMap<string, u64>("a:")
const agreements = new PersistentMap<string, TextMessage>("b:")

const DEFAULT_MESSAGE = "Hello"

export function newAgreement() : string {
  const agreementNo = contracts.contains(context.sender) ? contracts.getSome(context.sender) : 0;
  const tm = new TextMessage();
  tm.text = "Checking - cheking " + context.sender;
  const aName = context.sender + agreementNo.toString();
  agreements.set(aName, tm);
  contracts.set(context.sender, agreementNo+1);
  return aName;
}

export function welcome(account_id: string): TextMessage {
  logging.log("simple welcome test");
  let message = new TextMessage();
  let greetingPrefix = storage.get<string>(account_id);
  if (!greetingPrefix) {
    greetingPrefix = DEFAULT_MESSAGE;
  }
  const s = printString(account_id);
  message.text = greetingPrefix + " " + s;
  return message;
}

export function setGreeting(message: string): void {
  storage.set(context.sender, message);
}

function printString(s: string): string {
  return s;
}
