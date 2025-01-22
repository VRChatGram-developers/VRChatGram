# VRChatGram

## プロジェクトの概要

VRChatGramは、⚪︎⚪︎です

## 技術スタック

* **フロントエンド:** Next.js (バージョン15.4)
* **言語:** TypeScript

## 開発環境の構築

### 前提条件
* Node.js (バージョン16以上推奨)
* npm (またはyarn)


## ディレクトリ案
src/
├── features/                # 機能単位での管理
│   ├── auth/                # 認証機能
│   │   ├── components/      # 認証に関連するUIコンポーネント
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   ├── hooks/           # 認証に関連するカスタムフック
│   │   │   ├── useAuth.ts
│   │   │   ├── useLogin.ts
│   │   ├── services/        # 認証関連のロジック・API通信
│   │   │   ├── authApi.ts
│   │   │   ├── authHelpers.ts
│   │   └── types/           # 認証関連の型定義
│   │       ├── auth.d.ts
│   ├── dashboard/           # ダッシュボード機能
│   │   ├── components/      # ダッシュボード用UI
│   │   ├── hooks/           # ダッシュボード専用のフック
│   │   ├── services/        # データ取得や加工ロジック
│   │   └── typ       # 型定義
├── app/                     # ルートやページ構成
│   ├── dashboard/           # ダッシュボードのルート
│   │   ├── page.tsx         # ダッシュボードページ
│   │   └── layout.tsx       # ダッシュボード専用レイアウト
│   ├── api/                 # APIルート
│   └── (auth)/              # 認証系のルート
│       ├── login/
│       │   └── page.tsx
├── components/              # グローバルで使えるUIコンポーネント
│   ├── Button.tsx
│   ├── Card.tsx
├── hooks/                   # 汎用的なカスタムフック
├── libs/                    # ライブラリや設定
├── styles/                  # スタイル
├── types/                   # 共通の型定義
└── middleware.ts            # ミドルウェア設定
