import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { ContentCopy } from '@material-ui/icons/';
import CopyToClipboard from 'react-copy-to-clipboard';


class ExportPane extends Component {
  //
  /*constructor(props) {
    super(props);
  }*/

  //
  static propTypes = {
    ykState: PropTypes.object.isRequired,
    ykTheme: PropTypes.object.isRequired,
    bindOnClickCpcbOpenSb: PropTypes.func.isRequired,
    //bindOnClickHistoryItem: PropTypes.func.isRequired,
  };

  render() {
    //
    return (
      <div className="pane-container">
        <p>Export:</p>
        <div>
          <textarea
            style={{width:"100%", height:"10em", fontSize:"80%"}}
            value={JSON.stringify(this.props.ykState.history)}
            readOnly={true}
          />
        </div>
        <div style={{textAlign:"center"}}>
          <CopyToClipboard 
            text={JSON.stringify(this.props.ykState.history)} 
            onCopy={() => this.props.bindOnClickCpcbOpenSb()}
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