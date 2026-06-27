import { ROADMAP_STAGES } from '../data/courses';

const STEP_CONFIG = [
  { key: 'step1', completedKey: 'completedStep1', lessonsProp: 'lessonsStep1', navType: 'step1', tabType: 'step1Tab', name: 'STEP 1  AI基礎',      color: '#3b82f6', stepNum: 1 },
  { key: 'step2', completedKey: 'completedStep2', lessonsProp: 'lessonsStep2', navType: 'step2', tabType: 'step2Tab', name: 'STEP 2  AI実践',      color: '#10b981', stepNum: 2 },
  { key: 'step3', completedKey: 'completedStep3', lessonsProp: 'lessonsStep3', navType: 'step3', tabType: 'step3Tab', name: 'STEP 3  AIクリエイト', color: '#ec4899', stepNum: 3 },
  { key: 'step4', completedKey: 'completedStep4', lessonsProp: 'lessonsStep4', navType: 'step4', tabType: 'step4Tab', name: 'STEP 4  AI開発',      color: '#8b5cf6', stepNum: 4 },
  { key: 'step5', completedKey: 'completedStep5', lessonsProp: 'lessonsStep5', navType: 'step5', tabType: 'step5Tab', name: 'STEP 5  AI収益化',    color: '#f59e0b', stepNum: 5 },
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
  const levelInfo    = getLevel();
  const levelPct     = getLevelProgress();
  const titleInfo    = getTitle ? getTitle() : null;

  const allStepLessons = { lessonsStep1, lessonsStep2, lessonsStep3, lessonsStep4, lessonsStep5 };

  const stepDone = {
    step1: progress.completedStep1?.length || 0,
    step2: progress.completedStep2?.length || 0,
    step3: progress.completedStep3?.length || 0,
    step4: progress.completedStep4?.length || 0,
    step5: progress.completedStep5?.length || 0,
  };

  /* Next lesson to study */
  let primaryLesson    = null;
  let primaryStepCfg   = null;
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
      <div style={{
        background: 'var(--navy)',
        padding: '22px 20px 26px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle decoration circles */}
        <div style={{
          position: 'absolute', top: -48, right: -48,
          width: 140, height: 140,
          border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -32, left: -32,
          width: 100, height: 100,
          border: '1px solid rgba(255,255,255,0.03)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Label + level card row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginBottom: '6px' }}>
                AI SCHOOL
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'white', lineHeight: 1.25, letterSpacing: '-0.2px' }}>
                {titleInfo ? titleInfo.title : levelInfo.name}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '3px', fontWeight: 500 }}>
                {progress.xp.toLocaleString()} XP 獲得中
              </div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '10px 16px',
              textAlign: 'center',
              minWidth: '60px',
            }}>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '1px', marginBottom: '2px' }}>
                LV
              </div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: 'white', lineHeight: 1 }}>
                {levelInfo.level}
              </div>
            </div>
          </div>

          {/* XP bar */}
          <div>
            <div className="progress-bar-white">
              <div className="progress-bar-white-inner" style={{ width: `${levelPct}%` }} />
            </div>
            {levelInfo.nextXp && (
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '5px', fontWeight: 500 }}>
                次のレベルまで {levelInfo.nextXp - progress.xp} XP
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>

        {/* ── 次にやること ── */}
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
          次にやること
        </div>

        {primaryLesson && primaryStepCfg ? (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '20px',
          }}>
            {/* Step label bar */}
            <div style={{
              background: primaryStepCfg.color,
              padding: '8px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: 700 }}>
                {primaryStepCfg.name}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontWeight: 600 }}>
                {stepDone[primaryStepCfg.key]}/6 完了
              </span>
            </div>

            {/* Lesson content */}
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '32px', lineHeight: 1, flexShrink: 0 }}>
                  {primaryLesson.emoji}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text)', marginBottom: '3px', lineHeight: 1.3 }}>
                    {primaryLesson.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    約 {primaryLesson.duration}
                  </div>
                </div>
              </div>

              {/* Step progress bar */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ height: '3px', borderRadius: '99px', background: 'var(--border)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '99px',
                    background: primaryStepCfg.color,
                    width: `${Math.round((stepDone[primaryStepCfg.key] / 6) * 100)}%`,
                    transition: 'width 0.5s ease', minWidth: '4px',
                  }} />
                </div>
              </div>

              <button
                style={{
                  width: '100%', padding: '13px', border: 'none',
                  borderRadius: '10px', background: primaryStepCfg.color,
                  color: 'white', fontFamily: 'inherit',
                  fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                }}
                onClick={() => onNavigate('learning', { type: primaryStepCfg.navType, id: primaryLesson.id })}
              >
                学習を続ける
              </button>
            </div>
          </div>
        ) : all5Done ? (
          <div style={{
            background: 'var(--success-bg)',
            border: '1.5px solid #6ee7b7',
            borderRadius: '16px', padding: '22px',
            textAlign: 'center', marginBottom: '20px',
          }}>
            <div style={{ fontSize: '36px', marginBottom: '10px' }}>🏆</div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#065f46', marginBottom: '6px' }}>
              STEP 1〜5 すべて完了！
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
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            学習ロードマップ
          </div>
          <button
            onClick={() => onNavigate('home', { type: 'roadmap' })}
            style={{
              background: 'none', border: 'none', color: 'var(--primary)',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            詳細 ›
          </button>
        </div>

        <div style={{
          display: 'flex', gap: '0',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          {ROADMAP_STAGES.map((stage, idx) => {
            const done        = stepDone[stage.id] || 0;
            const total       = stage.total || 6;
            const isGrad      = stage.id === 'step6';
            const isCompleted = !isGrad && done >= total;
            const isCurrent   = !isGrad && !isCompleted && (
              idx === 0 || ROADMAP_STAGES.slice(0, idx).every((s) => (stepDone[s.id] || 0) >= (s.total || 6))
            );

            return (
              <button
                key={stage.id}
                onClick={() => onNavigate('learning', { type: isGrad ? 'step6Tab' : `${stage.id}Tab` })}
                style={{
                  flex: 1,
                  padding: '12px 4px 10px',
                  border: 'none',
                  borderRight: idx < ROADMAP_STAGES.length - 1 ? '1px solid var(--border)' : 'none',
                  background: isCompleted ? '#ecfdf5' : isCurrent ? 'var(--primary-light)' : 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: 1 }}>
                  {isCompleted ? '✓' : stage.emoji}
                </span>
                <span style={{
                  fontSize: '8px', fontWeight: 700,
                  color: isCompleted ? 'var(--success)' : isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                  letterSpacing: '0.3px',
                }}>
                  S{stage.stepNum}
                </span>
                {!isGrad && (
                  <div style={{
                    width: '20px', height: '2px', borderRadius: '99px',
                    background: isCompleted ? 'var(--success)' : isCurrent ? 'var(--primary)' : 'var(--border)',
                  }} />
                )}
              </button>
            );
          })}
        </div>

      </div>

      <div style={{ height: '20px' }} />
    </div>
  );
}
