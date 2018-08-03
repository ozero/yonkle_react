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
    ykState: PropTypes.object.isRequired,
    //bindOnClickEditorSelectElement: PropTypes.func.isRequired,
    //bindOnClickEditorHistoryItem: PropTypes.func.isRequired,
  };

  render() {
    let cbHistory = [];
    for(let i in this.props.ykState.clipboard_history){
      console.log("cbHistory", i, this.props.ykState.clipboard_history[i]);
      cbHistory.push(<Button variant="contained" className="cbh_item" key={i}>
        {this.props.ykState.clipboard_history[i]}
      </Button>);
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
