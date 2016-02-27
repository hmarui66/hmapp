import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'scss/components/category';

const cx = classNames.bind(Object.assign({}, styles));

export default class Category extends React.Component {

  static get propTypes() {
    return {
      category: PropTypes.string.isRequired,
      count: PropTypes.number,
      showCount: PropTypes.bool
    };
  }

  render() {
    const { category, count = 0, showCount = false } = this.props;
    return (
      <Link to={{ pathname: `/categories/${category}` }} className={cx('article-category')}>
        {category}
        {showCount &&
          <span>({count})</span>
        }
      </Link>
    );
  }
}
