import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';

class ClipBoardHistoryPane extends Component {
  //
  /*constructor(props) {
    super(props);
  }*/

  //
  static propTypes = {
    yk_state: PropTypes.object.isRequired,
    bindOnClickSnackbarClose: PropTypes.func.isRequired,
    bindOnClickCbhCopytext: PropTypes.func.isRequired
  };

  render() {
    let cbHistory = [];
    for(let i in this.props.yk_state.clipboard_history){
      if(this.props.yk_state.clipboard_history[i] === null){
        continue;
      }
      cbHistory.push(
        <div className="cbh_item" key={i}>

          <CopyToClipboard 
            text={this.props.yk_state.clipboard_history[i]} 
            onCopy={() => this.props.bindOnClickCbhCopytext(this.props.yk_state.clipboard_history[i])}
          >
            <Button variant="contained" className="cbh_item">
              {this.props.yk_state.clipboard_history[i]}
            </Button>
          </CopyToClipboard>
        </div>
      );
    }

    //
    return (
      <div className="pane-container">
        <p>clipboard history item list.</p>
        <div>{cbHistory}</div>
      </div>
    );
  }
}

export default ClipBoardHistoryPane;
