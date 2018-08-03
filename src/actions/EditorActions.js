class EditorActions {

  //stub
  foo(bar){
    console.log("EditorActions::foo()",bar);
  }

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

  //
  historySerializer = (h, cbh) => {
    window.localStorage.yonkle_editor = JSON.stringify({
      history: h,
      clipboard_history: cbh
    });
    console.log("historySerializer wrote")
    return;
  }

  //クリップボード履歴
  cbstackBuilder = (cb, newItem) => {
    let tmpCb = [];//this.state.clipboard_history;
    for(let i in cb){
      if(i > 50){
        break;
      }
      if(cb[i] !== newItem){
        tmpCb.push(cb[i]);
      }
    }
    //
    tmpCb.unshift(newItem);
    console.log("cbstackBuilder", newItem, tmpCb);
    return tmpCb;
  }

  //「クリップボードにコピー」時に、エディタの内容をつなげて成果物を返すやつ
  yonkleFinalizer = (h) => {
    return [
      h.yk_prefix[0],
      "(",
      h.yk_face_left[0],
      h.yk_eye_left[0],
      h.yk_mouth[0],
      h.yk_eye_right[0],
      h.yk_face_right[0],
      ")",
      h.yk_suffix_dingbat[0],
      h.yk_suffix_tail[0]
    ].join("");
  }

}
export default EditorActions;
