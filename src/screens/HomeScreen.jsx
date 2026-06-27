import { ROADMAP_STAGES } from '../data/courses';

const STEP_CONFIG = [
  { key: 'step1', completedKey: 'completedStep1', lessonsProp: 'lessonsStep1', navType: 'step1',    tabType: 'step1Tab', name: 'STEP1 AI基礎',    icon: '🤖', color: '#3b82f6', stepNum: 1 },
  { key: 'step2', completedKey: 'completedStep2', lessonsProp: 'lessonsStep2', navType: 'step2',    tabType: 'step2Tab', name: 'STEP2 AI実践',    icon: '💼', color: '#10b981', stepNum: 2 },
  { key: 'step3', completedKey: 'completedStep3', lessonsProp: 'lessonsStep3', navType: 'step3',    tabType: 'step3Tab', name: 'STEP3 AIクリエイト', icon: '🎨', color: '#ec4899', stepNum: 3 },
  { key: 'step4', completedKey: 'completedStep4', lessonsProp: 'lessonsStep4', navType: 'step4',    tabType: 'step4Tab', name: 'STEP4 AI開発',    icon: '💻', color: '#8b5cf6', stepNum: 4 },
  { key: 'step5', completedKey: 'completedStep5', lessonsProp: 'lessonsStep5', navType: 'step5',    tabType: 'step5Tab', name: 'STEP5 AI収益化',  icon: '💰', color: '#f59e0b', stepNum: 5 },
];

function getDoneCount(stepId, progress) {
  const map = {
    step1: progress.completedStep1?.length || 0,
    step2: progress.completedStep2?.length || 0,
    step3: progress.completedStep3?.length || 0,
    step4: progress.completedStep4?.length || 0,
    step5: progress.completedStep5?.length || 0,
    step6: 0,
  };
  return map[stepId] || 0;
}

function StageBar({ label, done, total }) {
  const blocks = 6;
  const filled = total > 0 ? Math.round((done / total) * blocks) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.65)', fontWeight: 700, width: '20px', letterSpacing: '0px' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: '2px' }}>
        {Array.from({ length: blocks }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 7, height: 7, borderRadius: '2px',
              background: i < filled ? 'white' : 'rgba(255,255,255,0.22)',
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
  lessonsStep1,
  lessonsStep2,
  lessonsStep3,
  lessonsStep4,
  lessonsStep5,
  missions,
  onNavigate,
}) {
  const levelInfo = getLevel();
  const levelPct = getLevelProgress();

  const allStepLessons = {
    lessonsStep1, lessonsStep2, lessonsStep3, lessonsStep4, lessonsStep5,
  };

  const stepDone = {
    step1: progress.completedStep1?.length || 0,
    step2: progress.completedStep2?.length || 0,
    step3: progress.completedStep3?.length || 0,
    step4: progress.completedStep4?.length || 0,
    step5: progress.completedStep5?.length || 0,
  };

  const missionDone = progress.completedMissions?.length || 0;

  // Find the current active STEP (first not completed)
  const currentStepCfg = STEP_CONFIG.find((s) => {
    const done = stepDone[s.key];
    return done < 6;
  }) || null;

  // Find next lesson across steps
  let primaryLesson = null;
  let primaryStepCfg = null;
  for (const stepCfg of STEP_CONFIG) {
    const lessons = allStepLessons[stepCfg.lessonsProp] || [];
    const completed = progress[stepCfg.completedKey] || [];
    const next = lessons.find((l) => !completed.includes(l.id));
    if (next) {
      primaryLesson = next;
      primaryStepCfg = stepCfg;
      break;
    }
  }

  const nextMission = missions?.find((m) => !progress.completedMissions?.includes(m.id));
  const all5StepsDone = STEP_CONFIG.every((s) => stepDone[s.key] >= 6);

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

        {/* Top row: title + stage progress */}
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
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.65)', fontWeight: 700, marginBottom: '5px', letterSpacing: '0.5px' }}>
              現在地
            </div>
            <StageBar label="S1" done={stepDone.step1} total={6} />
            <div style={{ height: '3px' }} />
            <StageBar label="S2" done={stepDone.step2} total={6} />
            <div style={{ height: '3px' }} />
            <StageBar label="S3" done={stepDone.step3} total={6} />
            <div style={{ height: '3px' }} />
            <StageBar label="S4" done={stepDone.step4} total={6} />
            <div style={{ height: '3px' }} />
            <StageBar label="S5" done={stepDone.step5} total={6} />
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

      {/* ── 次にやること ── */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
          次にやること
        </div>

        {primaryLesson && primaryStepCfg ? (
          <div style={{
            border: `2px solid ${primaryStepCfg.color}`,
            borderRadius: '16px', overflow: 'hidden',
          }}>
            <div style={{
              background: primaryStepCfg.color, padding: '8px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>
                {primaryStepCfg.icon} {primaryStepCfg.name}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', fontWeight: 600 }}>
                {stepDone[primaryStepCfg.key]}/6 完了
              </span>
            </div>
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
              <div style={{ marginBottom: '14px' }}>
                <div style={{ height: '4px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '99px', background: primaryStepCfg.color,
                    width: `${Math.round((stepDone[primaryStepCfg.key] / 6) * 100)}%`,
                    transition: 'width 0.5s ease', minWidth: '4px',
                  }} />
                </div>
              </div>
              <button
                style={{
                  width: '100%', padding: '14px', border: 'none', borderRadius: '12px',
                  background: primaryStepCfg.color, color: 'white', fontFamily: 'inherit',
                  fontWeight: 800, fontSize: '15px', cursor: 'pointer',
                  boxShadow: `0 4px 14px ${primaryStepCfg.color}40`,
                }}
                onClick={() => onNavigate('learning', { type: primaryStepCfg.navType, id: primaryLesson.id })}
              >
                ▶ 続きを学ぶ
              </button>
            </div>
          </div>
        ) : all5StepsDone ? (
          <div style={{
            background: '#f0fdf4', border: '2px solid #86efac',
            borderRadius: '16px', padding: '24px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏆</div>
            <div style={{ fontWeight: 800, fontSize: '16px', color: '#065f46', marginBottom: '6px' }}>
              STEP1〜5完了！おめでとう！
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              次は卒業制作でAIサービスを公開しよう
            </div>
            <button
              style={{
                padding: '12px 24px', border: 'none', borderRadius: '12px',
                background: '#eab308', color: 'white', fontFamily: 'inherit',
                fontWeight: 800, fontSize: '14px', cursor: 'pointer',
              }}
              onClick={() => onNavigate('learning', { type: 'step6Tab' })}
            >
              🎓 卒業制作を始める
            </button>
          </div>
        ) : null}
      </div>

      {/* ── ロードマップ ── */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            学習ロードマップ
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
            const done = getDoneCount(stage.id, progress);
            const total = stage.total;
            const isCompleted = total > 0 && done >= total;
            const isGrad = stage.id === 'step6';
            const isActive = !isGrad && !isCompleted && currentStepCfg?.key === stage.id;

            return (
              <div key={stage.id} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {idx > 0 && (
                  <div style={{ color: isCompleted ? '#10b981' : '#cbd5e1', fontSize: '10px', marginRight: '6px' }}>›</div>
                )}
                <div
                  onClick={() => {
                    if (isGrad) { onNavigate('learning', { type: 'step6Tab' }); return; }
                    onNavigate('learning', { type: `${stage.id}Tab` });
                  }}
                  style={{
                    minWidth: '60px',
                    background: isActive ? stage.color : isCompleted ? `${stage.color}15` : isGrad ? '#f8fafc' : 'white',
                    border: `1.5px solid ${isActive ? stage.color : isCompleted ? `${stage.color}50` : '#e2e8f0'}`,
                    borderRadius: '12px', padding: '8px 4px',
                    textAlign: 'center', cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '15px', marginBottom: '2px' }}>
                    {isCompleted ? '✅' : stage.emoji}
                  </div>
                  <div style={{
                    fontSize: '9px', fontWeight: 800,
                    color: isActive ? 'white' : isCompleted ? stage.color : isGrad ? '#cbd5e1' : '#64748b',
                  }}>
                    {stage.label}
                  </div>
                  {!isGrad && total > 0 && (
                    <div style={{ fontSize: '9px', color: isActive ? 'rgba(255,255,255,0.75)' : '#94a3b8', marginTop: '1px' }}>
                      {done}/{total}
                    </div>
                  )}
                  {isGrad && <div style={{ fontSize: '9px', color: '#cbd5e1', marginTop: '1px' }}>🔒</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 進捗サマリー ── */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '6px' }}>
          {STEP_CONFIG.map((s) => (
            <div key={s.key} style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: '10px', padding: '10px 4px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '16px', fontWeight: 900, color: s.color }}>
                {stepDone[s.key]}
              </div>
              <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 600, marginTop: '2px' }}>
                / 6 S{s.stepNum}
              </div>
              <div style={{ height: '3px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden', marginTop: '5px' }}>
                <div style={{
                  height: '100%', borderRadius: '99px', background: s.color,
                  width: `${Math.round((stepDone[s.key] / 6) * 100)}%`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '24px' }} />
    </div>
  );
}
