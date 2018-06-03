import {combineReducers} from 'redux';
import {user} from '../types';

// TODO not clearly about this reducer
import RedditReducer from './redditReducer';

import notification from './notification';
import userData from './user-data';
import queries from './queries';
import aiArticle from './ai-article';
import stackScreen from './stack-screen';

const appReducer = combineReducers({
  notification,
  userData,
  aiArticle,
  queries,
  stackScreen,

  reddit_results: RedditReducer,
});

const rootReducer = (state, action) => {
  if (action.type === user.LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action)
};

export default rootReducer