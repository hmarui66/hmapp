import React from 'react';
import Route from 'react-router';

import App from 'components/App';
import Viewer from 'components/Viewer';
import Editor from 'components/Editor';

export default (
  <Route component={App}>
    <Route path="/" component={Viewer} />
    <Route path="new" component={Editor} />
    <Route path="edit/:id" component={Editor} />
  </Route>
);
