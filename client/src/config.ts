/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

const CONTRACT_NAME = "nrc_test";

export const BACKEND_ADDR =
  process.env.NODE_ENV === "development"
    ? "https://nearcontracts-server.herokuapp.com"
    : "https://nearcontracts-server.herokuapp.com";

export const SSO_ADDR =
  process.env.NODE_ENV === "development"
    ? "https://crm-nanocontracts.herokuapp.com"
    : "https://crm-nanocontracts.herokuapp.com";

export const GA_TRACKER = "UA-159014001-1";
export const FB_PIXEL = "";

export function getNearConfig(env: string) {
  switch (env) {
    case "production":
    case "mainnet":
      return {
        networkId: "default",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
      };
    case "development":
    case "testnet":
      return {
        networkId: "default",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
      };
    case "devnet":
      return {
        networkId: "devnet",
        nodeUrl: "https://rpc.devnet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.devnet.near.org",
        helperUrl: "https://helper.devnet.near.org",
      };
    case "betanet":
      return {
        networkId: "betanet",
        nodeUrl: "https://rpc.betanet.near.org",
        contractName: CONTRACT_NAME,
        walletUrl: "https://wallet.betanet.near.org",
        helperUrl: "https://helper.betanet.near.org",
      };
    case "local":
      return {
        networkId: "local",
        nodeUrl: "http://localhost:3030",
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: "http://localhost:4000/wallet",
        contractName: CONTRACT_NAME,
      };
    case "test":
    case "ci":
      return {
        networkId: "shared-test",
        nodeUrl: "https://rpc.ci-testnet.near.org",
        contractName: CONTRACT_NAME,
        masterAccount: "test.near",
      };
    case "ci-betanet":
      return {
        networkId: "shared-test-staging",
        nodeUrl: "https://rpc.ci-betanet.near.org",
        contractName: CONTRACT_NAME,
        masterAccount: "test.near",
      };
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
}
