import {userActionsTypes} from '../types';

const {LOG_IN, UPDATE} = userActionsTypes;

export function logInUser(user) {
  return {
    type: LOG_IN,
    payload: user,
  }
}

export function updateUserReduxStore(user) {
  return {
    type: UPDATE,
    payload: user,
  }
}