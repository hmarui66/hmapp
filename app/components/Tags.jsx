import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from 'actions/tag';
import { Link } from 'react-router';
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
    const { tags, children } = this.props;
    const styles = {
      padding: 16
    };

    return (
      <main>
        <div data-content>
          <ul>
            {tags.map(tag => <Tag tag={tag._id} count={tag.count} showCount={true} key={tag._id}/>)}
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
