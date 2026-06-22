export default function WelcomeModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="welcome-gradient">🤖</div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', marginBottom: '10px' }}>
          AIスクールへようこそ！
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7, marginBottom: '24px' }}>
          AIを基礎の基礎から学べるアプリです。
          <br />
          レッスンを読んで、実践ミッションに挑戦して、
          <br />
          AIを使いこなせる力をつけましょう！
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px',
          marginBottom: '24px',
        }}>
          {[
            { icon: '📚', label: '12本のレッスン' },
            { icon: '⚡', label: '6つのミッション' },
            { icon: '🏆', label: 'XP＆バッジ' },
          ].map((item) => (
            <div key={item.label} style={{
              padding: '12px 8px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.07) 100%)',
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '4px' }}>{item.icon}</div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#6366f1' }}>{item.label}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-full btn-lg" onClick={onClose}>
          さっそく始める！
        </button>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
          ログイン不要・完全無料
        </p>
      </div>
    </div>
  );
}
