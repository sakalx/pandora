import {combineReducers} from 'redux';
import {userActionsTypes} from '../types';

import notification from './notification';
import user from './user';
import queries from './queries';
import aiArticle from './ai-article';

const appReducer = combineReducers({
  notification,
  user,
  aiArticle,
  queries,
});

const rootReducer = (state, action) => {
  if (action.type === userActionsTypes.LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action)
};

export default rootReducer