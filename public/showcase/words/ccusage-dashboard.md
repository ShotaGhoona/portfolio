---
name: ccusage-dashboard
description: Claude Code の使用量(ccusage)を1画面のHTMLダッシュボードにする。「ccusage」「使用量」「コストレポート」「トークン使用量のグラフ」等で発火。
---

# ccusage 使用量ダッシュボード生成

`npx ccusage daily --json` の結果を、同梱の `head.html` / `tail.html`（固定テンプレ）に挟んで
1画面のHTMLダッシュボードを生成する。中身は KPIカード6枚 + メインチャート（日次コスト⇄
トークン内訳の**トグル切替**）+ モデル別ドーナツ + 月次棒グラフ + 日次明細テーブル（右・全高）。

## 実行（これだけ・コンテキストを使わない）

スキルのベースディレクトリにある `build.sh` を実行するだけ:

```bash
bash "<このスキルのベースディレクトリ>/build.sh" [出力先パス]
```

- 出力先を省略すると **カレントに `ccusage-dashboard.html`** を生成し、macOS では自動で開く。
- 末尾に ccusage の期間オプション（`--since 20260501` 等）をそのまま渡せる。

### 重要（コンテキスト節約）
- **`head.html` / `tail.html` / 生成された HTML の中身は読まない・再生成しない。**
  データ(JSON)はテンプレに機械的に挟むだけなので、`build.sh` を実行して**出力パスを返すだけ**でよい。
- ユーザーは Claude を介さず直接 `bash build.sh` を叩いてもよい（その場合コンテキスト消費ゼロ）。

## テンプレを変更したいとき

見た目・項目を変えるときだけ `head.html`（HTML/CSS と `const RAW =` まで）と
`tail.html`（`;` 以降の集計・Chart.js 描画ロジック）を編集する。データ構造は
`npx ccusage daily --json` の `daily[]`（`period` / `totalCost` / `totalTokens` /
`inputTokens` / `outputTokens` / `cacheCreationTokens` / `cacheReadTokens` /
`modelBreakdowns[]` / `modelsUsed[]`）に依存する。

## 自動化したい場合（任意）

「コンテキストゼロで定期生成」したいなら hooks/cron も使える:
- シェルエイリアス: `alias ccdash='bash ~/.claude/skills/ccusage-dashboard/build.sh'`
- Claude Code の `SessionStart` hook で `build.sh ~/ccusage-dashboard.html` を実行
- cron で日次生成

ただし通常は「見たいときに `build.sh` を叩く」だけで十分。
