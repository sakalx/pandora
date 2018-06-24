import {userActionsTypes} from '../types';

const {LOG_IN} = userActionsTypes;

export function logInUser(id) {
  return {
    type: LOG_IN,
    payload: id,
  }
}