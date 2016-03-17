import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

export function requireAuthentication(Component) {
  class AuthenticateComponent extends React.Component {

    static redirectPathForLogin() {
      return '/login';
    }

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      const { isAuthenticated, dispatch } = this.props;
      if (!isAuthenticated) {
        dispatch(routeActions.push(AuthenticateComponent.redirectPathForLogin() + `?next=${this.props.location.pathname}`));
      }
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  AuthenticateComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.authenticated
    };
  }

  return connect(mapStateToProps)(AuthenticateComponent);
}
