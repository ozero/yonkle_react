import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

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
    this.bindOnClickNavPaneToggle = this.onClickNavPaneToggle.bind(this);
    this.bindOnClickDrawerItem = this.onClickDrawerItem.bind(this);
    this.bindOnClickSnackbarClose = this.onClickSnackbarClose.bind(this);

    this.bindOnClickEditorSelectElement = this.onClickEditorSelectElement.bind(this);
    this.bindOnClickEditorHistoryItem = this.onClickEditorHistoryItem.bind(this);
    this.bindOnClickEditorCopytext = this.onClickEditorCopytext.bind(this);

    this.bindOnClickCbhCopytext = this.onClickCbhCopytext.bind(this);

    this.bindOnClickImport = this.onClickImport.bind(this);
    this.bindOnClickExportCopytext = this.onClickExportCopytext.bind(this);
    this.bindOnClickReset = this.onClickReset.bind(this);

    this.initial_history = {
      yk_prefix: ['おはよんくるー', '大天空んくるー', '頑張るんくるー', 'おひるんくるー'],
      yk_face_left: ['ෆ', '࿑', '๑', 'ཛྷ྆'],
      yk_eye_left: ['◕', '◔', 'ಠ', '⍥'],
      yk_mouth: ["◡", "ف", "ઉ", "उ", "კ", "؈", "ᯅ", "ᜌ", "ᙟ", "༊", "ω", "ب", "ᗨ", "و", "⸐", "ਊ", "ت", "ᓌ", "咖", "🍛", "留", "緑", "雨", "焼", "飛", "英", "仏", "ー"],
      yk_eye_right: ['◕', '◔', 'ಠ', '⍥'],
      yk_face_right: ['ෆ', '࿑', '๑', 'ཛྷ྆'],
      yk_suffix_dingbat: ["｡+ ✿☆", "꧁", "✧*｡", "༺", "༇"],
      yk_suffix_tail: ["ｷｬﾋﾟ", "みどり💚꧂", "ｴﾝﾗｲ💚", "quapi", "capuit", "upc"],
    };

    // stateの初期値を設定
    this.state = {
      is_loaded_from_localstorage: false,
      current_element: null,
      current_pane: "editor",
      current_finalized: null,
      history: this.initial_history,
      clipboard_history:[],
      is_navpane_open: false,
      is_snackbar_open: false,
      snackbar_message: null
    };

    this.ykTheme = createMuiTheme({});
  }

  //Lifecycle: ComponentがDOMツリーに追加される前に一度だけ呼ばれます。
  componentWillMount() {
    //ヒストリの読み込み
    if (!this.state.is_loaded_from_localstorage) {
      const ea = new EditorActions();
      if (!window.localStorage.yonkle_editor) {
        console.log("App::componentWillMount(), ls init 1")
        ea.historySerializer(this.state.history, []);//初期化
      } else {
        let tmpLocalStorage = JSON.parse(window.localStorage.yonkle_editor);
        if (!tmpLocalStorage.history) {
          console.log("App::componentWillMount(), ls init 2")
          ea.historySerializer(this.state.history, []);//初期化
        } else {
          //読み込み&フラグ立てる
          console.log("App::componentWillMount(), ls loaded")
          this.setState({
            history: tmpLocalStorage.history,
            clipboard_history: tmpLocalStorage.clipboard_history,
            is_loaded_from_localstorage: true,
            current_finalized: ea.yonkleFinalizer(tmpLocalStorage.history)
          });
        }
      }
    }

  }

  //App Event: ナビゲーションペインの開閉
  onClickNavPaneToggle() {
    console.log("onClickNavPaneToggle()");
    this.setState({
      is_navpane_open: !this.state.is_navpane_open
    })
  }
  //App Event: コンテンツペインの切り替え
  onClickDrawerItem(partsName) {
    console.log("onClickDrawerItem()");
    this.setState({
      current_pane: partsName,
      is_navpane_open: false
    });
  }

  //Editor Event: 文節をクリックしたら候補を表示
  onClickEditorSelectElement(partsName) {
    console.log("onClickEditorSelectElement()");
    this.setState({ current_element: partsName });
  }
  //Editor Event: 候補をクリックしたら状態を更新
  onClickEditorHistoryItem(partsName, value) {
    console.log("onClickEditorHistoryItem()");
    const ea = new EditorActions();
    //アイテム履歴を更新
    const newHistory = ea.historyBuilder(this.state.history, partsName, value);
    this.setState({ history: newHistory });
    //新しいアイテム履歴をローカスストレージに保存
    ea.historySerializer(newHistory, this.state.clipboard_history);
    //クリップボードにコピーする内容を更新
    const newItem = ea.yonkleFinalizer(this.state.history);
    this.setState({
      current_finalized: newItem
    });
  }
  //Editor Event:クリップボードにコピー、のクリック時: メッセージ表示、Cbヒストリ追加
  onClickEditorCopytext() {
    console.log("onClickEditorCopytext()");
    //クリップボードヒストリを更新してStateに反映
    const ea = new EditorActions();
    const newCb = ea.cbstackBuilder(
      this.state.clipboard_history, this.state.current_finalized
    );
    this.setState({
      is_snackbar_open: true,
      snackbar_message: "クリップボードにコピーしました",
      clipboard_history: newCb,
      current_element: null
    });
    //新しいクリップボードヒストリをLocalStorageに保存
    ea.historySerializer(this.state.history, newCb);
  }
  //Editor Event:スナックバーのクローズ時
  onClickSnackbarClose(event, reason) {
    console.log("onClickSnackbarClose()", event, reason);
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ is_snackbar_open: false });
  }

  //Clipboard history Event:アイテムクリック時
  onClickCbhCopytext(newItem){
    console.log("onClickCbhCopytext()");
    const ea = new EditorActions();
    const newCb = ea.cbstackBuilder(this.state.clipboard_history, newItem);
    this.setState({
      is_snackbar_open: true,
      snackbar_message: "クリップボードにコピーしました",
      clipboard_history: newCb
    });
  }

  //Export Event: エクスポートのコピペクリック時
  onClickExportCopytext(){
    console.log("onClickExportCopytext()");
    this.setState({
      is_snackbar_open: true,
      snackbar_message: "クリップボードにコピーしました"
    });
  }

  //Import Event: インポート時データユーティリティ
  onClickImport(didSuccessToImport, msg, data){
    console.log("onClickImport()");
    if(!didSuccessToImport){
      this.setState({
        is_snackbar_open: true,
        snackbar_message: msg
      });
      return;
    }

    this.setState({
      history: data.history,
      clipboard_history: data.clipboard_history,
      is_loaded_from_localstorage: true,
      is_snackbar_open: true,
      snackbar_message: msg
    });
  }

  //About Event: historyのリセット時
  onClickReset() {
    console.log("onClickReset()");
    if(window.confirm("マジで？")){
      delete window.localStorage.yonkle_editor;
      const ea = new EditorActions();
      this.setState({
        history: this.initial_history,
        clipboard_history: [],
        current_finalized: ea.yonkleFinalizer(this.initial_history),
        is_snackbar_open: true,
        snackbar_message: "あなたは新しいよんくるライフに転生しました"
      });
    }
  }


  render() {
    return (
      <div className="App">
        <AppDrawer
          yk_state={this.state}
          bindOnClickNavPaneToggle={this.bindOnClickNavPaneToggle}
          bindOnClickDrawerItem={this.bindOnClickDrawerItem}
        />
        <AppNavbar
          yk_state={this.state}
          ykTheme={this.ykTheme}
          bindOnClickNavPaneToggle={this.bindOnClickNavPaneToggle}
        />
        {(this.state.current_pane === "editor") &&
          <EditorPane
            yk_state={this.state}
            ykTheme={this.ykTheme}
            bindOnClickEditorSelectElement={this.bindOnClickEditorSelectElement}
            bindOnClickEditorHistoryItem={this.bindOnClickEditorHistoryItem}
            bindOnClickEditorCopytext={this.bindOnClickEditorCopytext}
          />
        }
        {(this.state.current_pane === "history") &&
          <ClipBoardHistoryPane
            bindOnClickCbhCopytext={this.bindOnClickCbhCopytext}
            yk_state={this.state}
          />
        }
        {(this.state.current_pane === "export") &&
          <ExportPane
            yk_state={this.state}
            ykTheme={this.ykTheme}
            bindOnClickExportCopytext={this.bindOnClickExportCopytext}
          />
        }
        {(this.state.current_pane === "import") &&
          <ImportPane
            yk_state={this.state}
            bindOnClickImport = {this.bindOnClickImport}
            bindOnImport={this.bindOnImport}
          />
        }
        {(this.state.current_pane === "about") &&
          <AboutPane
            yk_state={this.state}
            bindOnClickReset={this.bindOnClickReset}
          />
        }

        <AppSnackbar
          yk_state={this.state}
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

javascript - In reactJS, how to copy text to clipboard? - Stack Overflow
https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard


初期状態でコピー押すとクリップボードによんくるが入ってこない

クリップボードヒストリの履歴管理がまずい



*/