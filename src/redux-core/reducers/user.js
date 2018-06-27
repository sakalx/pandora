import {userActionsTypes} from '../types';

const {LOG_IN} = userActionsTypes;

export default function userData(state = {}, {type, payload}) {
  switch (type) {

    case LOG_IN:
      return {
        ...state,
        ...payload,
      };
  }
  return state;
}