import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

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
          <RaisedButton 
            label={this.props.value} 
            default={true}
            onClick={() => this.handleClick()}
            style={{minWidth: '10px',margin: '4px 4px 0 0'}}
          />
        </MuiThemeProvider>
      </span>
    );
  }
}

export default EditHistoryitem;
