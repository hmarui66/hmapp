import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'scss/components/_viewer';

const cx = classNames.bind(styles);

class Viewer extends React.Component {
  render() {
    return (
      <div className={cx('article')}>
        {this.props.articles.length === 0 &&
          'empty article'
        }
        {this.props.articles.length > 0 &&
          this.props.articles.map((article, key) => {
            return (
              <div key={key}>
                <h2>{article.title}</h2>
                <h3>{article.createdAt}</h3>
                <div>{article.text}</div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

Viewer.propTypes = {
  articles: PropTypes.array
};

function mapStateToProps(state) {
  return {
    articles: state.article.articles
  };
}

export default connect(mapStateToProps)(Viewer);
