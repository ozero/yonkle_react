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

  //「クリップボードにコピー」時に、エディタの内容をつなげて成果物を返すやつ
  yonkleFinalizer = (h) => {
    return [
      h.prefix[0],
      "(",
      h.faceleft[0],
      h.eyeleft[0],
      h.mouth[0],
      h.eyeright[0],
      h.faceright[0],
      ")",
      h.suffixDingbat[0],
      h.suffixTail[0]
    ].join("");
  }

}
export default EditorActions;
