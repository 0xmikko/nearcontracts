import * as nearlib from "near-api-js";
import { Account, WalletConnection } from "near-api-js";
import { getNearConfig } from "../../config";

export const NEAR_PREFIX = "NEAR@@";
export const NEAR_GET_ACCOUNT = NEAR_PREFIX + "GET_ACCOUNT";
export const NEAR_UPDATE_STATUS = NEAR_PREFIX + "UPDATE_STATUS";

export type NEAR_STATUS = "AUTH_REQUIRED" | "LOGGED_IN" | "LOADING";

export class NearUtil {
  private static near: nearlib.Near | undefined = undefined;
  private static walletAccount: Account | undefined = undefined;
  private static contract: nearlib.Contract | undefined = undefined;

  private static getNear(): Promise<nearlib.Near> {
    return new Promise<nearlib.Near>(async (resolve) => {
      if (NearUtil.near === undefined) {
        NearUtil.near = await nearlib.connect(
          Object.assign(
            {
              deps: {
                keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore(),
              },
            },
            getNearConfig(process.env.NODE_ENV || "development")
          )
        );
      }
      resolve(NearUtil.near);
    });
  }

  private static getWalletAccount(): Promise<WalletConnection> {
    return new Promise<WalletConnection>(async (resolve) => {
      const near = await NearUtil.getNear();
      const wallet = new nearlib.WalletAccount(near, null);
      resolve(wallet);
    });
  }

  public static getAccountID(): Promise<string> {
    return new Promise<string>(async (resolve) => {
      const walletAccount = await NearUtil.getWalletAccount();

      console.log(walletAccount);
      if (!walletAccount.isSignedIn()) {
        await walletAccount.requestSignIn(
          "nrc_test",
          "Near Contracts!",
          window.location.toString(),
            window.location.toString()
        );
      }

      resolve(walletAccount.getAccountId());
    });
  }

  public static isSignedIn(): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const walletAccount = await NearUtil.getWalletAccount();
      resolve(walletAccount.isSignedIn());
    });
  }

  public static getContract(): Promise<nearlib.Contract> {
    return new Promise<nearlib.Contract>(async (resolve) => {
      const accountID = await NearUtil.getAccountID();
      const near = await NearUtil.getNear();
      const acct = await new nearlib.Account(near.connection, accountID);
      // @ts-ignore
      NearUtil.contract = new nearlib.Contract(
        acct,
        getNearConfig(process.env.NODE_ENV || "development").contractName,
        {
          // View methods are read only. They don't modify the state, but usually return some value.
          viewMethods: ["getAgreement", "getBalance"],
          // Change methods can modify the state. But you don't receive the returned value when called.
          changeMethods: [
            "createNewAgreement",
            "signByOwner",
            "signByPartner",
            "addNewMilestone",
            "startMilestone",
            "submitMilestone",
            "payMilestone",
          ],
        }
      );
      resolve(NearUtil.contract);
    });
  }
}
