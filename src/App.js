import React, { Component } from 'react';
import EditorActions from './actions/EditorActions';
import Editor from './containers/Editor';

import { Typography, AppBar, Toolbar, IconButton, Drawer, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
    console.log("onClickNavPaneToggle");
    this.setState({
      isNavPaneOpen: !this.state.isNavPaneOpen
    })
  }

  render() {

    const drawer = (
      <Drawer
        variant="persistent"
        anchor='left'
        open={this.state.isNavPaneOpen}
        onClose={() => this.onClickNavPaneToggle()}
      >
        <MenuItem>Editor</MenuItem>
        <MenuItem>History</MenuItem>
        <MenuItem>Export</MenuItem>
        <MenuItem>Import</MenuItem>
        <MenuItem>About</MenuItem>
      </Drawer>
    );

    const appbar = (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon onClick={() => this.onClickNavPaneToggle()} />
          </IconButton>
          <Typography variant="title" color="inherit">
          ෆ◕◡◕
          </Typography>
        </Toolbar>
      </AppBar>
    );

    return (
      <div className="App">
        { drawer }
        { appbar }
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

npm install material-ui-icons --save

"reactjs - rerender react component when prop changes - Stack Overflow" https://stackoverflow.com/questions/37009328/rerender-react-component-when-prop-changes

"Material-UI v1.x (beta) を導入する - Qiita" https://qiita.com/gcoka/items/bfaaea4973c5abb12ff6

"Reactのコンポーネントのスタイリングをどうやるか - Qiita" https://qiita.com/lightnet328/items/218eb1c4a347302cc340






*/