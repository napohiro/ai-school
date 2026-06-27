import { BADGE_DEFS } from '../hooks/useProgress';

const MAIN_BADGE_IDS = [
  'step1_complete', 'step2_complete', 'step3_complete', 'step4_complete',
  'step5_complete', 'practice_complete', 'all_graduate',
];
const MAIN_BADGES = MAIN_BADGE_IDS.map((id) => ({ id, ...BADGE_DEFS[id] })).filter((b) => b.emoji);

const STEPS = [
  { key: 'completedStep1', label: 'STEP 1  AI基礎',       color: '#3b82f6' },
  { key: 'completedStep2', label: 'STEP 2  AI実践',       color: '#10b981' },
  { key: 'completedStep3', label: 'STEP 3  AIクリエイト',  color: '#ec4899' },
  { key: 'completedStep4', label: 'STEP 4  AI開発',       color: '#8b5cf6' },
  { key: 'completedStep5', label: 'STEP 5  AI収益化',     color: '#f59e0b' },
];

const TITLE_GUIDE = [
  { displayLevel: 1,  title: 'AI初心者',        minXp: 0,    nextXp: 150 },
  { displayLevel: 5,  title: 'AI活用者',        minXp: 150,  nextXp: 500 },
  { displayLevel: 10, title: 'AIクリエイター',   minXp: 500,  nextXp: 1000 },
  { displayLevel: 20, title: 'AIデベロッパー',   minXp: 1000, nextXp: 1500 },
  { displayLevel: 30, title: 'AIビジネス実践者', minXp: 1500, nextXp: 2000 },
  { displayLevel: 40, title: 'AI個人開発者',    minXp: 2000, nextXp: 3000 },
  { displayLevel: 50, title: 'AIマスター',       minXp: 3000, nextXp: null },
];

const SectionHeading = ({ children }) => (
  <div style={{
    fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)',
    letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px',
  }}>
    {children}
  </div>
);

export default function MyPageScreen({
  progress, getLevel, getLevelProgress, getTitle,
  onReset, isGraduated, onNavigate,
  getTotalProgress, quizStats,
}) {
  const levelInfo  = getLevel();
  const titleInfo  = getTitle ? getTitle() : null;
  const levelPct   = getLevelProgress();
  const graduated  = isGraduated ? isGraduated() : false;

  const stepsDone = STEPS.map((s) => (progress[s.key] || []).length);

  const currentTitle = TITLE_GUIDE.find((t) => titleInfo && t.displayLevel === titleInfo.displayLevel);
  const nextTitle    = currentTitle?.nextXp
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
      {/* Header */}
      <div style={{ background: 'var(--navy)', padding: '20px 20px 24px' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: 700 }}>マイページ</h1>
        <p style={{ color: 'rgba(255,255,255,0.38)', margin: '4px 0 0', fontSize: '13px', fontWeight: 400 }}>
          学習の記録と進捗
        </p>
      </div>

      <div style={{ padding: '16px' }}>

        {/* ── 卒業証書（修了時のみ） ── */}
        {graduated && (
          <div style={{
            background: '#78350f', borderRadius: '12px', padding: '18px',
            marginBottom: '12px', color: 'white', textAlign: 'center',
          }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
              CERTIFICATE OF COMPLETION
            </div>
            <div style={{ fontSize: '17px', fontWeight: 700 }}>AIスクール 認定証</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '3px', fontWeight: 400 }}>
              AI個人開発者 認定
            </div>
          </div>
        )}

        {/* ── レベルカード ── */}
        <div style={{
          background: 'var(--navy)', borderRadius: '12px',
          padding: '20px', marginBottom: '12px', color: 'white',
          boxShadow: '0 2px 8px rgba(15,23,42,0.15)',
        }}>
          {/* Level + XP row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div>
              <div style={{
                fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)',
                letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px',
              }}>
                CURRENT LEVEL
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '42px', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-1px' }}>
                  {levelInfo.level}
                </span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>
                  Lv
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)',
                letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px',
              }}>
                XP
              </div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'white', lineHeight: 1 }}>
                {progress.xp.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Title */}
          {titleInfo && (
            <div style={{
              fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 500,
              marginBottom: '14px',
            }}>
              {titleInfo.title}
            </div>
          )}

          {/* Progress bar */}
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: 'rgba(255,255,255,0.55)',
              borderRadius: '99px', width: `${levelPct}%`,
              transition: 'width 0.5s ease',
            }} />
          </div>
          {levelInfo.nextXp && (
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '5px', fontWeight: 400 }}>
              次のレベルまで {levelInfo.nextXp - progress.xp} XP
            </div>
          )}

          {/* Next title */}
          {nextTitle && xpToNext !== null && (
            <div style={{
              marginTop: '14px', paddingTop: '14px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: '3px' }}>
                  次の称号
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                  {nextTitle.title}
                </div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.07)', borderRadius: '8px',
                padding: '6px 12px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>{xpToNext}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>XP必要</div>
              </div>
            </div>
          )}
          {!nextTitle && (
            <div style={{
              marginTop: '14px', paddingTop: '14px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center', fontSize: '12px', fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
            }}>
              最高称号 AIマスター 達成
            </div>
          )}
        </div>

        {/* ── STEP進捗 ── */}
        <div style={{ marginBottom: '12px' }}>
          <SectionHeading>STEP進捗</SectionHeading>
          <div className="card">
            {STEPS.map((s, i) => {
              const done     = stepsDone[i];
              const pct      = Math.round((done / 6) * 100);
              const complete = done >= 6;
              return (
                <div key={s.key} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  paddingBottom: i < STEPS.length - 1 ? '12px' : 0,
                  marginBottom: i < STEPS.length - 1 ? '12px' : 0,
                  borderBottom: i < STEPS.length - 1 ? '1px solid var(--border-light)' : 'none',
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '6px', flexShrink: 0,
                    background: complete ? 'var(--success)' : s.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 700, color: 'white',
                  }}>
                    {complete ? '✓' : i + 1}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '13px', fontWeight: 500, marginBottom: '5px',
                      color: complete ? 'var(--text-muted)' : 'var(--text)',
                      textDecoration: complete ? 'line-through' : 'none',
                    }}>
                      {s.label}
                    </div>
                    <div style={{ height: '3px', borderRadius: '99px', background: 'var(--border)', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '99px',
                        background: complete ? 'var(--success)' : s.color,
                        width: `${pct}%`, transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                  <div style={{
                    fontSize: '12px', fontWeight: 600, flexShrink: 0,
                    color: complete ? 'var(--success)' : 'var(--text-muted)',
                  }}>
                    {done}/6
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 卒業制作 ── */}
        <div style={{ marginBottom: '12px' }}>
          <SectionHeading>卒業制作</SectionHeading>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                background: graduated ? 'rgba(120,53,15,0.1)' : 'var(--raised)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px',
              }}>
                {graduated ? '🎓' : '🔒'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>
                  AIスクール認定
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400 }}>
                  {graduated ? 'STEP 1〜5修了 · AI個人開発者認定済み' : 'STEP 1〜5修了で解放'}
                </div>
              </div>
              <div style={{
                fontSize: '11px', fontWeight: 600,
                color: graduated ? 'var(--warning)' : 'var(--text-muted)',
                background: graduated ? 'var(--warning-bg)' : 'var(--raised)',
                padding: '5px 10px', borderRadius: '6px',
              }}>
                {graduated ? '取得済み' : '未解放'}
              </div>
            </div>
          </div>
        </div>

        {/* ── バッジ ── */}
        <div style={{ marginBottom: '12px' }}>
          <SectionHeading>バッジ</SectionHeading>
          <div className="card">
            <div className="badge-grid">
              {MAIN_BADGES.map((badge) => {
                const earned = progress.badges.includes(badge.id);
                return (
                  <div key={badge.id} className="badge-item">
                    <div className={`badge-circle ${earned ? 'badge-earned' : 'badge-locked'}`}>
                      {badge.emoji}
                    </div>
                    <div className="badge-name" style={{ color: earned ? 'var(--text)' : 'var(--text-muted)' }}>
                      {badge.name}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '14px', fontWeight: 400 }}>
              {MAIN_BADGE_IDS.filter((id) => progress.badges.includes(id)).length} / {MAIN_BADGES.length} 獲得
            </div>
          </div>
        </div>

        {/* ── ミッションメモ ── */}
        {memoEntries.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <SectionHeading>ミッションメモ</SectionHeading>
            <div className="card">
              {memoEntries.map(([missionId, memo]) => (
                <div key={missionId} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.5px' }}>
                    ミッション #{missionId}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.7, whiteSpace: 'pre-line', fontWeight: 400 }}>
                    {memo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── フッター ── */}
        <div className="card" style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
            AIスクール Ver.1.0.0
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.9, fontWeight: 400 }}>
            <div>更新日：2026/06/27</div>
            <div style={{ marginTop: '6px', color: 'var(--text-secondary)' }}>
              6STEP構成（AI基礎・AI実践・AIクリエイト・AI開発・AI収益化・卒業制作）でAIを実践的に習得できる学習アプリ。
            </div>
          </div>
        </div>

        <button
          className="btn btn-ghost btn-full"
          style={{ color: 'var(--error)', borderColor: '#fca5a5', fontWeight: 500 }}
          onClick={handleReset}
        >
          データをリセット
        </button>
        <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px', fontWeight: 400 }}>
          ※ リセットすると学習記録がすべて削除されます
        </div>

        <div style={{ height: '20px' }} />
      </div>
    </div>
  );
}
