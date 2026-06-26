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

  // 現在進行中のコースを特定
  const currentCourse =
    beginnerDone < 12 ? 'beginner' :
    advancedDone < 12 ? 'advanced' :
    expertDone < 12   ? 'expert' : 'practice';

  const primaryLesson = nextLesson || nextAdvancedLesson || nextExpertLesson;
  const primaryCourse = nextLesson
    ? { name: '基礎編', icon: '📗', color: '#3b82f6', pct: beginnerPct, done: beginnerDone, type: 'lesson', tabType: 'beginner', max: 12 }
    : nextAdvancedLesson
    ? { name: '活用編', icon: '📘', color: '#10b981', pct: advancedPct, done: advancedDone, type: 'advancedLesson', tabType: 'advanced', max: 12 }
    : nextExpertLesson
    ? { name: '開発編', icon: '📙', color: '#8b5cf6', pct: expertPct, done: expertDone, type: 'expertLesson', tabType: 'expert', max: 12 }
    : null;

  const stageIdx = ROADMAP_STAGES.findIndex((s) => s.id === currentCourse);
  const currentStage = ROADMAP_STAGES[stageIdx] || ROADMAP_STAGES[0];
  const nextStage = ROADMAP_STAGES[stageIdx + 1];
  const doneCurrent = getDoneCount(currentCourse, progress);
  const totalCurrent = getCourseTotal(currentCourse);
  const pctCurrent = totalCurrent > 0 ? Math.round((doneCurrent / totalCurrent) * 100) : 0;

  // コア全修了チェック
  const coreCompleted = beginnerDone >= 12 && advancedDone >= 12 && expertDone >= 12 && missionDone >= 6;

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

      {/* ===== 卒業までの流れ ===== */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748b' }}>🎓 卒業までの流れ</div>
          <button
            onClick={() => onNavigate('home', { type: 'roadmap' })}
            style={{
              background: 'rgba(99,102,241,0.1)', border: 'none', color: '#6366f1',
              borderRadius: '8px', padding: '4px 10px', fontFamily: 'inherit',
              fontSize: '11px', fontWeight: 700, cursor: 'pointer',
            }}
          >
            詳細 ›
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
                  <div style={{ color: isComplete ? '#10b981' : '#cbd5e1', fontSize: '12px', marginRight: '6px' }}>›</div>
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
                    <div style={{ fontSize: '9px', color: '#cbd5e1', marginTop: '1px' }}>🔒</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* コア修了進捗 */}
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
            {/* ステージ情報 */}
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

            {/* ステージ番号 */}
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, marginBottom: '6px' }}>
              STEP {stageIdx + 1}/6 ─ {currentStage.label}
              {totalCurrent > 0 && (
                <span style={{ marginLeft: '8px', color: currentStage.color, fontWeight: 700 }}>
                  あと{totalCurrent - doneCurrent}本で次のステージへ
                </span>
              )}
            </div>

            {/* 次のレッスン */}
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

            {/* 進捗バー */}
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
        ) : nextMission ? (
          /* 実践ミッションが残っている場合 */
          <div
            className="card card-hover"
            style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, white 100%)', border: '1.5px solid rgba(245,158,11,0.3)' }}
            onClick={() => onNavigate('practice', { type: 'mission', id: nextMission.id })}
          >
            <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 700, marginBottom: '6px' }}>
              STEP {stageIdx + 1}/6 ─ 実践編 • あと{6 - missionDone}ミッションで次へ
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ fontSize: '36px' }}>{nextMission.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{nextMission.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{nextMission.description}</div>
              </div>
              <span style={{ color: '#f59e0b', fontSize: '18px', flexShrink: 0 }}>›</span>
            </div>
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

      {/* ===== 進捗サマリー ===== */}
      <div className="section" style={{ paddingTop: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px' }}>
          {[
            { label: '基礎', value: beginnerDone, max: 12, icon: '📗', color: '#3b82f6', pct: beginnerPct },
            { label: '活用', value: advancedDone, max: 12, icon: '📘', color: '#10b981', pct: advancedPct },
            { label: '開発', value: expertDone,   max: 12, icon: '📙', color: '#8b5cf6', pct: expertPct },
            { label: '実践', value: missionDone,  max: 6,  icon: '⚡', color: '#f59e0b', pct: missionPct },
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

        {/* コア修了率バー */}
        <div className="card" style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>📊 コア修了率</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#6366f1' }}>{totalPct}%</span>
          </div>
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: `${totalPct}%` }} />
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
            {completedCount} / 42 コンテンツ完了
          </div>
        </div>
      </div>

      {/* ===== コア完了後：次のステージへ ===== */}
      {coreCompleted && (
        <div className="section" style={{ paddingTop: '20px' }}>
          <div className="section-title">🚀 次のステージへ</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { id: 'monetization', name: '収益化編', emoji: '💰', color: '#ec4899', sub: 'AIで小さな収益導線を作る', tabType: 'monetizationTab' },
              { id: 'graduation',   name: '卒業制作', emoji: '🎓', color: '#eab308', sub: '自分のAIサービスを公開する', tabType: 'graduationTab' },
            ].map((course) => (
              <div
                key={course.id}
                className="card card-hover"
                style={{
                  background: `linear-gradient(135deg, ${course.color}10 0%, white 100%)`,
                  border: `1.5px solid ${course.color}30`, padding: '16px',
                }}
                onClick={() => onNavigate('learning', { type: course.tabType })}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{course.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '4px' }}>
                  {course.name}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px', lineHeight: 1.5 }}>
                  {course.sub}
                </div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '8px',
                  background: `${course.color}12`, color: course.color,
                }}>
                  ロードマップ公開中 ›
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== ロードマップ（未完了時はここに表示） ===== */}
      {!coreCompleted && (
        <div className="section" style={{ paddingTop: '20px' }}>
          <div
            className="card card-hover"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              border: 'none', color: 'white',
            }}
            onClick={() => onNavigate('home', { type: 'roadmap' })}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px', flexShrink: 0,
              }}>🗺️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900, fontSize: '15px', marginBottom: '4px' }}>全体ロードマップを見る</div>
                <div style={{ fontSize: '12px', opacity: 0.75, lineHeight: 1.5 }}>
                  基礎→活用→開発→実践→収益化→卒業制作
                </div>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '20px' }}>›</span>
            </div>
          </div>
        </div>
      )}

      {/* ===== 実践ミッション（コア未完了かつ実践が残っている場合は下にも表示） ===== */}
      {nextMission && primaryLesson && (
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

      {/* ===== 特別講座（補助教材として紹介） ===== */}
      <div className="section" style={{ paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
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
        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '12px' }}>
          必要に応じて深掘りできる補助教材
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
          <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.8 }}>
            ① <strong>基礎</strong>でAIを理解<br />
            ② <strong>活用</strong>で仕事に使う<br />
            ③ <strong>開発</strong>でアプリを作る<br />
            ④ <strong>実践</strong>で成果物を完成<br />
            ⑤ <strong>収益化</strong>でAIを稼ぎに変える<br />
            ⑥ <strong>卒業制作</strong>で自分のサービスを公開！
          </div>
        </div>
      </div>
    </div>
  );
}
