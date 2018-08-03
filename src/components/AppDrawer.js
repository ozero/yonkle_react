import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {IconButton, SwipeableDrawer, MenuItem, Divider } from '@material-ui/core';
import {ChevronLeft,Edit, History, GetApp, ExitToApp, Info} from '@material-ui/icons/';

import './AppDrawer.css';

class AppDrawer extends Component {
  /*constructor(props) {
    super(props);  
  }*/
  
  static propTypes = {
    yk_state: PropTypes.object.isRequired,
    bindOnClickNavPaneToggle: PropTypes.func.isRequired,
    bindOnClickDrawerItem: PropTypes.func.isRequired,
  };

  render() {
    return (
      <SwipeableDrawer className="app-drawer"
        anchor='left'
        open={this.props.yk_state.is_navpane_open}
      >
        <div style={{textAlign:"right"}} className="appdrawer-menuitem">
          <IconButton onClick={() => this.props.bindOnClickNavPaneToggle() }>
          <ChevronLeft />
          </IconButton>
        </div>

        <Divider />

        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("editor") }
          selected={(this.props.yk_state.current_pane === "editor")}
        >
          <Edit className="menuitem-icon" />Editor
        </MenuItem>
        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("history") }
          selected={(this.props.yk_state.current_pane === "history")}
        >
          <History className="menuitem-icon" />History
        </MenuItem>

        <Divider />

        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("export") }
          selected={(this.props.yk_state.current_pane === "export")}
        >
          <ExitToApp className="menuitem-icon" />Export
        </MenuItem>
        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("import") }
          selected={(this.props.yk_state.current_pane === "import")}
        >
          <GetApp className="menuitem-icon" />Import
        </MenuItem>
        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("about") }
          selected={(this.props.yk_state.current_pane === "about")}
        >
          <Info className="menuitem-icon" />About
        </MenuItem>
      </SwipeableDrawer>
    );
  }
}

export default AppDrawer;
