import { ROADMAP_STAGES } from '../data/courses';

const STEP_CONFIG = [
  { key: 'step1', completedKey: 'completedStep1', lessonsProp: 'lessonsStep1', navType: 'step1', tabType: 'step1Tab', name: 'STEP 1  AI基礎',       color: '#3b82f6', stepNum: 1 },
  { key: 'step2', completedKey: 'completedStep2', lessonsProp: 'lessonsStep2', navType: 'step2', tabType: 'step2Tab', name: 'STEP 2  AI実践',       color: '#10b981', stepNum: 2 },
  { key: 'step3', completedKey: 'completedStep3', lessonsProp: 'lessonsStep3', navType: 'step3', tabType: 'step3Tab', name: 'STEP 3  AIクリエイト',  color: '#ec4899', stepNum: 3 },
  { key: 'step4', completedKey: 'completedStep4', lessonsProp: 'lessonsStep4', navType: 'step4', tabType: 'step4Tab', name: 'STEP 4  AI開発',       color: '#8b5cf6', stepNum: 4 },
  { key: 'step5', completedKey: 'completedStep5', lessonsProp: 'lessonsStep5', navType: 'step5', tabType: 'step5Tab', name: 'STEP 5  AI収益化',     color: '#f59e0b', stepNum: 5 },
];

export default function HomeScreen({
  progress,
  getLevel,
  getLevelProgress,
  getTotalProgress,
  getNextLesson,
  getTitle,
  lessonsStep1, lessonsStep2, lessonsStep3, lessonsStep4, lessonsStep5,
  missions,
  onNavigate,
}) {
  const levelInfo  = getLevel();
  const levelPct   = getLevelProgress();
  const titleInfo  = getTitle ? getTitle() : null;

  const allStepLessons = { lessonsStep1, lessonsStep2, lessonsStep3, lessonsStep4, lessonsStep5 };

  const stepDone = {
    step1: progress.completedStep1?.length || 0,
    step2: progress.completedStep2?.length || 0,
    step3: progress.completedStep3?.length || 0,
    step4: progress.completedStep4?.length || 0,
    step5: progress.completedStep5?.length || 0,
  };

  let primaryLesson  = null;
  let primaryStepCfg = null;
  for (const stepCfg of STEP_CONFIG) {
    const lessons   = allStepLessons[stepCfg.lessonsProp] || [];
    const completed = progress[stepCfg.completedKey] || [];
    const next      = lessons.find((l) => !completed.includes(l.id));
    if (next) { primaryLesson = next; primaryStepCfg = stepCfg; break; }
  }

  const all5Done = STEP_CONFIG.every((s) => stepDone[s.key] >= 6);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100%' }}>

      {/* ── HERO ── */}
      <div style={{ background: 'var(--navy)', padding: '24px 20px 28px' }}>
        <div style={{
          fontSize: '10px', fontWeight: 600,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '2.5px', textTransform: 'uppercase',
          marginBottom: '14px',
        }}>
          AI SCHOOL
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <div style={{
              fontSize: '22px', fontWeight: 700, color: 'white',
              letterSpacing: '-0.3px', lineHeight: 1.2, marginBottom: '5px',
            }}>
              {titleInfo ? titleInfo.title : levelInfo.name}
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>
              {progress.xp.toLocaleString()} XP · Lv.{levelInfo.level}
            </div>
          </div>
        </div>

        <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{
            height: '100%', background: 'rgba(255,255,255,0.6)',
            borderRadius: '99px', width: `${levelPct}%`,
            transition: 'width 0.5s ease', minWidth: '4px',
          }} />
        </div>
        {levelInfo.nextXp && (
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '5px', fontWeight: 400 }}>
            次のレベルまで {levelInfo.nextXp - progress.xp} XP
          </div>
        )}
      </div>

      <div style={{ padding: '20px' }}>

        {/* ── 次にやること ── */}
        <div style={{
          fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)',
          letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px',
        }}>
          次にやること
        </div>

        {primaryLesson && primaryStepCfg ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderLeft: `3px solid ${primaryStepCfg.color}`,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: primaryStepCfg.color }}>
                {primaryStepCfg.name}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {stepDone[primaryStepCfg.key]}/6 完了
              </span>
            </div>

            <div style={{
              fontWeight: 600, fontSize: '15px', color: 'var(--text)',
              marginBottom: '4px', lineHeight: 1.4,
            }}>
              {primaryLesson.title}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              {primaryLesson.duration}
            </div>

            <button
              style={{
                width: '100%', padding: '12px',
                background: 'var(--navy)', color: 'white',
                border: 'none', borderRadius: '8px',
                fontFamily: 'inherit', fontWeight: 600,
                fontSize: '14px', cursor: 'pointer',
              }}
              onClick={() => onNavigate('learning', { type: primaryStepCfg.navType, id: primaryLesson.id })}
            >
              学習を続ける
            </button>
          </div>
        ) : all5Done ? (
          <div style={{
            background: 'var(--success-bg)', border: '1px solid #a7f3d0',
            borderRadius: '12px', padding: '20px',
            textAlign: 'center', marginBottom: '24px',
          }}>
            <div style={{ fontWeight: 600, fontSize: '16px', color: '#065f46', marginBottom: '6px' }}>
              STEP 1〜5 すべて完了
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
              次は卒業制作でAIサービスを公開しよう
            </div>
            <button
              className="btn btn-success"
              onClick={() => onNavigate('learning', { type: 'step6Tab' })}
            >
              卒業制作を始める
            </button>
          </div>
        ) : null}

        {/* ── ロードマップ ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{
            fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)',
            letterSpacing: '1.5px', textTransform: 'uppercase',
          }}>
            学習ロードマップ
          </span>
          <button
            onClick={() => onNavigate('home', { type: 'roadmap' })}
            style={{
              background: 'none', border: 'none', color: 'var(--primary)',
              fontSize: '12px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            詳細 ›
          </button>
        </div>

        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '12px', padding: '20px 12px 16px',
          boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {ROADMAP_STAGES.map((stage, idx) => {
              const done        = stepDone[stage.id] || 0;
              const total       = stage.total || 6;
              const isGrad      = stage.id === 'step6';
              const isCompleted = !isGrad && done >= total;
              const isCurrent   = !isGrad && !isCompleted && (
                idx === 0 || ROADMAP_STAGES.slice(0, idx).every(
                  (s) => (stepDone[s.id] || 0) >= (s.total || 6)
                )
              );
              const prevStage   = idx > 0 ? ROADMAP_STAGES[idx - 1] : null;
              const prevDone    = prevStage
                ? (stepDone[prevStage.id] || 0) >= (prevStage.total || 6)
                : false;

              return (
                <div key={stage.id} style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', position: 'relative',
                }}>
                  {/* Left connector */}
                  {idx > 0 && (
                    <div style={{
                      position: 'absolute', right: '50%', left: 0, top: '13px',
                      height: '2px',
                      background: prevDone ? 'var(--primary)' : 'var(--border)',
                    }} />
                  )}
                  {/* Right connector */}
                  {idx < ROADMAP_STAGES.length - 1 && (
                    <div style={{
                      position: 'absolute', left: '50%', right: 0, top: '13px',
                      height: '2px',
                      background: isCompleted ? 'var(--primary)' : 'var(--border)',
                    }} />
                  )}

                  {/* Circle */}
                  <button
                    onClick={() => onNavigate('learning', { type: isGrad ? 'step6Tab' : `${stage.id}Tab` })}
                    style={{
                      position: 'relative', zIndex: 1,
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: isCompleted ? 'var(--primary)' : isCurrent ? 'white' : 'var(--raised)',
                      border: `2px solid ${isCompleted ? 'var(--primary)' : isCurrent ? 'var(--primary)' : 'var(--border)'}`,
                      color: isCompleted ? 'white' : isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                      fontSize: '10px', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    {isCompleted ? '✓' : stage.stepNum}
                  </button>

                  {/* Label */}
                  <span style={{
                    fontSize: '8px', fontWeight: 500, marginTop: '6px',
                    color: isCompleted || isCurrent ? 'var(--text)' : 'var(--text-muted)',
                    textAlign: 'center', lineHeight: 1.2,
                  }}>
                    {isGrad ? '卒業' : `S${stage.stepNum}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div style={{ height: '20px' }} />
    </div>
  );
}
