import {screen} from '../types';

const initState = Object.values(screen)
  .reduce((obj, item) => {
    obj[item] = false;
    return obj
  }, {});


export default function stackScreen(state = initState, {type}) {

  if (type in state) {
    const screenOn = Object.entries(state).find(arr => arr[1] === true);

    return {
      ...state,
      ...screenOn ? ({[screenOn[0]]: false}) : {},
      [type]: true,
    }

  }
  return state;
}