# 実装メモ

* App.jsによんくるエディタの最小構成書きつつ試してった

* App.jsにイベントメソッド全部書いて、bindして子コンポーネントに引き回していった

* stateも（コンポーネント単体で内部状態を持たなければいけないもの以外）全部App.JSからpropで引き回してった

* メソッドのうち、データを受け取って新しいstateを生成するような処理はEditorActionにまとめて、そこからの返り値をイベントメソッド内でsetStateするようにした。

* 画面遷移有るし、一応コンテナっぽいやつとその先のコンポーネントっぽいやつにわけた

* ここらへんに一定の書き方を設けるのがRedux、だといいなー。

* cssはそれほど面倒見るものもなかったのでstyle.cssひとつで賄った


## 参考にしたやつ

* windows 環境で Create-React-app + material-uiの環境を作成
https://qiita.com/miyamocchi/items/d70a250696cecbaf0d15

* データ(Status)管理の問題もあるのでReduxいれたい → あとで
https://qiita.com/morio-m/items/c9f7cd5a10f94edd432f

* Material-UIのボタンのカスタマイズ、なあ
https://material-ui.com/demos/buttons/

* npm install material-ui --save

* "ReactでMaterial-UIを使ってみた - Qiita"
https://qiita.com/edo1z/items/b0aa6a0e1112307246e0

* npm install material-ui-icons --save

* "reactjs - rerender react component when prop changes - Stack Overflow" https://stackoverflow.com/questions/37009328/rerender-react-component-when-prop-changes

* "Material-UI v1.x (beta) を導入する - Qiita"
https://qiita.com/gcoka/items/bfaaea4973c5abb12ff6

* "Reactのコンポーネントのスタイリングをどうやるか - Qiita"
https://qiita.com/lightnet328/items/218eb1c4a347302cc340

* javascript - In reactJS, how to copy text to clipboard? - Stack Overflow
https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard

