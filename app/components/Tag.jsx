import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Label from 'material-ui/lib/svg-icons/action/label';
import LabelNotChecked from 'material-ui/lib/svg-icons/action/label-outline';
import Colors from 'material-ui/lib/styles/colors';
import classNames from 'classnames/bind';
import styles from 'scss/components/tag';

const cx = classNames.bind(Object.assign({}, styles));

export default class Tag extends React.Component {

  static get propTypes() {
    return {
      tag: PropTypes.string.isRequired,
      checked: PropTypes.bool,
      count: PropTypes.number,
      showCount: PropTypes.bool,
      fontSize: PropTypes.number
    };
  }

  render() {
    const { tag, checked = true, count = 0, showCount = false, fontSize = 18 } = this.props;
    const color = Colors.grey600;
    const style = {
      height: fontSize,
      witdh: fontSize
    };
    const icon = checked ? <Label style={style} color={color}/> : <LabelNotChecked style={style} color={color}/>;
    return (
      <Link to={{ pathname: `/tags/${tag}` }} className={cx('article-tag')}>
        {icon}
        {tag}
        {showCount &&
          <span>({count})</span>
        }
      </Link>
    );
  }
}
