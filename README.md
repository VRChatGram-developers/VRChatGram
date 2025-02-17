# VRChatGram

## プロジェクトの概要

VRChatGramは、⚪︎⚪︎です

## 技術スタック

* **フロントエンド:** Next.js (バージョン15.4)
* **言語:** TypeScript
* **データベース:** MySQL
* **バックエンド:** Node.js (バージョン16以上推奨)
* **ORM:** Prisma

## ローカル環境の起動

### 前提条件
*以下がnextjs直下に存在していること、なければコピーして配置すること
.env

firebaseSecretKey.json

### ローカル環境の起動

1.コンテナの起動

```bash
docker-compose up -d
```

2.nextjsのコンテナに入る

```bash
docker exec -it nextjs bash
```

3.マイグレーション実行

```bash
npx prisma migrate dev --name init
```

4.初期データ挿入

```bash
npm run seed 
```

5.以下のURLでページを開く

http://localhost:3000







