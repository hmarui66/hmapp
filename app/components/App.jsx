import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { didMount } from 'actions/app';
import Navigation from 'components/Navigation';
import 'scss/main';

export default class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(didMount());
  }

  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  children: PropTypes.object
};

export default connect()(App);
