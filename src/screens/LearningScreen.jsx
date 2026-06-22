export default function LearningScreen({ lessons, completedLessons, onSelectLesson }) {
  const categories = [...new Set(lessons.map((l) => l.category))];
  const completedCount = completedLessons.length;

  return (
    <div>
      <div className="gradient-header">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>📚 学習コース</h1>
          <p>AIの基礎から実践まで、12本のレッスンで学ぼう</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
            <span style={{ background: 'rgba(255,255,255,0.25)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
              ✅ {completedCount} / 12 完了
            </span>
            <span style={{ background: 'rgba(255,255,255,0.25)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
              +50 XP/レッスン
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Hint */}
        <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '12px', padding: '12px', marginBottom: '16px', fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>
          💡 順番通りに学ぶと理解しやすくなっています。まず「基礎」から始めましょう！
        </div>

        {categories.map((cat) => (
          <div key={cat}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', marginTop: '16px' }}>
              ── {cat} ──
            </div>
            {lessons
              .filter((l) => l.category === cat)
              .map((lesson) => {
                const done = completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    className={`lesson-card${done ? ' completed' : ''}`}
                    onClick={() => onSelectLesson(lesson.id)}
                  >
                    <div className="lesson-emoji">{lesson.emoji}</div>
                    <div className="lesson-info">
                      <div className="lesson-title">
                        {lesson.id}. {lesson.title}
                      </div>
                      <div className="lesson-meta">
                        <span>🕐 {lesson.duration}</span>
                        {done && <span style={{ color: '#10b981', fontWeight: 700 }}>✓ 完了</span>}
                        {!done && <span>+50 XP</span>}
                      </div>
                    </div>
                    {done ? (
                      <span style={{ fontSize: '20px', color: '#10b981' }}>✅</span>
                    ) : (
                      <span style={{ fontSize: '18px', color: '#94a3b8' }}>›</span>
                    )}
                  </button>
                );
              })}
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '20px 0', color: '#94a3b8', fontSize: '13px' }}>
          全12レッスン • 合計600 XP獲得可能
        </div>
      </div>
    </div>
  );
}
