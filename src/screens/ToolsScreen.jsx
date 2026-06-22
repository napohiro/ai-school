import { tools } from '../data/tools';

export default function ToolsScreen() {
  const categories = [...new Set(tools.map((t) => t.category))];

  return (
    <div>
      <div className="gradient-header">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>🛠️ AIツール一覧</h1>
          <p>主要なAIツールを比較してみよう</p>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '12px', padding: '12px', marginBottom: '16px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
          🔍 各ツールの特徴を知って、目的に合ったAIを使い分けましょう。全て基本無料で試せます！
        </div>

        {categories.map((cat) => (
          <div key={cat}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '16px 0 10px' }}>
              ── {cat} ──
            </div>
            {tools
              .filter((t) => t.category === cat)
              .map((tool) => (
                <div key={tool.id} className="tool-card">
                  <div className="tool-header">
                    <div className="tool-emoji-circle">{tool.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div className="tool-name">{tool.name}</div>
                      <div className="tool-developer">{tool.developer}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ fontSize: '12px', color: i < tool.rating ? '#f59e0b' : '#e2e8f0' }}>★</span>
                      ))}
                    </div>
                  </div>

                  <div className="tool-desc">{tool.description}</div>

                  <div className="tool-label">🎯 使いどころ</div>
                  <div className="tool-value">{tool.useCase}</div>

                  <div className="tool-label">👶 初心者向け度</div>
                  <div className="tool-value">{tool.forBeginner}</div>

                  <div style={{ marginTop: '12px' }}>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-btn"
                    >
                      🔗 公式サイトを開く
                    </a>
                  </div>
                </div>
              ))}
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '20px 0', color: '#94a3b8', fontSize: '13px' }}>
          全{tools.length}ツール紹介 • 順次更新予定
        </div>
      </div>
    </div>
  );
}
