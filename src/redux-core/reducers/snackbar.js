import {snack} from '../types';

const {TOGGLE_SNACKBAR} = snack;

const initState = {
  showSnackBar: false,
  snackBarMsg: '',
};

export default function snackBar(state = initState, {type, payload}) {
  if (type === TOGGLE_SNACKBAR) {
    return ({
      showSnackBar: !state.showSnackBar,
      snackBarMsg: payload
    })
  }
  return state;
}