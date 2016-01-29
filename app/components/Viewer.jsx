import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import classNames from 'classnames/bind';

import { loadList, destroyArticle } from 'actions/article';
import Article from 'components/Article';
import Paginate from 'components/Paginate';
import styles from 'scss/components/viewer';

const cx = classNames.bind(styles);

class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.isAll = this.isAll.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestory = this.handleDestory.bind(this);
  }

  componentWillMount() {
    const { dispatch, location } = this.props;
    const { query = {} } = location;
    dispatch(loadList(this.isAll() ? '/article/all' : '/article', query));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location } = this.props;
    const { location: nextLocation } = nextProps;
    if (location.search !== nextLocation.search) {
      const api = (this.isAll() ? '/article/all' : '/article') + nextLocation.search;
      dispatch(loadList(api));
    }
  }

  render() {
    const { loading = false, articles = [], paginateOption = {}, location } = this.props;
    const { authenticated } = this.props.user;
    const articleDoms = articles.map((article, key) => {
      return (
        <Article isAll={this.isAll()} loading={loading} article={article} canEdit={authenticated} onEdit={this.handleEdit} onDelete={this.handleDestory} key={key} />
      );
    });

    return (
      <div className={cx('viewer')}>
        {authenticated &&
          <button onClick={this.handleNew}>new</button>
        }
        <section>
          {loading &&
            'loading articles'
          }
          {!loading && articles.length === 0 &&
            'empty article'
          }
          {articleDoms}
        </section>
        <Paginate baseUrl={this.isAll() ? '/all' : ''} query={location.query} option={paginateOption} />
      </div>
    );
  }

  isAll() {
    const { location } = this.props;
    return location.pathname && !!location.pathname.match(/^\/all/);
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
}

Viewer.propTypes = {
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
    loading: state.article.loading,
    user: state.user,
    articles: docs,
    paginateOption: { page, pages, total }
  };
}

export default connect(
  mapStateToProps,
)(Viewer);
