import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {IconButton, Drawer, MenuItem } from '@material-ui/core';
import {ChevronLeft,Edit, History, GetApp, ExitToApp, Info} from '@material-ui/icons/';

import './AppDrawer.css';

class AppDrawer extends Component {
  /*constructor(props) {
    super(props);  
  }*/
  
  static propTypes = {
    ykState: PropTypes.object.isRequired,
    bindOnClickNavPaneToggle: PropTypes.func.isRequired,
    bindOnClickDrawerItem: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Drawer className="app-drawer"
        variant="temporary"
        anchor='left'
        open={this.props.ykState.isNavPaneOpen}
      >
        <div style={{textAlign:"right"}} className="appdrawer-menuitem">
          <IconButton onClick={() => this.props.bindOnClickNavPaneToggle() }>
          <ChevronLeft />
          </IconButton>
        </div>
        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("editor") }
          selected={(this.props.ykState.currentPane === "editor")}
        >
          <Edit className="menuitem-icon" />Editor
        </MenuItem>
        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("history") }
          selected={(this.props.ykState.currentPane === "history")}
        >
          <History className="menuitem-icon" />History
        </MenuItem>
        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("export") }
          selected={(this.props.ykState.currentPane === "export")}
        >
          <ExitToApp className="menuitem-icon" />Export
        </MenuItem>
        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("import") }
          selected={(this.props.ykState.currentPane === "import")}
        >
          <GetApp className="menuitem-icon" />Import
        </MenuItem>
        <MenuItem className="appdrawer-menuitem"
          onClick={() => this.props.bindOnClickDrawerItem("about") }
          selected={(this.props.ykState.currentPane === "about")}
        >
          <Info className="menuitem-icon" />About
        </MenuItem>
      </Drawer>
    );
  }
}

export default AppDrawer;
