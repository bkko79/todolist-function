# TODOLIST　仕様書（補足説明資料付き）

## 紹介

このモバイルアプリケーションはReactで作られたウェブ環境であり、仕事を片付ける為に必要なUI/UXが実装されています。

iOS及びAndroidの各ブラウザーの互換性テストには問題がありませんでしたが、どこまでもテスト用環境ですので、各ブラウザーのバージョンが古い場合は動作やアニメーション、CSSスタイルに問題がある可能性がありますので、最新版のブラウザーでテストをお願い致します。

DEMO用のURLは下記になります:

[https://bkko-todolist.surge.sh/](https://bkko-todolist.surge.sh/)

## 環境デプロイーマニュアル

この環境はreactのcreate-react-appとyarnを使って構築しました。(npm形も使えます。)

下記のコマンドの中で一つ選んでで必要なnode_modulesを該当ディレクトリーに設置させてください。

```shell
yarn install
or
npm install
```

設置が終わったらすぐ開発環境の実行ができます：

```shell
yarn start
or
npm start
```

後、画面に出力されるURLで接続できます。

```shell
Compiled successfully!

You can now view todo-list2 in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.11.10:3000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

## ファイルツリー

このアプリケーションは関数形コンポネントで構築され、各ファイルの関数がHookを利用するように設計されています。

```shell
.
├── .env
├── package-lock.json
├── package.json
├── public
├── src
│   ├── Card.jsx
│   ├── ItemTypes.js
│   ├── Container.jsx
│   ├── Datepick.jsx
│   ├── Form.jsx
│   ├── img
│   │   └── up-and-down.png
│   ├── index.css
│   └── index.js
└── yarn.lock

```

### 重要ファイル

#### 1. index.js

最初のreactDOMをRenderするファイルで、public/index.htmlの#rootを探して表示します。

#### 2. container.jsx

アプリケーションのコンテイナーとして、テストデータ、関数を管理する上位コンポネントです。

#### 3. form.jsx

上位コンポネントデータ追加する下位コンポネントです。

#### 4. Card.jsx

各TODOオブジェクトを管理するコンポネントです。

#### 5. datepick.jsx

各TODOオブジェクトに日付を登録するカレンダーコンポネントです。

## 重要モジュール

### 1. create-react-app

nodeでテスト環境構築に必要なモジュールを管理するパッケージです。最初にウェブアプリケーション構築にこちらのテンプレートを利用しましたが、デフォルトのファイルを削除してもっと簡単な構造に改造しました。

### 2. react-dnd

ほとんどのモバイルデバイスは、DOMにバインドされたドラッグイベントが効かないので、draggableなどのマウスのイベントとは違う別のスクリプトを作る工数が掛かります。

react環境からモバイルdrag-and-dropを早めに導入するにはreact-nativeで構築する方法やreact-dndでモバイルブラウザーのアニメーションを追加する方法があります。

今回は関数形のコンポネントのhookと良く合うreact-dndを使って構築しました。react-dndはyahooの方が制作したモバイル用バックエンドモジュールreact-dnd-touch-backendがありまして、プロダクションレベルにも使えるモジュールです。

重要なコンポネントはCard.jsxのDragとDropを利用するRef変数、そしてcontainer.jsxのDndProviderです。

### 3. react-transition-group

イベント発生の該当DOMに自動でクラスを導入したり、timeoutに合わせて例外処理するモジュールです。TODOデータの削除及び追加する時、アニメーション用CSSが入っているクラス名を入れます。各イベント別にDOMを探したりする不便なプロセスがテンプレート化されています。

重要なコンポネントはCard.jsxのRenderにあるTransitionGroupと、そのDOMの下にmapされるRenderCard関数のCSSTransitionです。

### 4. @material-ui/pickers

reactフレームワークMaterial-UIの時間選択関連モジュールpickersを使いました。モバイルで時間を分単位まで選べるUIを支援し、自由自在でスタイルの変化ができる強いツールです。カレンダーの日付計算に依存性は@date-io/date-fns@1.xを使って解決しました。

重要なコンポネントはdatepick.jsxのRenderにあるTransitionGroupと、その中でmapされるRenderCard関数のCSSTransitionです。
