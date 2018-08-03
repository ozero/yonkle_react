
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons/';

class AppSnackbar extends Component {
  /*constructor(props) {
    super(props);  
  }*/
  
  static propTypes = {
    yk_state: PropTypes.object.isRequired,
    bindOnClickSnackbarClose: PropTypes.func.isRequired
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.yk_state.is_snackbar_open}
        autoHideDuration={2000}
        onClose={this.props.bindOnClickSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.yk_state.snackbar_message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.props.bindOnClickSnackbarClose}
          >
            <Close />
          </IconButton>,
        ]}
      />
    );
  }
}

export default AppSnackbar;
