/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */



export const BACKEND_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'http://localhost:4000'

export const SSO_ADDR =
  process.env.NODE_ENV === 'development'
    ? 'https://crm-nanocontracts.herokuapp.com'
    : 'https://crm-nanocontracts.herokuapp.com'


export const GA_TRACKER= 'UA-159014001-1';
export const FB_PIXEL = ''
