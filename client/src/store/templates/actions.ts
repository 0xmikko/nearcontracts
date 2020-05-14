/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import { endpoint, TEMPLATES_PREFIX } from "./";

import {
  createDataLoaderCreateUpdateDataAction,
  createDataLoaderDetailActions,
  createDataLoaderListActions,
} from "../dataloader/actions";
import { Template } from "../../core/template";

export const getList = createDataLoaderListActions(endpoint, TEMPLATES_PREFIX);

export const getDetails = createDataLoaderDetailActions(
  endpoint + ":id/",
  TEMPLATES_PREFIX
);

export const createUpdateDetails = createDataLoaderCreateUpdateDataAction<
  Template
>(endpoint, endpoint + ":id/", TEMPLATES_PREFIX);
