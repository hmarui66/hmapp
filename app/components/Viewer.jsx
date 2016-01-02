import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import marked from 'marked';
import classNames from 'classnames/bind';
import styles from 'scss/components/viewer';
import stylesGm from 'github-markdown-css/github-markdown';

const cx = classNames.bind(Object.assign({}, styles, stylesGm));

class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  render() {
    const articles = this.props.articles.map((article, key) => {
      return (
        <article key={key} className={cx('article', 'markdown-body')}>
          <div className={cx('article-inner')}>
            <header className={cx('article-header')}>
              <div>
                <h1>{article.title}</h1>
                <p className={cx('article-meta')}>{article.createdAt}</p>
              </div>
              { true && // todo confirm auth
                <div className={cx('article-edit')}>
                  <button onClick={() => this.handleEdit(article.id)}>edit</button>
                </div>
              }
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
