import { BADGE_DEFS } from '../hooks/useProgress';

const ALL_BADGES = Object.entries(BADGE_DEFS).map(([id, def]) => ({ id, ...def }));

const COURSE_CARDS = [
  { key: 'beginner', label: '初級コース', icon: '📗', color: '#3b82f6', colorBg: 'rgba(59,130,246,0.08)', desc: 'AIの基礎を12レッスンで学ぶ', total: 12 },
  { key: 'advanced', label: '中級コース', icon: '📘', color: '#10b981', colorBg: 'rgba(16,185,129,0.08)', desc: 'AIを仕事に活かす12レッスン', total: 12 },
  { key: 'expert',   label: '上級コース', icon: '📙', color: '#8b5cf6', colorBg: 'rgba(139,92,246,0.08)', desc: 'AIでアプリを作る12レッスン',  total: 12 },
  { key: 'mission',  label: '実践ミッション', icon: '⚡', color: '#f59e0b', colorBg: 'rgba(245,158,11,0.08)', desc: 'AIを使って実際に作る',    total: 6 },
];

export default function MyPageScreen({ progress, getLevel, getLevelProgress, getTotalProgress, onReset, quizStats, isGraduated }) {
  const levelInfo = getLevel();
  const levelPct = getLevelProgress();
  const totalPct = getTotalProgress();
  const graduated = isGraduated ? isGraduated() : false;

  const expertDone = (progress.completedExpertLessons || []).length;
  const advancedDone = (progress.completedAdvancedLessons || []).length;
  const missionDone = progress.completedMissions.length;
  const beginnerDone = progress.completedLessons.length;

  const doneCounts = {
    beginner: beginnerDone,
    advanced: advancedDone,
    expert:   expertDone,
    mission:  missionDone,
  };

  const totalCompleted = beginnerDone + advancedDone + expertDone + missionDone;
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

        {/* ===== 卒業証書 ===== */}
        {graduated && (
          <div style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '16px',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(245,158,11,0.3)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎓</div>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.85, letterSpacing: '2px', marginBottom: '4px' }}>CERTIFICATE OF COMPLETION</div>
            <div style={{ fontSize: '22px', fontWeight: 900, marginBottom: '8px' }}>AIスクール 卒業証</div>
            <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '16px', lineHeight: 1.6 }}>
              あなたはAIスクールの全カリキュラムを修了しました。
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '14px', padding: '14px', textAlign: 'left', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', opacity: 0.9 }}>習得スキル</div>
              {['✓ AI基礎・活用', '✓ プロンプト設計', '✓ コンテンツ制作', '✓ AI自動化', '✓ GitHub・Vercel', '✓ AIアプリ開発'].map((s) => (
                <div key={s} style={{ fontSize: '13px', fontWeight: 700, marginBottom: '3px' }}>{s}</div>
              ))}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '0.5px' }}>👑 AI個人開発者 認定</div>
          </div>
        )}

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
          {COURSE_CARDS.map((c) => {
            const done = doneCounts[c.key];
            const pct = Math.round((done / c.total) * 100);
            return (
              <div key={c.key} className="card" style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: c.colorBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', flexShrink: 0,
                  }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b' }}>{c.label}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{c.desc}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: c.color, lineHeight: 1 }}>{pct}%</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{done} / {c.total}</div>
                  </div>
                </div>
                <div style={{ height: '6px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: '99px', background: c.color, width: `${pct}%`, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            );
          })}
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
            {totalCompleted} / 42 コンテンツ完了（初級12・中級12・上級12・ミッション6）
          </div>
        </div>

        {/* ===== Quiz Stats ===== */}
        {quizStats && quizStats.attempted > 0 && (
          <div className="card" style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>🧩 クイズ正答率</div>
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
              { level: 1, name: 'AI初心者',    emoji: '🎮', xp: '0〜149' },
              { level: 2, name: 'AI見習い',    emoji: '🌱', xp: '150〜399' },
              { level: 3, name: 'AIビギナー',  emoji: '⭐', xp: '400〜699' },
              { level: 4, name: 'AI活用者',    emoji: '🚀', xp: '700〜999' },
              { level: 5, name: 'AI実践者',    emoji: '🏆', xp: '1000〜1499' },
              { level: 6, name: 'AIクリエイター', emoji: '🎨', xp: '1500〜1999' },
              { level: 7, name: 'AI個人開発者', emoji: '👑', xp: '2000〜' },
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
                {levelInfo.level > l.level && (
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
            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>🤖 AIスクール Ver.0.3.0</div>
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
