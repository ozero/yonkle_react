import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, AppBar, Toolbar, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

class AppNavbar extends Component {
  
  static propTypes = {
    yk_state: PropTypes.object.isRequired,
    bindOnClickNavPaneToggle: PropTypes.func.isRequired
  };

  render() {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={() => this.props.bindOnClickNavPaneToggle()} >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
          ෆ◕◡◕
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppNavbar;
