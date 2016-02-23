import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { show, hide } from 'actions/indicator';
import LinearProgress from 'material-ui/lib/linear-progress';

class Indicator extends Component {

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      loading: PropTypes.bool,
      display: PropTypes.bool
    };
  }

  componentWillMount() {
    const { loading } = this.props;
    const action = loading ? show : hide;
    this.props.dispatch(action());
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props;
    const { loading: nextLoading } = nextProps;
    if (loading !== nextLoading) {
      const action = nextLoading ? show : hide;
      this.props.dispatch(action());
    }
  }

  render() {
    const { display, loading } = this.props;
    const style = {
      position: 'fixed',
      top: 0,
      display: (display || loading) ? 'block' : 'none'
    };
    return (
      <LinearProgress mode="indeterminate" style={style}/>
    );
  }

}

function mapStateToProps(state) {
  return { display: state.indicator.display };
}

export default connect(mapStateToProps)(Indicator);
