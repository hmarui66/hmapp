import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import classNames from 'classnames/bind';
import moment from 'moment';
import styles from 'scss/components/article';
import stylesGm from 'github-markdown-css/github-markdown';

const cx = classNames.bind(Object.assign({}, styles, stylesGm));
const format = 'Do MMMM, YYYY';

export default class Article extends React.Component {

  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onEdit() {
    const { article } = this.props;
    this.props.onEdit(article.id);
  }

  onDelete() {
    const { article } = this.props;
    this.props.onDelete(article.id);
  }

  render() {
    const { loading, article, canEdit } = this.props;
    let createdAt;
    let updatedAt;
    if (article) {
      createdAt = moment(article.createdAt);
      updatedAt = moment(article.updatedAt);
    }
    return (
      <article className={cx('article', 'markdown-body')}>
        {article &&
          <div className={cx('article-inner')}>
            { canEdit &&
              <div className={cx('article-edit')}>
                <button onClick={this.onEdit}>edit</button>
                <button onClick={this.onDelete}>destory</button>
              </div>
            }
            <header className={cx('article-header')}>
              <div>
                <h1><Link className={styles.navigation__item} to={`/show/${article.id}`}>{article.title}</Link></h1>
                <p className={cx('article-meta')}>
                  {!article.published &&
                    <span>[非公開]</span>
                  }
                  <span>{createdAt.format(format)}</span>
                  {!createdAt.isSame(updatedAt) &&
                    <span> (updated: {updatedAt.format(format)})</span>

                  }
                </p>
              </div>
            </header>
            <div className={cx('article-entry')} dangerouslySetInnerHTML={{ __html: marked(article.text) }}></div>
            <footer className={cx('article-footer')}></footer>
          </div>
        }
        {loading &&
          <div>loading</div>
        }
        {!loading && !article &&
          <div>not found</div>
        }
      </article>
    );
  }

}

Article.propTypes = {
  loading: PropTypes.bool,
  article: PropTypes.object,
  canEdit: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
