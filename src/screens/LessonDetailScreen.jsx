import { useState } from 'react';

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

  const courseColor =
    courseType === 'beginner' ? '#3b82f6' :
    courseType === 'advanced' ? '#10b981' :
    courseType === 'expert'   ? '#8b5cf6' : '#6366f1';
  const courseLabel =
    courseType === 'beginner' ? '基礎編' :
    courseType === 'advanced' ? '活用編' :
    courseType === 'expert'   ? '開発編' : null;

  function toggleGoal(i) {
    setGoalChecks(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  }

  function handleSelect(index) {
    if (submitted) return;
    setSelectedAnswer(index);
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
      <div style={{
        background: courseColor,
        padding: '16px 16px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 140, height: 140,
          background: 'rgba(255,255,255,0.08)', borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <button
              onClick={onBack}
              style={{
                background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
                borderRadius: '8px', padding: '6px 12px', fontFamily: 'inherit',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              ‹ 戻る
            </button>
            {courseLabel && courseIndex && (
              <span style={{
                background: 'rgba(255,255,255,0.2)', color: 'white',
                borderRadius: '20px', padding: '4px 10px', fontSize: '11px', fontWeight: 700,
              }}>
                {courseLabel} 第{courseIndex}回
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '40px', lineHeight: 1 }}>{lesson.emoji}</span>
            <div>
              <h1 style={{ color: 'white', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.3px', margin: 0 }}>
                {lesson.title}
              </h1>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '4px' }}>
                🕐 {lesson.duration}
                {isCompleted && ' · ✅ 完了済み'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 16px' }}>

        {/* ── TODAY'S GOAL ── */}
        {lesson.todayGoal && (
          <div style={{
            background: '#f0f9ff',
            border: '1.5px solid #bae6fd',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0369a1' }}>今日のゴール</div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                {checkedCount}/{totalGoals}
              </div>
            </div>
            {lesson.todayGoal.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleGoal(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', background: 'none', border: 'none',
                  padding: '7px 0', cursor: 'pointer', textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{
                  width: 20, height: 20, borderRadius: '6px', flexShrink: 0,
                  border: `2px solid ${goalChecks.includes(i) ? '#0ea5e9' : '#cbd5e1'}`,
                  background: goalChecks.includes(i) ? '#0ea5e9' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}>
                  {goalChecks.includes(i) && (
                    <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>✓</span>
                  )}
                </span>
                <span style={{
                  fontSize: '13px', fontWeight: 500,
                  color: goalChecks.includes(i) ? '#94a3b8' : '#1e293b',
                  textDecoration: goalChecks.includes(i) ? 'line-through' : 'none',
                  transition: 'all 0.15s',
                }}>
                  {item}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ── STEP 1: 読む ── */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span style={{
              background: courseColor, color: 'white',
              borderRadius: '20px', padding: '3px 10px',
              fontSize: '11px', fontWeight: 800,
            }}>STEP 1</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>読む</span>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>2〜3分</span>
          </div>
          <div style={{
            fontSize: '14px', lineHeight: 1.9, color: '#1e293b',
            whiteSpace: 'pre-line',
          }}>
            {lesson.content}
          </div>
          {lesson.analogy && (
            <div style={{
              background: '#fffbeb', borderLeft: '3px solid #f59e0b',
              borderRadius: '0 12px 12px 0', padding: '14px',
              marginTop: '16px', fontSize: '13px', color: '#78350f', lineHeight: 1.7,
            }}>
              💡 {lesson.analogy}
            </div>
          )}
        </div>

        {/* ── STEP 2: 実践 ── */}
        {lesson.practice && (
          <div style={{
            background: '#f8fafc', border: '1.5px solid #e2e8f0',
            borderRadius: '16px', padding: '16px', marginBottom: '28px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{
                background: '#10b981', color: 'white',
                borderRadius: '20px', padding: '3px 10px',
                fontSize: '11px', fontWeight: 800,
              }}>STEP 2</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>実践</span>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>5分</span>
            </div>

            {lesson.practice.intro && (
              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '14px', lineHeight: 1.6 }}>
                {lesson.practice.intro}
              </p>
            )}

            {lesson.practice.steps && lesson.practice.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: '#10b981', color: 'white',
                  fontSize: '11px', fontWeight: 700, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.6, paddingTop: '2px' }}>
                  {step}
                </span>
              </div>
            ))}

            {lesson.practice.promptExample && (
              <div style={{ marginTop: '14px' }}>
                <div style={{
                  fontSize: '11px', fontWeight: 700, color: '#64748b',
                  marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px',
                }}>
                  コピーして貼り付ける
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
                  background: courseColor, color: 'white',
                  borderRadius: '10px', padding: '10px 16px',
                  fontSize: '13px', fontWeight: 700, textDecoration: 'none',
                  marginTop: '12px', boxShadow: `0 3px 10px ${courseColor}40`,
                }}
              >
                {lesson.practice.tool} を開く →
              </a>
            )}
          </div>
        )}

        {/* ── STEP 3: クイズ ── */}
        {quiz && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{
                background: '#6366f1', color: 'white',
                borderRadius: '20px', padding: '3px 10px',
                fontSize: '11px', fontWeight: 800,
              }}>STEP 3</span>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>確認クイズ</span>
            </div>

            <div style={{
              fontSize: '15px', fontWeight: 700, color: '#1e293b',
              marginBottom: '16px', lineHeight: 1.5,
            }}>
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
                    : selectedAnswer === index ? courseColor : '#e2e8f0',
                  color: submitted
                    ? (index === quiz.answer || index === selectedAnswer) ? 'white' : '#64748b'
                    : selectedAnswer === index ? 'white' : '#64748b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}

            {!submitted && selectedAnswer !== null && (
              <button
                className="btn btn-primary btn-full"
                style={{ marginTop: '4px' }}
                onClick={handleSubmitQuiz}
              >
                答え合わせをする
              </button>
            )}

            {submitted && (
              <div style={{
                background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
                border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                borderRadius: '12px', padding: '14px', marginTop: '4px',
              }}>
                <div style={{ fontWeight: 700, fontSize: '15px', color: isCorrect ? '#065f46' : '#991b1b', marginBottom: '6px' }}>
                  {isCorrect ? '🎉 正解！' : `😅 惜しい！正解は「${quiz.options[quiz.answer]}」`}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                  {quiz.explanation}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── COMPLETE / ACHIEVEMENT ── */}
        {showAchievement ? (
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            border: '1.5px solid #86efac',
            borderRadius: '16px', padding: '20px',
            marginBottom: '16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎓</div>
            <div style={{
              fontSize: '16px', fontWeight: 800, color: '#065f46', marginBottom: '16px',
            }}>
              あなたは今日
            </div>
            {(lesson.canDo || lesson.points || []).map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 12px', background: 'white', borderRadius: '10px',
                marginBottom: '8px', textAlign: 'left',
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: '#10b981', color: 'white',
                  fontSize: '12px', fontWeight: 700, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>✓</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                  {item}
                </span>
              </div>
            ))}
            <div style={{
              marginTop: '14px', fontSize: '14px', fontWeight: 700,
              color: '#059669', letterSpacing: '0.5px',
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

        {/* ── PREV / NEXT NAV ── */}
        {(prevLesson || nextLesson) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: prevLesson && nextLesson ? '1fr 1fr' : '1fr',
            gap: '8px', marginTop: '8px', marginBottom: '8px',
          }}>
            {prevLesson && (
              <button
                onClick={() => onNavigateLesson(prevLesson.id)}
                style={{
                  background: '#f8fafc', border: '1.5px solid #e2e8f0',
                  borderRadius: '12px', padding: '12px',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>
                  ‹ 前のレッスン
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>
                  {prevLesson.emoji} {prevLesson.title}
                </div>
              </button>
            )}
            {nextLesson && (
              <button
                onClick={() => onNavigateLesson(nextLesson.id)}
                style={{
                  background: courseColor, border: 'none',
                  borderRadius: '12px', padding: '12px',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'right',
                }}
              >
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginBottom: '4px' }}>
                  次のレッスン ›
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'white', lineHeight: 1.4 }}>
                  {nextLesson.emoji} {nextLesson.title}
                </div>
              </button>
            )}
          </div>
        )}

        <button
          className="btn btn-ghost btn-full"
          style={{ marginTop: '4px' }}
          onClick={onBack}
        >
          ← コース一覧へ戻る
        </button>

        <div style={{ height: '24px' }} />
      </div>
    </div>
  );
}
