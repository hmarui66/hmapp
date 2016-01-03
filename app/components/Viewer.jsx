import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import classNames from 'classnames/bind';

import Article from 'components/Article';
import styles from 'scss/components/viewer';

const cx = classNames.bind(styles);

class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  render() {
    const { authenticated } = this.props.user;
    const articles = this.props.articles.map((article, key) => {
      return (
        <Article article={article} canEdit={authenticated} onEdit={this.handleEdit} key={key} />
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
}

Viewer.propTypes = {
  user: PropTypes.object,
  articles: PropTypes.array,
  dispatch: PropTypes.func
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
