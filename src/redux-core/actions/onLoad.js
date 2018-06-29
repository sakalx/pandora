import {loaders} from '../types';

const {LOADING_AUTH, LOADING_UPDATE_USER} = loaders;

export function onLoadingAuth(payload) {
  return {
    type: LOADING_AUTH,
    payload,
  }
}

export function onLoadingUpdateUser(payload) {
  return {
    type: LOADING_UPDATE_USER,
    payload,
  }
}