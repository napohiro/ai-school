import { BADGE_DEFS } from '../hooks/useProgress';
import { ROADMAP_STAGES } from '../data/courses';

const MAIN_BADGE_IDS = [
  'step1_complete', 'step2_complete', 'step3_complete', 'step4_complete',
  'step5_complete', 'practice_complete', 'all_graduate',
];

const MAIN_BADGES = MAIN_BADGE_IDS.map((id) => ({ id, ...BADGE_DEFS[id] })).filter((b) => b.emoji);

const COURSE_CARDS = [
  { key: 'step1', label: 'S1基礎',  icon: '🤖', color: '#3b82f6', colorBg: 'rgba(59,130,246,0.08)', desc: '6レッスン', total: 6 },
  { key: 'step2', label: 'S2実践',  icon: '💼', color: '#10b981', colorBg: 'rgba(16,185,129,0.08)', desc: '6レッスン', total: 6 },
  { key: 'step3', label: 'S3作成',  icon: '🎨', color: '#ec4899', colorBg: 'rgba(236,72,153,0.08)', desc: '6レッスン', total: 6 },
  { key: 'step4', label: 'S4開発',  icon: '💻', color: '#8b5cf6', colorBg: 'rgba(139,92,246,0.08)', desc: '6レッスン', total: 6 },
  { key: 'step5', label: 'S5収益',  icon: '💰', color: '#f59e0b', colorBg: 'rgba(245,158,11,0.08)', desc: '6レッスン', total: 6 },
  { key: 'mission', label: '実践',  icon: '⚡', color: '#f59e0b', colorBg: 'rgba(245,158,11,0.08)', desc: '6ミッション', total: 6 },
];

const TITLE_GUIDE = [
  { displayLevel: 1,  title: 'AI初心者',       emoji: '🎮', xp: '0〜149',    minXp: 0,    nextXp: 150 },
  { displayLevel: 5,  title: 'AI活用者',       emoji: '🌱', xp: '150〜499',  minXp: 150,  nextXp: 500 },
  { displayLevel: 10, title: 'AIクリエイター',  emoji: '✨', xp: '500〜999',  minXp: 500,  nextXp: 1000 },
  { displayLevel: 20, title: 'AIデベロッパー',  emoji: '🚀', xp: '1000〜1499', minXp: 1000, nextXp: 1500 },
  { displayLevel: 30, title: 'AIビジネス実践者', emoji: '💰', xp: '1500〜1999', minXp: 1500, nextXp: 2000 },
  { displayLevel: 40, title: 'AI個人開発者',    emoji: '👑', xp: '2000〜2999', minXp: 2000, nextXp: 3000 },
  { displayLevel: 50, title: 'AIマスター',      emoji: '🏆', xp: '3000〜',    minXp: 3000, nextXp: null },
];

const GRADUATION_SKILLS = ['AI活用', 'プロンプト設計', 'コンテンツ制作', '自動化', 'GitHub', 'Vercel', 'Supabase', 'API', 'AIアプリ開発'];

export default function MyPageScreen({ progress, getLevel, getLevelProgress, getTotalProgress, getTitle, onReset, quizStats, isGraduated, onNavigate }) {
  const levelInfo = getLevel();
  const titleInfo = getTitle ? getTitle() : null;
  const levelPct = getLevelProgress();
  const totalPct = getTotalProgress();
  const graduated = isGraduated ? isGraduated() : false;

  const step1Done  = (progress.completedStep1 || []).length;
  const step2Done  = (progress.completedStep2 || []).length;
  const step3Done  = (progress.completedStep3 || []).length;
  const step4Done  = (progress.completedStep4 || []).length;
  const step5Done  = (progress.completedStep5 || []).length;
  const missionDone = (progress.completedMissions || []).length;

  const doneCounts = {
    step1: step1Done,
    step2: step2Done,
    step3: step3Done,
    step4: step4Done,
    step5: step5Done,
    mission: missionDone,
  };

  const totalCompleted = step1Done + step2Done + step3Done + step4Done + step5Done + missionDone;
  const memoEntries = Object.entries(progress.missionMemos || {}).filter(([, memo]) => memo && memo.trim());

  const currentTitleEntry = TITLE_GUIDE.find((t) => titleInfo && t.displayLevel === titleInfo.displayLevel);
  const nextTitleEntry = currentTitleEntry?.nextXp
    ? TITLE_GUIDE.find((t) => t.minXp === currentTitleEntry.nextXp)
    : null;
  const xpToNextTitle = currentTitleEntry?.nextXp ? currentTitleEntry.nextXp - progress.xp : null;

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

        {/* ===== 卒業証書（修了時のみ） ===== */}
        {graduated && (
          <div style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)',
            borderRadius: '20px', padding: '24px', marginBottom: '16px',
            color: 'white', textAlign: 'center',
            boxShadow: '0 8px 32px rgba(245,158,11,0.3)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎓</div>
            <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.85, letterSpacing: '2px', marginBottom: '4px' }}>CERTIFICATE OF COMPLETION</div>
            <div style={{ fontSize: '22px', fontWeight: 900, marginBottom: '8px' }}>AIスクール 認定証</div>
            <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '16px', lineHeight: 1.6 }}>
              あなたはAIスクールのコアカリキュラムを修了しました。
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '14px', padding: '14px', textAlign: 'left', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '8px', opacity: 0.9 }}>習得スキル</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {GRADUATION_SKILLS.map((s) => (
                  <span key={s} style={{ fontSize: '12px', fontWeight: 700, padding: '3px 8px', background: 'rgba(255,255,255,0.3)', borderRadius: '8px' }}>
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '0.5px' }}>👑 AI個人開発者 認定</div>
          </div>
        )}

        {/* ===== 称号 + Level Card ===== */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '20px', padding: '20px', marginBottom: '16px', color: 'white',
        }}>
          {titleInfo && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.15)', borderRadius: '20px',
              padding: '5px 12px', marginBottom: '14px',
              fontSize: '12px', fontWeight: 700,
            }}>
              <span>{titleInfo.emoji}</span>
              <span>現在の称号 — Lv.{titleInfo.displayLevel} {titleInfo.title}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ fontSize: '48px' }}>{levelInfo.emoji}</div>
            <div>
              <div style={{ fontSize: '13px', opacity: 0.8, fontWeight: 600 }}>ゲームレベル</div>
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

          {/* 次の称号まで */}
          {nextTitleEntry && xpToNextTitle !== null && (
            <div style={{
              marginTop: '12px', paddingTop: '12px',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '11px', opacity: 0.75, marginBottom: '2px' }}>次の称号</div>
                <div style={{ fontSize: '13px', fontWeight: 800 }}>
                  {nextTitleEntry.emoji} {nextTitleEntry.title}（Lv.{nextTitleEntry.displayLevel}）
                </div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.15)', borderRadius: '10px',
                padding: '6px 12px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '16px', fontWeight: 900 }}>{xpToNextTitle}</div>
                <div style={{ fontSize: '10px', opacity: 0.8 }}>XP必要</div>
              </div>
            </div>
          )}
          {!nextTitleEntry && (
            <div style={{
              marginTop: '12px', paddingTop: '12px',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              textAlign: 'center', fontSize: '13px', fontWeight: 800,
            }}>
              🏆 最高称号 AIマスター 達成！
            </div>
          )}
        </div>

        {/* ===== Quick Stats ===== */}
        <div className="stat-grid" style={{ marginBottom: '16px' }}>
          <div className="stat-card">
            <div className="stat-number">{progress.xp}</div>
            <div className="stat-label">獲得 XP</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalPct}%</div>
            <div className="stat-label">コア修了率</div>
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

        {/* ===== 修了証・ポートフォリオ ===== */}
        <div style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            style={{
              padding: '14px', border: 'none', borderRadius: '14px',
              background: graduated
                ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                : 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
              color: graduated ? 'white' : '#94a3b8',
              fontFamily: 'inherit', fontWeight: 800, fontSize: '13px',
              cursor: graduated ? 'pointer' : 'default',
              boxShadow: graduated ? '0 4px 16px rgba(245,158,11,0.3)' : 'none',
            }}
            onClick={() => graduated && onNavigate && onNavigate('home', { type: 'roadmap' })}
          >
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>{graduated ? '🎓' : '🔒'}</div>
            <div>認定証を見る</div>
            {!graduated && <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.7 }}>コア修了で解放</div>}
          </button>

          <div style={{
            padding: '14px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
            border: '1.5px solid rgba(14,165,233,0.2)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🗂️</div>
            <div style={{ fontWeight: 800, fontSize: '13px', color: '#0369a1', marginBottom: '2px' }}>ポートフォリオ</div>
            <div style={{ fontSize: '10px', color: '#0ea5e9' }}>卒業制作で登録</div>
          </div>
        </div>

        {/* ===== 卒業制作ステータス ===== */}
        <div className="card" style={{ marginBottom: '16px', border: '1.5px solid rgba(234,179,8,0.25)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🎓</span>
              <span style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>卒業制作</span>
            </div>
            <span style={{
              fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '8px',
              background: '#f1f5f9', color: '#94a3b8',
            }}>未認定</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
            {[
              { label: '作品名',   value: '未登録', icon: '📛' },
              { label: '公開URL',  value: '未登録', icon: '🌐' },
              { label: 'GitHub',  value: '未登録', icon: '🐙' },
              { label: '制作状況', value: '未提出', icon: '📋' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#f8fafc', borderRadius: '10px', padding: '10px' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, marginBottom: '3px' }}>
                  {item.icon} {item.label}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: 'rgba(234,179,8,0.06)', border: '1px solid rgba(234,179,8,0.2)',
            borderRadius: '10px', padding: '10px',
          }}>
            <div style={{ fontSize: '11px', color: '#92400e', fontWeight: 700, marginBottom: '3px' }}>🏆 卒業判定</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>未認定</div>
          </div>
        </div>

        {/* ===== ロードマップ進捗チェックリスト ===== */}
        <div style={{ marginBottom: '16px' }}>
          <div className="section-title" style={{ marginBottom: '10px' }}>🗺️ ロードマップ進捗</div>
          <div className="card">
            {ROADMAP_STAGES.map((stage, i) => {
              const done = (() => {
                const map = { step1: step1Done, step2: step2Done, step3: step3Done, step4: step4Done, step5: step5Done };
                return map[stage.id] || 0;
              })();
              const total = stage.id === 'step6' ? null : 6;
              const isCore = total !== null;
              const isComplete = isCore && done >= total;
              const isActive = isCore && done > 0 && !isComplete;

              return (
                <div key={stage.id} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 0',
                  borderBottom: i < ROADMAP_STAGES.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: isComplete ? `${stage.color}15` : isActive ? `${stage.color}10` : '#f8fafc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0,
                  }}>
                    {isComplete ? '✅' : stage.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '13px', fontWeight: 700,
                      color: isComplete ? '#1e293b' : isActive ? '#1e293b' : '#94a3b8',
                    }}>
                      {stage.label}
                    </div>
                    {isCore && (
                      <div style={{ marginTop: '4px' }}>
                        <div style={{ height: '4px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', borderRadius: '99px', background: stage.color,
                            width: `${Math.round((done / total) * 100)}%`,
                          }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    {isCore ? (
                      <div style={{
                        fontSize: '12px', fontWeight: 700,
                        color: isComplete ? '#10b981' : isActive ? stage.color : '#cbd5e1',
                      }}>
                        {done}/{total}
                      </div>
                    ) : (
                      <span style={{
                        fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px',
                        background: '#f1f5f9', color: '#94a3b8',
                      }}>🗺️ 公開中</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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

        {/* ===== Total Progress ===== */}
        <div className="card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '14px' }}>🎯 コア修了率</span>
            <span style={{ fontWeight: 900, fontSize: '18px', color: '#6366f1' }}>{totalPct}%</span>
          </div>
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: `${totalPct}%` }} />
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
            {totalCompleted} / 42 コンテンツ完了（基礎12・活用12・開発12・実践6）
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

        {/* ===== バッジコレクション（7種） ===== */}
        <div style={{ marginBottom: '16px' }}>
          <div className="section-title">🏅 バッジコレクション</div>
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
                    {earned && (
                      <span className="tag tag-success" style={{ fontSize: '10px', padding: '2px 6px' }}>獲得済み</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
              {MAIN_BADGE_IDS.filter((id) => progress.badges.includes(id)).length} / {MAIN_BADGES.length} バッジ獲得
            </div>
          </div>
        </div>

        {/* ===== 称号ガイド（7段階） ===== */}
        <div style={{ marginBottom: '16px' }}>
          <div className="section-title">🏆 称号ガイド</div>
          <div className="card">
            {TITLE_GUIDE.map((t) => {
              const isCurrent = titleInfo && titleInfo.displayLevel === t.displayLevel;
              const isUnlocked = titleInfo && titleInfo.displayLevel >= t.displayLevel;
              return (
                <div key={t.displayLevel} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 0', borderBottom: '1px solid #f1f5f9',
                  opacity: isUnlocked ? 1 : 0.4,
                }}>
                  <span style={{ fontSize: '24px', width: '32px', textAlign: 'center' }}>{t.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>Lv.{t.displayLevel} {t.title}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{t.xp} XP</div>
                  </div>
                  {isCurrent && (
                    <span style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px' }}>
                      現在
                    </span>
                  )}
                  {!isCurrent && isUnlocked && (
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '14px' }}>✓ 達成</span>
                  )}
                </div>
              );
            })}
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
            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>🤖 AIスクール Ver.0.5.0</div>
            <div>更新日：2026/06/27</div>
            <div style={{ marginTop: '8px', fontSize: '12px' }}>AIを武器に人生・仕事・ビジネスを変えるスクール</div>
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
