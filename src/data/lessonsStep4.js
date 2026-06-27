export const lessonsStep4 = [
  {
    id: 401,
    stepId: 'step4',
    stepNum: 4,
    title: 'ノーコードツールでAI開発を始める',
    emoji: '⚙️',
    category: 'AI開発',
    duration: '5分',
    description: 'BubbleやGlideなどのノーコードツールを使い、プログラミングなしでAIアプリを作る入口を学ぶ。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'ノーコードツールの種類を確認する',
      'Glideのサイトを開いてみる',
      '自分が作りたいアプリのイメージを書く',
      '「完了」を押す',
    ],
    content: `「コードが書けなくてもアプリが作れる時代」です。

【主要ノーコードツール】
・Bubble：複雑なWebアプリ向け。学習コスト高め
・Glide：スプレッドシート→アプリを高速作成
・Notion：データベース+AI機能でツール作成
・n8n/Make：AIワークフロー自動化

まずは「Claude Codeで作る」か「Glideで手軽に始める」の2択がおすすめです。`,
    analogy: 'レゴブロックで家を作るように、既存のパーツを組み合わせてアプリを作る。',
    points: ['ノーコードでも本格的なアプリが作れる', 'Glideはスプレッドシートから最速でアプリ化できる', '次のレッスンでClaude Codeも学ぶ'],
    practice: {
      tool: 'Glide',
      toolUrl: 'https://www.glideapps.com',
      intro: 'Glideのサイトを開いて、どんなアプリが作れるか確認しましょう。',
      steps: [
        'glideapps.com を開く',
        'ギャラリー（Templates）から作れるアプリの種類を確認する',
        'ChatGPTで「Glideを使って〇〇を作る方法」を聞いてみる',
      ],
      promptExample: `Glide（ノーコードアプリ開発ツール）を使って【あなたが作りたいアプリの種類】を作りたいです。
必要なGoogleスプレッドシートの列構成と、基本的な設定ステップを教えてください。`,
    },
    canDo: ['ノーコードツールの種類を3つ挙げられる', '自分に合ったノーコードツールを選べる'],
    quiz: {
      question: 'Googleスプレッドシートから素早くアプリを作れるノーコードツールは？',
      options: ['Bubble', 'Glide', 'Vercel', 'GitHub'],
      answer: 1,
      explanation: 'GlideはGoogleスプレッドシートをデータソースとして、ノーコードでモバイルアプリを素早く作れます。',
    },
  },
  {
    id: 402,
    stepId: 'step4',
    stepNum: 4,
    title: 'Claude Codeの仕組みと始め方',
    emoji: '🤖',
    category: 'AI開発',
    duration: '5分',
    description: 'Claude Codeとは何か、インストール方法と基本的な使い方を学ぶ。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'Node.jsがインストール済みか確認する',
      'npm install -g @anthropic-ai/claude-code を実行する',
      'claude --version を確認する',
      '「完了」を押す',
    ],
    content: `Claude Codeは「AIと会話しながらアプリを作れる」開発ツールです。

【特徴】
・ターミナルでClaudeと会話しながらコードを書く
・「〇〇機能を追加して」と言うだけでコードが生成される
・ファイル作成・編集・実行も自動でやってくれる

【インストール】
1. Node.js をインストール（nodejs.org）
2. npm install -g @anthropic-ai/claude-code
3. プロジェクトフォルダで claude と入力して起動

コードの知識がなくても、「何を作りたいか」を伝えるだけでOKです。`,
    analogy: '超優秀な開発者を隣に座らせて、口頭で指示するだけでアプリが完成する感覚。',
    points: ['ターミナル上でAIと会話してコードを書く', 'npmでインストールして即使える', '何を作りたいかを日本語で伝えるだけ'],
    practice: {
      tool: 'ターミナル（Terminal）',
      toolUrl: 'https://nodejs.org',
      intro: 'Claude Codeをインストールして起動するまでを試しましょう。',
      steps: [
        'nodejs.org からNode.jsをインストールする',
        'ターミナルを開いて下のコマンドを実行する',
        'claude --version でバージョンが表示されれば成功',
      ],
      promptExample: `# ターミナルで実行するコマンド
npm install -g @anthropic-ai/claude-code

# バージョン確認
claude --version

# プロジェクトを作るフォルダに移動してから起動
cd ~/Desktop
mkdir my-first-app
cd my-first-app
claude`,
    },
    canDo: ['Claude Codeをインストールできる', 'Claude Codeの基本的な仕組みを説明できる'],
    quiz: {
      question: 'Claude Codeをインストールするコマンドは？',
      options: ['pip install claude-code', 'npm install -g @anthropic-ai/claude-code', 'brew install claude', 'apt get claude'],
      answer: 1,
      explanation: 'npm（Node.jsのパッケージ管理ツール）を使って npm install -g @anthropic-ai/claude-code でインストールします。',
    },
  },
  {
    id: 403,
    stepId: 'step4',
    stepNum: 4,
    title: 'Claude Codeで最初のアプリを作る',
    emoji: '🛠️',
    category: 'AI開発',
    duration: '5分',
    description: 'Claude Codeを使って実際にReactアプリを作成し、ブラウザで動作を確認する。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'Claude Codeを起動する',
      'アプリの内容を日本語で指示する',
      'ブラウザでアプリを開いて動作確認する',
      '「完了」を押す',
    ],
    content: `Claude Codeで「ToDoアプリ」を作ってみましょう。

【流れ】
1. ターミナルでフォルダを作って claude と入力
2. 「ReactのToDoアプリを作って」と日本語で指示
3. 自動でファイルが生成される
4. npm run dev でブラウザで確認

最初のアプリが動いた瞬間、「AIで開発できる」実感が生まれます。コードを読む必要はありません。`,
    analogy: '「カレーを作って」と言えば、買い物から調理まで全部やってくれるシェフに頼む感覚。',
    points: ['日本語で指示するだけでReactアプリが完成する', 'npm run devでブラウザ確認', 'コードを読む必要なし、動けばOK'],
    practice: {
      tool: 'Claude Code',
      toolUrl: 'https://claude.ai/code',
      intro: 'Claude Codeを起動して最初のアプリを作りましょう。',
      steps: [
        'ターミナルで新しいフォルダを作って移動する',
        'claude と入力してClaude Codeを起動する',
        '下のプロンプトをClaude Codeのチャットに入力する',
      ],
      promptExample: `以下の仕様でReactのToDoアプリを作ってください。

機能：
1. タスクを追加できる（入力欄 + 追加ボタン）
2. タスクをチェックして完了にできる
3. 完了したタスクを削除できる
4. タスク数のカウントを表示する

技術：React + Vite（日本語のUI）
見た目：シンプルで使いやすいデザイン

作成後に「npm run dev で起動するコマンドも教えて」と追加で聞いてください。`,
    },
    canDo: ['Claude Codeで日本語指示からアプリを作れる', 'ローカルサーバーで動作確認できる'],
    quiz: {
      question: 'ViteでReactアプリを開発サーバーで起動するコマンドは？',
      options: ['npm start', 'npm run dev', 'node index.js', 'react start'],
      answer: 1,
      explanation: 'Viteを使ったプロジェクトは npm run dev で開発サーバーが起動し、ブラウザで確認できます。',
    },
  },
  {
    id: 404,
    stepId: 'step4',
    stepNum: 4,
    title: 'GitHubでコードを管理・公開する',
    emoji: '📦',
    category: 'AI開発',
    duration: '5分',
    description: 'Gitの基本とGitHubへのプッシュを学び、コードをクラウドで安全に管理する。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'GitHubアカウントを作る（または確認する）',
      '新しいリポジトリを作成する',
      'git init & git push を実行する',
      '「完了」を押す',
    ],
    content: `GitHubはコードの「クラウド保存 + バージョン管理」サービスです。

【基本の流れ】
1. github.com でアカウント作成（無料）
2. 新しいリポジトリ（=フォルダ）を作成
3. ローカルのコードをpushして保存

【必須コマンド】
git init          ← フォルダをGit管理下に置く
git add .         ← 変更を記録する準備
git commit -m ""  ← 変更を保存
git push          ← GitHubにアップロード

Claude Codeが自動でやってくれることも多いので、まずは流れを掴むだけでOK。`,
    analogy: 'Googleドキュメントの「変更履歴」機能のコード版。過去の状態にいつでも戻れる。',
    points: ['GitHubはコードのDropbox＋変更履歴', 'add→commit→pushの3ステップが基本', 'Claude Codeが多くを自動化してくれる'],
    practice: {
      tool: 'GitHub',
      toolUrl: 'https://github.com',
      intro: 'GitHubにアカウントを作って、最初のリポジトリを作りましょう。',
      steps: [
        'github.com でGoogleアカウントを使ってサインアップ',
        '「New repository」で新しいリポジトリを作成する（Public・README付き）',
        '作成したリポジトリのURLをコピーする',
      ],
      promptExample: `# Claude Codeに頼む場合（プロジェクトフォルダで実行）
「このプロジェクトをGitHubにプッシュしたいです。
まずGitHubでリポジトリを作りました（URL: [URLを貼る]）。
git init から push までのコマンドを教えて、一緒に実行してください。」`,
    },
    canDo: ['GitHubアカウントを作成できる', 'git add, commit, pushの意味と順番が分かる'],
    quiz: {
      question: 'GitHubへコードをアップロードするコマンドは？',
      options: ['git save', 'git upload', 'git push', 'git send'],
      answer: 2,
      explanation: 'git push でローカルの変更をGitHub（リモートリポジトリ）にアップロードします。',
    },
  },
  {
    id: 405,
    stepId: 'step4',
    stepNum: 4,
    title: 'Vercelでアプリをデプロイする',
    emoji: '🚀',
    category: 'AI開発',
    duration: '5分',
    description: 'GitHubと連携したVercelを使い、作ったアプリを世界に公開する方法を学ぶ。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'Vercelのアカウントを作る',
      'GitHubリポジトリをVercelに接続する',
      'デプロイして公開URLを確認する',
      '「完了」を押す',
    ],
    content: `Vercelを使えば、GitHubにプッシュするだけで自動的にアプリが公開されます。

【手順】
1. vercel.com でGitHubアカウントでログイン
2. 「New Project」でGitHubリポジトリを選択
3. 「Deploy」ボタンを押す
4. 数分後に「xxx.vercel.app」というURLでアプリが公開

「GitHubに push → 自動でVercelが反映」というCICD（自動デプロイ）の仕組みが即座に使えます。無料プランで十分です。`,
    analogy: '家を建てたら（コードを書いたら）、Vercelが自動で「住所」を付けて公開してくれる。',
    points: ['GitHubと連携で自動デプロイ', '無料プランで公開URLが取得できる', '変更するたびに自動で更新される'],
    practice: {
      tool: 'Vercel',
      toolUrl: 'https://vercel.com',
      intro: 'Vercelにアクセスして、GitHubのリポジトリを公開しましょう。',
      steps: [
        'vercel.com をGitHubアカウントで開く',
        '「Add New → Project」で前のレッスンのGitHubリポジトリを選択する',
        '「Deploy」を押して公開URLが発行されるまで待つ',
      ],
      promptExample: `# Claude Codeへの質問例
「Vercelでデプロイしようとしたら以下のエラーが出ました：
[エラーメッセージを貼る]
原因と解決方法を教えてください。」`,
    },
    canDo: ['VercelでアプリをWebに公開できる', 'GitHub→Vercelの自動デプロイの仕組みを説明できる'],
    quiz: {
      question: 'Vercelでアプリを公開する際に最初に必要なことは？',
      options: ['独自ドメインを買う', 'GitHubのリポジトリをVercelに接続する', 'サーバーを借りる', 'データベースを作る'],
      answer: 1,
      explanation: 'Vercel は GitHub のリポジトリと連携することで、コードを自動的に検出してデプロイします。',
    },
  },
  {
    id: 406,
    stepId: 'step4',
    stepNum: 4,
    title: 'アプリを改善・運用するサイクル',
    emoji: '🔄',
    category: 'AI開発',
    duration: '5分',
    description: '公開したアプリをユーザーのフィードバックを基に改善し続けるサイクルと、AIを活用した継続的改善を学ぶ。',
    todayGoal: [
      'このレッスンを読む（2分）',
      '自分のアプリに追加したい機能を3つ書く',
      'Claude Codeに機能追加を依頼する',
      'GitHubにpushしてVercelで確認する',
      '「完了」を押す',
    ],
    content: `アプリ公開はゴールではなく、スタートです。

【改善サイクル（PDCA）】
1. Plan：追加したい機能を決める
2. Do：Claude Codeで実装する
3. Check：ブラウザで動作確認する
4. Act：GitHubにpushしてVercelに反映

このサイクルを繰り返すことで、アプリは成長します。

バグが出たら？ エラーメッセージをそのままClaude Codeに貼れば解決できます。`,
    analogy: '料理を作って → 食べてみて → 「もう少し塩を足そう」と改善するのと同じプロセス。',
    points: ['「作る → 試す → 改善」を繰り返す', 'バグはエラーメッセージをAIに貼れば解決', 'push → Vercel自動反映のサイクルを習慣化'],
    practice: {
      tool: 'Claude Code',
      toolUrl: 'https://claude.ai/code',
      intro: '作ったアプリに新機能を追加して、Vercelに反映させましょう。',
      steps: [
        '追加したい機能を1つ決める',
        'Claude Codeを起動して下のプロンプトで依頼する',
        '実装後に git add . && git commit -m "機能名" && git push を実行する',
      ],
      promptExample: `現在のアプリに以下の機能を追加してください：

追加機能：【例：タスクに優先度（高/中/低）を設定できるようにする】

追加後に：
1. npm run dev で動作確認
2. git add, commit, push のコマンドも実行してください
3. コードの変更点を日本語で説明してください`,
    },
    canDo: ['アプリに機能追加して改善できる', 'GitHub→Vercelの改善サイクルを回せる'],
    quiz: {
      question: '本番アプリにエラーが出たとき、最も早い解決方法は？',
      options: ['コードを一から書き直す', 'エラーメッセージをClaude Codeに貼って解決策を聞く', 'アプリを削除する', '検索エンジンで延々と調べる'],
      answer: 1,
      explanation: 'エラーメッセージをそのままAIに貼り付けるのが最速。AIはエラーの原因と解決策を即座に提示してくれます。',
    },
  },
];
