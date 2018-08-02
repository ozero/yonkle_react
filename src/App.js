import React, { Component } from 'react';
import EditorActions from './actions/EditorActions';
import EditorPane from './containers/EditorPane';
import ClipBoardHistoryPane from './containers/ClipBoardHistoryPane';
import ExportPane from './containers/ExportPane';
import ImportPane from './containers/ImportPane';
import AboutPane from './containers/AboutPane';
import AppDrawer from './components/AppDrawer';
import AppNavbar from './components/AppNavbar';
import AppSnackbar from './components/AppSnackbar';

import './style.css';

class App extends Component {

  //
  constructor(props) {
    super(props);

    // 子コンポーネントにイベント処理を公開するため、thisをbindしておく
    this.bindOnClickSelectElement = this.onClickSelectElement.bind(this);
    this.bindOnClickHistoryItem = this.onClickHistoryItem.bind(this);
    this.bindOnClickNavPaneToggle = this.onClickNavPaneToggle.bind(this);
    this.bindOnClickDrawerItem = this.onClickDrawerItem.bind(this);
    this.bindOnClickCpcb = this.onClickCpcb.bind(this);
    this.bindOnClickCpcbOpenSb = this.onClickCpcbOpenSb.bind(this);
    this.bindOnClickSnackbarClose= this.onClickSnackbarClose.bind(this);

    // stateの初期値を設定
    this.state = {
      currentElement: null,
      currentPane: "editor",
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
      isNavPaneOpen:false,
      isSnackbarOpen:false,
      snackBarMessage:null
    };
  }

  //Event: 文節をクリックしたら候補を表示
  onClickSelectElement(partsName) {
    this.setState({ currentElement: partsName });
  }
  //Event: 候補をクリックしたら状態を更新
  onClickHistoryItem(partsName, value) {
    const ea = new EditorActions();
    const newHistory = ea.historyBuilder(this.state.history, partsName, value);
    this.setState({ history: newHistory });
  }
  //Event: ナビゲーションペインの開閉
  onClickNavPaneToggle(){
    this.setState({
      isNavPaneOpen: !this.state.isNavPaneOpen
    })
  }
  //Event: コンテンツペインの切り替え
  onClickDrawerItem(partsName) {
    this.setState({ 
      currentPane: partsName,
      isNavPaneOpen: false
    });
  }
  //Event:クリップボードにコピー、のクリック時: 成果物うけとり
  onClickCpcb() {
    console.log("onClickCpcb");
    const ea = new EditorActions();
    return ea.yonkleFinalizer(this.state.history);
  }
  //Event:クリップボードにコピー、のクリック時: メッセージ表示
  onClickCpcbOpenSb() {
    console.log("onClickCpcb openSb");
    this.setState({ 
      isSnackbarOpen: true,
      snackBarMessage: "クリップボードにコピーしました"
    });
  }
  //Event:スナックバーのクローズ時
  onClickSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isSnackbarOpen: false });
  }

  render() {
    return (
      <div className="App">
        <AppDrawer
          ykState={this.state}
          bindOnClickNavPaneToggle={this.bindOnClickNavPaneToggle}
          bindOnClickDrawerItem={this.bindOnClickDrawerItem}
        />
        <AppNavbar
          ykState={this.state}
          bindOnClickNavPaneToggle={this.bindOnClickNavPaneToggle}
        />
        {(this.state.currentPane === "editor") && 
          <EditorPane 
            ykState={this.state}
            bindOnClickSelectElement={this.bindOnClickSelectElement}
            bindOnClickHistoryItem={this.bindOnClickHistoryItem}
            bindOnClickCpcb={this.bindOnClickCpcb}
            bindOnClickCpcbOpenSb={this.bindOnClickCpcbOpenSb}
          />
        }
        {(this.state.currentPane === "history") && 
          <ClipBoardHistoryPane
            ykState={this.state}
          />
        }
        {(this.state.currentPane === "export") && 
          <ExportPane
            ykState={this.state}
          />
        }
        {(this.state.currentPane === "import") && 
          <ImportPane
            ykState={this.state}
          />
        }
        {(this.state.currentPane === "about") && 
          <AboutPane
            ykState={this.state}
          />
        }

        <AppSnackbar
          ykState={this.state}
          bindOnClickSnackbarClose={this.bindOnClickSnackbarClose}
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