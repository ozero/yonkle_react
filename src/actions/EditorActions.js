class EditorActions {

  //候補アイテムクリック時のクリック後stateを生成
  historyBuilder = (history, partsName, value) => {
    let tmpHistory = history;//this.state.history;
    let tmpParts = [];
    for(let i in tmpHistory[partsName]){
      if(tmpHistory[partsName][i] !== value){
        tmpParts.push(tmpHistory[partsName][i]);
      }
    }
    //
    tmpParts.unshift(value);
    //
    tmpHistory[partsName] = tmpParts;
    return tmpHistory;
  }

  //ローカルストレージに保存
  historySerializer = (h, cbh) => {
    window.localStorage.yonkle_editor = JSON.stringify({
      history: h,
      clipboard_history: cbh
    });
    return;
  }

  //クリップボード履歴
  cbstackBuilder = (currentCb, newItem) => {
    let tmpCb = [];//currentCb: this.state.clipboard_history
    for(let i in currentCb){
      if(i > 50){
        break;
      }
      if(currentCb[i] === null){
        continue;
      }
      if(currentCb[i] !== newItem){
        tmpCb.push(currentCb[i]);
      }
    }
    //
    tmpCb.unshift(newItem);
    //console.log("cbstackBuilder",currentCb,tmpCb);
    return tmpCb;
  }

  //「クリップボードにコピー」時に、エディタの内容をつなげて成果物を返すやつ
  yonkleFinalizer = (h) => {
    //h: this.state.history
    return [
      h.yk_prefix[0],
      "(",
      h.yk_face_left[0],
      h.yk_eye_left[0],
      h.yk_mouth[0],
      h.yk_eye_right[0],
      h.yk_face_right[0],
      ")ﾉ",
      h.yk_suffix_dingbat[0],
      h.yk_suffix_tail[0]
    ].join("");
  }

}
export default EditorActions;
