# 歌マクロスデータベース
歌マクロス公式wikiが重たいので自分が使う用にreactの勉強がてら構築した

ソースを更新してpushするとgithub actionsでgithub pagesに自動デプロイする

---

## 1. utamac-scraper
歌マクロス公式wikiから更新データを取得するツール

取得したデータはutamac-web/src/dataにjson形式で保存している
### 実装済み
* プレート
* コスチューム
* エピソード
* 歌姫
### 実装予定
* ライブ
* バルキリー

### 主な使用ライブラリ
|名前|用途|
|--|--|
|[cheerio](https://github.com/cheeriojs/cheerio)|html解析|
|[node-fetch](https://github.com/node-fetch/node-fetch)|html取得|
|[lodash](https://lodash.com/)|データ操作|

---

## 2. utamac-web
歌マクロスの各種データを閲覧するWebサイト

[歌マクロスDB](https://ponko23.github.io/utamac-db/)
### 実装済み
* プレート一覧（属性、スキル、歌姫相性でフィルタリング、各種ステータス値でソート可能）
* コスチューム一覧（歌姫でフィルタリング可能）
### 実装予定
* ライブ一覧
* 所持チェックとそれを使ったフィルタリング機能（gatsby移行時に削ったもの）
* 各種設定を保持する（gatsby移行時に削ったもの）
* 攻略Tips

### 主な使用ライブラリ
|名前|用途|
|--|--|
|[gatsby](https://github.com/gatsbyjs/gatsby)|静的サイト作成フレームワーク|
|[react](https://reactjs.org/)|react|
|[material-ui](https://material-ui.com/)|マテリアルデザイン|
|[lodash](https://lodash.com/)|データ操作|
