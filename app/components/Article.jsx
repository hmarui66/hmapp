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
    this.renderTags = this.renderTags.bind(this);
  }

  onEdit() {
    const { article } = this.props;
    this.props.onEdit(article.id);
  }

  onDelete() {
    const { article } = this.props;
    this.props.onDelete(article.id);
  }

  renderTags(tag, key) {
    const { isAll = false } = this.props;
    return (
      <Link to={{ pathname: (isAll ? '/all' : '/' ), query: { tags: tag } }} className={cx('article-tag')} key={key}>
        <i className="fa fa-tag"></i>
        {tag}
      </Link>
    );
  }

  render() {
    const { loading, article, canEdit, isAll = false } = this.props;
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
                <div>
                  <p className={cx('article-timestamp')}>
                    {!article.published &&
                      <span>[非公開]</span>
                    }
                    <span>{createdAt.format(format)}</span>
                    {!createdAt.isSame(updatedAt) &&
                      <span> (updated: {updatedAt.format(format)})</span>
                    }
                  </p>
                  {(article.category || article.tags) &&
                    <p>
                      {article.category &&
                        <Link to={{ pathname: (isAll ? '/all' : '/' ), query: { category: article.category } }} >{article.category}</Link>
                      }
                      {article.tags && Array.isArray(article.tags) &&
                        article.tags.map(this.renderTags)
                      }
                    </p>
                  }
                </div>
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
  isAll: PropTypes.bool,
  loading: PropTypes.bool,
  article: PropTypes.object,
  canEdit: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
