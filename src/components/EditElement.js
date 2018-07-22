import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';

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
        <Button
          size="small" 
          color="primary"
          onClick={() => this.handleClick()}
          variant="contained"
          style={{minWidth: '10px',margin: '4px 4px 0 0'}}
        >{this.props.value}</Button>
      </span>
    );
  }
}

export default EditElement;
