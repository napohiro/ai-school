import { BADGE_DEFS } from '../hooks/useProgress';

export default function BadgeModal({ badgeId, onClose }) {
  if (!badgeId) return null;
  const badge = BADGE_DEFS[badgeId];
  if (!badge) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: '64px', marginBottom: '8px' }}>🎉</div>
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          margin: '0 auto 16px',
          boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
        }}>
          {badge.emoji}
        </div>
        <p style={{ fontSize: '14px', color: '#6366f1', fontWeight: 700, marginBottom: '6px' }}>
          バッジ獲得！
        </p>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
          {badge.name}
        </h2>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
          {badge.desc}を達成しました！
        </p>
        <button className="btn btn-primary btn-full" onClick={onClose}>
          やった！
        </button>
      </div>
    </div>
  );
}
