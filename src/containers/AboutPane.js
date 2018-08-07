import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';

class AboutPane extends Component {

  //
  static propTypes = {
    yk_state: PropTypes.object.isRequired,
    bindOnClickReset: PropTypes.func.isRequired,
  };

  render() {
    //
    return (
      <div className="pane-container">
        <div className="pane-well">
          あなたのエージェントライフによんくるのご加護がありますように…。
        </div>
        <div style={{textAlign:"center"}}>
          <Button 
            onClick={() => this.props.bindOnClickReset()}
            variant="contained"
            color='secondary'
          >データのリセット</Button>
        </div>

      </div>
    );
  }
}

export default AboutPane;
