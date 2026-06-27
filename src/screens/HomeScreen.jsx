import { ROADMAP_STAGES } from '../data/courses';

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
    case 'practice': return 6;
    default:         return 0;
  }
}

function StageBar({ label, done, total, color }) {
  const blocks = 6;
  const filled = total > 0 ? Math.round((done / total) * blocks) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, width: '22px' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: '2px' }}>
        {Array.from({ length: blocks }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 8, height: 8, borderRadius: '2px',
              background: i < filled ? 'white' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </div>
  );
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
  const levelPct = getLevelProgress();

  const completedAdvanced = progress.completedAdvancedLessons || [];
  const completedExpert   = progress.completedExpertLessons   || [];

  const nextLesson         = getNextLesson(lessons);
  const nextAdvancedLesson = (lessonsAdvanced || []).find(l => !completedAdvanced.includes(l.id));
  const nextExpertLesson   = (lessonsExpert   || []).find(l => !completedExpert.includes(l.id));
  const nextMission        = missions.find(m => !progress.completedMissions.includes(m.id));

  const beginnerDone = progress.completedLessons.length;
  const advancedDone = completedAdvanced.length;
  const expertDone   = completedExpert.length;
  const missionDone  = progress.completedMissions.length;

  const currentCourse =
    beginnerDone < 12 ? 'beginner' :
    advancedDone < 12 ? 'advanced' :
    expertDone   < 12 ? 'expert'   : 'practice';

  const primaryLesson = nextLesson || nextAdvancedLesson || nextExpertLesson;
  const primaryCourse = nextLesson
    ? { name: '基礎編', icon: '📗', color: '#3b82f6', done: beginnerDone, type: 'lesson',        tabType: 'beginner',  max: 12 }
    : nextAdvancedLesson
    ? { name: '活用編', icon: '📘', color: '#10b981', done: advancedDone, type: 'advancedLesson', tabType: 'advanced',  max: 12 }
    : nextExpertLesson
    ? { name: '開発編', icon: '📙', color: '#8b5cf6', done: expertDone,   type: 'expertLesson',   tabType: 'expert',    max: 12 }
    : null;

  const stageIdx    = ROADMAP_STAGES.findIndex(s => s.id === currentCourse);
  const totalCurrent = getCourseTotal(currentCourse);
  const doneCurrent  = getDoneCount(currentCourse, progress);

  const coreCompleted = beginnerDone >= 12 && advancedDone >= 12 && expertDone >= 12 && missionDone >= 6;

  return (
    <div style={{ background: '#fff', minHeight: '100%' }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        padding: '20px 16px 28px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 160, height: 160,
          background: 'rgba(255,255,255,0.07)', borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Top row: title + level */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'white', letterSpacing: '-0.3px' }}>
              🤖 AIスクール
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '2px' }}>
              AIを使える人になる実践スクール
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '12px', padding: '8px 12px', textAlign: 'right',
          }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: '4px' }}>
              現在地
            </div>
            <StageBar label="初" done={beginnerDone} total={12} />
            <StageBar label="活" done={advancedDone} total={12} />
            <StageBar label="開" done={expertDone}   total={12} />
            <StageBar label="実" done={missionDone}  total={6}  />
          </div>
        </div>

        {/* Level + XP */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)', color: 'white',
              borderRadius: '20px', padding: '4px 12px',
              fontSize: '12px', fontWeight: 700,
            }}>
              {levelInfo.emoji} Lv.{levelInfo.level} {levelInfo.name}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 600 }}>
              ✨ {progress.xp} XP
            </span>
          </div>
          <div style={{ height: '4px', borderRadius: '99px', background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '99px', background: 'white', width: `${levelPct}%`, transition: 'width 0.5s ease' }} />
          </div>
          {levelInfo.nextXp && (
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginTop: '4px', textAlign: 'right' }}>
              次のLvまで {levelInfo.nextXp - progress.xp} XP
            </div>
          )}
        </div>
      </div>

      {/* ── 次にやること（最優先） ── */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          次にやること
        </div>

        {primaryLesson && primaryCourse ? (
          <div style={{
            border: `2px solid ${primaryCourse.color}`,
            borderRadius: '16px', overflow: 'hidden',
          }}>
            {/* Course tag */}
            <div style={{
              background: primaryCourse.color, padding: '8px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>
                {primaryCourse.icon} {primaryCourse.name}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: 600 }}>
                {primaryCourse.done}/{primaryCourse.max} 完了
              </span>
            </div>

            {/* Lesson info */}
            <div style={{ padding: '16px', background: 'white' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '36px', lineHeight: 1 }}>{primaryLesson.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: '#1e293b', marginBottom: '3px' }}>
                    {primaryLesson.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    🕐 {primaryLesson.duration}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ height: '4px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '99px', background: primaryCourse.color,
                    width: `${Math.round((primaryCourse.done / primaryCourse.max) * 100)}%`,
                    transition: 'width 0.5s ease', minWidth: '4px',
                  }} />
                </div>
              </div>

              <button
                style={{
                  width: '100%', padding: '14px', border: 'none', borderRadius: '12px',
                  background: primaryCourse.color, color: 'white', fontFamily: 'inherit',
                  fontWeight: 800, fontSize: '15px', cursor: 'pointer',
                  boxShadow: `0 4px 14px ${primaryCourse.color}40`,
                }}
                onClick={() => onNavigate('learning', { type: primaryCourse.type, id: primaryLesson.id })}
              >
                ▶ 続きを学ぶ
              </button>
            </div>
          </div>
        ) : nextMission ? (
          <div
            style={{
              border: '2px solid #f59e0b', borderRadius: '16px', overflow: 'hidden',
              cursor: 'pointer',
            }}
            onClick={() => onNavigate('practice', { type: 'mission', id: nextMission.id })}
          >
            <div style={{
              background: '#f59e0b', padding: '8px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>⚡ 実践編</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: 600 }}>
                {missionDone}/6 完了
              </span>
            </div>
            <div style={{ padding: '16px', background: 'white' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '36px' }}>{nextMission.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: '#1e293b', marginBottom: '4px' }}>
                    {nextMission.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>{nextMission.description}</div>
                </div>
                <span style={{ color: '#f59e0b', fontSize: '20px' }}>›</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            background: '#f0fdf4', border: '2px solid #86efac',
            borderRadius: '16px', padding: '24px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
            <div style={{ fontWeight: 800, fontSize: '16px', color: '#065f46', marginBottom: '6px' }}>
              コアレッスン完了！おめでとう！
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              次は収益化編や卒業制作に挑戦しよう
            </div>
          </div>
        )}
      </div>

      {/* ── 卒業までの流れ（コンパクト） ── */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            卒業までの流れ
          </div>
          <button
            onClick={() => onNavigate('home', { type: 'roadmap' })}
            style={{
              background: 'none', border: 'none', color: '#6366f1',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            詳細 ›
          </button>
        </div>

        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {ROADMAP_STAGES.map((stage, idx) => {
            const done  = getDoneCount(stage.id, progress);
            const total = getCourseTotal(stage.id);
            const isFuture    = ['monetization', 'graduation'].includes(stage.id);
            const isCompleted = !isFuture && total > 0 && done >= total;
            const isActive    = stage.id === currentCourse && !isFuture;

            return (
              <div key={stage.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {idx > 0 && (
                  <div style={{ color: isCompleted ? '#10b981' : '#cbd5e1', fontSize: '10px', marginRight: '6px' }}>›</div>
                )}
                <div
                  onClick={() => {
                    if (isFuture) return;
                    if (stage.id === 'practice') { onNavigate('practice'); return; }
                    onNavigate('learning', { type: stage.id + 'Tab' });
                  }}
                  style={{
                    minWidth: '60px',
                    background: isActive ? stage.color : isCompleted ? `${stage.color}15` : isFuture ? '#f8fafc' : 'white',
                    border: `1.5px solid ${isActive ? stage.color : isCompleted ? `${stage.color}50` : '#e2e8f0'}`,
                    borderRadius: '12px', padding: '8px 4px',
                    textAlign: 'center', cursor: isFuture ? 'default' : 'pointer',
                  }}
                >
                  <div style={{ fontSize: '15px', marginBottom: '2px' }}>
                    {isCompleted ? '✅' : stage.emoji}
                  </div>
                  <div style={{
                    fontSize: '9px', fontWeight: 800,
                    color: isActive ? 'white' : isCompleted ? stage.color : isFuture ? '#cbd5e1' : '#64748b',
                  }}>
                    {stage.label}
                  </div>
                  {!isFuture && total > 0 && (
                    <div style={{ fontSize: '9px', color: isActive ? 'rgba(255,255,255,0.75)' : '#94a3b8', marginTop: '1px' }}>
                      {done}/{total}
                    </div>
                  )}
                  {isFuture && <div style={{ fontSize: '9px', color: '#cbd5e1', marginTop: '1px' }}>🔒</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 進捗サマリー ── */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
          {[
            { label: '基礎', value: beginnerDone, max: 12, color: '#3b82f6' },
            { label: '活用', value: advancedDone, max: 12, color: '#10b981' },
            { label: '開発', value: expertDone,   max: 12, color: '#8b5cf6' },
            { label: '実践', value: missionDone,  max: 6,  color: '#f59e0b' },
          ].map(item => (
            <div key={item.label} style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: '12px', padding: '12px 6px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: item.color }}>
                {item.value}
              </div>
              <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: 600, marginTop: '2px' }}>
                / {item.max} {item.label}
              </div>
              <div style={{ height: '3px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden', marginTop: '6px' }}>
                <div style={{
                  height: '100%', borderRadius: '99px', background: item.color,
                  width: `${Math.round((item.value / item.max) * 100)}%`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── コア完了後：次のステージへ ── */}
      {coreCompleted && (
        <div style={{ padding: '20px 16px 0' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            次のステージへ
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { id: 'monetization', name: '収益化編', emoji: '💰', color: '#ec4899', sub: 'AIで収益導線を作る', tabType: 'monetizationTab' },
              { id: 'graduation',   name: '卒業制作', emoji: '🎓', color: '#eab308', sub: '自分のAIサービスを公開', tabType: 'graduationTab' },
            ].map(course => (
              <div
                key={course.id}
                onClick={() => onNavigate('learning', { type: course.tabType })}
                style={{
                  background: `linear-gradient(135deg, ${course.color}10 0%, white 100%)`,
                  border: `1.5px solid ${course.color}30`, borderRadius: '14px',
                  padding: '16px', cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '26px', marginBottom: '8px' }}>{course.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: '13px', color: '#1e293b', marginBottom: '4px' }}>{course.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.5 }}>{course.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ロードマップへのリンク ── */}
      {!coreCompleted && (
        <div style={{ padding: '16px 16px 0' }}>
          <div
            onClick={() => onNavigate('home', { type: 'roadmap' })}
            style={{
              background: '#0f172a', borderRadius: '14px', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '22px' }}>🗺️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'white' }}>全体ロードマップを見る</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>
                基礎→活用→開発→実践→収益化→卒業
              </div>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '18px' }}>›</span>
          </div>
        </div>
      )}

      <div style={{ height: '24px' }} />
    </div>
  );
}
