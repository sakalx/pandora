import {combineReducers} from 'redux';
import {userActionsTypes} from '../types';

import aiArticle from './ai-article';
import onLoad from './onLoad';
import notification from './notification';
import queries from './queries';
import user from './user';

const appReducer = combineReducers({
  aiArticle,
  onLoad,
  notification,
  queries,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === userActionsTypes.LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action)
};

export default rootReducer