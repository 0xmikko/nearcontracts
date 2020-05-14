/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

export const BACKEND_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'localhost:4000'
    : 'https://nearcontracts.herokuapp.com'

export const SSO_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'https://crm.nearcontracts.com'
    : window.location.protocol + '//crm.' + window.location.host;

