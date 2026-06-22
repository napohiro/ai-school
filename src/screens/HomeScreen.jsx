export default function HomeScreen({
  progress,
  getLevel,
  getLevelProgress,
  getTotalProgress,
  getNextLesson,
  lessons,
  lessonsAdvanced,
  missions,
  onNavigate,
}) {
  const levelInfo = getLevel();
  const levelPct = getLevelProgress();
  const totalPct = getTotalProgress();

  const nextLesson = getNextLesson(lessons);
  const completedAdvanced = progress.completedAdvancedLessons || [];
  const nextAdvancedLesson = (lessonsAdvanced || []).find((l) => !completedAdvanced.includes(l.id));
  const nextMission = missions.find((m) => !progress.completedMissions.includes(m.id));

  const advancedDone = completedAdvanced.length;
  const completedCount =
    progress.completedLessons.length + progress.completedMissions.length + advancedDone;

  const beginnerPct = Math.round((progress.completedLessons.length / 12) * 100);
  const advancedPct = Math.round((advancedDone / 12) * 100);

  // Determine primary "next action"
  const primaryLesson = nextLesson || nextAdvancedLesson;
  const primaryCourse = nextLesson
    ? { name: '初級コース', icon: '📗', pct: beginnerPct, done: progress.completedLessons.length, type: 'lesson' }
    : nextAdvancedLesson
    ? { name: '中級コース', icon: '📘', pct: advancedPct, done: advancedDone, type: 'advancedLesson' }
    : null;

  return (
    <div>
      {/* Hero */}
      <div className="home-hero">
        <div className="home-hero-content">
          <h1>🤖 AIスクール</h1>
          <p>AIを基礎の基礎から、使える力へ</p>

          <div className="progress-card">
            <div className="level-badge">
              <span>{levelInfo.emoji}</span>
              <span>Lv.{levelInfo.level} {levelInfo.name}</span>
            </div>
            <div className="xp-counter">✨ {progress.xp} XP 獲得中</div>
            <div className="progress-label">
              <span>レベル進捗</span>
              <span>{levelPct}%</span>
            </div>
            <div className="progress-bar-white">
              <div className="progress-bar-white-inner" style={{ width: `${levelPct}%` }} />
            </div>
            {levelInfo.nextXp && (
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '6px' }}>
                次のレベルまで {levelInfo.nextXp - progress.xp} XP
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== 次にやること ===== */}
      <div className="section" style={{ paddingTop: '20px' }}>
        <div className="section-title">🎯 次にやること</div>

        {primaryLesson && primaryCourse ? (
          <div className="card" style={{
            border: '1.5px solid rgba(99,102,241,0.2)',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.04) 0%, white 60%)',
          }}>
            {/* Course badge + progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{
                background: 'rgba(99,102,241,0.12)', color: '#4338ca',
                padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
              }}>
                {primaryCourse.icon} {primaryCourse.name}
              </span>
              <span style={{
                background: '#f1f5f9', color: '#64748b',
                padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
              }}>
                {primaryCourse.done} / 12
              </span>
              <span style={{ marginLeft: 'auto', fontWeight: 800, color: '#6366f1', fontSize: '14px' }}>
                {primaryCourse.pct}%
              </span>
            </div>

            {/* Lesson info */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '36px', lineHeight: 1 }}>{primaryLesson.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '3px', color: '#1e293b' }}>
                  {primaryLesson.title}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                  {primaryLesson.description}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '14px' }}>
              <div className="progress-bar-outer">
                <div className="progress-bar-inner" style={{ width: `${primaryCourse.pct}%` }} />
              </div>
            </div>

            {/* CTA */}
            <button
              className="btn btn-primary btn-full btn-lg"
              onClick={() => onNavigate('learning', { type: primaryCourse.type, id: primaryLesson.id })}
            >
              ▶ 学習を続ける
            </button>
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
            <div style={{ fontWeight: 800, fontSize: '16px', color: '#10b981', marginBottom: '6px' }}>
              全レッスン完了！おめでとう！
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              ミッションにも挑戦してみましょう
            </div>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="section" style={{ paddingTop: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
          {[
            { label: '初級', value: progress.completedLessons.length, max: 12, icon: '📗' },
            { label: '中級', value: advancedDone, max: 12, icon: '📘' },
            { label: 'ミッション', value: progress.completedMissions.length, max: 6, icon: '⚡' },
            { label: 'バッジ', value: progress.badges.length, max: 4, icon: '🏅' },
          ].map((item) => (
            <div key={item.label} className="card" style={{ textAlign: 'center', padding: '10px 4px' }}>
              <div style={{ fontSize: '18px', marginBottom: '3px' }}>{item.icon}</div>
              <div style={{
                fontSize: '18px', fontWeight: 900,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {item.value}
              </div>
              <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600, marginTop: '1px' }}>
                / {item.max} {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Progress */}
      <div className="section" style={{ paddingTop: '12px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>📊 総合達成率</span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#6366f1' }}>{totalPct}%</span>
          </div>
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: `${totalPct}%` }} />
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
            {completedCount} / 30 コンテンツ完了（レッスン24本 + ミッション6本）
          </div>
        </div>
      </div>

      {/* Today's Mission */}
      {nextMission && (
        <div className="section" style={{ paddingTop: '20px' }}>
          <div className="section-title">⚡ 今日の実践ミッション</div>
          <div
            className="card card-hover"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(139,92,246,0.05) 100%)', border: '1.5px solid rgba(99,102,241,0.2)' }}
            onClick={() => onNavigate('practice', { type: 'mission', id: nextMission.id })}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ fontSize: '36px' }}>{nextMission.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{nextMission.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>{nextMission.description}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="tag tag-purple">{nextMission.difficulty}</span>
                  <span className="tag tag-gray">🕐 {nextMission.duration}</span>
                  <span className="tag tag-warning">+100 XP</span>
                </div>
              </div>
              <span style={{ color: '#6366f1', fontSize: '18px', flexShrink: 0 }}>›</span>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Course Card */}
      {(nextAdvancedLesson || advancedDone > 0) && (
        <div className="section" style={{ paddingTop: '20px' }}>
          <div className="section-title">📘 中級コース — AIを仕事に使う</div>
          <div
            className="card card-hover"
            style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.06) 0%, rgba(139,92,246,0.06) 100%)',
              border: '1.5px solid rgba(99,102,241,0.25)',
            }}
            onClick={() => onNavigate('learning', { type: 'advancedTab' })}
          >
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ fontSize: '36px', lineHeight: 1 }}>📘</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '4px', color: '#1e293b' }}>
                  AIを「使える」状態にステップアップ
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', lineHeight: 1.5 }}>
                  プロンプト技術・文章作成・リサーチ・開発設計など
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {advancedDone > 0 ? (
                    <span style={{ background: 'rgba(16,185,129,0.1)', color: '#065f46', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                      ✅ {advancedDone} / 12 完了中
                    </span>
                  ) : progress.completedLessons.length >= 6 ? (
                    <span style={{ background: 'rgba(99,102,241,0.12)', color: '#4338ca', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                      ✨ 始める準備ができています！
                    </span>
                  ) : (
                    <span style={{ background: 'rgba(245,158,11,0.1)', color: '#92400e', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                      💡 初級を終えたらおすすめ
                    </span>
                  )}
                  <span style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                    +600 XP
                  </span>
                </div>
              </div>
              <span style={{ color: '#6366f1', fontSize: '20px', flexShrink: 0 }}>›</span>
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="section" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div style={{ fontSize: '20px', marginBottom: '8px' }}>💡</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
            AIスクールの使い方
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7 }}>
            ① 学習タブでレッスンを読む → ② 実践でミッションに挑戦 → ③ ツールでAIを探す。この流れで学習すると効果的です！
          </div>
        </div>
      </div>
    </div>
  );
}
