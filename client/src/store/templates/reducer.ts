/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import { createDataLoaderReducer } from "../dataloader/reducer";
import { Template } from "../../core/template";
import { TEMPLATES_PREFIX } from "./";

export default createDataLoaderReducer<Template>(TEMPLATES_PREFIX);
