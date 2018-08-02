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

}
export default EditorActions;
