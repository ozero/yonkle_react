import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditElement from '../components/EditElement';
import EditHistoryitem from '../components/EditHistoryitem';
import EditFreeInput from '../components/EditFreeInput';

import { Button } from '@material-ui/core';
import { ContentCopy } from '@material-ui/icons/';
import CopyToClipboard from 'react-copy-to-clipboard';

class EditorPane extends Component {
  //
  constructor(props) {
    super(props);

    // stateの初期値を設定
    this.state = {
      copytext: this.props.yk_state.current_finalized
    };
  }

  //rerender react component(with state) when prop changes
  componentWillReceiveProps(nextProps) {
    console.log("EditorPane::componentWillReceiveProps()","setState:copytext",nextProps.yk_state.current_finalized);
    this.setState({copytext: nextProps.yk_state.current_finalized });
  }

  //
  static propTypes = {
    yk_state: PropTypes.object.isRequired,
    ykTheme: PropTypes.object.isRequired,
    bindOnClickEditorSelectElement: PropTypes.func.isRequired,
    bindOnClickEditorHistoryItem: PropTypes.func.isRequired,
    bindOnClickEditorCopytext: PropTypes.func.isRequired,
  };

  spawnEditElement(key, partsName){
    const el = <EditElement key={key}
      value={this.props.yk_state.history[partsName][0]}
      partsName={partsName} 
      bindOnClickEditorSelectElement={this.props.bindOnClickEditorSelectElement} />;
    return el;
  }
  
  //別にコンポ分割せんでもここにべた書きでも良かったなー
  render() {

    //editElementsを顔文字の形にView化
    var editElements = []
    editElements.push(this.spawnEditElement(0, "yk_prefix"));
    editElements.push(<span key="1">(</span>);
    editElements.push(this.spawnEditElement(2, "yk_face_left"));
    editElements.push(this.spawnEditElement(3, "yk_eye_left"));
    editElements.push(this.spawnEditElement(4, "yk_mouth"));
    editElements.push(this.spawnEditElement(5, "yk_eye_right"));
    editElements.push(this.spawnEditElement(6, "yk_face_right"));
    editElements.push(<span key="7">)ﾉ</span>);
    editElements.push(this.spawnEditElement(8, "yk_suffix_dingbat"));
    editElements.push(this.spawnEditElement(9, "yk_suffix_tail"));

    //editElementsタップ時に展開する、対応する要素クリック履歴をView化
    var historyList = [];
    if(this.props.yk_state !== null){
      for(var i in this.props.yk_state.history[this.props.yk_state.current_element]){
        historyList.push(<EditHistoryitem 
          key={i}
          partsName={this.props.yk_state.current_element}
          value={this.props.yk_state.history[this.props.yk_state.current_element][i]}
          bindOnClickEditorHistoryItem={this.props.bindOnClickEditorHistoryItem}
          ></EditHistoryitem>);
      }  
    }

    //
    return (
      <div className="pane-container">
        {editElements}
        <div>
          { (this.props.yk_state.current_element === null) &&
            <div className="pane-well">
              <ul>
                <li>上のボタンを押して、それぞれカスタマイズします。</li>
                <li>右下のボタンを押して、クリップボードにコピーできます。</li>
                <li>次に開いたときも使えるよう、localStorageに保存しています</li>
                <li>Aboutからヒストリをリセットできます。</li>
              </ul>
            </div>
          }
          { (this.props.yk_state.current_element !== null) &&
            <div className="pane-well">
              <div>
                <EditFreeInput 
                  bindOnClickEditorHistoryItem={this.props.bindOnClickEditorHistoryItem}
                  partsName={this.props.yk_state.current_element}
                  default={this.props.yk_state.history[this.props.yk_state.current_element][0]} />
              </div>
              <div>{historyList}</div>
            </div>
          }
        </div>

        <CopyToClipboard 
          text={this.state.copytext}
          onCopy={() => this.props.bindOnClickEditorCopytext()}
        >
          <Button variant="fab" className="yk-fab" color='secondary' style={{
            position: 'fixed',
            bottom: this.props.ykTheme.spacing.unit * 2,
            right: this.props.ykTheme.spacing.unit * 2,
          }}>
            <ContentCopy />
          </Button>        
        </CopyToClipboard>

      </div>
    );
  }
}

export default EditorPane;
