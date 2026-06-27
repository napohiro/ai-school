import { BADGE_DEFS } from '../hooks/useProgress';

const MAIN_BADGE_IDS = [
  'step1_complete', 'step2_complete', 'step3_complete', 'step4_complete',
  'step5_complete', 'practice_complete', 'all_graduate',
];
const MAIN_BADGES = MAIN_BADGE_IDS.map((id) => ({ id, ...BADGE_DEFS[id] })).filter((b) => b.emoji);

const STEPS = [
  { key: 'completedStep1', label: 'STEP 1  AI基礎',    color: '#3b82f6' },
  { key: 'completedStep2', label: 'STEP 2  AI実践',    color: '#10b981' },
  { key: 'completedStep3', label: 'STEP 3  クリエイト', color: '#ec4899' },
  { key: 'completedStep4', label: 'STEP 4  AI開発',    color: '#8b5cf6' },
  { key: 'completedStep5', label: 'STEP 5  収益化',    color: '#f59e0b' },
];

const TITLE_GUIDE = [
  { displayLevel: 1,  title: 'AI初心者',       emoji: '🎮', minXp: 0,    nextXp: 150 },
  { displayLevel: 5,  title: 'AI活用者',       emoji: '🌱', minXp: 150,  nextXp: 500 },
  { displayLevel: 10, title: 'AIクリエイター',  emoji: '✨', minXp: 500,  nextXp: 1000 },
  { displayLevel: 20, title: 'AIデベロッパー',  emoji: '🚀', minXp: 1000, nextXp: 1500 },
  { displayLevel: 30, title: 'AIビジネス実践者', emoji: '💰', minXp: 1500, nextXp: 2000 },
  { displayLevel: 40, title: 'AI個人開発者',    emoji: '👑', minXp: 2000, nextXp: 3000 },
  { displayLevel: 50, title: 'AIマスター',      emoji: '🏆', minXp: 3000, nextXp: null },
];

export default function MyPageScreen({
  progress, getLevel, getLevelProgress, getTitle,
  onReset, isGraduated, onNavigate,
  // unused but kept for prop compatibility:
  getTotalProgress, quizStats,
}) {
  const levelInfo = getLevel();
  const titleInfo = getTitle ? getTitle() : null;
  const levelPct = getLevelProgress();
  const graduated = isGraduated ? isGraduated() : false;

  const stepsDone = STEPS.map((s) => (progress[s.key] || []).length);

  const currentTitle = TITLE_GUIDE.find((t) => titleInfo && t.displayLevel === titleInfo.displayLevel);
  const nextTitle = currentTitle?.nextXp
    ? TITLE_GUIDE.find((t) => t.minXp === currentTitle.nextXp)
    : null;
  const xpToNext = currentTitle?.nextXp ? currentTitle.nextXp - progress.xp : null;

  const memoEntries = Object.entries(progress.missionMemos || {}).filter(([, m]) => m && m.trim());

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
          <p>学習の記録と進捗</p>
        </div>
      </div>

      <div style={{ padding: '16px' }}>

        {/* ── 卒業証書（修了時のみ） ── */}
        {graduated && (
          <div style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
            borderRadius: '20px', padding: '20px', marginBottom: '14px',
            color: 'white', textAlign: 'center',
          }}>
            <div style={{ fontSize: '36px', marginBottom: '6px' }}>🎓</div>
            <div style={{ fontSize: '10px', fontWeight: 700, opacity: 0.85, letterSpacing: '2px', marginBottom: '4px' }}>
              CERTIFICATE OF COMPLETION
            </div>
            <div style={{ fontSize: '18px', fontWeight: 900 }}>AIスクール 認定証</div>
            <div style={{ fontSize: '13px', opacity: 0.85, marginTop: '4px' }}>AI個人開発者 認定</div>
          </div>
        )}

        {/* ── レベルカード ── */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '20px', padding: '20px', marginBottom: '14px', color: 'white',
        }}>
          {titleInfo && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.15)', borderRadius: '20px',
              padding: '5px 12px', marginBottom: '14px',
              fontSize: '12px', fontWeight: 700,
            }}>
              {titleInfo.emoji} Lv.{titleInfo.displayLevel} {titleInfo.title}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <div style={{ fontSize: '48px', lineHeight: 1 }}>{levelInfo.emoji}</div>
            <div>
              <div style={{ fontSize: '12px', opacity: 0.75, fontWeight: 600 }}>現在のレベル</div>
              <div style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px' }}>
                Lv.{levelInfo.level}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, opacity: 0.9 }}>✨ {progress.xp} XP</div>
            </div>
          </div>

          <div style={{ fontSize: '11px', opacity: 0.7, display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>レベル進捗</span>
            <span>{levelPct}%</span>
          </div>
          <div className="progress-bar-white">
            <div className="progress-bar-white-inner" style={{ width: `${levelPct}%` }} />
          </div>
          {levelInfo.nextXp && (
            <div style={{ fontSize: '11px', opacity: 0.65, marginTop: '5px' }}>
              次のLvまで {levelInfo.nextXp - progress.xp} XP
            </div>
          )}

          {nextTitle && xpToNext !== null && (
            <div style={{
              marginTop: '14px', paddingTop: '14px',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '2px' }}>次の称号</div>
                <div style={{ fontSize: '13px', fontWeight: 800 }}>
                  {nextTitle.emoji} {nextTitle.title}
                </div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.15)', borderRadius: '10px',
                padding: '7px 14px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '16px', fontWeight: 900 }}>{xpToNext}</div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>XP必要</div>
              </div>
            </div>
          )}
          {!nextTitle && (
            <div style={{
              marginTop: '14px', paddingTop: '14px',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              textAlign: 'center', fontSize: '13px', fontWeight: 800,
            }}>
              🏆 最高称号 AIマスター 達成！
            </div>
          )}
        </div>

        {/* ── STEP進捗 ── */}
        <div className="card" style={{ marginBottom: '14px' }}>
          <div style={{ fontWeight: 800, fontSize: '13px', color: '#94a3b8', letterSpacing: '1px', marginBottom: '14px', textTransform: 'uppercase' }}>
            STEP進捗
          </div>
          {STEPS.map((s, i) => {
            const done = stepsDone[i];
            const pct = Math.round((done / 6) * 100);
            const complete = done >= 6;
            return (
              <div key={s.key} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                paddingBottom: i < STEPS.length - 1 ? '12px' : 0,
                marginBottom: i < STEPS.length - 1 ? '12px' : 0,
                borderBottom: i < STEPS.length - 1 ? '1px solid #f8fafc' : 'none',
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '7px', flexShrink: 0,
                  background: complete ? '#10b981' : s.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 900, color: 'white',
                }}>
                  {complete ? '✓' : i + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '13px', fontWeight: 700, marginBottom: '5px',
                    color: complete ? '#94a3b8' : '#1e293b',
                    textDecoration: complete ? 'line-through' : 'none',
                  }}>
                    {s.label}
                  </div>
                  <div style={{ height: '4px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '99px', background: s.color,
                      width: `${pct}%`, transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
                <div style={{
                  fontSize: '12px', fontWeight: 700, flexShrink: 0,
                  color: complete ? '#10b981' : s.color,
                }}>
                  {done}/6
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 卒業制作 ── */}
        <div className="card" style={{
          marginBottom: '14px',
          border: graduated ? '1.5px solid rgba(234,179,8,0.35)' : '1px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
              background: graduated ? 'rgba(234,179,8,0.1)' : '#f8fafc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px',
            }}>
              {graduated ? '🎓' : '🔒'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>卒業制作</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                {graduated ? 'STEP1〜5修了 · AI個人開発者認定済み' : 'STEP1〜5修了で解放'}
              </div>
            </div>
            <button
              style={{
                background: graduated ? '#eab308' : '#f1f5f9',
                color: graduated ? 'white' : '#94a3b8',
                border: 'none', borderRadius: '10px', padding: '8px 14px',
                fontFamily: 'inherit', fontWeight: 700, fontSize: '12px',
                cursor: graduated ? 'pointer' : 'default',
              }}
              onClick={() => graduated && onNavigate && onNavigate('home', { type: 'roadmap' })}
            >
              {graduated ? '認定証 ›' : '未解放'}
            </button>
          </div>
        </div>

        {/* ── バッジ ── */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{
            fontSize: '13px', fontWeight: 800, color: '#94a3b8',
            letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            バッジ
          </div>
          <div className="card">
            <div className="badge-grid">
              {MAIN_BADGES.map((badge) => {
                const earned = progress.badges.includes(badge.id);
                return (
                  <div key={badge.id} className="badge-item">
                    <div className={`badge-circle ${earned ? 'badge-earned' : 'badge-locked'}`}>
                      {badge.emoji}
                    </div>
                    <div className="badge-name" style={{ color: earned ? '#1e293b' : '#94a3b8' }}>
                      {badge.name}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '14px' }}>
              {MAIN_BADGE_IDS.filter((id) => progress.badges.includes(id)).length} / {MAIN_BADGES.length} 獲得
            </div>
          </div>
        </div>

        {/* ── ミッションメモ ── */}
        {memoEntries.length > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <div style={{
              fontSize: '13px', fontWeight: 800, color: '#94a3b8',
              letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px',
            }}>
              ミッションメモ
            </div>
            <div className="card">
              {memoEntries.map(([missionId, memo]) => (
                <div key={missionId} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, marginBottom: '4px' }}>
                    ミッション #{missionId}
                  </div>
                  <div style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                    {memo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── フッター ── */}
        <div className="card" style={{ marginBottom: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8 }}>
            <div style={{ fontWeight: 700, color: '#64748b', marginBottom: '2px' }}>🤖 AIスクール Ver.0.5.0</div>
            <div>AIを武器に人生・仕事・ビジネスを変えるスクール</div>
          </div>
        </div>

        <button
          className="btn btn-ghost btn-full"
          style={{ color: '#ef4444', borderColor: '#fca5a5' }}
          onClick={handleReset}
        >
          🗑️ データをリセット
        </button>
        <div style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>
          ※ リセットすると学習記録がすべて削除されます
        </div>

        <div style={{ height: '20px' }} />
      </div>
    </div>
  );
}
