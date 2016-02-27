import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'components/App';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Viewer from 'components/Viewer';
import Show from 'components/Show';
import Editor from 'components/Editor';
import Categories from 'components/Categories';
import Tags from 'components/Tags';
import Archive from 'components/Archive';
import Search from 'components/Search';

import { requireAuthentication } from 'components/authenticateComponent';

class NotFound extends React.Component {
  render() {
    const styles = {
      padding: 16
    };
    return (
      <main
        data-contents="not-found"
        data-contents-area>
        <div data-content>
          <span style={styles}>404 Not Found</span>
        </div>
      </main>
    );
  }
}

export default (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Viewer} />
      <Route path="show/:id" component={Show} />
      <Route path="new" component={requireAuthentication(Editor)} />
      <Route path="edit/:id" component={requireAuthentication(Editor)} />
      <Route path="categories" component={Categories}>
        <IndexRoute component={Viewer} />
        <Route path=":category" component={Viewer} />
      </Route>
      <Route path="tags" component={Tags}>
        <IndexRoute component={Viewer} />
        <Route path=":tag" component={Viewer} />
      </Route>
      <Route path="archive" component={Archive} />
      <Route path="search" component={Search} />
      <Route path="drafts" component={requireAuthentication(Viewer)} />
      <Route path="login" component={Login} />
      <Route path="signup" component={requireAuthentication(Signup)} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>

);
