import { useState } from 'react';

export default function LearningScreen({
  lessons,
  completedLessons,
  onSelectLesson,
  lessonsAdvanced,
  completedAdvancedLessons,
  onSelectAdvancedLesson,
  initialTab,
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'beginner');

  const isBeginner = activeTab === 'beginner';
  const currentLessons = isBeginner ? lessons : lessonsAdvanced;
  const completedCurrent = isBeginner ? completedLessons : (completedAdvancedLessons || []);
  const onSelect = isBeginner ? onSelectLesson : onSelectAdvancedLesson;
  const completedCount = completedCurrent.length;
  const categories = [...new Set(currentLessons.map((l) => l.category))];

  const tabBtn = (active) => ({
    flex: 1,
    padding: '11px 8px',
    borderRadius: '10px',
    border: active ? '2px solid #6366f1' : '2px solid #e2e8f0',
    cursor: 'pointer',
    background: active ? 'rgba(99,102,241,0.09)' : 'white',
    color: active ? '#6366f1' : '#94a3b8',
    fontWeight: active ? 800 : 600,
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
    lineHeight: 1.3,
  });

  return (
    <div>
      {/* Gradient Header */}
      <div className="gradient-header">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>📚 学習コース</h1>
          <p>
            {isBeginner
              ? 'AIの基礎を12本のレッスンで学ぼう'
              : 'AIを仕事に使う12本の実践レッスン'}
          </p>
          <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(255,255,255,0.25)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
            }}>
              ✅ {completedCount} / 12 完了
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.25)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 700,
            }}>
              +50 XP/レッスン
            </span>
          </div>
        </div>
      </div>

      {/* ===== Course Tab Bar (gradient-header の外) ===== */}
      <div style={{
        display: 'flex',
        background: 'white',
        padding: '12px 16px',
        gap: '8px',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}>
        <button style={tabBtn(isBeginner)} onClick={() => setActiveTab('beginner')}>
          📗 初級コース
        </button>
        <button style={tabBtn(!isBeginner)} onClick={() => setActiveTab('advanced')}>
          📘 中級コース
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Hint */}
        <div style={{
          background: 'rgba(99,102,241,0.06)',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: '12px',
          padding: '12px',
          marginBottom: '16px',
          fontSize: '13px',
          color: '#64748b',
          lineHeight: 1.6,
        }}>
          {isBeginner
            ? '💡 順番通りに学ぶと理解しやすくなっています。まず「基礎」から始めましょう！'
            : '💡 AIを「知っている」から「使える」へ。初級を終えた方向けの実践レッスンです。'}
        </div>

        {categories.map((cat) => (
          <div key={cat}>
            <div style={{
              fontSize: '13px',
              fontWeight: 800,
              color: '#94a3b8',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '10px',
              marginTop: '16px',
            }}>
              ── {cat} ──
            </div>
            {currentLessons
              .filter((l) => l.category === cat)
              .map((lesson) => {
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
                        {done
                          ? <span style={{ color: '#10b981', fontWeight: 700 }}>✓ 完了</span>
                          : <span>+50 XP</span>}
                      </div>
                    </div>
                    {done
                      ? <span style={{ fontSize: '20px', color: '#10b981' }}>✅</span>
                      : <span style={{ fontSize: '18px', color: '#94a3b8' }}>›</span>}
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
