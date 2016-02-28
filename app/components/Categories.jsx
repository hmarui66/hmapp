import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from 'actions/category';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
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
      params: PropTypes.object,
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
    const { categories, children, params } = this.props;
    const { category: selectedCategory = '' } = params;

    const list = categories.map(
      category => <Category
        category={category._id}
        checked={category._id === selectedCategory}
        count={category.count}
        showCount={true}
        key={category._id}
      />
    );

    return (
      <main>
        <div data-content>
          <Card>
            <CardActions>
              {list}
            </CardActions>
          </Card>
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
