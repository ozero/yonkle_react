
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons/';

class AppSnackbar extends Component {
  /*constructor(props) {
    super(props);  
  }*/
  
  static propTypes = {
    ykState: PropTypes.object.isRequired,
    bindOnClickSnackbarClose: PropTypes.func.isRequired
  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.ykState.isSnackbarOpen}
        autoHideDuration={2000}
        onClose={this.props.bindOnClickSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.ykState.snackBarMessage}</span>}
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
