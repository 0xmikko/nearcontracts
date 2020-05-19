import {NEAR_GET_ACCOUNT, NEAR_STATUS, NEAR_UPDATE_STATUS, NearUtil} from "./index";


export type NearAccountInfo = {
    accountId: string | undefined;
    amount: number;
}

export type NearActions = {
    type: 'NEAR@@GET_ACCOUNT',
    payload: NearAccountInfo,
} | {
    type: 'NEAR@@UPDATE_STATUS',
    payload: NEAR_STATUS;
};


