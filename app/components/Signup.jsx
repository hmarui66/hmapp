import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { signUp } from 'actions/users';
import styles from 'scss/components/login';

const cx = classNames.bind(styles);

class Signup extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  onLoginSubmit() {
    const { dispatch } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(signUp({
      email: email,
      password: password
    }));
  }

  render() {
    const { authenticated, isWaiting } = this.props.user;
    if (authenticated) {
      return (
        <h1 className={cx('login__header')}>You are logged in amigo</h1>
      );
    }

    if (isWaiting) {
      return (
        <h1 className={cx('login__header')}>Waiting ...</h1>
      );
    }

    return (
      <div className={cx('login__container')}>
        <fieldset className={cx('login__fieldset')}>
            <input className={cx('login__input')}
              type="email"
              ref="email"
              placeholder="email" />
            <input className={cx('login__input')}
              type="password"
              ref="password"
              placeholder="password" />
            <button className={cx('login__button', 'login__button--green')}
              onClick={this.onLoginSubmit}>Signup</button>
        </fieldset>
      </div>
    );
  }
}

Signup.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Signup);

