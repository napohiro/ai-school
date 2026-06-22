import { useState } from 'react';

export default function MissionDetailScreen({ mission, isCompleted, memo, onComplete, onSaveMemo, onBack }) {
  const [memoText, setMemoText] = useState(memo || '');
  const [copied, setCopied] = useState(false);

  if (!mission) return null;

  function handleCopy() {
    navigator.clipboard.writeText(mission.promptExample).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // fallback for environments without clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = mission.promptExample;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleMemoChange(e) {
    setMemoText(e.target.value);
    onSaveMemo(mission.id, e.target.value);
  }

  return (
    <div>
      {/* Header */}
      <div className="detail-header">
        <div className="detail-header-content">
          <button className="back-btn" onClick={onBack}>
            ‹ もどる
          </button>
          <span className="detail-emoji">{mission.emoji}</span>
          <div className="detail-title">{mission.title}</div>
          <div className="detail-subtitle">
            {mission.difficulty} 難易度 ・ 🕐 {mission.duration} ・ {mission.category}
            {isCompleted && ' ・ ✅ 完了済み'}
          </div>
        </div>
      </div>

      <div className="detail-body">
        {/* Goal */}
        <div className="content-section">
          <div className="content-section-title">🎯 このミッションの目的</div>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e293b', lineHeight: 1.6 }}>
            {mission.goal}
          </div>
        </div>

        {/* Steps */}
        <div className="content-section">
          <div className="content-section-title">📋 手順</div>
          {mission.steps.map((step, i) => (
            <div key={i} className="step-item">
              <div className="step-number">{i + 1}</div>
              <div className="step-text">{step}</div>
            </div>
          ))}
        </div>

        {/* Prompt */}
        <div className="content-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div className="content-section-title" style={{ marginBottom: 0 }}>📋 コピペ用プロンプト</div>
          </div>
          <div className="prompt-box">
            <button className="copy-btn" onClick={handleCopy}>
              {copied ? '✅ コピー済み' : '📋 コピー'}
            </button>
            <pre>{mission.promptExample}</pre>
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
            ↑ このプロンプトをコピーしてAIに貼り付けよう
          </div>
        </div>

        {/* Tips */}
        <div className="content-section">
          <div className="content-section-title">💡 ポイント・コツ</div>
          {mission.tips.map((tip, i) => (
            <div key={i} className="tip-item">
              <span style={{ color: '#6366f1', fontWeight: 700, flexShrink: 0 }}>•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>

        {/* Memo */}
        <div className="content-section">
          <div className="content-section-title">📝 学習メモ（自由に書こう）</div>
          <textarea
            placeholder="AIを使って気づいたこと、面白かったこと、疑問点などを自由に書いてみましょう..."
            value={memoText}
            onChange={handleMemoChange}
            rows={4}
          />
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>
            自動保存されます
          </div>
        </div>

        {/* Complete Button */}
        {!isCompleted ? (
          <button className="btn btn-primary btn-full btn-lg" style={{ marginBottom: '8px' }} onClick={onComplete}>
            ✅ ミッション完了！ +100 XP
          </button>
        ) : (
          <div style={{
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '14px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '8px',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>🏆</div>
            <div style={{ fontWeight: 700, color: '#065f46', fontSize: '15px' }}>
              このミッションは完了済みです！
            </div>
          </div>
        )}

        <button className="btn btn-secondary btn-full" onClick={onBack}>
          ← ミッション一覧に戻る
        </button>

        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
