import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Bookmark from 'material-ui/lib/svg-icons/action/bookmark';
import BookmarkNotChecked from 'material-ui/lib/svg-icons/action/bookmark-border';
import Colors from 'material-ui/lib/styles/colors';
import classNames from 'classnames/bind';
import styles from 'scss/components/category';

const cx = classNames.bind(Object.assign({}, styles));

export default class Category extends React.Component {

  static get propTypes() {
    return {
      category: PropTypes.string.isRequired,
      checked: PropTypes.bool,
      count: PropTypes.number,
      showCount: PropTypes.bool,
      fontSize: PropTypes.number
    };
  }

  render() {
    const { category, checked = true, count = 0, showCount = false, fontSize = 18 } = this.props;
    const color = Colors.grey600;
    const style = {
      height: fontSize,
      witdh: fontSize
    };
    const icon = checked ? <Bookmark color={color} style={style}/> : <BookmarkNotChecked color={color} style={style}/>;
    return (
      <Link to={{ pathname: `/categories/${category}` }} className={cx('article-category')}>
        {icon}
        {category}
        {showCount &&
          <span>({count})</span>
        }
      </Link>
    );
  }
}
