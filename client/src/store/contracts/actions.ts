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

export const getList = createDataLoaderListActions(endpoint, CONTRACTS_PREFIX);

export const getDetails = createDataLoaderDetailActions(
  endpoint + ":id/",
  CONTRACTS_PREFIX
);

export const createUpdateDetails = createDataLoaderCreateUpdateDataAction<
  Contract
>(endpoint, endpoint + ":id/", CONTRACTS_PREFIX);
