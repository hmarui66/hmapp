import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'scss/components/paginate';

const cx = classNames.bind(styles);

export default class Paginate extends Component {
  constructor(props) {
    super(props);
    this.renderLink = this.renderLink.bind(this);
  }

  renderLink(pathname, page, selectedPage, caption = null) {
    const { query } = this.props;
    let classes = ['paginate-item'];
    if (page === selectedPage) {
      classes.push('selected');
    }
    return (
      <Link className={cx(classes)} to={{pathname, query: { ...query, page }}} key={page}>{caption ? caption : page}</Link>
    );
  }

  render() {
    const { baseUrl, option = {} } = this.props;
    const {
      page = 0,
      pages = 0
    } = option;

    return (
      <div className={cx('paginate-container')}>
        {pages > 1 &&
          <div className={cx('paginate-list')}>
            {[...Array(pages).keys()].map(num => {
              return this.renderLink(baseUrl, num + 1, page);
            })}
          </div>
        }
      </div>

    );
  }

}

Paginate.propTypes = {
  baseUrl: PropTypes.string,
  query: PropTypes.object,
  option: PropTypes.object
};
