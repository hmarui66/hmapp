import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import FontIcon from 'material-ui/lib/font-icon';
import classNames from 'classnames/bind';
import styles from 'scss/components/tag';

const cx = classNames.bind(Object.assign({}, styles));

export default class Tag extends React.Component {

  static get propTypes() {
    return {
      tag: PropTypes.string.isRequired,
      count: PropTypes.number,
      showCount: PropTypes.bool,
      fontSize: PropTypes.number
    };
  }

  render() {
    const { tag, count = 0, showCount = false, fontSize = 18 } = this.props;
    return (
      <Link to={{ pathname: `/tags/${tag}` }} className={cx('article-tag')}>
        <FontIcon className="material-icons" style={{fontSize}}>local_offer</FontIcon>
        {tag}
        {showCount &&
          <span>({count})</span>
        }
      </Link>
    );
  }
}
