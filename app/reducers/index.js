import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';
import article from 'reducers/article';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  article,
  routing
});

export default rootReducer;
