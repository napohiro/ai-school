import { COURSES, ROADMAP_STAGES } from '../data/courses';
import { SPECIAL_LECTURES } from '../data/specialLectures';

const FEATURED_LECTURES = SPECIAL_LECTURES.slice(0, 3);

function getDoneCount(courseId, progress) {
  switch (courseId) {
    case 'beginner':  return progress.completedLessons.length;
    case 'advanced':  return (progress.completedAdvancedLessons || []).length;
    case 'expert':    return (progress.completedExpertLessons || []).length;
    case 'practice':  return progress.completedMissions.length;
    default:          return 0;
  }
}

function getCourseTotal(courseId) {
  switch (courseId) {
    case 'beginner': case 'advanced': case 'expert': return 12;
    case 'practice':  return 6;
    default:          return 0;
  }
}

function getRoadmapStatus(courseId, progress) {
  if (['monetization', 'graduation'].includes(courseId)) return 'future';
  const done = getDoneCount(courseId, progress);
  const total = getCourseTotal(courseId);
  if (done >= total) return 'completed';
  if (done > 0) return 'active';
  return 'notstarted';
}

export default function HomeScreen({
  progress,
  getLevel,
  getLevelProgress,
  getTotalProgress,
  getNextLesson,
  getTitle,
  lessons,
  lessonsAdvanced,
  lessonsExpert,
  missions,
  onNavigate,
}) {
  const levelInfo = getLevel();
  const titleInfo = getTitle ? getTitle() : null;
  const levelPct = getLevelProgress();
  const totalPct = getTotalProgress();

  const completedAdvanced = progress.completedAdvancedLessons || [];
  const completedExpert = progress.completedExpertLessons || [];

  const nextLesson = getNextLesson(lessons);
  const nextAdvancedLesson = (lessonsAdvanced || []).find((l) => !completedAdvanced.includes(l.id));
  const nextExpertLesson = (lessonsExpert || []).find((l) => !completedExpert.includes(l.id));
  const nextMission = missions.find((m) => !progress.completedMissions.includes(m.id));

  const beginnerDone = progress.completedLessons.length;
  const advancedDone = completedAdvanced.length;
  const expertDone = completedExpert.length;
  const missionDone = progress.completedMissions.length;

  const beginnerPct = Math.round((beginnerDone / 12) * 100);
  const advancedPct = Math.round((advancedDone / 12) * 100);
  const expertPct = Math.round((expertDone / 12) * 100);
  const missionPct = Math.round((missionDone / 6) * 100);

  const completedCount = beginnerDone + advancedDone + expertDone + missionDone;

  const currentCourse =
    beginnerDone < 12 ? 'beginner' :
    advancedDone < 12 ? 'advanced' :
    expertDone < 12   ? 'expert' : 'practice';

  const primaryLesson = nextLesson || nextAdvancedLesson || nextExpertLesson;
  const primaryCourse = nextLesson
    ? { name: '基礎', icon: '📗', color: '#3b82f6', pct: beginnerPct, done: beginnerDone, type: 'lesson', tabType: 'beginner', max: 12 }
    : nextAdvancedLesson
    ? { name: '活用', icon: '📘', color: '#10b981', pct: advancedPct, done: advancedDone, type: 'advancedLesson', tabType: 'advanced', max: 12 }
    : nextExpertLesson
    ? { name: '開発', icon: '📙', color: '#8b5cf6', pct: expertPct, done: expertDone, type: 'expertLesson', tabType: 'expert', max: 12 }
    : null;

  const stageIdx = ROADMAP_STAGES.findIndex((s) => s.id === currentCourse);
  const currentStage = ROADMAP_STAGES[stageIdx] || ROADMAP_STAGES[0];
  const nextStage = ROADMAP_STAGES[stageIdx + 1];
  const doneCurrent = getDoneCount(currentCourse, progress);
  const totalCurrent = getCourseTotal(currentCourse);
  const pctCurrent = totalCurrent > 0 ? Math.round((doneCurrent / totalCurrent) * 100) : 0;

  return (
    <div>
      {/* Hero */}
      <div className="home-hero">
        <div className="home-hero-content">
          <h1>🤖 AIスクール</h1>
          <p>AIを武器に人生・仕事・ビジネスを変えるスクール</p>

          <div className="progress-card">
            {titleInfo && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.15)', borderRadius: '20px',
                padding: '4px 12px', marginBottom: '10px',
                fontSize: '12px', fontWeight: 700, color: 'white',
              }}>
                <span>{titleInfo.emoji}</span>
                <span>称号 Lv.{titleInfo.displayLevel} {titleInfo.title}</span>
              </div>
            )}
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

      {/* ===== 学習ロードマップ（横スクロール） ===== */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8' }}>🗺️ 学習ロードマップ</div>
          <button
            onClick={() => onNavigate('home', { type: 'roadmap' })}
            style={{
              background: 'rgba(99,102,241,0.1)', border: 'none', color: '#6366f1',
              borderRadius: '8px', padding: '4px 10px', fontFamily: 'inherit',
              fontSize: '11px', fontWeight: 700, cursor: 'pointer',
            }}
          >
            詳細を見る ›
          </button>
        </div>

        {/* 6ステージ横スクロール */}
        <div style={{
          display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }}>
          {ROADMAP_STAGES.map((stage, idx) => {
            const status = getRoadmapStatus(stage.id, progress);
            const done = getDoneCount(stage.id, progress);
            const total = getCourseTotal(stage.id);
            const isActive = currentCourse === stage.id;
            const isComplete = status === 'completed';
            const isFuture = status === 'future';

            return (
              <div key={stage.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {idx > 0 && (
                  <div style={{ color: '#cbd5e1', fontSize: '12px', marginRight: '6px' }}>›</div>
                )}
                <div
                  onClick={() => {
                    if (isFuture) return;
                    if (stage.id === 'practice') { onNavigate('practice'); return; }
                    onNavigate('learning', { type: stage.id + 'Tab' });
                  }}
                  style={{
                    minWidth: '64px',
                    background: isActive ? stage.color : isComplete ? `${stage.color}20` : isFuture ? '#f1f5f9' : 'white',
                    border: `2px solid ${isActive ? stage.color : isComplete ? `${stage.color}60` : isFuture ? '#e2e8f0' : '#e2e8f0'}`,
                    borderRadius: '12px', padding: '8px 6px',
                    textAlign: 'center', cursor: isFuture ? 'default' : 'pointer',
                  }}
                >
                  <div style={{ fontSize: '16px', marginBottom: '2px' }}>
                    {isComplete ? '✅' : stage.emoji}
                  </div>
                  <div style={{
                    fontSize: '10px', fontWeight: 800,
                    color: isActive ? 'white' : isComplete ? stage.color : isFuture ? '#cbd5e1' : '#64748b',
                  }}>
                    {stage.label}
                  </div>
                  {!isFuture && total > 0 && (
                    <div style={{
                      fontSize: '9px',
                      color: isActive ? 'rgba(255,255,255,0.8)' : '#94a3b8',
                      marginTop: '1px',
                    }}>
                      {done}/{total}
                    </div>
                  )}
                  {isFuture && (
                    <div style={{ fontSize: '9px', color: '#cbd5e1', marginTop: '1px' }}>🗺️</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 総合進捗 */}
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
            <span>コア修了進捗（基礎〜実践）</span>
            <span style={{ fontWeight: 700, color: '#6366f1' }}>{totalPct}%</span>
          </div>
          <div style={{ height: '4px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', width: `${totalPct}%`, transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* ===== 次にやること ===== */}
      <div className="section" style={{ paddingTop: '20px' }}>
        <div className="section-title">🎯 次にやること</div>

        {primaryLesson && primaryCourse ? (
          <div className="card" style={{
            border: `1.5px solid ${primaryCourse.color}40`,
            background: `linear-gradient(135deg, ${primaryCourse.color}08 0%, white 60%)`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{
                background: `${primaryCourse.color}18`, color: primaryCourse.color,
                padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
              }}>
                {primaryCourse.icon} {primaryCourse.name}
              </span>
              <span style={{ background: '#f1f5f9', color: '#64748b', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                {primaryCourse.done} / {primaryCourse.max}
              </span>
              <span style={{ marginLeft: 'auto', fontWeight: 800, color: primaryCourse.color, fontSize: '14px' }}>
                {primaryCourse.pct}%
              </span>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '36px', lineHeight: 1 }}>{primaryLesson.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '3px', color: '#1e293b' }}>
                  {primaryLesson.title}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  {primaryLesson.description}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ height: '6px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '99px', background: primaryCourse.color, width: `${primaryCourse.pct}%`, transition: 'width 0.5s ease' }} />
              </div>
            </div>

            <button
              style={{
                width: '100%', padding: '13px', border: 'none', borderRadius: '12px',
                background: primaryCourse.color, color: 'white', fontFamily: 'inherit',
                fontWeight: 800, fontSize: '15px', cursor: 'pointer',
              }}
              onClick={() => onNavigate('learning', { type: primaryCourse.type, id: primaryLesson.id })}
            >
              ▶ 学習を続ける
            </button>
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
            <div style={{ fontWeight: 800, fontSize: '16px', color: '#10b981', marginBottom: '6px' }}>
              コアレッスン完了！おめでとう！
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              次は収益化編や卒業制作に挑戦しよう
            </div>
          </div>
        )}
      </div>

      {/* ===== 今のあなたのステージ ===== */}
      <div className="section" style={{ paddingTop: '20px' }}>
        <div className="section-title">📍 現在のステージ</div>

        <div className="card" style={{
          background: `linear-gradient(135deg, ${currentStage.color}08 0%, white 100%)`,
          border: `1.5px solid ${currentStage.color}30`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: `${currentStage.color}15`, fontSize: '26px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${currentStage.color}30`, flexShrink: 0,
            }}>{currentStage.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: currentStage.color, letterSpacing: '1px', marginBottom: '2px' }}>
                STAGE {stageIdx + 1} / {ROADMAP_STAGES.length}
              </div>
              <div style={{ fontSize: '17px', fontWeight: 900, color: '#1e293b' }}>
                {currentStage.label}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {totalCurrent > 0 ? `${doneCurrent} / ${totalCurrent} 完了` : 'ロードマップ公開中'}
              </div>
            </div>
            <div style={{
              fontSize: '20px', fontWeight: 900, color: currentStage.color,
              background: `${currentStage.color}10`, borderRadius: '12px',
              padding: '6px 10px', flexShrink: 0,
            }}>{pctCurrent}%</div>
          </div>

          {totalCurrent > 0 && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ height: '7px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '99px', background: currentStage.color, width: `${pctCurrent}%`, transition: 'width 0.5s ease' }} />
              </div>
            </div>
          )}

          {nextStage && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#f8fafc', borderRadius: '10px', padding: '10px',
            }}>
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>次のステージ</span>
              <span style={{ fontSize: '14px' }}>{nextStage.emoji}</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>{nextStage.label}</span>
              {totalCurrent > 0 && (
                <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 700, color: nextStage.color }}>
                  残り{totalCurrent - doneCurrent}本で解放
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="section" style={{ paddingTop: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
          {[
            { label: '基礎', value: beginnerDone, max: 12, icon: '📗', color: '#3b82f6' },
            { label: '活用', value: advancedDone, max: 12, icon: '📘', color: '#10b981' },
            { label: '開発', value: expertDone,   max: 12, icon: '📙', color: '#8b5cf6' },
            { label: '実践', value: missionDone,  max: 6,  icon: '⚡', color: '#f59e0b' },
          ].map((item) => (
            <div key={item.label} className="card" style={{ textAlign: 'center', padding: '10px 4px' }}>
              <div style={{ fontSize: '18px', marginBottom: '3px' }}>{item.icon}</div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: item.color }}>{item.value}</div>
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
            <span style={{ fontSize: '14px', fontWeight: 700 }}>📊 コア修了率</span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#6366f1' }}>{totalPct}%</span>
          </div>
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: `${totalPct}%` }} />
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
            {completedCount} / 42 コンテンツ完了（基礎12・活用12・開発12・実践6）
          </div>
        </div>
      </div>

      {/* ===== 収益化編・卒業制作 ===== */}
      <div className="section" style={{ paddingTop: '20px' }}>
        <div className="section-title">🚀 次のステージへ</div>

        <div
          className="card card-hover"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            border: 'none', marginBottom: '10px', color: 'white',
          }}
          onClick={() => onNavigate('home', { type: 'roadmap' })}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', flexShrink: 0,
            }}>🗺️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, fontSize: '16px', marginBottom: '4px' }}>全体ロードマップ</div>
              <div style={{ fontSize: '12px', opacity: 0.75, lineHeight: 1.5 }}>
                基礎→活用→開発→実践→収益化→卒業制作の6ステージ
              </div>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px' }}>›</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            { id: 'monetization', name: '収益化編', emoji: '💰', color: '#ec4899', sub: '副業・案件・起業', tabType: 'monetizationTab' },
            { id: 'graduation',   name: '卒業制作', emoji: '🎓', color: '#eab308', sub: 'AIサービスを公開', tabType: 'graduationTab' },
          ].map((course) => (
            <div
              key={course.id}
              className="card card-hover"
              style={{
                background: `linear-gradient(135deg, ${course.color}10 0%, white 100%)`,
                border: `1.5px solid ${course.color}30`,
                padding: '14px',
              }}
              onClick={() => onNavigate('learning', { type: course.tabType })}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{course.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '4px', lineHeight: 1.3 }}>
                {course.name}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>{course.sub}</div>
              <span style={{
                display: 'inline-block',
                fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '8px',
                background: '#f1f5f9', color: '#94a3b8',
              }}>
                🗺️ ロードマップ公開中
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Mission */}
      {nextMission && (
        <div className="section" style={{ paddingTop: '20px' }}>
          <div className="section-title">⚡ 実践ミッション</div>
          <div
            className="card card-hover"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, white 100%)', border: '1.5px solid rgba(245,158,11,0.3)' }}
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
              <span style={{ color: '#f59e0b', fontSize: '18px', flexShrink: 0 }}>›</span>
            </div>
          </div>
        </div>
      )}

      {/* 特別講座ピックアップ */}
      <div className="section" style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div className="section-title" style={{ margin: 0 }}>⭐ 特別講座</div>
          <button
            onClick={() => onNavigate('learning', { type: 'specialTab' })}
            style={{
              background: 'rgba(124,58,237,0.1)', border: 'none', color: '#7c3aed',
              borderRadius: '8px', padding: '4px 10px', fontFamily: 'inherit',
              fontSize: '11px', fontWeight: 700, cursor: 'pointer',
            }}
          >
            全{SPECIAL_LECTURES.length}講座 ›
          </button>
        </div>
        {FEATURED_LECTURES.map((lecture) => (
          <div
            key={lecture.id}
            className="card card-hover"
            style={{
              marginBottom: '8px',
              background: `linear-gradient(135deg, ${lecture.color}06 0%, white 100%)`,
              border: `1.5px solid ${lecture.color}25`,
            }}
            onClick={() => onNavigate('learning', { type: 'specialTab' })}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: `${lecture.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', flexShrink: 0,
              }}>{lecture.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '3px' }}>
                  {lecture.name}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px',
                    background: `${lecture.color}12`, color: lecture.color,
                  }}>{lecture.category}</span>
                  <span style={{
                    fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: '6px',
                    background: '#f1f5f9', color: '#64748b',
                  }}>{lecture.difficulty}</span>
                </div>
              </div>
              <span style={{ color: lecture.color, fontSize: '18px', flexShrink: 0 }}>›</span>
            </div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="section" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div style={{ fontSize: '20px', marginBottom: '8px' }}>💡</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
            学習の進め方
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7 }}>
            ① 基礎でAIを理解 → ② 活用で仕事に使う → ③ 開発でアプリを作る → ④ 実践で成果物を完成 → ⑤ 収益化で稼ぐ → ⑥ 卒業制作で完成！
          </div>
        </div>
      </div>
    </div>
  );
}
