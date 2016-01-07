import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import classNames from 'classnames/bind';

import { loadList, destroyArticle } from 'actions/article';
import Article from 'components/Article';
import styles from 'scss/components/viewer';

const cx = classNames.bind(styles);

class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDestory = this.handleDestory.bind(this);
  }

  componentWillMount() {
    const { dispatch, location } = this.props;
    const { pathname } = location;
    if (pathname && pathname === '/all') {
      dispatch(loadList('/article/all'));
    } else {
      dispatch(loadList());
    }
  }

  render() {
    const { authenticated } = this.props.user;
    const articles = this.props.articles.map((article, key) => {
      return (
        <Article article={article} canEdit={authenticated} onEdit={this.handleEdit} onDelete={this.handleDestory} key={key} />
      );
    });

    return (
      <div className={cx('viewer')}>
        {authenticated &&
          <button onClick={this.handleNew}>new</button>
        }
        <section>
          {articles.length === 0 &&
            'empty article'
          }
          {articles}
        </section>
      </div>
    );
  }

  handleNew() {
    const { dispatch } = this.props;
    dispatch(updatePath('/new'));
  }

  handleEdit(id) {
    const { dispatch } = this.props;
    dispatch(updatePath(`/edit/${id}`));
  }

  handleDestory(id) {
    const { dispatch } = this.props;
    confirm('Are you sure you want delete this article?') && dispatch(destroyArticle(id));
  }
}

Viewer.propTypes = {
  user: PropTypes.object,
  articles: PropTypes.array,
  dispatch: PropTypes.func,
  location: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
    articles: state.article.articles
  };
}

export default connect(
  mapStateToProps,
)(Viewer);
