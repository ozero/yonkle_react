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
    bindOnImport: PropTypes.func.isRequired
  };

  //
  handleChange = name => event => {
    this.setState({
      input: event.target.value,
    });
  };


  //Event:
  onClickImport(){
    let newHistory = {};
    try {
      newHistory = JSON.parse(this.state.input);
      if(!newHistory.prefix){
        //TODO:スナックバーで警告
        console.log("import: non valid json");
      }else{
        window.localStorage.yonkle_editor = this.state.input;
        this.props.bindOnImport();
        //TODO:スナックバーで通知
        console.log("imported");
      }
    } catch(e) {
        //TODO:スナックバーで警告
        alert(e); // error in the above string (in this case, yes)!
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
            onClick={() => this.onClickImport()}
          >
            <GetApp />&nbsp;&nbsp;&nbsp;内容をインポート
          </Button>
        </div>
      </div>
    );
  }
}

export default ImportPane;
