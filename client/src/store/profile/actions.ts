/*
 * Lean tool - hypothesis testing application
 *
 * https://github.com/MikaelLazarev/lean-tool/
 * Copyright (c) 2020. Mikhail Lazarev
 *
 */

import {RSAA, RSAAAction} from 'redux-api-middleware';
import {getFullAPIAddress} from '../../utils/api';
import {withAuth} from '../auth';
import {AuthPayload} from '../auth/reducer';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Action} from 'redux';
import {APP_STATUS_ERROR, Profile, ProfileStatus} from '../../core/profile';
import {BACKEND_ADDR, SSO_ADDR} from "../../config";

// Get user profile from server
export const getProfile = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  const endpoint = '/api/profile/';
  const result = await dispatch(profileAction('GET', endpoint));
  if (result.error || result.type === 'PROFILE_FAILURE') {
    dispatch(updateStatusInternally(APP_STATUS_ERROR))
  }

  if (!result.error && result.type === 'PROFILE_SUCCESS') {
    const id = result.payload.id;
    document.cookie = ""
  }

};


export const updateProfile = (
  profile: Profile,
): RSAAAction<any, Profile, void> => {
  const endpoint = '/api/profile/';
  const body = JSON.stringify({...profile});
  return profileAction('POST', endpoint, body);
};

export const updateStatusInternally = (status: ProfileStatus) => {
  return {type: 'PROFILE_UPDATE_STATUS', status};
};

const profileAction = (
  method: 'GET' | 'POST',
  endpoint: string,
  body?: string,
): RSAAAction<any, Profile, void> => {
  return {
    [RSAA]: {
      endpoint: getFullAPIAddress(endpoint, undefined, BACKEND_ADDR),
      method: method,
      body: body,
      headers: withAuth({'Content-Type': 'application/json'}),
      types: ['PROFILE_REQUEST', 'PROFILE_SUCCESS', 'PROFILE_FAILURE'],
    },
  };
};
