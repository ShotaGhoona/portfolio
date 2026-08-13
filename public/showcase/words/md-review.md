---
name: md-review
description: >-
  完成済みの複数 Markdown を、文章そのままで「レビュー可能(インラインでコメントできる)HTML」に束ねて
  プレビュー表示するスキル。フォルダ or glob を渡すと、各 .md を機械変換して
  reviewable-html-workbench の document-model にまとめ、check-model→render→validate→preview を
  実行し、新規コメントを**常時監視**する。ユーザーがブラウザで 1 つずつ指摘するたびに、agent は
  **返信せず該当の .md を直接修正**していく（HTML 再生成・コメント解決はユーザー指示時にまとめて行う）。
  発火例: 「このフォルダの md をレビューHTMLにして」「複数の md をまとめてコメントできるHTMLに」
  「要件定義一式をレビューできる形で出して」「00〜10 を1つのレビューHTMLに」「md フォルダをレビューにかけたい」。
  使わない場面: 単一 md の読み物ビューだけ / agent が設計しなおす設計資料(reviewable-design-doc) /
  1枚もの図解HTML(visual-html-renderer) / Notion 投稿。
---

# md-review — 複数 Markdown を reviewable HTML に束ねる

## 目的

**もう文章が固まっている複数の .md** を、**文章そのまま**（要約・並べ替え・省略なし）で、
ブラウザ上でインラインコメントできる HTML に束ねてレビューにかける。指摘は 1 つずつ拾って
HTML の同じコメントスレッドに返信し、確定した指摘だけ本文へ反映する。

## いつ使う / 使わない

| 状況 | 使うスキル |
|---|---|
| 完成済みの .md 群を**そのまま**コメント可能HTMLにしてレビュー | **このスキル（md-review）** |
| これから設計内容を agent が構造化して作る設計資料 | `reviewable-html-workbench:reviewable-design-doc` |
| 1 枚もの・図解中心の最終HTML成果物 | `reviewable-html-workbench:visual-html-renderer` |
| 単一 md をただ綺麗に読みたい（コメント不要） | 素の閲覧で足りる（専用スキルは持たない） |

> このスキルは**機械変換**に徹する。prose を書き換えない。設計としてゼロから作り直すなら reviewable-design-doc を使う。

## 前提

- `reviewable-html-workbench` プラグインが導入済みであること（CLI とレンダラを利用する）。
- 同梱の `md_folder_to_model.py`（このスキルと同じディレクトリ）を使う。

## 変換仕様（md_folder_to_model.py）

- 入力の .md 群を**ファイル名ソート順**に連結。
- 各ファイルの `# H1` = 章ブロック(h2)、その中の `## H2` = 節ブロック(h3) に分割（＝コメント粒度が節単位になる）。
- 表 / 箇条書き(1段ネスト) / 番号リスト / 引用 / ```コードブロック``` / `**太字**` / `` `コード` `` を HTML 化。フロントマターと `---` は除去。
- 節ブロックは `review_required: true`（レビュー対象として提示）。

## 手順

```bash
# 0) workbench の repo root を動的解決（版が上がっても壊れないよう最新を拾う）
WB=$(ls -d ~/.claude/plugins/cache/reviewable-html-workbench-local/reviewable-html-workbench/*/ | sort -V | tail -1)
SKILL=~/.claude/skills/md-review

# 1) 出力先を決める（workbench の output 配下に日付き名前で）
NAME=<short-name>            # 例: bom-edit-requirements
OUTDIR="$WB/output/$(date +%F)_$NAME"
mkdir -p "$OUTDIR"

# 2) .md 群 → document-model.json（--src はフォルダ or glob）
python3 "$SKILL/md_folder_to_model.py" \
  --src "<md フォルダ or 'path/*.md'>" \
  --out "$OUTDIR/document-model.json" \
  --title "<ドキュメント全体のタイトル>" \
  --summary "<任意>"

# 3) 検査 → 生成 → 検証（すべて workbench root で実行）
cd "$WB"
python3 -m scripts.html_review_workbench.cli check-model --model "$OUTDIR/document-model.json"
python3 -m scripts.html_review_workbench.cli render      --model "$OUTDIR/document-model.json" --output "$OUTDIR"
python3 -m scripts.html_review_workbench.cli validate    --root  "$OUTDIR"

# 4) プレビュー起動（URL と stop_command を最終応答に必ず載せる）
python3 -m scripts.html_review_workbench.cli preview --root "$OUTDIR" --mode auto
```

5) preview 起動直後に、**新規コメントを常時監視**する。同梱の `watch_new_comments.py` を Monitor ツールで見張る（`persistent: true`）。このウォッチャは起動時点の既存コメントをシードし、**以後に増えた新規コメントだけを 1 行ずつ**流す。

```bash
python3 "$SKILL/watch_new_comments.py" "$OUTDIR/annotations/comments.json"
```

Monitor 例（agent が呼ぶ）: `Monitor(command="python3 ~/.claude/skills/md-review/watch_new_comments.py '<OUTDIR>/annotations/comments.json'", persistent=true, timeout_ms=3600000)`

## 運用方式（このスキルの既定）＝「常時監視 → .md を直接修正」

このスキルは**コメントに返信せず、指摘の意図どおり元の .md を直接修正していく**方式をとる（`add-reply` は使わない）。

- **監視は出しっぱなし**にする。`NEW-COMMENT` を受信するたびに、そのコメントの意図を汲んで**該当の .md を Edit で直接修正**する。
  - 「これ書かなくていい」= 該当箇所を削除。「〜に直して」= 書き換え。新要件 = BL にルール追加＋受入 AC を 1:1 で追加、等。
  - 用語・スコープ・図（ASCII）も含め、全 doc の一貫性を保って直す（該当箇所を grep して横断修正）。
  - 質問形（「どう思う?」等）や設計が割れる指摘は、勝手に決めず**チャットで確認**してから反映する。
- **取りこぼし対策**: Monitor 起動前に入っていた分は `NEW-COMMENT` に出ない。監視開始直後に一度 `comments.json` を読み、シード数と処理済みを突き合わせて、未処理があれば拾う。
- **HTML の再生成は指示があったときだけ**（「html更新して」等）。その時は `md_folder_to_model.py` を再実行 → `render` → `validate` → `notify-update`。勝手に毎回再生成しない。
- **コメントの「解決」も指示があったときだけ**（「解決にして」等）。`comments.json` は直接編集せず、正規 API `CommentStore.update_status(document_id=..., thread_id=..., status="resolved")` で対応済みスレッドを resolved にする。

```python
# 対応済みスレッドを解決にする（workbench root で実行）
from pathlib import Path; import json
from scripts.html_review_workbench.comment_store import CommentStore
root = Path("<OUTDIR>"); store = CommentStore(root=root)
for c in json.load(open(root/"annotations"/"comments.json"))["comments"]:
    if c.get("status") != "resolved":
        store.update_status(document_id=c["document_id"], thread_id=c["id"], status="resolved")
```

## ガード

- **文章を機械変換で載せる**が、**指摘に応じた本文修正は .md 原本を直す**（HTML/JSON を手で書き換えない）。表現・構成のゼロからの作り直しが要るなら reviewable-design-doc へ。
- レビュー機能は必須で有効（`review_settings.enabled = true`）。
- `comments.json` を Edit/Write で直接いじらない。解決は `CommentStore.update_status`、返信が要る場合のみ `add-reply` CLI を使う。
- HTML 再生成・コメント解決は**ユーザー指示ドリブン**（監視と .md 修正は自走、それ以外は指示待ち）。
- workbench はキャッシュ配下なので**そこに成果物以外を書き込まない**（プラグイン更新で消える）。
- 本文修正は**原本 .md を直してから再ビルド**する（HTML/JSON を手で書き換えない）。
- workbench はキャッシュ配下なので**そこに成果物以外を書き込まない**（プラグイン更新で消える）。
