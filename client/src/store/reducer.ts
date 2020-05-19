/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import { combineReducers } from "redux";
import auth from "./auth/reducer";
import accounts from './accounts/reducer'
import contracts from './contracts/reducer'
import operations from './operations/reducer'
import near from './near/reducer'
import profile from "./profile/reducer";
import templates from "./templates/reducer";

export default combineReducers({
  auth,
  accounts,
  contracts,
  operations,
  near,
  profile,
  templates,
});
