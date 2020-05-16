/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import { createDataLoaderReducer } from "../dataloader/reducer";
import { Contract } from "../../core/contract";
import { CONTRACTS_PREFIX } from "./";

export default createDataLoaderReducer<Contract>(CONTRACTS_PREFIX);
