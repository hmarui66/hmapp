import React from 'react';
import Route from 'react-router';

import App from 'components/App';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Viewer from 'components/Viewer';
import Show from 'components/Show';
import Editor from 'components/Editor';

import { requireAuthentication } from 'components/authenticateComponent';

export default (
  <Route component={App}>
    <Route path="/(?:query)" component={Viewer} />
    <Route path="/all(?:query)" component={requireAuthentication(Viewer)} />
    <Route path="login" component={Login} />
    <Route path="signup" component={requireAuthentication(Signup)} />
    <Route path="show/:id" component={Show} />
    <Route path="new" component={requireAuthentication(Editor)} />
    <Route path="edit/:id" component={requireAuthentication(Editor)} />
  </Route>
);
