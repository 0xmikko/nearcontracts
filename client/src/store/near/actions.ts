import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Action } from "redux";
import { NEAR_GET_ACCOUNT, NEAR_UPDATE_STATUS, NearUtil } from "./index";

export const isSignIn = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const status = await NearUtil.isSignedIn();
  dispatch({
    type: NEAR_UPDATE_STATUS,
    payload: status ? "LOGGED_IN" : "AUTH_REQUIRED",
  });
};

export const getAccount = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const account = await NearUtil.getAccountID();
  const contract = await NearUtil.getContract();

  // @ts-ignore
  const amount = await contract.getBalance({id: account});
  dispatch({
    type: NEAR_GET_ACCOUNT,
    payload: {
      accountId: account,
      amount: amount,
    },
  });
};
