import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from 'actions/tag';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import Tag from 'components/Tag';

class Tags extends React.Component {

  static fetchData({ dispatch, context = {} }) {
    return dispatch(load(context));
  }

  static get propTypes() {
    return {
      didMount: PropTypes.bool,
      loading: PropTypes.bool,
      tags: PropTypes.array,
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
    const { tags, children, params } = this.props;
    const { tag: selectedTag = '' } = params;

    const list = tags.map(
      tag => <Tag
        tag={tag._id}
        checked={tag._id === selectedTag}
        count={tag.count}
        showCount={true}
        key={tag._id}
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
  const { loading = false, tags = [] } = state.tag;
  return {
    didMount: state.app.didMount,
    loading,
    tags
  };
}

export default connect(
  mapStateToProps,
)(Tags);
