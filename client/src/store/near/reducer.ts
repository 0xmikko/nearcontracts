import { NearActions } from "./types";
import {NEAR_GET_ACCOUNT, NEAR_STATUS, NEAR_UPDATE_STATUS} from "./index";

interface NearState {
  accountId: string | undefined;
  amount: number;
  status: NEAR_STATUS;
}

const initialState: NearState = {
  accountId: undefined,
  amount: 0,
  status: "LOADING",
};

export default (
  state: NearState = initialState,
  action: NearActions
): NearState => {
  console.log(action);

  switch (action.type) {
    default:
      return state;
    case 'NEAR@@GET_ACCOUNT':
      return {
        ...state,
        ...action.payload,
      };
    case 'NEAR@@UPDATE_STATUS':
      return {
        ...state,
        status: action.payload,
      };


  }
};
