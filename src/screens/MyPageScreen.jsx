import { BADGE_DEFS } from '../hooks/useProgress';

const ALL_BADGES = Object.entries(BADGE_DEFS).map(([id, def]) => ({ id, ...def }));

export default function MyPageScreen({ progress, getLevel, getLevelProgress, getTotalProgress, onReset, quizStats }) {
  const levelInfo = getLevel();
  const levelPct = getLevelProgress();
  const totalPct = getTotalProgress();

  const advancedDone = (progress.completedAdvancedLessons || []).length;
  const beginnerPct = Math.round((progress.completedLessons.length / 12) * 100);
  const advancedPct = Math.round((advancedDone / 12) * 100);
  const missionPct = Math.round((progress.completedMissions.length / 6) * 100);
  const totalCompleted =
    progress.completedLessons.length + progress.completedMissions.length + advancedDone;

  const memoEntries = Object.entries(progress.missionMemos).filter(([, memo]) => memo && memo.trim());

  function handleReset() {
    if (window.confirm('学習データをすべてリセットしますか？\nこの操作は取り消せません。')) {
      onReset();
    }
  }

  return (
    <div>
      <div className="gradient-header">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>👤 マイページ</h1>
          <p>学習の記録と進捗を確認しよう</p>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* ===== Level Card ===== */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '16px',
          color: 'white',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ fontSize: '48px' }}>{levelInfo.emoji}</div>
            <div>
              <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: 600 }}>現在のレベル</div>
              <div style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.3px' }}>
                Lv.{levelInfo.level} {levelInfo.name}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.9, fontWeight: 700 }}>✨ {progress.xp} XP</div>
            </div>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.75, marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
            <span>レベル進捗</span>
            <span>{levelPct}%</span>
          </div>
          <div className="progress-bar-white">
            <div className="progress-bar-white-inner" style={{ width: `${levelPct}%` }} />
          </div>
          {levelInfo.nextXp && (
            <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '6px' }}>
              Lv.{levelInfo.level + 1}まで {levelInfo.nextXp - progress.xp} XP
            </div>
          )}
        </div>

        {/* ===== Course Progress ===== */}
        <div style={{ marginBottom: '12px' }}>
          <div className="section-title" style={{ marginBottom: '10px' }}>📚 コース別進捗</div>

          {/* Beginner */}
          <div className="card" style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'rgba(99,102,241,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0,
              }}>📗</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>初級コース</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>AIの基礎を12レッスンで学ぶ</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#6366f1', lineHeight: 1 }}>{beginnerPct}%</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                  {progress.completedLessons.length} / 12
                </div>
              </div>
            </div>
            <div className="progress-bar-outer">
              <div className="progress-bar-inner" style={{ width: `${beginnerPct}%` }} />
            </div>
          </div>

          {/* Advanced */}
          <div className="card" style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'rgba(79,70,229,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0,
              }}>📘</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>中級コース</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>AIを仕事に活かす12レッスン</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#6366f1', lineHeight: 1 }}>{advancedPct}%</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{advancedDone} / 12</div>
              </div>
            </div>
            <div className="progress-bar-outer">
              <div className="progress-bar-inner" style={{ width: `${advancedPct}%` }} />
            </div>
          </div>

          {/* Missions */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'rgba(245,158,11,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0,
              }}>⚡</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>実践ミッション</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>AIを使って実際に体験する</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#6366f1', lineHeight: 1 }}>{missionPct}%</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                  {progress.completedMissions.length} / 6
                </div>
              </div>
            </div>
            <div className="progress-bar-outer">
              <div className="progress-bar-inner" style={{ width: `${missionPct}%` }} />
            </div>
          </div>
        </div>

        {/* ===== Quick Stats ===== */}
        <div className="stat-grid" style={{ marginBottom: '12px' }}>
          <div className="stat-card">
            <div className="stat-number">{progress.xp}</div>
            <div className="stat-label">獲得 XP</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalPct}%</div>
            <div className="stat-label">総合達成率</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {quizStats && quizStats.attempted > 0 ? `${quizStats.accuracy}%` : '—'}
            </div>
            <div className="stat-label">クイズ正答率</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{progress.badges.length}</div>
            <div className="stat-label">バッジ獲得数</div>
          </div>
        </div>

        {/* ===== Total Progress ===== */}
        <div className="card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '14px' }}>🎯 総合進捗</span>
            <span style={{ fontWeight: 900, fontSize: '18px', color: '#6366f1' }}>{totalPct}%</span>
          </div>
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: `${totalPct}%` }} />
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
            {totalCompleted} / 30 コンテンツ完了（初級12・中級12・ミッション6）
          </div>
        </div>

        {/* ===== Quiz Stats (detail) ===== */}
        {quizStats && quizStats.attempted > 0 && (
          <div className="card" style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>🧩 クイズ正答率（詳細）</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
              <div style={{ fontSize: '40px', fontWeight: 900, color: '#6366f1', lineHeight: 1 }}>
                {quizStats.accuracy}%
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.8 }}>
                <div>{quizStats.attempted} 問中 <strong style={{ color: '#10b981' }}>{quizStats.correct} 問</strong> 正解</div>
                <div style={{ color: '#ef4444' }}>{quizStats.attempted - quizStats.correct} 問 不正解</div>
              </div>
            </div>
            <div className="progress-bar-outer">
              <div className="progress-bar-inner" style={{ width: `${quizStats.accuracy}%` }} />
            </div>
          </div>
        )}

        {/* ===== Badges ===== */}
        <div style={{ marginBottom: '16px' }}>
          <div className="section-title">🏅 バッジコレクション</div>
          <div className="card">
            <div className="badge-grid">
              {ALL_BADGES.map((badge) => {
                const earned = progress.badges.includes(badge.id);
                return (
                  <div key={badge.id} className="badge-item">
                    <div className={`badge-circle ${earned ? 'badge-earned' : 'badge-locked'}`}>
                      {badge.emoji}
                    </div>
                    <div className="badge-name" style={{ color: earned ? '#1e293b' : '#94a3b8' }}>
                      {badge.name}
                    </div>
                    {earned && (
                      <span className="tag tag-success" style={{ fontSize: '10px', padding: '2px 6px' }}>獲得済み</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
              {progress.badges.length} / {ALL_BADGES.length} バッジ獲得
            </div>
          </div>
        </div>

        {/* ===== Level Guide ===== */}
        <div style={{ marginBottom: '16px' }}>
          <div className="section-title">🗺️ レベルガイド</div>
          <div className="card">
            {[
              { level: 1, name: 'AI初心者', emoji: '🎮', xp: '0〜' },
              { level: 2, name: 'AI見習い', emoji: '🌱', xp: '150〜' },
              { level: 3, name: 'AIビギナー', emoji: '⭐', xp: '400〜' },
              { level: 4, name: 'AI活用者', emoji: '🚀', xp: '700〜' },
              { level: 5, name: 'AI実践者', emoji: '🏆', xp: '1000〜' },
            ].map((l) => (
              <div key={l.level} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 0', borderBottom: '1px solid #f1f5f9',
                opacity: levelInfo.level >= l.level ? 1 : 0.4,
              }}>
                <span style={{ fontSize: '24px', width: '32px', textAlign: 'center' }}>{l.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Lv.{l.level} {l.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{l.xp} XP</div>
                </div>
                {levelInfo.level >= l.level && (
                  <span style={{ color: '#10b981', fontWeight: 700, fontSize: '14px' }}>✓ 達成</span>
                )}
                {levelInfo.level === l.level && (
                  <span style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>
                    現在
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== Memos ===== */}
        {memoEntries.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div className="section-title">📝 学習メモ一覧</div>
            <div className="card">
              {memoEntries.map(([missionId, memo]) => (
                <div key={missionId} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>
                    ミッション #{missionId}
                  </div>
                  <div style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {memo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Version + Reset ===== */}
        <div className="card" style={{ marginBottom: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.8 }}>
            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>🤖 AIスクール Ver.0.2.0</div>
            <div>更新日：2026/06/22</div>
            <div style={{ marginTop: '8px', fontSize: '12px' }}>AIを基礎の基礎から、使える力へ</div>
          </div>
        </div>

        <button
          className="btn btn-ghost btn-full"
          style={{ color: '#ef4444', borderColor: '#fca5a5' }}
          onClick={handleReset}
        >
          🗑️ データをリセットする
        </button>
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '8px', marginBottom: '8px' }}>
          ※ リセットすると学習記録がすべて削除されます
        </div>

        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
