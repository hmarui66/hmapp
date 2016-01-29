import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reducers from 'reducers';
import { syncHistory, routeReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import DevTools from '../createDevToolsWindow';

const canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

let enhancer;
if (canUseDOM) {
  const reduxRouterMiddleware = syncHistory(browserHistory);
  enhancer = compose(
    applyMiddleware(thunk, reduxRouterMiddleware, createLogger()),
    DevTools.instrument()
  );
} else {
  enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
  );
}

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
