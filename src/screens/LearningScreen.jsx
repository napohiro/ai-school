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
  const totalCount = currentLessons.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const nextLesson = currentLessons.find((l) => !completedCurrent.includes(l.id));
  const categories = [...new Set(currentLessons.map((l) => l.category))];

  const beginnerCount = completedLessons.length;
  const advancedCount = (completedAdvancedLessons || []).length;

  function tabStyle(active) {
    return {
      flex: 1,
      padding: '10px 6px 8px',
      borderRadius: '10px',
      border: active ? '2px solid #6366f1' : '2px solid #e2e8f0',
      cursor: 'pointer',
      background: active ? 'rgba(99,102,241,0.08)' : 'white',
      color: active ? '#4338ca' : '#94a3b8',
      fontWeight: active ? 800 : 600,
      fontSize: '13px',
      fontFamily: 'inherit',
      transition: 'all 0.2s',
      textAlign: 'center',
      lineHeight: 1.3,
    };
  }

  return (
    <div>
      {/* Gradient Header */}
      <div className="gradient-header" style={{ paddingBottom: '20px' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>📚 学習コース</h1>
          <p>AIの基礎から実践まで、体系的に学ぼう</p>
        </div>
      </div>

      {/* ===== Tab Bar ===== */}
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
        <button style={tabStyle(isBeginner)} onClick={() => setActiveTab('beginner')}>
          <div>📗 初級コース</div>
          <div style={{ fontSize: '12px', marginTop: '2px' }}>
            {beginnerCount} / {lessons.length} 完了
          </div>
        </button>
        <button style={tabStyle(!isBeginner)} onClick={() => setActiveTab('advanced')}>
          <div>📘 中級コース</div>
          <div style={{ fontSize: '12px', marginTop: '2px' }}>
            {advancedCount} / {lessonsAdvanced.length} 完了
          </div>
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        {/* ===== Status Card ===== */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.04) 100%)',
          border: '1.5px solid rgba(99,102,241,0.2)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px' }}>{isBeginner ? '📗' : '📘'}</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#4338ca' }}>
              {isBeginner ? '初級コース' : '中級コース'}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '18px', fontWeight: 900, color: '#6366f1' }}>
              {progressPct}%
            </span>
          </div>

          {nextLesson ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(99,102,241,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', flexShrink: 0,
              }}>
                {nextLesson.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', color: '#6366f1', fontWeight: 700, marginBottom: '2px' }}>
                  次におすすめ
                </div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {nextLesson.title}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  🕐 {nextLesson.duration} • {nextLesson.category}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '8px 0 12px', color: '#10b981', fontWeight: 700, fontSize: '14px' }}>
              🎉 このコースのレッスンをすべて完了！
            </div>
          )}

          <div style={{ marginBottom: nextLesson ? '12px' : '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '12px' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>{completedCount} / {totalCount} レッスン完了</span>
            </div>
            <div className="progress-bar-outer">
              <div className="progress-bar-inner" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {nextLesson && (
            <button
              className="btn btn-primary btn-full"
              style={{ marginTop: '0' }}
              onClick={() => onSelect(nextLesson.id)}
            >
              ▶ 学習を続ける
            </button>
          )}
        </div>

        {/* ===== Lesson List ===== */}
        {categories.map((cat) => (
          <div key={cat}>
            <div style={{
              fontSize: '12px', fontWeight: 800, color: '#94a3b8',
              textTransform: 'uppercase', letterSpacing: '0.5px',
              marginBottom: '8px', marginTop: '16px',
            }}>
              ── {cat} ──
            </div>
            {currentLessons
              .filter((l) => l.category === cat)
              .map((lesson) => {
                const done = completedCurrent.includes(lesson.id);
                const isNext = nextLesson?.id === lesson.id;
                const displayNum = isBeginner
                  ? lesson.id
                  : currentLessons.findIndex((l) => l.id === lesson.id) + 1;

                return (
                  <button
                    key={lesson.id}
                    className={`lesson-card${done ? ' completed' : ''}`}
                    style={isNext ? {
                      borderLeft: '3px solid #6366f1',
                      borderTopColor: 'rgba(99,102,241,0.25)',
                      borderRightColor: 'rgba(99,102,241,0.25)',
                      borderBottomColor: 'rgba(99,102,241,0.25)',
                      background: 'rgba(99,102,241,0.03)',
                    } : {}}
                    onClick={() => onSelect(lesson.id)}
                  >
                    <div className="lesson-emoji">{lesson.emoji}</div>
                    <div className="lesson-info">
                      <div className="lesson-title">
                        {displayNum}. {lesson.title}
                      </div>
                      <div className="lesson-meta">
                        <span>🕐 {lesson.duration}</span>
                        {done && (
                          <span style={{ background: 'rgba(16,185,129,0.12)', color: '#065f46', padding: '1px 7px', borderRadius: '5px', fontSize: '11px', fontWeight: 700 }}>
                            ✓ 完了済み
                          </span>
                        )}
                        {!done && isNext && (
                          <span style={{ background: 'rgba(99,102,241,0.12)', color: '#4338ca', padding: '1px 7px', borderRadius: '5px', fontSize: '11px', fontWeight: 700 }}>
                            ⭐ 次におすすめ
                          </span>
                        )}
                        {!done && !isNext && (
                          <span style={{ color: '#94a3b8', fontSize: '11px' }}>+50 XP</span>
                        )}
                      </div>
                    </div>
                    {done ? (
                      <span style={{ fontSize: '20px', color: '#10b981', flexShrink: 0 }}>✅</span>
                    ) : isNext ? (
                      <span style={{
                        fontSize: '13px', fontWeight: 800, color: 'white',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        padding: '6px 10px', borderRadius: '8px', flexShrink: 0,
                      }}>▶</span>
                    ) : (
                      <span style={{ fontSize: '18px', color: '#94a3b8', flexShrink: 0 }}>›</span>
                    )}
                  </button>
                );
              })}
          </div>
        ))}

        <div style={{ textAlign: 'center', padding: '20px 0', color: '#94a3b8', fontSize: '13px' }}>
          全{totalCount}レッスン • 合計{totalCount * 50} XP獲得可能
        </div>
      </div>
    </div>
  );
}
