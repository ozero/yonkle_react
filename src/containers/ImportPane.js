import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core';
import {GetApp} from '@material-ui/icons/';

class ImportPane extends Component {
  //
  constructor(props) {
    super(props);

    // stateの初期値を設定
    this.state = {
      input: ""
    };
  }

  //
  static propTypes = {
    bindOnClickImport: PropTypes.func.isRequired
  };

  //
  handleChange = name => event => {
    this.setState({
      input: event.target.value,
    });
  };

  //Event:
  handleImport(){
    let newHistory = {};
    try {
      newHistory = JSON.parse(this.state.input);
      if(!newHistory.history){
        this.props.bindOnClickImport(false, "エラー: データ項目が不正です。", null);
      }else{
        window.localStorage.yonkle_editor = this.state.input;
        this.props.bindOnClickImport(true, "インポートしました。", newHistory);
      }
    } catch(e) {
      this.props.bindOnClickImport(false, "エラー: " + e, null);
    }
  }
  
  render() {
    //
    return (
      <div className="pane-container">
        <p>Import:</p>
        <div>
          <textarea
          onChange={this.handleChange('name')}
          style={{width:"100%", height:"10em", fontSize:"80%"}}
          >
          </textarea>
        </div>
        <div style={{textAlign:"center"}}>
          <Button className="yk-import" color='secondary' variant="contained"
            onClick={() => this.handleImport()}
          >
            <GetApp />&nbsp;&nbsp;&nbsp;内容をインポート
          </Button>
        </div>
      </div>
    );
  }
}

export default ImportPane;
