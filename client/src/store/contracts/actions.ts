/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import { endpoint, CONTRACTS_PREFIX } from "./";

import {
  createDataLoaderCreateUpdateDataAction,
  createDataLoaderDetailActions,
  createDataLoaderListActions,
} from "../dataloader/actions";
import { Contract, ContractManager } from "../../core/contract";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Action } from "redux";
import { NearUtil } from "../near";
import { DataLoaderDetailsActions } from "../dataloader/types";
import { DETAIL_SUCCESS } from "../dataloader";
import { Milestone } from "../../../../contract/assembly/model";

export const getList = createDataLoaderListActions(endpoint, CONTRACTS_PREFIX);

export const getDetails = (
  id: string
): ThunkAction<
  void,
  RootState,
  unknown,
  DataLoaderDetailsActions<Contract>
> => async (dispatch) => {
  // @ts-ignore
  const dbDetails = await dispatch<DataLoaderDetailsActions<Contract>>(getDetailsFromDB(id));
  // @ts-ignore
  console.log("FOO", dbDetails.payload.address);
  // @ts-ignore
  if (dbDetails.payload.address !== undefined && dbDetails.payload.address !== "") {
    const smartContract = await NearUtil.getContract();
    // @ts-ignore
    dbDetails.payload.agreement = await smartContract.getAgreement({id: dbDetails.payload.address,});
    // @ts-ignore
    dispatch(dbDetails);
  }
};

const getDetailsFromDB = createDataLoaderDetailActions(
  endpoint + ":id/",
  CONTRACTS_PREFIX
);

export const createUpdateDetails = createDataLoaderCreateUpdateDataAction<
  Contract
>(endpoint, endpoint + ":id/", CONTRACTS_PREFIX);

export const deployContract = (
  contract: Contract,
  hash: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  if (contract.partner === undefined || contract.owner === undefined) {
    console.log("ERERREERERER");
    return;
  }
  console.log("FFFF", contract.partner?.address);
  const smartContract = await NearUtil.getContract();
  // @ts-ignore
  contract.address = await smartContract.createNewAgreement({
    partnerID: contract.partner?.address,
    ownerIsSupplier: contract.ownerIsSupplier,
  });

  console.log("New agreement ID", contract.address);

  const contractManager = new ContractManager(contract);
  for (let ms of contractManager.milestones) {
    // @ts-ignore
    await smartContract.addNewMilestone({
      id: contract.address,
      hash: ms.hash,
      payment: ms.payment.toString(),
      disputeShare: ms.disputeShare,
    });
    console.log("Submitted", ms);
  }

  contract.ownerID = contract.owner.id;
  contract.partnerID = contract.partner.id;
  contract.isDeployed = true;
  dispatch(createUpdateDetails(contract.id, contract, hash));
  dispatch(getDetails(contract.id));
};

export const signByOwner = (
  contract: Contract,
  hash: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  const smartContract = await NearUtil.getContract();

  // @ts-ignore
  await smartContract.signByOwner({ id: contract.address });
  dispatch(getDetails(contract.id));
};

export const signByPartner = (
  contract: Contract,
  hash: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  const smartContract = await NearUtil.getContract();
  // @ts-ignore
  await smartContract.signByPartner({ id: contract.address });
  dispatch(getDetails(contract.id));
};

export const startMilestone = (
    contract: Contract,
    milestoneHash: string,
    hash: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
) => {
  const smartContract = await NearUtil.getContract();
  // @ts-ignore
  await smartContract.startMilestone({ id: contract.address, hash: milestoneHash });
  dispatch(getDetails(contract.id));
};

export const submitMilestone = (
    contract: Contract,
    milestoneHash: string,
    hash: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
) => {
  const smartContract = await NearUtil.getContract();
  // @ts-ignore
  await smartContract.submitMilestone({ id: contract.address, hash: milestoneHash });
  dispatch(getDetails(contract.id));
};

export const payMilestone = (
    contract: Contract,
    milestoneHash: string,
    hash: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
    dispatch
) => {
  const smartContract = await NearUtil.getContract();
  // @ts-ignore
  await smartContract.payMilestone({ id: contract.address, hash: milestoneHash });
  dispatch(getDetails(contract.id));
};
