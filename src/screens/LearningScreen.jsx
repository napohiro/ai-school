import { useState } from 'react';

export default function LearningScreen({
  lessons,
  completedLessons,
  onSelectLesson,
  lessonsAdvanced,
  completedAdvancedLessons,
  onSelectAdvancedLesson,
}) {
  const [activeTab, setActiveTab] = useState('beginner');

  const isBeginner = activeTab === 'beginner';
  const currentLessons = isBeginner ? lessons : lessonsAdvanced;
  const completedCurrent = isBeginner ? completedLessons : completedAdvancedLessons;
  const onSelect = isBeginner ? onSelectLesson : onSelectAdvancedLesson;
  const completedCount = completedCurrent.length;
  const categories = [...new Set(currentLessons.map((l) => l.category))];

  const tabStyle = (active) => ({
    flex: 1,
    padding: '8px 4px',
    borderRadius: '9px',
    border: 'none',
    cursor: 'pointer',
    background: active ? 'white' : 'transparent',
    color: active ? '#6366f1' : 'rgba(255,255,255,0.85)',
    fontWeight: 700,
    fontSize: '13px',
    transition: 'all 0.2s',
  });

  return (
    <div>
      <div className="gradient-header">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>📚 学習コース</h1>
          <p>{isBeginner ? 'AIの基礎を12本のレッスンで学ぼう' : 'AIを仕事に使う12本の実践レッスン'}</p>

          {/* Tab switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '12px',
            padding: '4px',
            gap: '4px',
            marginTop: '14px',
          }}>
            <button style={tabStyle(isBeginner)} onClick={() => setActiveTab('beginner')}>
              📗 初級コース
            </button>
            <button style={tabStyle(!isBeginner)} onClick={() => setActiveTab('advanced')}>
              📘 中級コース
            </button>
          </div>

          <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
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
          {isBeginner
            ? '💡 順番通りに学ぶと理解しやすくなっています。まず「基礎」から始めましょう！'
            : '💡 AIを「知っている」から「使える」へ。初級を終えた方向けの実践レッスンです。'}
        </div>

        {categories.map((cat) => (
          <div key={cat}>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', marginTop: '16px' }}>
              ── {cat} ──
            </div>
            {currentLessons
              .filter((l) => l.category === cat)
              .map((lesson, idx) => {
                const done = completedCurrent.includes(lesson.id);
                const displayNum = isBeginner
                  ? lesson.id
                  : currentLessons.findIndex((l) => l.id === lesson.id) + 1;
                return (
                  <button
                    key={lesson.id}
                    className={`lesson-card${done ? ' completed' : ''}`}
                    onClick={() => onSelect(lesson.id)}
                  >
                    <div className="lesson-emoji">{lesson.emoji}</div>
                    <div className="lesson-info">
                      <div className="lesson-title">
                        {displayNum}. {lesson.title}
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
          {isBeginner ? '全12レッスン • 合計600 XP獲得可能' : '全12レッスン • 合計600 XP獲得可能'}
        </div>
      </div>
    </div>
  );
}
