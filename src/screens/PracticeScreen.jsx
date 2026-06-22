export default function PracticeScreen({ missions, completedMissions, onSelectMission }) {
  const completedCount = completedMissions.length;

  return (
    <div>
      <div className="gradient-header">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>⚡ 実践ミッション</h1>
          <p>ハンズオン形式でAIの使い方を体験しよう</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
            <span style={{ background: 'rgba(255,255,255,0.25)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
              ✅ {completedCount} / 6 完了
            </span>
            <span style={{ background: 'rgba(255,255,255,0.25)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
              +100 XP/ミッション
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '12px', padding: '12px', marginBottom: '16px', fontSize: '13px', color: '#78350f', lineHeight: 1.6 }}>
          ⚡ 実践ミッションは実際にAIを使いながら学ぶコーナーです。コピペ用プロンプトを活用してAIと対話してみましょう！
        </div>

        {missions.map((mission) => {
          const done = completedMissions.includes(mission.id);
          return (
            <button
              key={mission.id}
              className={`mission-card${done ? ' completed' : ''}`}
              onClick={() => onSelectMission(mission.id)}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: done ? 'rgba(16,185,129,0.12)' : 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                flexShrink: 0,
              }}>
                {mission.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {mission.title}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {mission.description}
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span className="tag tag-gray" style={{ padding: '2px 8px' }}>{mission.difficulty}</span>
                  <span className="tag tag-gray" style={{ padding: '2px 8px' }}>🕐 {mission.duration}</span>
                  {done ? (
                    <span className="tag tag-success" style={{ padding: '2px 8px' }}>✓ 完了</span>
                  ) : (
                    <span className="tag tag-warning" style={{ padding: '2px 8px' }}>+100 XP</span>
                  )}
                </div>
              </div>
              {done ? (
                <span style={{ fontSize: '20px', color: '#10b981' }}>✅</span>
              ) : (
                <span style={{ fontSize: '18px', color: '#94a3b8' }}>›</span>
              )}
            </button>
          );
        })}

        <div style={{ textAlign: 'center', padding: '20px 0', color: '#94a3b8', fontSize: '13px' }}>
          全6ミッション • 合計600 XP獲得可能
        </div>
      </div>
    </div>
  );
}
