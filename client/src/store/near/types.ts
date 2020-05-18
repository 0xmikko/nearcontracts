import * as nearlib from "near-api-js";

export type NearActions = {
    type: string;
    payload?: string;
    error?: boolean;
};


