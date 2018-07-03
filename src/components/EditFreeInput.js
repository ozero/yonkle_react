import React, { Component } from 'react';

class EditFreeInput extends Component {
  //
 
  render() {
    return (
      <div className="EditFreeInput">
        [{this.props.partsName} ヽ(´ー｀)ノ {this.props.default}自由入力]
      </div>
    );
  }
}

export default EditFreeInput;
