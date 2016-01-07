import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from 'scss/components/navigation';

class Navigation extends Component {

  render() {
    const { authenticated } = this.props.user;
    return (
      <nav className={styles.navigation} role="navigation">
          <Link to="/" className={styles.navigation__item + ' ' + styles['navigation__item--logo']} activeClassName={styles['navigation__item--active']}>HM APP</Link>
          {authenticated &&
            <Link className={styles.navigation__item} to="/all">All</Link>
          }
          {authenticated &&
            <Link className={styles.navigation__item} to="/signup">Signup</Link>
          }
          {authenticated &&
            <a className={styles.navigation__item} href="/logout">Logout</a>
          }
      </nav>
    );
  }

}

Navigation.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Navigation);
