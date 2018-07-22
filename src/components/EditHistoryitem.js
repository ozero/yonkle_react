import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {MuiThemeProvider} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

class EditHistoryitem extends Component {

  //
  static propTypes = {
    bindOnClickHistoryItem: PropTypes.func.isRequired,
  };

  //
  handleClick() {
    console.log("EditHistoryitem::handleClick()", 
      this.props.value, 
      this.props.partsName);
    this.props.bindOnClickHistoryItem(this.props.partsName, this.props.value);
  }

  render() {
    return (
      <span className="EditHistoryitem">
        <MuiThemeProvider>
          <Button 
            default={true}
            onClick={() => this.handleClick()}
            variant="contained"
            style={{minWidth: '10px',margin: '4px 8px 0 0'}}
          >{this.props.value}</Button>
        </MuiThemeProvider>
      </span>
    );
  }
}

export default EditHistoryitem;
