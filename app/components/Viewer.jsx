import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { loadList, destroyArticle } from 'actions/article';
import Article from 'components/Article';
import Paginate from 'components/Paginate';

import classNames from 'classnames/bind';
import styles from 'scss/components/viewer';

const cx = classNames.bind(styles);

const style = {
  container: {
    position: 'relative'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative'
  }
};

class Viewer extends React.Component {

  static fetchData({ dispatch, path = '', query = {}, context = {} }) {
    return dispatch(loadList(path, query, context));
  }

  constructor(props) {
    super(props);
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestory = this.handleDestory.bind(this);
  }

  componentWillMount() {
    if (!this.props.didMount) {
      return;
    }
    const { dispatch, location, loading = false } = this.props;
    this.context.shareLoading(loading);
    dispatch(loadList(location.pathname));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location, loading } = this.props;
    const { location: nextLocation, loading: nextLoading } = nextProps;
    if (loading !== nextLoading) {
      this.context.shareLoading(nextLoading);
    }
    if (location.pathname !== nextLocation.pathname) {
      dispatch(loadList(nextLocation.pathname, nextLocation.query));
    }
  }

  render() {
    const { loading = false, articles = [], paginateOption = {}, location } = this.props;
    const { authenticated } = this.props.user;
    const articleDoms = articles.map((article, key) => {
      return (
        <Article loading={loading} article={article} canEdit={authenticated} onEdit={this.handleEdit} onDelete={this.handleDestory} key={key} />
      );
    });

    return (
      <div className={cx('viewer')}>
        {authenticated &&
          <button onClick={this.handleNew}>new</button>
        }
        <section style={style.container}>
          {!loading && articles.length === 0 &&
            'empty article'
          }
          {articleDoms}
        </section>
        <Paginate pathname={location.pathname} query={location.query} option={paginateOption} />
      </div>
    );
  }

  handleNew() {
    const { dispatch } = this.props;
    dispatch(routeActions.push('/new'));
  }

  handleEdit(id) {
    const { dispatch } = this.props;
    dispatch(routeActions.push(`/edit/${id}`));
  }

  handleDestory(id) {
    const { dispatch } = this.props;
    if (confirm('Are you sure you want delete this article?')) {
      dispatch(destroyArticle(id));
    }
  }

  static get contextTypes() {
    return {
      shareLoading: PropTypes.func
    };
  }
}

Viewer.propTypes = {
  didMount: PropTypes.bool,
  loading: PropTypes.bool,
  user: PropTypes.object,
  articles: PropTypes.array,
  paginateOption: PropTypes.object,
  dispatch: PropTypes.func,
  location: PropTypes.object
};

function mapStateToProps(state) {
  const { articles = {} } = state.article;
  const {
    docs = [],
    page = 0,
    pages = 0,
    total = 0
  } = articles;

  return {
    didMount: state.app.didMount,
    loading: state.article.loading,
    user: state.user,
    articles: docs,
    paginateOption: { page, pages, total }
  };
}

export default connect(
  mapStateToProps,
)(Viewer);
