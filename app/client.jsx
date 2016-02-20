import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from 'routes.jsx';
import configureStore from 'store/configureStore';

injectTapEventPlugin();

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
