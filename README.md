# ToDoリスト

シンプルなToDoリストWebアプリです。HTML / CSS / JavaScript のみで構成されており、サーバー不要でブラウザから直接開いて使えます。タスクはブラウザの `localStorage` に保存されるため、ページを閉じても内容が保持されます。

## 機能

- タスクの追加・削除
- タスクの完了 / 未完了の切り替え
- フィルタリング（すべて / 未完了 / 完了済み）
- 完了済みタスクの一括削除
- `localStorage` による永続化

## 起動方法

ビルドやサーバーは不要です。`index.html` をブラウザで直接開くだけで動作します。

```bash
# リポジトリをクローン
git clone https://github.com/eikichishimasaki-glitch/claude-test.git
cd claude-test

# index.html をブラウザで開く（macOS の場合）
open index.html

# Linux の場合
xdg-open index.html

# Windows の場合
start index.html
```

VS Code を使っている場合は **Live Server** 拡張機能で開くと便利です。

## ファイル構成

```
claude-test/
├── index.html   # アプリのエントリーポイント（マークアップ）
├── style.css    # スタイルシート
├── app.js       # アプリロジック（タスク管理・localStorage連携）
└── README.md    # このファイル
```
