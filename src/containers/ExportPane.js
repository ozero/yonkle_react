import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { ContentCopy } from '@material-ui/icons/';
import CopyToClipboard from 'react-copy-to-clipboard';


class ExportPane extends Component {

  //
  static propTypes = {
    yk_state: PropTypes.object.isRequired,
    bindOnClickExportCopytext: PropTypes.func.isRequired
  };

  render() {
    const exportJson = JSON.stringify({
      history:this.props.yk_state.history,
      clipboard_history:this.props.yk_state.clipboard_history
    });
    //
    return (
      <div className="pane-container">
        <p>Export:</p>
        <div>
          <textarea
            style={{width:"100%", height:"10em", fontSize:"80%"}}
            value={exportJson}
            readOnly={true}
          />
        </div>
        <div style={{textAlign:"center"}}>
          <CopyToClipboard 
            text={exportJson} 
            onCopy={() => this.props.bindOnClickExportCopytext()}
          >
            <Button className="yk-export" color='secondary' variant="contained">
              <ContentCopy />&nbsp;&nbsp;&nbsp;内容をクリップボードにコピー
            </Button>        
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

export default ExportPane;
