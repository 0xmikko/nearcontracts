/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import * as auth from "./auth/actions";
import * as accounts from "./accounts/actions";
import * as contracts from "./contracts/actions";
import * as near from "./near/actions";
import * as profile from "./profile/actions";
import * as templates from "./templates/actions";
import * as operations from "./operations/actions";

export default {
  auth,
  accounts,
  contracts,
  near,
  profile,
  templates,
  operations,
};
