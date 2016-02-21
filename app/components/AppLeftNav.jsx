import React, { Component, PropTypes } from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import FontIcon from 'material-ui/lib/font-icon';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import avatarImage from 'images/avatar.jpg';
const imageStyle = {
  marginTop: 16,
  marginLeft: 56
};

const SelectableList = SelectableContainerEnhance(List);

export default class AppLeftNav extends Component {
  render() {
    const {
      docked,
      location,
      onRequestChangeLeftNav,
      onRequestChangeList,
      open
    } = this.props;
    return (
      <div>
        <LeftNav
          docked={docked}
          open={open}
          onRequestChange={onRequestChangeLeftNav}
        >
          <Avatar src={avatarImage} size={128} style={imageStyle} />
          <SelectableList
            insetSubheader={true}
            subheader="hmarui66"
            valueLink={{value: location.pathname, requestChange: onRequestChangeList}}
          >
            <ListItem
              leftIcon={<FontIcon className="material-icons">home</FontIcon>}
              primaryText="Home" value="/"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">bookmark</FontIcon>}
              primaryText="Categories" value="/categories"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">local_offer</FontIcon>}
              primaryText="Tags" value="/tags"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">archive</FontIcon>}
              primaryText="Archive" value="/archive"
            />
            <ListItem
              leftIcon={<FontIcon className="material-icons">search</FontIcon>}
              primaryText="Search" value="/search"
            />
          </SelectableList>

        </LeftNav>
      </div>
    );
  }
}

AppLeftNav.propTypes = {
  docked: PropTypes.bool,
  location: PropTypes.object.isRequired,
  onRequestChangeLeftNav: PropTypes.func,
  onRequestChangeList: PropTypes.func,
  open: PropTypes.bool
};
