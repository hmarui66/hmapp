import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import marked from 'marked';

import { typing, loadArticle, createArticle, saveArticle } from 'actions/article';
import styles from 'scss/components/editor';

const cx = classNames.bind(styles);

class Editor extends React.Component {

  constructor(props) {
    super(props);

    this.handleTyping = this.handleTyping.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { dispatch, params = {} } = this.props;
    const { id = null } = params;
    if (id) {
      dispatch(loadArticle(id));
    } else {
      dispatch(createArticle());
    }
  }

  render() {
    const { article } = this.props;
    return (
      <div>
        {article &&
          <div>
            <input type="text" className={cx('title')} onChange={event => this.handleTyping(event, 'title')} value={article.title} />
            <textarea type="text" className={cx('text')} onChange={event => this.handleTyping(event, 'text')} value={article.text} />
            <div dangerouslySetInnerHTML={{ __html: marked(article.text) }}></div>
            <button onClick={this.handleSubmit}>save</button>
          </div>
        }
        {!article &&
          <div>not found</div>
        }
      </div>
    );
  }

  handleTyping(event, field) {
    const { dispatch } = this.props;
    dispatch(typing(field, event.target.value));
  }

  handleSubmit() {
    const { dispatch, article } = this.props;
    dispatch(saveArticle(article));
  }
}

Editor.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  article: PropTypes.object
};

function mapStateToProps(state) {
  return {
    article: state.article.article
  };
}

export default connect(mapStateToProps)(Editor);
