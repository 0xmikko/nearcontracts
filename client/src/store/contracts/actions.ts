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
import { Contract } from "../../core/contract";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Action } from "redux";
import { NearUtil } from "../near";
import {DataLoaderDetailsActions} from "../dataloader/types";
import {DETAIL_SUCCESS} from "../dataloader";

export const getList = createDataLoaderListActions(endpoint, CONTRACTS_PREFIX);

export const getDetails = (
    id: string
): ThunkAction<void, RootState, unknown, DataLoaderDetailsActions<Contract>> => async (
    dispatch
) => {
  // @ts-ignore
  const dbDetails = await dispatch<DataLoaderDetailsActions<Contract>>(getDetailsFromDB(id));
  // @ts-ignore
  console.log("FOO",dbDetails.payload.address);
  const smartContract = await NearUtil.getContract();
  // @ts-ignore
  const agreement = await smartContract.getAgreement({id: dbDetails.payload.address})
  console.log("FOO", agreement)
  // @ts-ignore
  // dispatch(dbDetails);
}

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
  const smartContract = await NearUtil.getContract();
  // @ts-ignore
  contract.address = await smartContract.createNewAgreement({
    ownerIsSupplier: contract.ownerIsSupplier,
  });
  contract.isDeployed = true;
  dispatch(createUpdateDetails(contract.id, contract, hash));
};
