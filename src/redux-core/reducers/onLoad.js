
import {loaders} from '../types';

const {LOADING_AUTH, LOADING_UPDATE_USER} = loaders;

const initState = {
  authStateChange: false,
  updateUserProfile: false,
};

export default function onLoad(state = initState, {type, payload}) {
  switch (type) {
    case LOADING_AUTH:
      return {
        ...state,
        authStateChange: payload,
      };
    case LOADING_UPDATE_USER:
      return {
        ...state,
        updateUserProfile: payload,
      };
  }
  return state;
}