import {userActionsTypes} from '../types';

const {LOG_IN} = userActionsTypes;

const initState = {
  id: null,
};

export default function userData(state = initState, {type, payload}) {
  switch (type) {

    case LOG_IN:
      return {
        ...state,
        id: payload,
      };
  }
  return state;
}