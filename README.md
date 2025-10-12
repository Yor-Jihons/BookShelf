# BookShelf

## 🚀 はじめに

このアプリは本棚にある本を管理し、重複購入を防ぐためのものです。

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
git clone https://github.com/Yor-Jihons/BookShelf.git
cd BookShelf
```

### Step2. installコマンドでパッケージの再現

```shell
npm install
```

### Step3. electron-rebuildを動かす

このステップが無いと「electronのバージョンの違い」によって動かなくなるため、ビルドしておく。

```shell
npx electron-rebuild
```

### Step4. ビルドする

```shell
npm run build:electron
```

---

## 🤝 貢献とライセンス

This is under the MIT license. See also [LICENSE](./LICENSE).
