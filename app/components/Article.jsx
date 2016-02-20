import React, { PropTypes } from 'react';
import marked from 'marked';
import moment from 'moment';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import FontIcon from 'material-ui/lib/font-icon';
import classNames from 'classnames/bind';
import styles from 'scss/components/article';
import stylesGm from 'github-markdown-css/github-markdown';

const cx = classNames.bind(Object.assign({}, styles, stylesGm));
const format = 'Do MMMM, YYYY';

const articleStyles = {
  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  marginTop: 32,
  marginLeft: 32,
  marginBottom: 48,
  marginRight: 32
};

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
        <FontIcon className="material-icons" style={{fontSize: 18}}>local_offer</FontIcon>
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
      <article className={cx('article', 'markdown-body')} style={articleStyles}>
        {article &&
          <div className={cx('article-inner')}>
            { canEdit &&
              <div className={cx('article-edit')}>
                <RaisedButton label="edit" onClick={this.onEdit}/>
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
