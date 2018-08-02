import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';

class EditElement extends Component {

  //
  static propTypes = {
    bindOnClickSelectElement: PropTypes.func.isRequired,
  };
  
  //
  render() {
    return (
      <span className="edit-element">
        <Button
          size="medium" 
          color="primary"
          onClick={() => this.props.bindOnClickSelectElement(this.props.partsName)}
          variant="contained"
          style={{minWidth: '10px',margin: '4px 4px 0 0'}}
        >{this.props.value}</Button>
      </span>
    );
  }
}

export default EditElement;
