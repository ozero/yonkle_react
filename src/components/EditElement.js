import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';

class EditElement extends Component {

  //
  static propTypes = {
    bindOnClickEditorSelectElement: PropTypes.func.isRequired,
  };
  
  //
  render() {
    return (
      <span className="edit-element">
        <Button
          size="medium" 
          color="primary"
          onClick={() => this.props.bindOnClickEditorSelectElement(this.props.partsName)}
          variant="contained"
          style={{minWidth: '10px',margin: '4px 4px 0 0', fontSize:"14px", textTransform:"none"}}
        >{this.props.value}</Button>
      </span>
    );
  }
}

export default EditElement;
