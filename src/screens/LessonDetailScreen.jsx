import { useState } from 'react';

const STEP_COLORS = {
  step1: '#3b82f6', step2: '#10b981', step3: '#ec4899',
  step4: '#8b5cf6', step5: '#f59e0b',
  beginner: '#3b82f6', advanced: '#10b981', expert: '#8b5cf6',
};

const STEP_LABELS = {
  step1: 'STEP 1  AI基礎',
  step2: 'STEP 2  AI実践',
  step3: 'STEP 3  AIクリエイト',
  step4: 'STEP 4  AI開発',
  step5: 'STEP 5  AI収益化',
  beginner: '基礎編',
  advanced: '活用編',
  expert: '開発編',
};

/* 統一セクションラベル — 番号 + テキスト */
function SectionLabel({ num, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <span style={{
        width: '22px', height: '22px',
        background: 'var(--navy)', color: 'white',
        borderRadius: '5px', fontSize: '11px', fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>{num}</span>
      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.1px' }}>
        {label}
      </span>
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
  prevLesson,
  nextLesson,
  onNavigateLesson,
}) {
  const [goalChecks, setGoalChecks]     = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted]       = useState(false);
  const [copied, setCopied]             = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  if (!lesson) return null;

  const { quiz }    = lesson;
  const isCorrect   = quiz ? selectedAnswer === quiz.answer : false;
  const canComplete = quiz ? submitted : true;
  const showDone    = justCompleted || isCompleted;

  const color       = STEP_COLORS[courseType] || 'var(--primary)';
  const stepLabel   = STEP_LABELS[courseType] || '';
  const achieveItems = lesson.canDo || lesson.points || [];

  function toggleGoal(i) {
    setGoalChecks((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
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
  const totalGoals   = lesson.todayGoal?.length ?? 0;

  return (
    <div style={{ background: 'var(--surface)', minHeight: '100%' }}>

      {/* ── HEADER ── */}
      <div style={{ background: color, padding: '16px 20px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <button
              onClick={onBack}
              style={{
                background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white',
                borderRadius: '8px', padding: '7px 14px', fontFamily: 'inherit',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              ‹ 戻る
            </button>
            {stepLabel && (
              <span style={{
                background: 'rgba(255,255,255,0.15)', color: 'white',
                borderRadius: '20px', padding: '4px 12px',
                fontSize: '11px', fontWeight: 600,
              }}>
                {stepLabel}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '40px', lineHeight: 1 }}>{lesson.emoji}</span>
            <div>
              <h1 style={{
                color: 'white', fontSize: '19px', fontWeight: 700,
                letterSpacing: '-0.3px', margin: 0, lineHeight: 1.25,
              }}>
                {lesson.title}
              </h1>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', marginTop: '5px', fontWeight: 400 }}>
                {lesson.duration}{isCompleted && ' · 完了済み'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>

        {/* ── 1: 今日のゴール ── */}
        {lesson.todayGoal && (
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: '12px', padding: '18px', marginBottom: '24px',
          }}>
            <SectionLabel num={1} label="今日のゴール" />
            {lesson.todayGoal.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleGoal(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  width: '100%', background: 'none', border: 'none',
                  padding: '9px 0', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  borderBottom: i < lesson.todayGoal.length - 1 ? '1px solid var(--border-light)' : 'none',
                }}
              >
                <span style={{
                  width: 20, height: 20, borderRadius: '5px', flexShrink: 0, minWidth: 20,
                  border: `1.5px solid ${goalChecks.includes(i) ? 'var(--primary)' : 'var(--border)'}`,
                  background: goalChecks.includes(i) ? 'var(--primary)' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}>
                  {goalChecks.includes(i) && (
                    <span style={{ color: 'white', fontSize: '11px', fontWeight: 700 }}>✓</span>
                  )}
                </span>
                <span style={{
                  fontSize: '13px', fontWeight: 400, lineHeight: 1.55,
                  color: goalChecks.includes(i) ? 'var(--text-muted)' : 'var(--text)',
                  textDecoration: goalChecks.includes(i) ? 'line-through' : 'none',
                }}>
                  {item}
                </span>
              </button>
            ))}
            <div style={{ marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
              {checkedCount}/{totalGoals} 確認済み
            </div>
          </div>
        )}

        {/* ── 2: 5分で読む ── */}
        <div style={{ marginBottom: '24px' }}>
          <SectionLabel num={2} label="5分で読む" />
          <div style={{ fontSize: '14px', lineHeight: 2.0, color: 'var(--text)', whiteSpace: 'pre-line' }}>
            {lesson.content}
          </div>
          {lesson.analogy && (
            <div style={{
              background: 'var(--warning-bg)', borderLeft: '3px solid var(--warning)',
              borderRadius: '0 10px 10px 0', padding: '12px 16px',
              marginTop: '18px', fontSize: '13px', color: '#78350f', lineHeight: 1.7,
            }}>
              {lesson.analogy}
            </div>
          )}
        </div>

        {/* ── 3: 実践する ── */}
        {lesson.practice && (
          <div style={{
            background: 'var(--raised)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '18px', marginBottom: '24px',
          }}>
            <SectionLabel num={3} label="実践する" />

            {lesson.practice.intro && (
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.7 }}>
                {lesson.practice.intro}
              </p>
            )}

            {lesson.practice.steps?.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'var(--navy)', color: 'white',
                  fontSize: '10px', fontWeight: 700, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.7, paddingTop: '2px' }}>
                  {step}
                </span>
              </div>
            ))}

            {lesson.practice.promptExample && (
              <div style={{ marginTop: '16px' }}>
                <div style={{
                  fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)',
                  marginBottom: '8px', letterSpacing: '0.5px',
                }}>
                  コピーして使う
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
                  borderRadius: '8px', padding: '10px 16px',
                  fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                  marginTop: '14px',
                }}
              >
                {lesson.practice.tool} を開く →
              </a>
            )}
          </div>
        )}

        {/* ── 4: できるようになったこと ── */}
        {achieveItems.length > 0 && (
          <div style={{
            background: showDone ? 'var(--success-bg)' : 'var(--surface)',
            border: `1px solid ${showDone ? '#86efac' : 'var(--border)'}`,
            borderRadius: '12px', padding: '18px', marginBottom: '24px',
            transition: 'all 0.3s ease',
          }}>
            <SectionLabel num={4} label="できるようになったこと" />
            {achieveItems.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '8px 10px',
                background: showDone ? 'white' : 'var(--raised)',
                borderRadius: '8px', marginBottom: '6px',
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  background: showDone ? 'var(--success)' : 'var(--border)',
                  color: showDone ? 'white' : 'var(--text-muted)',
                  fontSize: '9px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                }}>
                  {showDone ? '✓' : '·'}
                </span>
                <span style={{
                  fontSize: '13px', fontWeight: showDone ? 500 : 400,
                  color: showDone ? 'var(--text)' : 'var(--text-muted)',
                  lineHeight: 1.55, transition: 'all 0.3s',
                }}>
                  {item}
                </span>
              </div>
            ))}
            {showDone && (
              <div style={{
                marginTop: '12px', textAlign: 'center',
                fontSize: '13px', fontWeight: 700, color: 'var(--success)',
              }}>
                +50 XP 獲得
              </div>
            )}
          </div>
        )}

        {/* ── 5: 確認クイズ ── */}
        {quiz && (
          <div style={{ marginBottom: '24px' }}>
            <SectionLabel num={5} label="確認クイズ" />
            <div style={{
              fontSize: '15px', fontWeight: 600, color: 'var(--text)',
              marginBottom: '16px', lineHeight: 1.6,
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
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: submitted
                    ? index === quiz.answer ? 'var(--success)'
                      : index === selectedAnswer ? 'var(--error)' : 'var(--raised)'
                    : selectedAnswer === index ? color : 'var(--raised)',
                  color: submitted
                    ? (index === quiz.answer || index === selectedAnswer) ? 'white' : 'var(--text-muted)'
                    : selectedAnswer === index ? 'white' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700, transition: 'all 0.2s',
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
                background: isCorrect ? 'rgba(5,150,105,0.06)' : 'rgba(220,38,38,0.06)',
                border: `1px solid ${isCorrect ? 'rgba(5,150,105,0.2)' : 'rgba(220,38,38,0.2)'}`,
                borderRadius: '10px', padding: '14px 16px', marginTop: '4px',
              }}>
                <div style={{
                  fontWeight: 700, fontSize: '14px',
                  color: isCorrect ? '#065f46' : '#991b1b', marginBottom: '6px',
                }}>
                  {isCorrect ? '正解' : `惜しい。正解は「${quiz.options[quiz.answer]}」`}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {quiz.explanation}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── 完了 ── */}
        {showDone ? (
          <div style={{
            background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)',
            borderRadius: '12px', padding: '16px', textAlign: 'center', marginBottom: '12px',
          }}>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#065f46', marginBottom: '3px' }}>
              完了済み
            </div>
            <div style={{ fontSize: '12px', color: 'var(--success)', fontWeight: 500 }}>
              +50 XP 獲得済み
            </div>
          </div>
        ) : (
          <button
            className={`btn btn-full btn-lg ${canComplete ? 'btn-success' : 'btn-ghost'}`}
            style={{ marginBottom: '8px' }}
            onClick={canComplete ? handleComplete : undefined}
            disabled={!canComplete}
          >
            {canComplete ? '完了 +50 XP' : 'クイズに答えてから完了'}
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
                  background: 'var(--raised)', border: '1px solid var(--border)',
                  borderRadius: '10px', padding: '12px',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  overflow: 'hidden', minWidth: 0,
                }}
              >
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '4px' }}>
                  ‹ 前のレッスン
                </div>
                <div style={{
                  fontSize: '12px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.4,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {prevLesson.title}
                </div>
              </button>
            ) : <div />}
            {nextLesson && (
              <button
                onClick={() => onNavigateLesson(nextLesson.id)}
                style={{
                  background: 'var(--navy)', border: 'none',
                  borderRadius: '10px', padding: '12px',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'right',
                  overflow: 'hidden', minWidth: 0,
                }}
              >
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginBottom: '4px' }}>
                  次のレッスン ›
                </div>
                <div style={{
                  fontSize: '12px', fontWeight: 600, color: 'white', lineHeight: 1.4,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {nextLesson.title}
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
