import {notification} from '../types';

const {TOGGLE_SNACKBAR, TOGGLE_ALERT} = notification;

export function toggleSnackbar(message = '') {
  return {
    type: TOGGLE_SNACKBAR,
    payload: message,
  }
}

export function toggleAlert({titleAlert = '', descriptionAlert = ''} = {}) {
  return {
    type: TOGGLE_ALERT,
    payload: {titleAlert, descriptionAlert},
  }
}