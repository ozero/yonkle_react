import React, { Component } from 'react';
import EditorActions from './actions/EditorActions';
import Editor from './containers/Editor';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, MenuItem, Drawer } from 'material-ui';

//import './App.css';

class App extends Component {

  //
  constructor(props) {
    super(props);

    // 子コンポーネントにイベント処理を公開するため、thisをbindしておく
    this.bindOnClickSelectElement = this.onClickSelectElement.bind(this);
    this.bindOnClickHistoryItem = this.onClickHistoryItem.bind(this);

    // stateの初期値を設定
    this.state = {
      currentElement: null,
      history:{
        prefix:['おはよんくるー','大天空んくるー','頑張るんくるー','おひるんくるー'],
        faceleft:['࿑','ෆ','๑','ཛྷ྆'],
        eyeleft:['◕','◔','ಠ','⍥'],
        mouth:["ف","◡","ઉ","उ","კ","؈","ᯅ","ᜌ","ᙟ","༊","ω","ب","ᗨ","و","⸐","ਊ","ت","ᓌ","咖","🍛","留","緑","雨","焼","飛","英","仏","ー"],
        eyeright:['◕','◔','ಠ','⍥'],
        faceright:['࿑','ෆ','๑','ཛྷ྆'],
        suffixDingbat:["꧁","✧*｡","༺","༇","✿☆"],
        suffixTail:["みどり💚꧂","ｷｬﾋﾟ","ｴﾝﾗｲ💚","quapi","capuit","upc"],
      },
      isNavPaneOpen:false
    };
  }
  
  //Event: 文節をクリックしたら候補を表示
  onClickSelectElement(partsName) {
    console.log("onClickSelectElement()", partsName);
    this.setState({ currentElement: partsName });
  }
  //Event: 候補をクリックしたら状態を更新
  onClickHistoryItem(partsName, value) {
    console.log("onClickHistoryItem()", partsName, value);
    
    var ea = new EditorActions();
    const newHistory = ea.historyBuilder(this.state.history, partsName, value);
    this.setState({ history: newHistory });
  }
  //Event: ナビゲーションペインの開閉
  onClickNavPaneToggle(){
    this.setState({
      isNavPaneOpen: !this.state.isNavPaneOpen
    })
  }


  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <div>
            <Drawer
              docked={false}
              width={200}
              open={this.state.isNavPaneOpen}
              onRequestChange={() => this.onClickNavPaneToggle()}
            >
              <MenuItem>React</MenuItem>
              <MenuItem>Redux</MenuItem>
              <MenuItem>React Router</MenuItem>
              <MenuItem>Material UI</MenuItem>
              <MenuItem>Electron</MenuItem>
            </Drawer>
            <AppBar
              title="ෆ◕◡◕"
              onLeftIconButtonClick={ () => this.onClickNavPaneToggle()}
            />
          </div>
        </MuiThemeProvider>
        <Editor 
          ykState={this.state}
          bindOnClickSelectElement={this.bindOnClickSelectElement}
          bindOnClickHistoryItem={this.bindOnClickHistoryItem}
          />
      </div>
    );
  }
}

export default App;

/*

やったぜ
https://qiita.com/miyamocchi/items/d70a250696cecbaf0d15

ほーん、んじゃここによんくるエディタの最小構成書きつつ試してったらええんでないかな

データ(Status)管理の問題もあるのでReduxいれた
https://qiita.com/morio-m/items/c9f7cd5a10f94edd432f

ボタンのカスタマイズなあ
https://material-ui.com/demos/buttons/

npm install material-ui --save

"ReactでMaterial-UIを使ってみた - Qiita" https://qiita.com/edo1z/items/b0aa6a0e1112307246e0


*/