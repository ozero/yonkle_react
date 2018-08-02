import React, { Component } from 'react';
import EditFreeInput from '../components/EditFreeInput';
import EditElementehistory from '../components/EditElementehistory';

class EditInput extends Component {
  //
  constructor(props) {
    super(props);

    // この例では関数内でthisを使用するため、thisをbind
    this.bindFunc = this.myfunction.bind(this);

    // stateの初期値を設定
    this.state = {
      str: '',
      isDisabled: true,
    };
  }

  // コールバック関数
  myfunction(str) {
  }
 
  render() {
    return (
      <div className="edit-input">
        <EditFreeInput />
        <EditElementehistory />
      </div>
    );
  }
}

export default EditInput;
