import { COURSES } from '../data/courses';

const GRADUATION_SKILLS = [
  'AI基礎', 'プロンプト設計', 'コンテンツ制作', '画像生成',
  'Claude Code', 'GitHub', 'Vercel', 'AI副業', 'AI SaaS',
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

function getStageStatus(courseId, progress) {
  if (courseId === 'step6') return 'coming';
  const done = getDoneCount(courseId, progress);
  if (done >= 6) return 'completed';
  if (done > 0) return 'active';
  return 'notstarted';
}

const STATUS_CONFIG = {
  completed:  { label: '✅ 完了',    bg: 'rgba(16,185,129,0.12)', color: '#065f46', border: '#10b981' },
  active:     { label: '▶ 学習中',  bg: 'rgba(99,102,241,0.1)',  color: '#4338ca', border: '#6366f1' },
  notstarted: { label: '— 未着手',   bg: '#f8fafc',               color: '#94a3b8', border: '#e2e8f0' },
  coming:     { label: '🗺️ 公開中', bg: '#f8fafc',               color: '#94a3b8', border: '#e2e8f0' },
};

export default function RoadmapScreen({ progress, onBack, onNavigate }) {
  const graduated =
    (progress.completedStep1?.length || 0) >= 6 &&
    (progress.completedStep2?.length || 0) >= 6 &&
    (progress.completedStep3?.length || 0) >= 6 &&
    (progress.completedStep4?.length || 0) >= 6 &&
    (progress.completedStep5?.length || 0) >= 6;

  function handleCourseClick(course) {
    if (course.id === 'step6') {
      onNavigate('learning', { type: 'step6Tab' });
      return;
    }
    onNavigate('learning', { type: `${course.id}Tab` });
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '20px 16px 24px', color: 'white',
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white',
            borderRadius: '10px', padding: '8px 14px', fontFamily: 'inherit',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '16px',
          }}
        >
          ← 戻る
        </button>
        <div style={{ fontSize: '11px', fontWeight: 700, opacity: 0.6, letterSpacing: '2px', marginBottom: '6px' }}>
          LEARNING ROADMAP
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 6px', lineHeight: 1.2 }}>
          🗺️ 学習ロードマップ
        </h1>
        <p style={{ fontSize: '13px', opacity: 0.75, margin: 0, lineHeight: 1.6 }}>
          STEP1〜6で、AIを武器に人生・仕事・ビジネスを変える<br />6段階の成長ロードマップ
        </p>
      </div>

      <div style={{ padding: '16px' }}>

        {/* Concept */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.08) 100%)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '16px', padding: '16px', marginBottom: '20px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '13px', color: '#6366f1', fontWeight: 800, marginBottom: '6px' }}>
            🎯 最終コンセプト
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', lineHeight: 1.7 }}>
            AIを使える人ではなく、<br />
            <span style={{ color: '#6366f1' }}>AIを武器に収益を得て、自立できる人</span><br />
            を育てるスクール。
          </div>
        </div>

        {/* Roadmap Stages */}
        <div style={{ marginBottom: '24px' }}>
          {COURSES.map((course, idx) => {
            const status = getStageStatus(course.id, progress);
            const cfg = STATUS_CONFIG[status];
            const done = getDoneCount(course.id, progress);
            const total = course.id === 'step6' ? 0 : 6;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <div key={course.id}>
                {idx > 0 && (
                  <div style={{
                    textAlign: 'center', fontSize: '20px', color: '#cbd5e1',
                    margin: '4px 0', lineHeight: 1,
                  }}>↓</div>
                )}

                <div
                  onClick={() => handleCourseClick(course)}
                  style={{
                    background: cfg.bg,
                    border: `2px solid ${cfg.border}`,
                    borderRadius: '16px', padding: '16px',
                    cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    {/* Stage icon */}
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '14px',
                      background: `${course.color}20`, border: `2px solid ${course.color}40`,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <div style={{ fontSize: '20px', lineHeight: 1 }}>{course.emoji}</div>
                      <div style={{ fontSize: '9px', fontWeight: 800, color: course.color, marginTop: '1px' }}>
                        {course.level}
                      </div>
                    </div>

                    {/* Course info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 900, fontSize: '15px', color: '#1e293b' }}>
                          {course.name}
                        </span>
                        <span style={{
                          fontSize: '11px', fontWeight: 700, padding: '2px 8px',
                          borderRadius: '20px', background: cfg.bg, color: cfg.color,
                          border: `1px solid ${cfg.border}40`,
                        }}>
                          {cfg.label}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                        {course.subtitle}
                      </div>

                      {total > 0 && (
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '4px' }}>
                            <span>{done} / {total} 完了</span>
                            <span style={{ fontWeight: 700, color: course.color }}>{pct}%</span>
                          </div>
                          <div style={{ height: '5px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
                            <div style={{ height: '100%', borderRadius: '99px', background: course.color, width: `${pct}%`, transition: 'width 0.5s ease' }} />
                          </div>
                        </div>
                      )}

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {course.skills.map((skill) => (
                          <span key={skill} style={{
                            fontSize: '10px', fontWeight: 700, padding: '2px 6px',
                            borderRadius: '6px', background: `${course.color}14`, color: course.color,
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span style={{ color: cfg.color, fontSize: '18px', flexShrink: 0, alignSelf: 'center' }}>›</span>
                  </div>

                  <div style={{
                    marginTop: '10px', paddingTop: '10px',
                    borderTop: `1px solid ${course.color}20`,
                    fontSize: '12px', color: '#64748b',
                  }}>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>到達目標：</span>
                    {course.goal}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 認定証 */}
        <div style={{
          background: graduated
            ? 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)'
            : 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
          borderRadius: '20px', padding: '24px', marginBottom: '16px',
          border: graduated ? 'none' : '2px dashed #e2e8f0',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>{graduated ? '🎓' : '🔒'}</div>
            {graduated ? (
              <>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', letterSpacing: '2px', marginBottom: '4px' }}>
                  CERTIFICATE OF COMPLETION
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'white', marginBottom: '4px' }}>
                  AIスクール認定
                </div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: 'white' }}>
                  AI 個人開発者
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: '16px', fontWeight: 900, color: '#94a3b8', marginBottom: '4px' }}>
                  AIスクール認定 AI個人開発者
                </div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                  STEP1〜5全修了＋卒業制作提出で取得できます
                </div>
              </>
            )}
          </div>

          <div style={{
            background: graduated ? 'rgba(255,255,255,0.2)' : 'white',
            borderRadius: '14px', padding: '14px', marginBottom: '14px',
          }}>
            <div style={{
              fontSize: '12px', fontWeight: 700, marginBottom: '10px',
              color: graduated ? 'rgba(255,255,255,0.9)' : '#64748b',
            }}>
              習得スキル
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {GRADUATION_SKILLS.map((skill) => (
                <span key={skill} style={{
                  fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '8px',
                  background: graduated ? 'rgba(255,255,255,0.3)' : 'rgba(99,102,241,0.08)',
                  color: graduated ? 'white' : '#6366f1',
                  border: graduated ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(99,102,241,0.2)',
                }}>
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            background: graduated ? 'rgba(255,255,255,0.15)' : '#f8fafc',
            borderRadius: '12px', padding: '12px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
          }}>
            {[
              { label: '修了者名', value: 'ゲストユーザー' },
              { label: '認定名',   value: 'AI個人開発者' },
              { label: '卒業制作', value: '未提出' },
              { label: '公開URL', value: '未登録' },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontSize: '10px', fontWeight: 700, opacity: 0.6, color: graduated ? 'white' : '#64748b', marginBottom: '2px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: graduated ? 'white' : '#1e293b' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
