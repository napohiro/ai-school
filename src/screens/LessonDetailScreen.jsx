import { useState } from 'react';

export default function LessonDetailScreen({ lesson, isCompleted, onComplete, onBack }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!lesson) return null;

  const { quiz } = lesson;
  const isCorrect = selectedAnswer === quiz.answer;

  function handleSelect(index) {
    if (submitted) return;
    setSelectedAnswer(index);
  }

  function handleSubmitQuiz() {
    if (selectedAnswer === null) return;
    setSubmitted(true);
  }

  function getOptionClass(index) {
    if (!submitted) {
      return selectedAnswer === index ? 'quiz-option selected' : 'quiz-option';
    }
    if (index === quiz.answer) return 'quiz-option correct disabled';
    if (index === selectedAnswer && index !== quiz.answer) return 'quiz-option incorrect disabled';
    return 'quiz-option disabled';
  }

  const canComplete = submitted;

  return (
    <div>
      {/* Header */}
      <div className="detail-header">
        <div className="detail-header-content">
          <button className="back-btn" onClick={onBack}>
            ‹ もどる
          </button>
          <span className="detail-emoji">{lesson.emoji}</span>
          <div className="detail-title">{lesson.title}</div>
          <div className="detail-subtitle">
            🕐 {lesson.duration} ・ {lesson.category}
            {isCompleted && ' ・ ✅ 完了済み'}
          </div>
        </div>
      </div>

      <div className="detail-body">
        {/* Main Content */}
        <div className="content-section">
          <div className="content-section-title">📖 レッスン内容</div>
          <div className="content-text">{lesson.content}</div>
        </div>

        {/* Analogy */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8', marginBottom: '8px' }}>
            💡 わかりやすいたとえ
          </div>
          <div className="analogy-box">{lesson.analogy}</div>
        </div>

        {/* Key Points */}
        <div className="content-section">
          <div className="content-section-title">✅ このレッスンのポイント</div>
          {lesson.points.map((point, i) => (
            <div key={i} className="point-item">
              <div className="point-dot">{i + 1}</div>
              <div>{point}</div>
            </div>
          ))}
        </div>

        {/* Quiz */}
        <div className="content-section">
          <div className="content-section-title">🧩 確認クイズ</div>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px', color: '#1e293b', lineHeight: 1.5 }}>
            {quiz.question}
          </div>

          {quiz.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => handleSelect(index)}
            >
              <span style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: submitted
                  ? index === quiz.answer
                    ? '#10b981'
                    : index === selectedAnswer
                    ? '#ef4444'
                    : '#e2e8f0'
                  : selectedAnswer === index
                  ? '#6366f1'
                  : '#e2e8f0',
                color: submitted
                  ? index === quiz.answer || index === selectedAnswer
                    ? 'white'
                    : '#64748b'
                  : selectedAnswer === index
                  ? 'white'
                  : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
                flexShrink: 0,
                transition: 'all 0.2s',
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
              background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
              border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
              borderRadius: '12px',
              padding: '14px',
              marginTop: '4px',
            }}>
              <div style={{ fontWeight: 700, fontSize: '15px', color: isCorrect ? '#065f46' : '#991b1b', marginBottom: '6px' }}>
                {isCorrect ? '🎉 正解！' : '😅 惜しい…正解は「' + quiz.options[quiz.answer] + '」でした'}
              </div>
              <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
                {quiz.explanation}
              </div>
            </div>
          )}
        </div>

        {/* Complete Button */}
        {!isCompleted ? (
          <button
            className={`btn btn-full btn-lg${canComplete ? ' btn-success' : ' btn-ghost'}`}
            style={{ marginBottom: '8px' }}
            onClick={canComplete ? onComplete : undefined}
            disabled={!canComplete}
          >
            {canComplete
              ? '🎓 理解した！ +50 XP'
              : '👆 まずクイズに答えてみよう'}
          </button>
        ) : (
          <div style={{
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '14px',
            padding: '16px',
            textAlign: 'center',
            marginBottom: '8px',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>✅</div>
            <div style={{ fontWeight: 700, color: '#065f46', fontSize: '15px' }}>
              このレッスンは完了済みです！
            </div>
          </div>
        )}

        <button className="btn btn-secondary btn-full" onClick={onBack}>
          ← レッスン一覧に戻る
        </button>

        <div style={{ height: '16px' }} />
      </div>
    </div>
  );
}
