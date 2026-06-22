import { useState } from 'react';

const COURSE_CONFIG = {
  beginner: {
    label: '初級コース',
    icon: '📗',
    color: '#3b82f6',
    colorBg: 'rgba(59,130,246,0.08)',
    colorBorder: 'rgba(59,130,246,0.25)',
    colorLight: 'rgba(59,130,246,0.12)',
    colorDark: '#1d4ed8',
    tagBg: 'rgba(59,130,246,0.12)',
    tagColor: '#1d4ed8',
  },
  advanced: {
    label: '中級コース',
    icon: '📘',
    color: '#10b981',
    colorBg: 'rgba(16,185,129,0.08)',
    colorBorder: 'rgba(16,185,129,0.25)',
    colorLight: 'rgba(16,185,129,0.12)',
    colorDark: '#065f46',
    tagBg: 'rgba(16,185,129,0.12)',
    tagColor: '#065f46',
  },
  expert: {
    label: '上級コース',
    icon: '📙',
    color: '#8b5cf6',
    colorBg: 'rgba(139,92,246,0.08)',
    colorBorder: 'rgba(139,92,246,0.25)',
    colorLight: 'rgba(139,92,246,0.12)',
    colorDark: '#5b21b6',
    tagBg: 'rgba(139,92,246,0.12)',
    tagColor: '#5b21b6',
  },
};

export default function LearningScreen({
  lessons,
  completedLessons,
  onSelectLesson,
  lessonsAdvanced,
  completedAdvancedLessons,
  onSelectAdvancedLesson,
  lessonsExpert,
  completedExpertLessons,
  onSelectExpertLesson,
  initialTab,
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'beginner');

  const cfg = COURSE_CONFIG[activeTab] || COURSE_CONFIG.beginner;

  const currentLessons =
    activeTab === 'beginner' ? lessons :
    activeTab === 'advanced' ? lessonsAdvanced :
    lessonsExpert;

  const completedCurrent =
    activeTab === 'beginner' ? completedLessons :
    activeTab === 'advanced' ? (completedAdvancedLessons || []) :
    (completedExpertLessons || []);

  const onSelect =
    activeTab === 'beginner' ? onSelectLesson :
    activeTab === 'advanced' ? onSelectAdvancedLesson :
    onSelectExpertLesson;

  const completedCount = completedCurrent.length;
  const totalCount = currentLessons.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);
  const nextLesson = currentLessons.find((l) => !completedCurrent.includes(l.id));
  const categories = [...new Set(currentLessons.map((l) => l.category))];

  function tabStyle(key) {
    const active = activeTab === key;
    const c = COURSE_CONFIG[key];
    return {
      flex: 1,
      padding: '9px 4px 7px',
      borderRadius: '10px',
      border: active ? `2px solid ${c.color}` : '2px solid #e2e8f0',
      cursor: 'pointer',
      background: active ? c.colorBg : 'white',
      color: active ? c.colorDark : '#94a3b8',
      fontWeight: active ? 800 : 600,
      fontSize: '12px',
      fontFamily: 'inherit',
      transition: 'all 0.2s',
      textAlign: 'center',
      lineHeight: 1.3,
    };
  }

  const counts = {
    beginner: completedLessons.length,
    advanced: (completedAdvancedLessons || []).length,
    expert: (completedExpertLessons || []).length,
  };

  return (
    <div>
      {/* Gradient Header */}
      <div className="gradient-header" style={{ paddingBottom: '20px' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>📚 学習コース</h1>
          <p>AIの基礎から開発まで、体系的に学ぼう</p>
        </div>
      </div>

      {/* ===== Roadmap Strip ===== */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          fontSize: '11px',
          fontWeight: 700,
        }}>
          {[
            { key: 'beginner', icon: '📗', label: '初級', color: '#3b82f6', done: counts.beginner >= 12 },
            null,
            { key: 'advanced', icon: '📘', label: '中級', color: '#10b981', done: counts.advanced >= 12 },
            null,
            { key: 'expert', icon: '📙', label: '上級', color: '#8b5cf6', done: counts.expert >= 12 },
            null,
            { key: 'practice', icon: '⚡', label: '実践', color: '#f59e0b', done: false, noTab: true },
          ].map((item, i) => {
            if (item === null) {
              return (
                <div key={`arrow-${i}`} style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: 400 }}>›</div>
              );
            }
            const isActive = activeTab === item.key;
            return (
              <div
                key={item.key}
                onClick={item.noTab ? undefined : () => setActiveTab(item.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '5px 10px', borderRadius: '20px',
                  background: isActive ? item.color : item.done ? `${item.color}20` : 'transparent',
                  color: isActive ? 'white' : item.done ? item.color : '#94a3b8',
                  cursor: item.noTab ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  border: isActive ? 'none' : `1px solid ${item.done ? item.color + '40' : '#e2e8f0'}`,
                }}>
                {item.done && !isActive ? '✓' : item.icon} {item.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== Tab Bar ===== */}
      <div style={{
        display: 'flex',
        background: 'white',
        padding: '10px 16px',
        gap: '8px',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}>
        {Object.entries(COURSE_CONFIG).map(([key, c]) => (
          <button key={key} style={tabStyle(key)} onClick={() => setActiveTab(key)}>
            <div>{c.icon} {c.label}</div>
            <div style={{ fontSize: '11px', marginTop: '2px' }}>
              {counts[key]} / {key === 'beginner' ? lessons.length : key === 'advanced' ? lessonsAdvanced.length : lessonsExpert.length} 完了
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '16px' }}>
        {/* ===== Status Card ===== */}
        <div style={{
          background: cfg.colorBg,
          border: `1.5px solid ${cfg.colorBorder}`,
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px' }}>{cfg.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: cfg.colorDark }}>{cfg.label}</span>
            <span style={{ marginLeft: 'auto', fontSize: '18px', fontWeight: 900, color: cfg.color }}>
              {progressPct}%
            </span>
          </div>

          {nextLesson ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: cfg.colorLight,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', flexShrink: 0,
              }}>
                {nextLesson.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', color: cfg.color, fontWeight: 700, marginBottom: '2px' }}>
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
            <div style={{ textAlign: 'center', padding: '8px 0 12px', color: cfg.color, fontWeight: 800, fontSize: '14px' }}>
              🎉 このコースのレッスンをすべて完了！
            </div>
          )}

          <div style={{ marginBottom: nextLesson ? '12px' : '0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '12px' }}>
              <span style={{ color: '#64748b', fontWeight: 600 }}>{completedCount} / {totalCount} レッスン完了</span>
            </div>
            <div style={{ height: '6px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '99px', background: cfg.color, width: `${progressPct}%`, transition: 'width 0.5s ease' }} />
            </div>
          </div>

          {nextLesson && (
            <button
              style={{
                width: '100%', padding: '11px', border: 'none', borderRadius: '10px',
                background: cfg.color, color: 'white', fontFamily: 'inherit',
                fontWeight: 800, fontSize: '14px', cursor: 'pointer',
              }}
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
                const displayNum = currentLessons.findIndex((l) => l.id === lesson.id) + 1;

                return (
                  <button
                    key={lesson.id}
                    className={`lesson-card${done ? ' completed' : ''}`}
                    style={isNext ? {
                      borderLeft: `3px solid ${cfg.color}`,
                      borderTopColor: cfg.colorBorder,
                      borderRightColor: cfg.colorBorder,
                      borderBottomColor: cfg.colorBorder,
                      background: cfg.colorBg,
                    } : {}}
                    onClick={() => onSelect(lesson.id)}
                  >
                    <div className="lesson-emoji">{lesson.emoji}</div>
                    <div className="lesson-info">
                      <div className="lesson-title">{displayNum}. {lesson.title}</div>
                      <div className="lesson-meta">
                        <span>🕐 {lesson.duration}</span>
                        {done && (
                          <span style={{ background: 'rgba(16,185,129,0.12)', color: '#065f46', padding: '1px 7px', borderRadius: '5px', fontSize: '11px', fontWeight: 700 }}>
                            ✓ 完了済み
                          </span>
                        )}
                        {!done && isNext && (
                          <span style={{ background: cfg.tagBg, color: cfg.tagColor, padding: '1px 7px', borderRadius: '5px', fontSize: '11px', fontWeight: 700 }}>
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
                        background: cfg.color,
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
