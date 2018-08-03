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
  /*constructor(props) {
    super(props);
  }*/

  //
  static propTypes = {
    ykState: PropTypes.object.isRequired,
    ykTheme: PropTypes.object.isRequired,
    bindOnClickSelectElement: PropTypes.func.isRequired,
    bindOnClickHistoryItem: PropTypes.func.isRequired,
    bindOnClickCpcb: PropTypes.func.isRequired,
    bindOnClickCpcbOpenSb: PropTypes.func.isRequired,
  };

  spawnEditElement(key, partsName){
    const el = <EditElement key={key}
      value={this.props.ykState.history[partsName][0]}
      partsName={partsName} 
      bindOnClickSelectElement={this.props.bindOnClickSelectElement} />;
    return el;
  }
  
  //別にコンポ分割せんでもここにべた書きでも良かったなー
  render() {
    //
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

    //
    var historyList = [];
    if(this.props.ykState !== null){
      for(var i in this.props.ykState.history[this.props.ykState.currentElement]){
        historyList.push(<EditHistoryitem 
          key={i}
          partsName={this.props.ykState.currentElement}
          value={this.props.ykState.history[this.props.ykState.currentElement][i]}
          bindOnClickHistoryItem={this.props.bindOnClickHistoryItem}
          ></EditHistoryitem>);
      }  
    }

    //
    return (
      <div className="pane-container">
        {editElements}
        <div>
          { (this.props.ykState.currentElement === null) &&
            <div className="pane-well">
              <ul>
                <li>上のボタンを押して、それぞれカスタマイズします。</li>
                <li>右下の緑のボタンを押して、クリップボードにコピーできます。</li>
                <li>次に開いたときも使えるよう、localStorageに保存しています</li>
                <li>ヘルプからヒストリ・データをリセットできます。</li>
              </ul>
            </div>
          }
          { (this.props.ykState.currentElement !== null) &&
            <div className="pane-well">
              <div>
                <EditFreeInput 
                  bindOnClickHistoryItem={this.props.bindOnClickHistoryItem}
                  partsName={this.props.ykState.currentElement}
                  default={this.props.ykState.history[this.props.ykState.currentElement][0]} />
                </div>
              <div>{historyList}</div>
            </div>
          }
        </div>

        <CopyToClipboard 
          text={this.props.bindOnClickCpcb()} 
          onCopy={() => this.props.bindOnClickCpcbOpenSb()}
        >
          <Button variant="fab" className="yk-fab" color='primary' style={{
            position: 'absolute',
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
