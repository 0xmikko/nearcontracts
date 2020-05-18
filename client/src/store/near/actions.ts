import { ThunkAction } from "redux-thunk";
import { RootState } from "../index";
import { Action } from "redux";
import { NEAR_GET_ACCOUNT, NearUtil } from "./index";
import { Milestone } from "../../core/milestone";

export const getAccount = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  const account = await NearUtil.getAccountID();
  dispatch({
    type: NEAR_GET_ACCOUNT,
    payload: account,
  });
};

export const deployContract = (
  ownerIsSupplier: boolean
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  const contract = await NearUtil.getContract();
  // @ts-ignore
  const contractAddress = await contract.newAgreement(ownerIsSupplier);
};

export const addMilestone = (
  ms: Milestone
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  const contract = await NearUtil.getContract();

  // @ts-ignore
  await contract.addMilestone(ms);
};
