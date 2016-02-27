import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from 'actions/category';
import { Link } from 'react-router';
import Category from 'components/Category';

class Categories extends React.Component {

  static fetchData({ dispatch, context = {} }) {
    return dispatch(load(context));
  }

  static get propTypes() {
    return {
      didMount: PropTypes.bool,
      loading: PropTypes.bool,
      categories: PropTypes.array,
      dispatch: PropTypes.func,
      children: PropTypes.node,
      location: PropTypes.object
    };
  }

  componentWillMount() {
    if (!this.props.didMount) {
      return;
    }
    const { dispatch, loading = false } = this.props;
    this.context.shareLoading(loading);
    dispatch(load());
  }

  render() {
    const { categories, children } = this.props;
    const styles = {
      padding: 16
    };

    return (
      <main>
        <div data-content>
          <ul>
            {categories.map(category => <Category category={category._id} count={category.count} showCount={true} key={category._id}/>)}
          </ul>
          {children}
        </div>
      </main>
    );
  }

  static get contextTypes() {
    return {
      shareLoading: PropTypes.func
    };
  }
}

function mapStateToProps(state) {
  const { loading = false, categories = [] } = state.category;
  return {
    didMount: state.app.didMount,
    loading,
    categories
  };
}

export default connect(
  mapStateToProps,
)(Categories);
