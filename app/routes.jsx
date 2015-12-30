import React from 'react';
import Route from 'react-router';

import App from 'components/App';
import Viewer from 'components/Viewer';

export default (
  <Route component={App}>
    <Route path="/" component={Viewer} />
  </Route>
);
