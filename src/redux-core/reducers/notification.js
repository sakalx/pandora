import {notification as alert} from '../types';

const {TOGGLE_SNACKBAR} = alert;

const initState = {
  showSnackBar: false,
  snackBarMsg: '',
};

export default function notification(state = initState, {type, payload}) {
  if (type === TOGGLE_SNACKBAR) {
    return ({
      showSnackBar: !state.showSnackBar,
      snackBarMsg: payload
    })
  }
  return state;
}