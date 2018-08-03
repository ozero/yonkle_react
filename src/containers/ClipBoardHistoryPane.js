import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';

class ClipBoardHistoryPane extends Component {
  //
  /*constructor(props) {
    super(props);
  }*/

  //
  static propTypes = {
    yk_state: PropTypes.object.isRequired,
    //bindOnClickEditorSelectElement: PropTypes.func.isRequired,
    //bindOnClickEditorHistoryItem: PropTypes.func.isRequired,
  };

  render() {
    let cbHistory = [];
    for(let i in this.props.yk_state.clipboard_history){
      if(this.props.yk_state.clipboard_history[i] === null){
        continue;
      }
      cbHistory.push(
        <div className="cbh_item" key={i}><Button variant="contained" className="cbh_item">
          {this.props.yk_state.clipboard_history[i]}
        </Button></div>
      );
    }

    //
    return (
      <div className="pane-container">
        <div>clipboard history item list.</div>
        <div>{cbHistory}</div>
      </div>
    );
  }
}

export default ClipBoardHistoryPane;
