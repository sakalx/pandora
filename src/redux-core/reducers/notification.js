import {notification as alert} from '../types';

const {TOGGLE_SNACKBAR, TOGGLE_ALERT} = alert;

const initState = {
  openSnackBar: false,
  snackBarMsg: '',

  openAlert: false,
  titleAlert: '',
  descriptionAlert: '',
};

export default function notification(state = initState, {type, payload}) {

  switch (type) {
    case TOGGLE_SNACKBAR:
      return ({
        ...state,
        openSnackBar: !state.openSnackBar,
        snackBarMsg: payload
      });

    case TOGGLE_ALERT:
      const {titleAlert, descriptionAlert} = payload;

      return ({
        ...state,
        openAlert: !state.openAlert,
        titleAlert,
        descriptionAlert,
      })
  }

  return state;
}