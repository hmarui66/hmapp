import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import marked from 'marked';
import classNames from 'classnames/bind';
import styles from 'scss/components/viewer';

const cx = classNames.bind(styles);

class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  render() {
    const articles = this.props.articles.map((article, key) => {
      return (
        <article key={key} className={cx('article')}>
          <div className={cx('article-meta')}>{article.createdAt}</div>
          { true && // todo confirm auth
            <div className={cx('article-edit')}>
              <button onClick={() => this.handleEdit(article.id)}>edit</button>
            </div>
          }
          <div className={cx('article-inner')}>
            <header className={cx('article-header')}>
              <h1>{article.title}</h1>
            </header>
            <div className={cx('article-entry')} dangerouslySetInnerHTML={{ __html: marked(article.text) }}></div>
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

  handleEdit(id) {
    const { dispatch } = this.props;
    dispatch(updatePath(`/edit/${id}`));
  }
}

Viewer.propTypes = {
  articles: PropTypes.array,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    articles: state.article.articles
  };
}

export default connect(
  mapStateToProps,
)(Viewer);
