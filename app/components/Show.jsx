import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import { loadArticle } from 'actions/article';
import Article from 'components/Article';
import styles from 'scss/components/editor';

const cx = classNames.bind(styles);

class Show extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, params = {} } = this.props;
    const { id = null } = params;
    if (id) {
      dispatch(loadArticle(id));
    }
  }

  render() {
    const { article, loading = false } = this.props;
    return (
      <div className={cx('container')}>
        {article &&
          <div className={cx('wrapper')}>
            <div className={cx('preview')}>
              <Article article={article} canEdit={false} />
            </div>
          </div>
        }
        {loading &&
          <div>loading</div>
        }
        {!loading && !article &&
          <div>not found</div>
        }
      </div>
    );
  }
}

Show.propTypes = {
  dispatch: PropTypes.func,
  params: PropTypes.object,
  article: PropTypes.object,
  loading: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    article: state.article.article
  };
}

export default connect(mapStateToProps)(Show);
