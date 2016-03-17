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
    const { dispatch, params = {}, loading = false } = this.props;
    const { id = null } = params;
    this.context.shareLoading(loading);
    if (id) {
      dispatch(loadArticle(id));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location, loading } = this.props;
    const { location: nextLocation, loading: nextLoading } = nextProps;
    if (loading !== nextLoading) {
      this.context.shareLoading(nextLoading);
    }
    if (location.search !== nextLocation.search) {
      dispatch(loadList(location.pathname, nextLocation.query));
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
        {!loading && !article &&
          <div>not found</div>
        }
      </div>
    );
  }

  static get contextTypes() {
    return {
      shareLoading: PropTypes.func
    };
  }
}

Show.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
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

export default connect(mapStateToProps)(Show);
