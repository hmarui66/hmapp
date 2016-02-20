import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleResizable } from 'material-ui/lib/mixins';
import { didMount } from 'actions/app';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import AppLefftNav from 'components/AppLeftNav';
import 'scss/main';

const App = React.createClass({
  mixins: [
    StyleResizable
  ],

  propTypes: {
    dispatch: PropTypes.func,
    children: PropTypes.node,
    location: PropTypes.object
  },

  getInitialState() {
    return {
      leftNavOpen: false
    };
  },

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(didMount());
  },

  render() {
    const {
      location,
      children
    } = this.props;
    let {
      leftNavOpen
    } = this.state;

    const styles = {};
    let docked = false;
    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.paddingLeft = 256;
      docked = true;
      leftNavOpen = true;
    }
    return (
      <div>
        <AppLefftNav
          docked={docked}
          location={location}
          onRequestChangeLeftNav={this.handleChangeRequestLeftNav}
          onRequestChangeList={this.handleRequestChangeList}
          open={leftNavOpen}
        />
        <div style={styles}>
          {!docked &&
            <IconButton onTouchTap={this.handleTouchTapLeftIconButton}>
              <FontIcon className="material-icons">menu</FontIcon>
            </IconButton>
          }
          {children}
        </div>
      </div>
    );
  },

  handleTouchTapLeftIconButton() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen
    });
  },

  handleChangeRequestLeftNav(open) {
    this.setState({
      leftNavOpen: open
    });
  },

  handleRequestChangeList(event, value) {
    this.context.router.push(value);
    this.setState({
      leftNavOpen: false
    });
  },

  contextTypes: {
    router: PropTypes.object.isRequired
  }

});

/* FIXME use class
class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(didMount());
  }

  render() {
    let docked = false;
    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      docked = true;
    }
    return (
      <div>
        <AppLefftNav docked={docked} />
        {this.props.children}
      </div>
    );
  }
}
*/

export default connect()(App);
