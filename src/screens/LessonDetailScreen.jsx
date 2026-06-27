import { useState } from 'react';

const STEP_COLORS = {
  step1: '#3b82f6', step2: '#10b981', step3: '#ec4899',
  step4: '#8b5cf6', step5: '#f59e0b',
  beginner: '#3b82f6', advanced: '#10b981', expert: '#8b5cf6',
};

const STEP_LABELS = {
  step1: 'STEP 1  AI基礎',    step2: 'STEP 2  AI実践',
  step3: 'STEP 3  クリエイト', step4: 'STEP 4  AI開発',
  step5: 'STEP 5  収益化',    beginner: '基礎編',
  advanced: '活用編',          expert: '開発編',
};

/* ── section label pill ── */
function StepPill({ num, label, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
      <span style={{
        background: color, color: 'white',
        borderRadius: '6px', padding: '3px 10px',
        fontSize: '10px', fontWeight: 800, letterSpacing: '0.5px',
        flexShrink: 0,
      }}>STEP {num}</span>
      <span style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>{label}</span>
    </div>
  );
}

export default function LessonDetailScreen({
  lesson,
  isCompleted,
  onComplete,
  onBack,
  onQuizSubmit,
  courseType,
  courseIndex,
  prevLesson,
  nextLesson,
  onNavigateLesson,
}) {
  const [goalChecks, setGoalChecks] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  if (!lesson) return null;

  const { quiz } = lesson;
  const isCorrect = quiz ? selectedAnswer === quiz.answer : false;
  const canComplete = quiz ? submitted : true;
  const showAchievement = justCompleted || isCompleted;

  const color = STEP_COLORS[courseType] || '#6366f1';
  const stepLabel = STEP_LABELS[courseType] || '';

  function toggleGoal(i) {
    setGoalChecks(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  }

  function handleSelect(index) {
    if (!submitted) setSelectedAnswer(index);
  }

  function handleSubmitQuiz() {
    if (selectedAnswer === null) return;
    setSubmitted(true);
    if (onQuizSubmit) onQuizSubmit(selectedAnswer === quiz.answer);
  }

  function handleComplete() {
    setJustCompleted(true);
    onComplete();
  }

  function handleCopy() {
    if (lesson.practice?.promptExample) {
      navigator.clipboard.writeText(lesson.practice.promptExample).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function getOptionClass(index) {
    if (!submitted) return selectedAnswer === index ? 'quiz-option selected' : 'quiz-option';
    if (index === quiz.answer) return 'quiz-option correct disabled';
    if (index === selectedAnswer && index !== quiz.answer) return 'quiz-option incorrect disabled';
    return 'quiz-option disabled';
  }

  const checkedCount = goalChecks.length;
  const totalGoals = lesson.todayGoal?.length ?? 0;

  return (
    <div style={{ background: '#fff', minHeight: '100%' }}>

      {/* ── HEADER ── */}
      <div style={{ background: color, padding: '16px 20px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: -50, right: -50, width: 160, height: 160,
          background: 'rgba(255,255,255,0.07)', borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <button
              onClick={onBack}
              style={{
                background: 'rgba(255,255,255,0.18)', border: 'none', color: 'white',
                borderRadius: '8px', padding: '7px 14px', fontFamily: 'inherit',
                fontSize: '13px', fontWeight: 700, cursor: 'pointer',
              }}
            >
              ‹ 戻る
            </button>
            {stepLabel && (
              <span style={{
                background: 'rgba(255,255,255,0.18)', color: 'white',
                borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 700,
              }}>
                {stepLabel}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '44px', lineHeight: 1 }}>{lesson.emoji}</span>
            <div>
              <h1 style={{ color: 'white', fontSize: '20px', fontWeight: 900, letterSpacing: '-0.3px', margin: 0, lineHeight: 1.25 }}>
                {lesson.title}
              </h1>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', marginTop: '5px' }}>
                🕐 {lesson.duration}
                {isCompleted && ' · ✅ 完了済み'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>

        {/* ── STEP 1: 今日のゴール ── */}
        {lesson.todayGoal && (
          <div style={{
            background: '#f0f9ff', border: '1.5px solid #bae6fd',
            borderRadius: '16px', padding: '18px', marginBottom: '32px',
          }}>
            <StepPill num={1} label="今日のゴール" color="#0ea5e9" />
            {lesson.todayGoal.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleGoal(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  width: '100%', background: 'none', border: 'none',
                  padding: '8px 0', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  borderBottom: i < lesson.todayGoal.length - 1 ? '1px solid rgba(186,230,253,0.5)' : 'none',
                }}
              >
                <span style={{
                  width: 22, height: 22, borderRadius: '6px', flexShrink: 0,
                  border: `2px solid ${goalChecks.includes(i) ? '#0ea5e9' : '#94a3b8'}`,
                  background: goalChecks.includes(i) ? '#0ea5e9' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s', minWidth: 22,
                }}>
                  {goalChecks.includes(i) && <span style={{ color: 'white', fontSize: '12px', fontWeight: 800 }}>✓</span>}
                </span>
                <span style={{
                  fontSize: '13px', fontWeight: 500, lineHeight: 1.5,
                  color: goalChecks.includes(i) ? '#94a3b8' : '#0f172a',
                  textDecoration: goalChecks.includes(i) ? 'line-through' : 'none',
                }}>
                  {item}
                </span>
              </button>
            ))}
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#0369a1', fontWeight: 600 }}>
              {checkedCount}/{totalGoals} 完了
            </div>
          </div>
        )}

        {/* ── STEP 2: 読む ── */}
        <div style={{ marginBottom: '32px' }}>
          <StepPill num={2} label="読む" color={color} />
          <div style={{
            fontSize: '15px', lineHeight: 2.0, color: '#1e293b',
            whiteSpace: 'pre-line', letterSpacing: '0.01em',
          }}>
            {lesson.content}
          </div>
          {lesson.analogy && (
            <div style={{
              background: '#fffbeb', borderLeft: '4px solid #f59e0b',
              borderRadius: '0 12px 12px 0', padding: '14px 16px',
              marginTop: '20px', fontSize: '13px', color: '#78350f', lineHeight: 1.8,
            }}>
              💡 {lesson.analogy}
            </div>
          )}
        </div>

        {/* ── STEP 3: 実践する ── */}
        {lesson.practice && (
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderRadius: '16px', padding: '18px', marginBottom: '32px',
          }}>
            <StepPill num={3} label="実践する" color="#10b981" />

            {lesson.practice.intro && (
              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px', lineHeight: 1.7 }}>
                {lesson.practice.intro}
              </p>
            )}

            {lesson.practice.steps?.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: '#10b981', color: 'white',
                  fontSize: '11px', fontWeight: 800, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.7, paddingTop: '3px' }}>
                  {step}
                </span>
              </div>
            ))}

            {lesson.practice.promptExample && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '8px', letterSpacing: '0.5px' }}>
                  ✍️ コピーして使う
                </div>
                <div className="prompt-box">
                  <pre>{lesson.practice.promptExample}</pre>
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied ? '✓ コピー済' : 'コピー'}
                  </button>
                </div>
              </div>
            )}

            {lesson.practice.toolUrl && (
              <a
                href={lesson.practice.toolUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: color, color: 'white',
                  borderRadius: '10px', padding: '11px 18px',
                  fontSize: '13px', fontWeight: 700, textDecoration: 'none',
                  marginTop: '14px',
                }}
              >
                🔗 {lesson.practice.tool} を開く →
              </a>
            )}
          </div>
        )}

        {/* ── STEP 4: 確認クイズ ── */}
        {quiz && (
          <div style={{ marginBottom: '32px' }}>
            <StepPill num={4} label="確認クイズ" color="#6366f1" />
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '18px', lineHeight: 1.6 }}>
              {quiz.question}
            </div>
            {quiz.options.map((option, index) => (
              <button
                key={index}
                className={getOptionClass(index)}
                onClick={() => handleSelect(index)}
              >
                <span style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: submitted
                    ? index === quiz.answer ? '#10b981'
                    : index === selectedAnswer ? '#ef4444' : '#e2e8f0'
                    : selectedAnswer === index ? color : '#e2e8f0',
                  color: submitted
                    ? (index === quiz.answer || index === selectedAnswer) ? 'white' : '#64748b'
                    : selectedAnswer === index ? 'white' : '#64748b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, flexShrink: 0, transition: 'all 0.2s',
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
            {!submitted && selectedAnswer !== null && (
              <button className="btn btn-primary btn-full" style={{ marginTop: '4px' }} onClick={handleSubmitQuiz}>
                答え合わせをする
              </button>
            )}
            {submitted && (
              <div style={{
                background: isCorrect ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.07)',
                border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)'}`,
                borderRadius: '12px', padding: '16px', marginTop: '4px',
              }}>
                <div style={{ fontWeight: 800, fontSize: '15px', color: isCorrect ? '#065f46' : '#991b1b', marginBottom: '6px' }}>
                  {isCorrect ? '🎉 正解！' : `😅 惜しい！正解は「${quiz.options[quiz.answer]}」`}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7 }}>
                  {quiz.explanation}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── できるようになったこと / 完了 ── */}
        {showAchievement ? (
          <div style={{
            background: '#f0fdf4', border: '1.5px solid #86efac',
            borderRadius: '16px', padding: '22px', marginBottom: '16px',
          }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#065f46', marginBottom: '14px', letterSpacing: '0.3px' }}>
              ✅ できるようになったこと
            </div>
            {(lesson.canDo || lesson.points || []).map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '10px 14px', background: 'white', borderRadius: '10px',
                marginBottom: '8px',
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: '#10b981', color: 'white',
                  fontSize: '12px', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>✓</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
            <div style={{
              marginTop: '14px', textAlign: 'center',
              fontSize: '15px', fontWeight: 800, color: '#059669', letterSpacing: '0.5px',
            }}>
              ✨ +50 XP 獲得！
            </div>
          </div>
        ) : (
          <button
            className={`btn btn-full btn-lg ${canComplete ? 'btn-success' : 'btn-ghost'}`}
            style={{ marginBottom: '8px' }}
            onClick={canComplete ? handleComplete : undefined}
            disabled={!canComplete}
          >
            {canComplete ? '🎓 完了 +50 XP' : '👆 クイズに答えてから完了'}
          </button>
        )}

        {/* ── 前後ナビ ── */}
        {(prevLesson || nextLesson) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: prevLesson && nextLesson ? '1fr 1fr' : prevLesson ? '1fr' : '0 1fr',
            gap: '8px', marginTop: '12px',
          }}>
            {prevLesson ? (
              <button
                onClick={() => onNavigateLesson(prevLesson.id)}
                style={{
                  background: '#f8fafc', border: '1px solid #e2e8f0',
                  borderRadius: '12px', padding: '12px',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>‹ 前のレッスン</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>
                  {prevLesson.emoji} {prevLesson.title}
                </div>
              </button>
            ) : <div />}
            {nextLesson && (
              <button
                onClick={() => onNavigateLesson(nextLesson.id)}
                style={{
                  background: color, border: 'none',
                  borderRadius: '12px', padding: '12px',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'right',
                }}
              >
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginBottom: '4px' }}>次のレッスン ›</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'white', lineHeight: 1.4 }}>
                  {nextLesson.emoji} {nextLesson.title}
                </div>
              </button>
            )}
          </div>
        )}

        <button
          className="btn btn-ghost btn-full"
          style={{ marginTop: '10px' }}
          onClick={onBack}
        >
          ← コース一覧へ戻る
        </button>

        <div style={{ height: '24px' }} />
      </div>
    </div>
  );
}
