# electron.default.electron_vite

## 🚀 はじめに

このテンプレートプロジェクトはElectron + Viteのプロジェクトを簡単に作成するためのものです。言語はTypeScriptとしています。

---

## ✨ 特徴

* **高速な開発体験**: Viteによるホットリロードのサポート
* **効率的なIPC通信**: メインプロセスとレンダラープロセスの通信を簡素化する仕組み
* **プロダクションビルド**: `npm run build`で簡単に実行ファイルを作成できる
* **多言語化**: 複数の言語に対応する
* **データベース操作**: メインプロセス上でデータベース操作ができる
* **画面遷移に対応**: 画面遷移ができるようにする

---

## 📦 依存関係/技術スタック

* **フロントエンド**: React, Vite
* **画面遷移**: React Router
* **バックエンド (メインプロセス)**: Electron
* **言語**: TypeScript
* **データベース**: better-sqlite3
* **多言語化**: i18next, react-i18next
* **スタイル**: CSS Modules
* **テスト環境**: vitest, React Testing Library

---

## ⚙️ 開発環境のセットアップ

### Step0. Node.jsのインストール

Node.jsをインストールしておいてください。

### Step1. プロジェクトのclone

```shell
git clone https://github.com/Yor-Jihons/electron.default.electron_vite.git NEW-PROJECT-NAME

cd NEW-PROJECT-NAME
```

※ `NEW-PROJECT-NAME`は新規プロジェクト名とします。

### Step2. installコマンドでパッケージの再現

```shell
npm install
```

### Step3. electron-rebuildを動かす

このステップが無いと「electronのバージョンの違い」によって動かなくなるため、ビルドしておく。

```shell
npx electron-rebuild
```

### Step4. プロジェクト名等の変更

* `package.json`の`name`の値
* `package.json`の`version`の値
* `package.json`の`build.appId`の値 (*1)
* `index.html`の`title`タグの値
* `README.md.txt`のプロジェクト名

`*1`: 一般的には`com.github.your-github-username.your-app-name`のような名前としていることが多いようです。

### Step5. READMEの修正

#### Step5.1. このファイルの削除

このファイルはあくまでテンプレートプロジェクト向けのREADMEなので削除してください。

#### Step5.2. `README.md.txt`のリネーム

`README.md.txt`を`README.md`にリネームしてください。

---

## 💻 ディレクトリ構造

```md
* プロジェクトルート
  * public/
  * assets/
  * src/
    * main/
      * cleanups/
        * cleanupTempFile.ts
      * databases/
        * DataBaseEx.ts
      * dialogs/
        * Dialogs.ts
      * files/
        * Files.ts
      * onlines/
        * isOnline.ts
      * paths/
        * PathManager.ts
    * utils/
    * app/
      * MainPage/
        * page.tsx
      * layout.tsx
    * components/
    * App.css
    * App.tsx
    * index.css
    * setupTests.ts
    * vite-env.d.ts
  * electron-main.ts
  * preload.ts
  * index.html
  * package.json
  * package.app.json
  * package.electron.json
  * package.node.json
  * package.preload.json
  * index.html
  * eslint.config.js
  * vite.config.ts
  * README.md
  * README.md.txt
```

---

## 📚 コーディング規約と推奨されるフロー

* ページ: `src/app/<ページ名>/page.tsx`として記述
* コンポーネント: `src/components/<コンポーネント名>/<コンポーネント名>.tsx`として記述
* コンポーネントのテストファイル: `src/components/<コンポーネント名>/<コンポーネント名>.test.tsx`
* メインプロセス用のクラスや関数等: `src/main`ディレクトリ直下
* その他のクラスや関数等: `src/utils`ディレクトリ直下
* React Router使用時の画面遷移URL指定: `src/App.tsx`内部
* preload.jsの実装: `preload.ts`
* preload.tsで定義したメソッドの型定義: `src/@types/global.d.ts`
* 共通化したいレイアウト: `layout.tsx`

### 多言語化に対応する方法

#### Step1. `./src/i18n/locales`ディレクトリにjsonファイルを追加する

たとえば日本語であれば`./src/i18n/locales/ja.json`を追加する。

```json
{
    "menu": {
        "view": "表示",
        "reload": "リロード",
        "force_reload": "強制リロード",
        "toggle_devtools": "開発者モードで開く",
        "reset_zoom": "Actual Size",
        "zoom_in": "ズームアップ",
        "zoom_out": "ズームダウン",
        "file": "ファイル",
        "restore_data": "データの復元",
        "backup_data": "データのバックアップ",
        "window": "ウィンドウ",
        "close": "閉じる"
    }
}
```

#### Step2. `./src/i18n/i18n.ts`に追加する

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// jsonファイルを追加
import en from './locales/en.json';
import ja from './locales/ja.json';

// 定義を追加
export const resources = {
    en: { translation: en },
    ja: { translation: ja },
};

export async function initI18n( locale: string ){
    const lang = locale.split('-')[0];
    await i18n
        .use(initReactI18next)
        .init({
            resources: resources,
            lng: Object.keys(resources).includes(lang) ? lang : 'en',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });
    return i18n;
}
```

#### Step3. 実際に呼び出す

このステップではUI側(レンダラープロセス側)とバックエンド側(メインプロセス側)では方法が違います。
なのでこのステップではUI側かバックエンド側かで分岐します。

##### Step3.1. UI側の呼び出し

###### Step3.1.1. `useTranslation`フックのインポート

```typescript
import { useTranslation } from 'react-i18next';
```

###### Step3.1.2. コンポーネント内でuseTranslationフックを呼び出す

```typescript
const { i18n } = useTranslation();
```

###### Step3.1.3. `i18n.t( キー )`で実際に使う

```typescript
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../App.css';
import CommonLayout from '../layout';

function MainPage() {
  const { i18n } = useTranslation();

  return (
    <CommonLayout>
      <div>
        <div>{i18n.t('menu.zoom_in')}</div>
      </div>
    </CommonLayout>
  );
}

export default MainPage;
```

##### Step3.2. バックエンド側の呼び出し

###### Step3.2.1. 実際に使う

`ipcMain.on('init-i18n-data', (event, data) => { ... });`の部分で`i18nData`を使う。

### 画面遷移させる方法

#### Step1. `./src/app/<ページ名>/page.tsx`を作成する

```tsx
// ./src/app/MainPage/page.tsxの例

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import reactLogo from '../assets/react.svg';
//import viteLogo from '/vite.svg';
import { useTranslation } from 'react-i18next';
import '../../App.css';
import CommonLayout from '../layout';

const dummyUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

function MainPage() {
  // useNavigateフックを呼び出す
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [users, setUsers] = useState<typeof dummyUsers>([]);
  const [usersFromDB, setUsersFromDB] = useState<string[]>( [] );
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      const tmp = await window.interprocessCommunication.getUsers();
      //console.log( data[0][ "name" ] as string );
      const usr = tmp.map( (data) => {
        return data[ "name" ];
      });
      setUsersFromDB( usr );
    };
    fetchUsers();
    setUsers(dummyUsers);
  }, []);

  // セレクトボックスの変更イベントハンドラ
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    // 選択値が変更されたら即座に遷移
    if (userId) {
      navigate(`/users/${userId}`);
    }
  };

  return (
    <CommonLayout>
      <div>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={""} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={""} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>

        <h2>ユーザー詳細へ移動</h2>
        <select onChange={handleSelectChange} value={selectedUser}>
          <option value="">ユーザーを選択してください</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <select>
          {usersFromDB.map( (users, idx) => {
            return <option key={idx}>{users}</option>
          })}
        </select>
        <div>{i18n.t('menu.zoom_in')}</div>
      </div>
    </CommonLayout>
  );
}

export default MainPage;
```

#### Step2. `./src/app/<ページ名>/page.tsx`を作成する

```tsx
// ./src/App.tsx

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './app/MainPage/page';
import UserListPage from './app/UserListPage/page';
import UserDetailPage from './app/UserDetailPage/page';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<UserListPage />} />
        {/* 動的パラメータを持つルートを追加 */}
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
```

単純にページを表示するのであれば`<Route path="/users" element={<UserListPage />} />`のように呼び出し、
パラメータを渡す場合は`<Route path="/users/:id" element={<UserDetailPage />} />`のように呼び出します。

### データベースを操作する方法

#### Step1. `./src/main/databases/DataBaseEx.ts`の修正

このステップで何らかの処理(SELECT文でデータの取得等)を行うメソッドを追加します。

#### Step2. `./electron-main.ts`にIPC通信の受信を追加

```ts
app.whenReady().then(() => {
  systemLocale = app.getLocale();

  createWindow();

  pathManager.init( "database.sqlite", __dirname );

  db.open( pathManager.dbFilePath );
  db.createTables();

  app.on('activate', () => {
    if( BrowserWindow.getAllWindows().length === 0 ){
      createWindow();
    }
  });

  // ...

  // 追加してみる
  ipcMain.handle('add-user', (event, { name, email }) => {
    return db.addUser( name, email );
  });

  // ...
});
```

#### Step3. `./preload.ts`に追加する

#### Step4. `./src/@types/global.d.ts`にStep3の型定義を追加する

#### Step5. レンダラープロセス側で受け取ったデータを使って何らかの処理をする(表示等)

---

## 🚀 テスト方法

### Step1. テストの実行

#### Step1.1. 関数やクラスのテスト

```shell
npm run test
```

#### Step1.2. コンポーネントのテスト

```shell
npm run test:ui
```

---

## 🚀 ビルドとパッケージング

### 開発用ビルドを行う方法

#### Step1. 開発用の起動

```shell
npm run dev:electron
```

※ このコマンドを使う場合は別スレッドで行うこと。

### パッケージングを行う方法

#### Step1. `build:electron`コマンドを動かす

```shell
npm run build:electron
``` 

---

## 🚀 不要な処理を省く場合

### better-sqlite3が不要な場合

#### Step1. better-sqlite3のアンインストール

```shell
npm uninstall -D better-sqlite3
npm uninstall --save-dev @types/better-sqlite3
```

#### Step2. `electron-main.ts`の編集

このステップで`DataBaseEx`クラスを使用している行を削除します。

#### Step3. `src/main/databases`ディレクトリ内のファイルの削除

`src/main/databases`ディレクトリにあるファイルをすべて削除します。

### 画面遷移が不要な場合

```shell
npm install react-router-dom
```

#### Step2. `src/app`ディレクトリにあるファイル等の削除

`src/app/MainPage`ディレクトリ以外はすべて削除します。

#### Step3. `src/app/MainPage/page.tsx`の編集

```tsx
import './App.css';
import MainPage from './app/MainPage/page';

function App() {
  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
```

---

### アイコンを変更する方法

単純に`src/assets/favicon.png`を置き換えるだけです。

---

## 🤝 貢献とライセンス

This is under the ISC license. See also [LICENSE](./LICENSE).
