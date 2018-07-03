import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class EditElement extends Component {

  //
  static propTypes = {
    bindOnClickSelectElement: PropTypes.func.isRequired,
  };

  //
  handleClick() {
    console.log("EditElement::handleClick()", this.props.value, this.props.partsName);
    this.props.bindOnClickSelectElement(this.props.partsName);
  }

  //
  render() {
    return (
      <span className="EditElement">
        <MuiThemeProvider>
          <RaisedButton
            size="small" 
            label={this.props.value} 
            primary={true}
            onClick={() => this.handleClick()}
            style={{minWidth: '10px',margin: '4px 4px 0 0'}}
          />
        </MuiThemeProvider>
      </span>
    );
  }
}

export default EditElement;
