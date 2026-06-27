export const lessonsStep1 = [
  {
    id: 101,
    stepId: 'step1',
    stepNum: 1,
    title: 'AIとは何か・なぜ今重要か',
    emoji: '🤖',
    category: 'AI基礎',
    duration: '5分',
    description: 'AIの定義と、なぜ今これほど話題なのかをざっくり掴む入門レッスン。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'ChatGPTを開く',
      'プロンプトをコピーして送る',
      'AIの回答を読む',
      '「完了」を押す',
    ],
    content: `AIとは「人間が学ぶように、データからパターンを学習するプログラム」です。

2022年のChatGPT登場以降、文章・画像・コード何でも作れる「生成AI」が急速に普及。今やAIを使いこなせるかどうかが、仕事の速さを左右します。

使わない理由はありません。まず触れてみましょう。`,
    analogy: '電卓が計算を、スマホが通信を変えたように、AIは「考える作業」を変える。',
    points: ['AIは「データから学ぶ」プログラム', '生成AIは文章・画像・コードを作れる', '今すぐ使い始めることが最大の近道'],
    practice: {
      tool: 'ChatGPT',
      toolUrl: 'https://chat.openai.com',
      intro: 'ChatGPTを開いて、下のプロンプトをそのまま送ってみましょう。',
      steps: [
        'ChatGPT（chat.openai.com）を開く',
        '下のプロンプトをコピーして貼り付ける',
        '送信して、回答を読む',
      ],
      promptExample: `AIとは何かを、小学生でも分かるように100文字以内で説明してください。`,
    },
    canDo: ['AIが何かを自分の言葉で説明できる', 'ChatGPTを開いて質問できる'],
    quiz: {
      question: '生成AIが普及したきっかけとなったサービスは？',
      options: ['Google検索', 'ChatGPT', 'YouTube', 'Instagram'],
      answer: 1,
      explanation: '2022年11月に公開されたChatGPTが爆発的に普及し、生成AI時代が始まりました。',
    },
  },
  {
    id: 102,
    stepId: 'step1',
    stepNum: 1,
    title: '生成AIの種類と特徴',
    emoji: '🌐',
    category: 'AI基礎',
    duration: '5分',
    description: 'テキスト・画像・音声・動画など、生成AIの種類ごとの特徴と代表サービスを把握する。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'ChatGPTにテキスト生成を頼む',
      'MidjourneyまたはDALL-Eを検索する',
      '種類をメモする',
      '「完了」を押す',
    ],
    content: `生成AIは「何を作るか」で種類が分かれます。

■ テキスト生成：ChatGPT・Claude・Gemini
■ 画像生成：Midjourney・DALL-E・Stable Diffusion
■ 音楽生成：Suno・Udio
■ 動画生成：Runway・Sora・Veo

まず「テキスト生成AI」を完全に使いこなすことが最初の目標です。`,
    analogy: '包丁・鍋・フライパンが料理道具の種類なように、AIも用途別に道具があります。',
    points: ['テキスト/画像/音楽/動画で種類が違う', 'まずテキスト生成AIを習得', '用途に合わせて使い分ける'],
    practice: {
      tool: 'ChatGPT',
      toolUrl: 'https://chat.openai.com',
      intro: 'ChatGPTで「AIの種類まとめ表」を作ってもらいましょう。',
      steps: [
        'ChatGPTを開く',
        '下のプロンプトを送る',
        '出てきた表を見て、気になるAIをメモする',
      ],
      promptExample: `生成AIの種類を「テキスト・画像・音楽・動画」に分類して、代表的なサービス名と特徴を表でまとめてください。`,
    },
    canDo: ['生成AIを4種類に分類できる', '代表的なサービス名を挙げられる'],
    quiz: {
      question: '画像を生成するAIサービスはどれ？',
      options: ['Claude', 'Midjourney', 'ChatGPT', 'Suno'],
      answer: 1,
      explanation: 'Midjourneyは画像生成AIです。ChatGPT・ClaudeはテキストAI、SunoはAI音楽生成です。',
    },
  },
  {
    id: 103,
    stepId: 'step1',
    stepNum: 1,
    title: 'ChatGPTを使ってみよう',
    emoji: '💬',
    category: 'AI基礎',
    duration: '5分',
    description: 'ChatGPTのアカウント作成から最初の会話まで、ステップごとに体験する。',
    todayGoal: [
      'ChatGPTのアカウントを作る（または開く）',
      '自己紹介を送る',
      '3回以上質問してみる',
      'AIの回答を観察する',
      '「完了」を押す',
    ],
    content: `ChatGPTはOpenAIが作った会話AIです。無料プランで今すぐ使えます。

使い方は超シンプル：
1. chat.openai.com にアクセス
2. サインアップ（Googleアカウントで可）
3. チャット欄に文字を入れて送るだけ

コツは「具体的に、丁寧に頼む」こと。命令形より「〜してください」が自然です。`,
    analogy: 'LINEでメッセージを送るのと同じ感覚。ただし相手は何でも知っている超優秀なアシスタント。',
    points: ['無料で今すぐ使える', 'Googleアカウントで登録できる', '「具体的に頼む」がコツ'],
    practice: {
      tool: 'ChatGPT',
      toolUrl: 'https://chat.openai.com',
      intro: 'まずChatGPTに自己紹介して、仕事の悩みを相談してみましょう。',
      steps: [
        'chat.openai.com を開く',
        '下のプロンプトを送る',
        'AIの返答に対して「もっと詳しく」と返してみる',
      ],
      promptExample: `私は会社員で、毎日メールの返信に1時間かかっています。AIを使って時短する方法を3つ教えてください。`,
    },
    canDo: ['ChatGPTにログインして使える', '会話形式でAIに相談できる'],
    quiz: {
      question: 'ChatGPTを提供している会社は？',
      options: ['Google', 'Microsoft', 'OpenAI', 'Meta'],
      answer: 2,
      explanation: 'ChatGPTはOpenAIが開発・提供しています。MicrosoftはOpenAIへの大口投資家です。',
    },
  },
  {
    id: 104,
    stepId: 'step1',
    stepNum: 1,
    title: 'Claude・Geminiとの使い分け',
    emoji: '⚡',
    category: 'AI基礎',
    duration: '5分',
    description: '主要3大AI（ChatGPT・Claude・Gemini）の違いと、どの場面で使うかを学ぶ。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'Claudeを開いてみる',
      '同じ質問を2つのAIに送る',
      '回答を比べる',
      '「完了」を押す',
    ],
    content: `主要AIを使い分けると生産性が一気に上がります。

■ ChatGPT：汎用性最高。まず何でもここで試す
■ Claude：長文・深い分析・コード生成が得意
■ Gemini：Google連携・最新情報・リアルタイム検索が強い

全部無料で使えます。「ChatGPTで聞いて、Claudeで深掘り」が鉄板パターンです。`,
    analogy: '医者に例えると、ChatGPT=内科（何でも）、Claude=外科（精密）、Gemini=情報科（最新）。',
    points: ['3大AIはそれぞれ得意分野が異なる', 'まずChatGPTで試すのが基本', '全部無料で使い比べられる'],
    practice: {
      tool: 'Claude',
      toolUrl: 'https://claude.ai',
      intro: 'Claudeに下のプロンプトを送って、ChatGPTの回答と比べてみましょう。',
      steps: [
        'claude.ai を開く（Googleアカウントでログイン可）',
        '下のプロンプトを送る',
        'ChatGPTに同じ質問して回答を比べる',
      ],
      promptExample: `AIを使って副業する方法を5つ教えてください。それぞれ月収の目安と難易度も添えて。`,
    },
    canDo: ['3大AIの特徴を説明できる', 'ClaudeとGeminiにログインできる'],
    quiz: {
      question: '長文の資料分析や深い分析に最も向いているAIは？',
      options: ['Gemini', 'Claude', 'Suno', 'Midjourney'],
      answer: 1,
      explanation: 'Claudeは長文処理と深い分析が得意で、契約書・論文・コード解析などに強みがあります。',
    },
  },
  {
    id: 105,
    stepId: 'step1',
    stepNum: 1,
    title: 'プロンプトの基本（入門）',
    emoji: '✍️',
    category: 'AI基礎',
    duration: '5分',
    description: 'AIへの指示文「プロンプト」の基本ルールを学び、アウトプットの質を上げる。',
    todayGoal: [
      'このレッスンを読む（2分）',
      '「悪い例プロンプト」を送る',
      '「良い例プロンプト」を送る',
      '2つの回答を比べる',
      '「完了」を押す',
    ],
    content: `AIへの指示文を「プロンプト」と言います。書き方で回答の質が10倍変わります。

【基本4要素】
1. 役割 ── 「あなたはプロのコピーライターです」
2. 背景 ── 「30代女性向けのSNS投稿を作ります」
3. 指示 ── 「商品の魅力を伝える文章を書いてください」
4. 形式 ── 「140文字以内、改行なし」

この4つを揃えるだけで、回答が劇的に良くなります。`,
    analogy: '料理レシピと同じ。「何か作って」より「材料・分量・手順」を書いた方がおいしくできます。',
    points: ['プロンプト=AIへの指示文', '役割・背景・指示・形式の4要素が基本', '具体的に書くほど質が上がる'],
    practice: {
      tool: 'ChatGPT',
      toolUrl: 'https://chat.openai.com',
      intro: '悪いプロンプトと良いプロンプトの違いを体験しましょう。',
      steps: [
        '「悪い例」を先に送って回答を確認する',
        '次に「良い例」を送って回答を比べる',
        '良い例の4要素（役割・背景・指示・形式）がどこか確認する',
      ],
      promptExample: `# 良いプロンプト例
あなたはSNSマーケティングのプロです。
Instagram（30代女性向け）で「ハンドメイド雑貨店」の新商品告知をします。
エンゲージメントが高まるような投稿文を書いてください。
条件：140文字以内、絵文字2〜3個使用、ハッシュタグ5個`,
    },
    canDo: ['プロンプトの4要素を説明できる', '良いプロンプトと悪いプロンプトの違いが分かる'],
    quiz: {
      question: '良いプロンプトに含める「4要素」に含まれないものは？',
      options: ['役割', '背景', '料金', '指示'],
      answer: 2,
      explanation: '4要素は「役割・背景・指示・形式」です。料金はプロンプトの要素ではありません。',
    },
  },
  {
    id: 106,
    stepId: 'step1',
    stepNum: 1,
    title: 'AI時代の注意点と心得',
    emoji: '⚠️',
    category: 'AI基礎',
    duration: '5分',
    description: 'AIの限界・ハルシネーション・著作権・個人情報など、安全に使うための知識を身につける。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'ChatGPTで「嘘をついてみて」と送る',
      'ハルシネーションを体験する',
      '注意点リストを確認する',
      '「完了」を押す',
    ],
    content: `AIは便利ですが、使うときの注意点があります。

【重要な3つのリスク】
1. ハルシネーション ── 自信満々に嘘をつく。重要な情報は必ず確認を
2. 個人情報・機密 ── 会社の秘密・個人情報を入力しない
3. 著作権 ── AI生成物の著作権は法的にグレーな部分も

AIは「使いこなす道具」です。判断・確認は必ず人間が行いましょう。`,
    analogy: '計算機でも入力ミスがあるように、AIも間違えます。最終確認は必ず自分でする。',
    points: ['ハルシネーション（AI の嘘）に注意', '個人情報・機密は入力しない', '最終判断は必ず自分で行う'],
    practice: {
      tool: 'ChatGPT',
      toolUrl: 'https://chat.openai.com',
      intro: 'AIがハルシネーションを起こすか体験してみましょう。',
      steps: [
        '下のプロンプトをChatGPTに送る',
        '出てきた情報が本当か検索して確認する',
        '間違いがあれば「それは違う」と指摘する',
      ],
      promptExample: `架空の著名人「田中AI郎」さんの経歴を詳しく教えてください。（※これは架空の人物テストです）`,
    },
    canDo: ['AIのハルシネーションについて説明できる', 'AIを安全に使うための注意点を3つ言える'],
    quiz: {
      question: 'AIが自信満々に誤った情報を生成する現象を何という？',
      options: ['バグ', 'ハルシネーション', 'クラッシュ', 'オーバーフィット'],
      answer: 1,
      explanation: 'ハルシネーション（幻覚）とは、AIが事実とは異なる情報を確信を持って生成してしまう現象です。',
    },
  },
];
