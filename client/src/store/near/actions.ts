import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Action } from "redux";
import { NEAR_GET_ACCOUNT, NearUtil } from "./index";

export const getAccount = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const account = await NearUtil.getAccountID();
  const newIndex = await NearUtil.newAgreement();
  console.log("INDEX", newIndex);
  dispatch({
    type: NEAR_GET_ACCOUNT,
    payload: account,
  });
};

export const newContract = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const newIndex = await NearUtil.newAgreement();
  console.log("INDEX", newIndex);
};
