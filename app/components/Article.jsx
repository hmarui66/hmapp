import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import classNames from 'classnames/bind';
import styles from 'scss/components/article';
import stylesGm from 'github-markdown-css/github-markdown';

const cx = classNames.bind(Object.assign({}, styles, stylesGm));

export default class Article extends React.Component {

  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
  }

  onEdit() {
    const { article } = this.props;
    this.props.onEdit(article.id);
  }

  render() {
    const { article, canEdit } = this.props;
    return (
      <article className={cx('article', 'markdown-body')}>
        <div className={cx('article-inner')}>
          <header className={cx('article-header')}>
            <div>
              <h1><Link className={styles.navigation__item} to={`/show/${article.id}`}>{article.title}</Link></h1>
              <p className={cx('article-meta')}>{article.createdAt}</p>
            </div>
            { canEdit &&
              <div className={cx('article-edit')}>
                <button onClick={this.onEdit}>edit</button>
              </div>
            }
          </header>
          <div className={cx('article-entry')} dangerouslySetInnerHTML={{ __html: marked(article.text) }}></div>
          <footer className={cx('article-footer')}></footer>
        </div>
      </article>
    );
  }

}

Article.propTypes = {
  article: PropTypes.object,
  canEdit: PropTypes.bool,
  onEdit: PropTypes.func
};
