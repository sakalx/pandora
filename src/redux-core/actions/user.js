import {userActionsTypes} from '../types';

const {LOG_IN} = userActionsTypes;

export function logInUser(user) {
  return {
    type: LOG_IN,
    payload: user,
  }
}