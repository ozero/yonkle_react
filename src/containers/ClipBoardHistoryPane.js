import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {List, ListItem, ListItemText} from '@material-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';

class ClipBoardHistoryPane extends Component {

  //
  static propTypes = {
    yk_state: PropTypes.object.isRequired,
    bindOnClickCbhCopytext: PropTypes.func.isRequired
  };

  render() {
    //let cbHistory = [];
    let cbHistoryList = [];
    for(let i in this.props.yk_state.clipboard_history){
      if(this.props.yk_state.clipboard_history[i] === null){
        continue;
      }
      /* 
      cbHistory.push(
        <div className="cbh_item" key={i}>

          <CopyToClipboard 
            text={this.props.yk_state.clipboard_history[i]} 
            onCopy={() => this.props.bindOnClickCbhCopytext(this.props.yk_state.clipboard_history[i])}
          >
            <Button 
              className="cbh_item"
              variant="contained" 
              style={{textTransform:"none"}}
            >
              {this.props.yk_state.clipboard_history[i]}
            </Button>
          </CopyToClipboard>
        </div>
      );
      */
      cbHistoryList.push(
        <CopyToClipboard key={i}
          text={this.props.yk_state.clipboard_history[i]} 
          onCopy={() => this.props.bindOnClickCbhCopytext(this.props.yk_state.clipboard_history[i])}
        >
          <ListItem button>
            <ListItemText primary={this.props.yk_state.clipboard_history[i]} />
          </ListItem>        
        </CopyToClipboard>
      );
    }

    //
    return (
      <div className="pane-container">
        <p>History: アイテムをタップするとコピーできます</p>
        <List component="nav" className="cbh-list">
          {cbHistoryList}
        </List>
      </div>
    );
    /* <div>{cbHistory}</div> */
  }
}

export default ClipBoardHistoryPane;
