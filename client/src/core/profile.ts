/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

export type ProfileStatus =  "SPLASH" | "AUTH_REQUIRED" | "CONNECTING_ACCOUNT" | "READY" | "ERROR";;

export interface Profile {
    id?: string,
    status: ProfileStatus,
    name: string,

}

export const APP_STATUS_SPLASH = "SPLASH";
export const APP_STATUS_AUTH_REQUIRED = "AUTH_REQUIRED";
export const APP_STATUS_CONNECTION_ACCOUNT = "CONNECTING_ACCOUNT";
export const APP_STATUS_READY= "READY";
export const APP_STATUS_ERROR = "ERROR";


