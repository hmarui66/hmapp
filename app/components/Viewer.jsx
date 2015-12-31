import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'scss/components/_viewer';

const cx = classNames.bind(styles);

class Viewer extends React.Component {
  render() {
    const articles = this.props.articles.map((article, key) => {
      return (
        <article key={key} className={cx('article')}>
          <div className={cx('article-meta')}>{article.createdAt}</div>
          <div className={cx('article-inner')}>
            <header className={cx('article-header')}>
              <h1>{article.title}</h1>
            </header>
            <div className={cx('article-entry')}>{article.text}</div>
            <footer className={cx('article-footer')}></footer>
          </div>
        </article>
      );
    });

    return (
      <div className={cx('viewer')}>
        <section id="main">
          {articles.length === 0 &&
            'empty article'
          }
          {articles}
        </section>
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
