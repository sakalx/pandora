import {userActionsTypes} from '../types';

const {LOG_IN, UPDATE} = userActionsTypes;

export default function userData(state = {}, {type, payload}) {
  switch (type) {
    case LOG_IN:
      return {
        ...state,
        ...payload,
      };
    case UPDATE:
      return {
        ...state,
        ...payload,
      };
  }
  return state;
}