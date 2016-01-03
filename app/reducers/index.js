import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';
import article from 'reducers/article';
import user from 'reducers/user';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  article,
  user,
  routing
});

export default rootReducer;
