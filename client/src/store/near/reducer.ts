import { NearActions } from "./types";
import { NEAR_GET_ACCOUNT } from "./index";

interface NearState {
  accountId: string | undefined;
  amount: number;
}

const initialState: NearState = {
  accountId: undefined,
  amount: 0,
};

export default (
  state: NearState = initialState,
  action: NearActions
): NearState => {
  console.log(action);

  switch (action.type) {
    default:
      return state;
    case NEAR_GET_ACCOUNT:
      return {
        ...state,
        accountId: action.payload,
      };
  }
};
