import {snack} from '../types';

const {TOGGLE_SNACKBAR} = snack;

export function toggleSnackbar(message = '') {
  return {
    type: TOGGLE_SNACKBAR,
    payload: message,
  }
}