import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from 'scss/components/_navigation';

class Navigation extends Component {

  render() {
    const { dispatch } = this.props;
    return (
      <nav className={styles.navigation} role="navigation">
          <Link to="/" className={styles.navigation__item + ' ' + styles['navigation__item--logo']} activeClassName={styles['navigation__item--active']}>HM APP</Link>
      </nav>
    );
  }

}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Navigation);
