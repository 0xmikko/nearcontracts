import {NEAR_GET_ACCOUNT, NEAR_STATUS, NEAR_UPDATE_STATUS, NearUtil} from "./index";

export type NearActions = {
    type: 'NEAR@@GET_ACCOUNT',
    payload: string;
} | {
    type: 'NEAR@@UPDATE_STATUS',
    payload: NEAR_STATUS;
};


