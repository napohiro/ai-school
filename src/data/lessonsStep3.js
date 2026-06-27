export const lessonsStep3 = [
  {
    id: 301,
    stepId: 'step3',
    stepNum: 3,
    title: '画像生成AIの基本を学ぶ',
    emoji: '🖼️',
    category: 'AIクリエイト',
    duration: '5分',
    description: 'Midjourney・DALL-E・Stable Diffusionの違いと、最初の1枚を生成するまでを体験する。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'ChatGPT（DALL-E）またはAdobe Fireflyを開く',
      '下のプロンプトで画像を生成する',
      '生成された画像を確認する',
      '「完了」を押す',
    ],
    content: `テキストから画像を作る「画像生成AI」は、クリエイティブの常識を変えました。

【主要サービス】
・DALL-E（ChatGPT内蔵）：一番手軽、無料で使える
・Midjourney：最高品質、有料月$10〜
・Adobe Firefly：商用利用OK、商用デザイン向け
・Stable Diffusion：無料・高自由度、環境構築が必要

まずはChatGPT内蔵のDALL-Eか、Adobe Fireflyで試すのがおすすめです。`,
    analogy: '「文字を打つだけでプロのデザイナーが絵を描いてくれる」感覚。',
    points: ['DALL-E（ChatGPT内蔵）がお手軽入門', 'Midjourneyが品質最高（有料）', 'まず試して感覚を掴む'],
    practice: {
      tool: 'ChatGPT（DALL-E）',
      toolUrl: 'https://chat.openai.com',
      intro: 'ChatGPTの画像生成機能（DALL-E）を使って最初の1枚を作りましょう。',
      steps: [
        'ChatGPTを開く（無料アカウントでOK）',
        '下のプロンプトをそのまま送る',
        '生成された画像を確認・保存する',
      ],
      promptExample: `以下の内容で画像を生成してください。
「日本の朝の公園、桜の木の下でコーヒーを飲む30代の女性、柔らかい朝日、水彩画風、温かい色合い」`,
    },
    canDo: ['画像生成AIの主要サービスを3つ挙げられる', 'ChatGPTで画像を生成できる'],
    quiz: {
      question: 'ChatGPTに内蔵されている画像生成機能の名前は？',
      options: ['Midjourney', 'Stable Diffusion', 'DALL-E', 'Firefly'],
      answer: 2,
      explanation: 'DALL-EはOpenAIが開発した画像生成AI で、ChatGPTに統合されています。',
    },
  },
  {
    id: 302,
    stepId: 'step3',
    stepNum: 3,
    title: '画像生成プロンプトの極意',
    emoji: '🎯',
    category: 'AIクリエイト',
    duration: '5分',
    description: '画像生成AIのプロンプトで「思い通りの画像」を作る技術を身につける。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'プロンプト要素を確認する',
      '5要素プロンプトで画像を生成する',
      '「スタイル」を変えて2枚比較する',
      '「完了」を押す',
    ],
    content: `画像生成プロンプトには「5要素」があります。

1. 主題 ── 何を描くか（人物・風景・物）
2. スタイル ── 画風（水彩・写真・アニメ・油絵）
3. 雰囲気 ── 色・光・感情（温かい・神秘的・シャープ）
4. 構図 ── 角度・距離（正面・俯瞰・クローズアップ）
5. 品質 ── 解像度・詳細度（高精細・ポスター品質）

この5要素を英語で書くと、品質が大幅に上がります。`,
    analogy: 'カメラマンへの指示に「被写体・カメラ設定・照明・構図」を伝えるのと同じ。',
    points: ['5要素（主題・スタイル・雰囲気・構図・品質）を使う', '英語で書くと品質が上がる', 'スタイルを変えて使い分ける'],
    practice: {
      tool: 'ChatGPT（DALL-E）',
      toolUrl: 'https://chat.openai.com',
      intro: '5要素を使ったプロンプトで理想の画像を作ってみましょう。',
      steps: [
        '下のプロンプトをそのまま送って1枚目を生成する',
        '「スタイル」だけ変えて（例：anime styleに）もう1枚生成する',
        '2枚を比べて、スタイルの違いを確認する',
      ],
      promptExample: `Generate an image:
Subject: A woman in her 30s working on a laptop in a modern cafe
Style: Professional photography, cinematic lighting
Mood: Focused, warm, productive atmosphere
Composition: Medium shot, slight side angle
Quality: High resolution, sharp details, shallow depth of field`,
    },
    canDo: ['画像生成の5要素プロンプトが書ける', 'スタイルを変えて複数パターンを生成できる'],
    quiz: {
      question: '画像生成プロンプトで「画風」を指定する要素は？',
      options: ['主題', 'スタイル', '構図', '品質'],
      answer: 1,
      explanation: '「スタイル」は画風を指定する要素です（例：水彩画・写真・油絵・アニメなど）。',
    },
  },
  {
    id: 303,
    stepId: 'step3',
    stepNum: 3,
    title: 'AIでSNS投稿・ブログを作る',
    emoji: '📱',
    category: 'AIクリエイト',
    duration: '5分',
    description: 'Instagram・X・noteなどのSNS投稿・ブログ記事をAIで量産するワークフローを作る。',
    todayGoal: [
      'このレッスンを読む（2分）',
      '投稿したいテーマを1つ決める',
      'SNS投稿文を3パターン生成する',
      '一番良いものを選んで編集する',
      '「完了」を押す',
    ],
    content: `SNS投稿をAIで作ると、週5投稿が週1の作業量で実現できます。

【効率的なワークフロー】
1. テーマ（1行）を決める
2. 「このテーマでInstagram投稿を3パターン作って」
3. 気に入ったものを選んで軽く個性を加える
4. 画像は前のレッスンのAI生成画像を使う

「AIが下書き → 自分が仕上げる」のペアが最強です。`,
    analogy: 'AIが素材を並べて、自分が味付けして完成させる。調理師とシェフの関係。',
    points: ['「3パターン生成→1つ選ぶ」が最速', '個性を加えるのは最後の10%だけ', 'AI画像 + AI文章の組み合わせが強い'],
    practice: {
      tool: 'ChatGPT',
      toolUrl: 'https://chat.openai.com',
      intro: '自分のSNSに投稿する文章を3パターン作ってもらいましょう。',
      steps: [
        '投稿したいテーマ（自分の仕事・趣味・学び）を1つ決める',
        '下のプロンプトを編集して送る',
        '3パターンから一番良いものを選び、自分の言葉で少し修正する',
      ],
      promptExample: `テーマ：【あなたのテーマ（例：AIツールで仕事が変わった話）】
SNSプラットフォーム：【Instagram/X/note/どれか】
ターゲット：【20〜30代の会社員・副業に興味ある人など】

このテーマでSNS投稿文を3パターン作ってください。
各パターン：本文200文字以内、ハッシュタグ5個、絵文字2〜3個使用`,
    },
    canDo: ['AIを使ってSNS投稿を3パターン生成できる', 'SNSコンテンツのAI活用ワークフローが作れる'],
    quiz: {
      question: 'SNS投稿作成でAIを最も効率的に使う方法は？',
      options: ['AIに1つ完璧な投稿を作らせる', '全部AIに任せてそのまま投稿する', '3パターン生成→選んで自分で仕上げる', '英語で投稿を作ってもらう'],
      answer: 2,
      explanation: '「複数パターン生成→選択→微調整」が最もスピードと品質のバランスが良いワークフローです。',
    },
  },
  {
    id: 304,
    stepId: 'step3',
    stepNum: 3,
    title: 'AIで資料・プレゼンを作る',
    emoji: '📊',
    category: 'AIクリエイト',
    duration: '5分',
    description: '企画書・提案書・プレゼンスライドの構成と内容をAIで一気に作成する。',
    todayGoal: [
      'このレッスンを読む（2分）',
      '作りたい資料のテーマを決める',
      'スライド構成を生成する',
      '各スライドの内容テキストも出力する',
      '「完了」を押す',
    ],
    content: `プレゼン資料の最大の壁は「何をどの順番で書くか」の構成です。

AIはこの構成を一瞬で解決します。

【ワークフロー】
1. テーマ・目的・対象者を伝える
2. スライド構成（見出し）を出してもらう
3. 各スライドのテキスト内容を出してもらう
4. PowerPoint/Google Slidesに貼り付けて仕上げる

「構成 → テキスト → デザイン」の順で作ると最速です。`,
    analogy: '設計図（構成）を先に作ってから家を建てる（中身を書く）のと同じ順番。',
    points: ['まず「構成（スライドタイトル一覧）」を作る', '次に「各スライドの内容テキスト」を出す', 'デザインはCanvaやPowerPointで最後に'],
    practice: {
      tool: 'Claude',
      toolUrl: 'https://claude.ai',
      intro: '提案書やプレゼンのスライド構成と内容を一気に作ってもらいましょう。',
      steps: [
        '作りたい資料のテーマと目的を決める',
        '下のプロンプトを編集して送る',
        '出力されたテキストをGoogleスライドやPowerPointに貼り付ける',
      ],
      promptExample: `以下の条件でプレゼン資料を作成してください。

テーマ：【プレゼンのテーマ】
目的：【何を伝えたいか・何を決めてほしいか】
対象：【誰に向けた資料か】
スライド数：10枚程度

出力：
1. スライド一覧（タイトルと1行説明）
2. 各スライドの本文テキスト（箇条書き3〜5項目）
3. 結論スライドのメッセージ（1文で）`,
    },
    canDo: ['AIでプレゼン構成と内容テキストを生成できる', '「構成→テキスト→デザイン」のワークフローを使える'],
    quiz: {
      question: 'AIでプレゼン資料を作るとき、最初にやるべきことは？',
      options: ['デザインを決める', 'スライド構成（見出し）を作る', '結論から書く', '画像を探す'],
      answer: 1,
      explanation: 'まず「どのスライドに何を書くか（構成）」を決めるのが最速。構成が決まれば中身はAIが埋めてくれます。',
    },
  },
  {
    id: 305,
    stepId: 'step3',
    stepNum: 3,
    title: 'AI動画・音楽生成を体験する',
    emoji: '🎬',
    category: 'AIクリエイト',
    duration: '5分',
    description: 'RunwayやSunoなど動画・音楽生成AIを体験し、マルチメディアコンテンツ制作の可能性を知る。',
    todayGoal: [
      'このレッスンを読む（2分）',
      'Sunoで音楽を1曲生成する',
      '生成された音楽を聴く',
      'RunwayのサイトをGoogleで確認する',
      '「完了」を押す',
    ],
    content: `AI音楽・AI動画は2024〜2025年に急速に進化しました。

【音楽生成】
・Suno：テキストから楽曲を生成。無料で使える
・Udio：本格的な楽曲生成

【動画生成】
・Runway Gen-3：テキスト→動画、高品質
・Sora（OpenAI）：最高品質だが利用制限あり
・Veo（Google）：Google製動画生成AI

今すぐ試せるのはSunoの音楽生成が最も手軽です。`,
    analogy: 'プロの音楽スタジオが「テキスト1行」で24時間稼働している感覚。',
    points: ['Sunoで今すぐ無料で音楽生成できる', 'AI動画はRunway・Soraが主要サービス', 'BGM・SNS動画・ショートフィルムなどに活用できる'],
    practice: {
      tool: 'Suno',
      toolUrl: 'https://suno.com',
      intro: 'Sunoで最初のAI楽曲を生成してみましょう。',
      steps: [
        'suno.com を開く（Googleアカウントでログイン）',
        '「Create」を押して下のプロンプトを入力する',
        '生成された楽曲を聴いて保存する',
      ],
      promptExample: `uplifting Japanese pop song, morning motivation, acoustic guitar, bright piano, female vocal, energetic but calm, 120 BPM`,
    },
    canDo: ['Sunoを使ってAI音楽を生成できる', 'AI動画・音楽生成の主要サービスを説明できる'],
    quiz: {
      question: 'テキストから音楽を生成できるAIサービスはどれ？',
      options: ['Runway', 'Midjourney', 'Suno', 'Adobe Firefly'],
      answer: 2,
      explanation: 'SunoはテキストやジャンルのプロンプトからAI楽曲を生成できるサービスです。',
    },
  },
  {
    id: 306,
    stepId: 'step3',
    stepNum: 3,
    title: 'コンテンツを量産してSNS発信する',
    emoji: '🚀',
    category: 'AIクリエイト',
    duration: '5分',
    description: 'STEP3の集大成。AI画像・AI文章・AI音楽を組み合わせた1週間のSNS発信計画を作る。',
    todayGoal: [
      'このレッスンを読む（2分）',
      '発信テーマ（ジャンル）を決める',
      '1週間の投稿計画を生成する',
      '初日分の投稿を1つ完成させる',
      '「完了」を押す',
    ],
    content: `STEP3のまとめとして「1週間SNS計画」を作ります。

【AI×SNS量産ワークフロー】
1. テーマ・ターゲットを決める（5分）
2. 1週間分の投稿トピックを出す（AIで5分）
3. 各投稿文を生成する（1投稿1分）
4. AI画像を添付する（1枚3分）
5. 予約投稿して完了（5分）

1週間分のコンテンツが1〜2時間で完成します。`,
    analogy: '映画の「一括撮影」と同じ。毎日撮るより、週に1回まとめて作る方が断然効率的。',
    points: ['1週間分を一括で作るのが効率的', 'テーマを固定すると量産しやすい', '予約投稿ツールと組み合わせて完全自動化も可能'],
    practice: {
      tool: 'ChatGPT',
      toolUrl: 'https://chat.openai.com',
      intro: '1週間のSNS投稿計画を作って、初日の投稿を完成させましょう。',
      steps: [
        '発信したいテーマ・ジャンルを1つ決める',
        '下のプロンプトを送って1週間分のトピックを生成する',
        '気に入ったトピックで実際の投稿文を1つ作る',
      ],
      promptExample: `私は【あなたのSNSテーマ・ジャンル】について発信しています。
フォロワー層：【20〜30代・副業に興味ある人など】

1週間分（7日分）のInstagram投稿トピックを出してください。
条件：
- 各トピックは1行のタイトル
- エンゲージメントが高まるテーマ（共感・驚き・役立つ）
- 曜日ごとに異なるアングルで
- 投稿後に「この中で1番良いトピックの投稿文を作って」と続けて聞きます`,
    },
    canDo: ['1週間分のSNS投稿計画をAIで作れる', 'AI画像+AI文章の組み合わせコンテンツを作れる'],
    quiz: {
      question: 'SNSコンテンツをAIで量産する際の最も効率的なやり方は？',
      options: ['毎日少しずつ作る', '1週間分を一括で作って予約投稿する', '全部英語で作成する', 'AIにそのまま投稿させる'],
      answer: 1,
      explanation: '「一括作成 + 予約投稿」の組み合わせが最も効率的。1〜2時間の作業で1週間分のコンテンツが完成します。',
    },
  },
];
