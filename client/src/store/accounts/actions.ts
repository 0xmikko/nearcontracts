/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import { endpoint, ACCOUNTS_PREFIX } from "./";

import {
  createDataLoaderListActions,
} from "../dataloader/actions";


export const getList = createDataLoaderListActions(endpoint, ACCOUNTS_PREFIX);
