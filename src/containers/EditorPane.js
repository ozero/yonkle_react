import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditElement from '../components/EditElement';
import EditHistoryitem from '../components/EditHistoryitem';
import EditFreeInput from '../components/EditFreeInput';

import { Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ContentCopy } from '@material-ui/icons/';
import CopyToClipboard from 'react-copy-to-clipboard';

const theme = createMuiTheme({});

class EditorPane extends Component {
  //
  /*constructor(props) {
    super(props);
  }*/

  //
  static propTypes = {
    ykState: PropTypes.object.isRequired,
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
    editElements.push(this.spawnEditElement(0, "prefix"));
    editElements.push(<span key="1">(</span>);
    editElements.push(this.spawnEditElement(2, "faceleft"));
    editElements.push(this.spawnEditElement(3, "eyeleft"));
    editElements.push(this.spawnEditElement(4, "mouth"));
    editElements.push(this.spawnEditElement(5, "eyeright"));
    editElements.push(this.spawnEditElement(6, "faceright"));
    editElements.push(<span key="7">)ﾉ</span>);
    editElements.push(this.spawnEditElement(8, "suffixDingbat"));
    editElements.push(this.spawnEditElement(9, "suffixTail"));

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
            bottom: theme.spacing.unit * 2,
            right: theme.spacing.unit * 2,
          }}>
            <ContentCopy />
          </Button>        
        </CopyToClipboard>


      </div>
    );
  }
}

export default EditorPane;
