import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { typing, loadArticle, createArticle, saveArticle } from 'actions/article';
import Article from 'components/Article';
import styles from 'scss/components/editor';

const cx = classNames.bind(styles);

class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.handleTyping = this.handleTyping.bind(this);
    this.handleTypingTags = this.handleTypingTags.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { dispatch, params = {}, loading = false } = this.props;
    const { id = null } = params;
    this.context.shareLoading(loading);
    if (id) {
      dispatch(loadArticle(id));
    } else {
      dispatch(createArticle());
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props;
    const { loading: nextLoading } = nextProps;
    if (loading !== nextLoading) {
      this.context.shareLoading(nextLoading);
    }
  }

  render() {
    const { article, loading = false } = this.props;
    const { saving = false, tags = [] } = article || {};
    const articleConfig = { isAll: true, canEdit: false };
    const tagsText = tags.join(' ');
    return (
      <div className={cx('container')}>
        {article &&
          <div className={cx('wrapper')}>
            <div className={cx('editor')}>
              <input type="text" className={cx('title')} onChange={event => this.handleTyping('title', event.target.value)} value={article.title} placeholder="title" />
              <input type="text" className={cx('category')} onChange={event => this.handleTyping('category', event.target.value)} value={article.category} placeholder="category" />
              <input type="text" className={cx('tags')} onChange={event => this.handleTypingTags(event.target.value)} value={tagsText} placeholder="tags" />
              <textarea type="text" className={cx('text')} onChange={event => this.handleTyping('text', event.target.value)} value={article.text} placeholder="text" />
              <label><input type="checkbox" className={cx('published')} onChange={event => this.handleTyping('published', event.target.checked)} checked={article.published} />公開</label>
              <button className={cx('save')} onClick={this.handleSubmit} disabled={saving}>save</button>
            </div>
            <div className={cx('preview')}>
              <Article article={article} { ...articleConfig } />
            </div>
          </div>
        }
        {!loading && !article &&
          <div>not found</div>
        }
      </div>
    );
  }

  handleTyping(field, value) {
    const { dispatch } = this.props;
    dispatch(typing(field, value));
  }

  handleTypingTags(value) {
    const tags = value.split(' ');
    this.handleTyping('tags', tags);
  }

  handleSubmit() {
    const { dispatch, article } = this.props;
    dispatch(saveArticle(article));
  }

  static get contextTypes() {
    return {
      shareLoading: PropTypes.func
    };
  }
}

Editor.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  article: PropTypes.object,
  loading: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    article: state.article.article,
    loading: state.article.loading
  };
}

export default connect(mapStateToProps)(Editor);
