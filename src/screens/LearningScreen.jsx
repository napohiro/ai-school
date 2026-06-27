import { useState } from 'react';
import { getCourseById } from '../data/courses';
import { LIBRARY_ITEMS } from '../data/library';

const CORE_TABS = [
  { key: 'step1',   label: 'AI基礎',    icon: '🤖', stepNum: 1, color: '#3b82f6', colorDark: '#1d4ed8', colorBg: 'rgba(59,130,246,0.08)',   colorBorder: 'rgba(59,130,246,0.25)',   colorLight: 'rgba(59,130,246,0.12)',  tagBg: 'rgba(59,130,246,0.12)',   tagColor: '#1d4ed8' },
  { key: 'step2',   label: 'AI実践',    icon: '💼', stepNum: 2, color: '#10b981', colorDark: '#065f46', colorBg: 'rgba(16,185,129,0.08)',   colorBorder: 'rgba(16,185,129,0.25)',   colorLight: 'rgba(16,185,129,0.12)', tagBg: 'rgba(16,185,129,0.12)',   tagColor: '#065f46' },
  { key: 'step3',   label: 'クリエイト', icon: '🎨', stepNum: 3, color: '#ec4899', colorDark: '#9d174d', colorBg: 'rgba(236,72,153,0.08)',   colorBorder: 'rgba(236,72,153,0.25)',   colorLight: 'rgba(236,72,153,0.12)', tagBg: 'rgba(236,72,153,0.12)',   tagColor: '#9d174d' },
  { key: 'step4',   label: 'AI開発',    icon: '💻', stepNum: 4, color: '#8b5cf6', colorDark: '#5b21b6', colorBg: 'rgba(139,92,246,0.08)',   colorBorder: 'rgba(139,92,246,0.25)',   colorLight: 'rgba(139,92,246,0.12)', tagBg: 'rgba(139,92,246,0.12)',   tagColor: '#5b21b6' },
  { key: 'step5',   label: '収益化',    icon: '💰', stepNum: 5, color: '#f59e0b', colorDark: '#92400e', colorBg: 'rgba(245,158,11,0.08)',   colorBorder: 'rgba(245,158,11,0.25)',   colorLight: 'rgba(245,158,11,0.12)', tagBg: 'rgba(245,158,11,0.12)',   tagColor: '#92400e' },
  { key: 'step6',   label: '卒業制作',  icon: '🎓', stepNum: 6, color: '#eab308', colorDark: '#713f12', colorBg: 'rgba(234,179,8,0.08)',   colorBorder: 'rgba(234,179,8,0.25)',   colorLight: 'rgba(234,179,8,0.12)', tagBg: 'rgba(234,179,8,0.12)',   tagColor: '#713f12' },
  { key: 'library', label: 'ライブラリ', icon: '📚', stepNum: null, color: '#6366f1', colorDark: '#4338ca', colorBg: 'rgba(99,102,241,0.08)', colorBorder: 'rgba(99,102,241,0.25)', colorLight: 'rgba(99,102,241,0.12)', tagBg: 'rgba(99,102,241,0.12)', tagColor: '#4338ca' },
];

/* ─── コース概要バナー ─── */
function CourseSummaryBanner({ courseId, cfg, completedCount, totalCount }) {
  const course = getCourseById(courseId);
  if (!course) return null;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${cfg.color}10 0%, white 100%)`,
      border: `1.5px solid ${cfg.colorBorder}`,
      borderRadius: '16px', padding: '16px', marginBottom: '14px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: `${cfg.color}15`, border: `1.5px solid ${cfg.colorBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', flexShrink: 0,
        }}>{course.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: cfg.color, letterSpacing: '1px', marginBottom: '2px' }}>
            STEP {course.order} — 学習ゴール
          </div>
          <div style={{ fontSize: '15px', fontWeight: 900, color: '#1e293b', lineHeight: 1.3 }}>
            {course.goal}
          </div>
        </div>
        <div style={{
          fontSize: '15px', fontWeight: 900, color: cfg.color,
          background: `${cfg.color}10`, borderRadius: '10px', padding: '4px 8px', flexShrink: 0,
        }}>{pct}%</div>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <div style={{ height: '5px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '99px', background: cfg.color, width: `${pct}%`, transition: 'width 0.5s ease' }} />
        </div>
        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
          {completedCount} / {totalCount} レッスン完了
        </div>
      </div>

      {course.skills && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {course.skills.map((skill) => (
            <span key={skill} style={{
              fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px',
              background: `${cfg.color}10`, color: cfg.color, border: `1px solid ${cfg.colorBorder}`,
            }}>✓ {skill}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── 卒業制作タブ ─── */
function GraduationTabContent() {
  const course = getCourseById('step6');

  return (
    <div style={{ padding: '16px' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '20px', padding: '24px', marginBottom: '16px', color: 'white', textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎓</div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#eab308', letterSpacing: '2px', marginBottom: '6px' }}>
          STEP 6 — FINAL PROJECT
        </div>
        <div style={{ fontSize: '20px', fontWeight: 900, marginBottom: '6px' }}>卒業制作</div>
        <div style={{ fontSize: '13px', opacity: 0.75, marginBottom: '16px' }}>
          STEP1〜5で学んだすべてを活かして<br />自分のAIサービスを完成・公開する
        </div>
        <div style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.08)',
          borderRadius: '12px', padding: '10px 16px',
          fontSize: '12px', fontWeight: 700,
        }}>
          🎯 公開済みAIサービス・認定証を獲得
        </div>
      </div>

      <div className="card" style={{ marginBottom: '14px' }}>
        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '14px' }}>
          📍 卒業制作の流れ
        </div>
        {(course?.steps || []).map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < (course?.steps?.length - 1) ? '12px' : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px', flexShrink: 0 }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: '#f1f5f9', border: '2px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 800, color: '#94a3b8',
              }}>{i + 1}</div>
              {i < (course?.steps?.length - 1) && (
                <div style={{ width: '2px', flex: 1, background: '#e2e8f0', marginTop: '4px', minHeight: '16px' }} />
              )}
            </div>
            <div style={{ flex: 1, paddingBottom: i < (course?.steps?.length - 1) ? '4px' : 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', lineHeight: 1.5 }}>{step}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
        border: '2px dashed #cbd5e1', borderRadius: '20px', padding: '20px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '8px', opacity: 0.4 }}>🔒</div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#94a3b8', marginBottom: '4px' }}>
          AIスクール認定 AI個人開発者
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>
          STEP1〜5修了＋卒業制作提出で取得できます
        </div>
      </div>
      <div style={{ height: '8px' }} />
    </div>
  );
}

/* ─── ライブラリタブ ─── */
function LibraryTabContent() {
  return (
    <div style={{ padding: '16px' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, white 100%)',
        border: '1.5px solid rgba(99,102,241,0.2)',
        borderRadius: '16px', padding: '16px', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'rgba(99,102,241,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
          }}>📚</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '15px', color: '#1e293b' }}>AIライブラリ</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              ニュース・辞典・ツール大全 — 必要なときに参照する補助資料
            </div>
          </div>
        </div>
        <div style={{
          background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: '10px', padding: '10px 12px', fontSize: '12px', color: '#64748b', lineHeight: 1.6,
        }}>
          💡 STEPを進めながら、気になる資料を参照するコレクションです。<br />
          随時コンテンツを追加予定。
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {LIBRARY_ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'white', border: `1.5px solid ${item.color}30`,
              borderRadius: '16px', padding: '14px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}
          >
            <div style={{
              width: '46px', height: '46px', borderRadius: '12px',
              background: item.colorBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', flexShrink: 0,
            }}>{item.emoji}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '3px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>
                {item.description}
              </div>
            </div>

            <div style={{
              fontSize: '10px', fontWeight: 700, padding: '4px 8px', borderRadius: '8px',
              background: '#f1f5f9', color: '#94a3b8', flexShrink: 0,
            }}>
              準備中
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', padding: '20px 0' }}>
        随時追加予定
      </div>
    </div>
  );
}

/* ─── コアSTEPタブ（レッスン一覧） ─── */
function StepLessonTab({ cfg, courseId, lessons, completed, onSelect }) {
  const totalCount = lessons.length;
  const completedCount = completed.length;
  const nextLesson = lessons.find((l) => !completed.includes(l.id));

  return (
    <div style={{ padding: '16px' }}>
      <CourseSummaryBanner
        courseId={courseId}
        cfg={cfg}
        completedCount={completedCount}
        totalCount={totalCount}
      />

      {nextLesson ? (
        <div style={{
          background: cfg.colorBg, border: `1.5px solid ${cfg.colorBorder}`,
          borderRadius: '14px', padding: '14px', marginBottom: '16px',
        }}>
          <div style={{ fontSize: '11px', color: cfg.color, fontWeight: 700, marginBottom: '8px' }}>
            ▶ 次におすすめ
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px', background: cfg.colorLight,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', flexShrink: 0,
            }}>{nextLesson.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nextLesson.title}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>🕐 {nextLesson.duration} • {nextLesson.category}</div>
            </div>
          </div>
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
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '16px', marginBottom: '16px',
          background: 'rgba(16,185,129,0.06)', border: '1.5px solid rgba(16,185,129,0.2)',
          borderRadius: '14px', color: '#065f46', fontWeight: 800, fontSize: '14px',
        }}>
          🎉 このSTEPのレッスンをすべて完了！
        </div>
      )}

      <div style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', marginBottom: '10px' }}>
        ── レッスン一覧 ──
      </div>

      {lessons.map((lesson, idx) => {
        const done = completed.includes(lesson.id);
        const isNext = nextLesson?.id === lesson.id;
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
              <div className="lesson-title">{idx + 1}. {lesson.title}</div>
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
                background: cfg.color, padding: '6px 10px', borderRadius: '8px', flexShrink: 0,
              }}>▶</span>
            ) : (
              <span style={{ fontSize: '18px', color: '#94a3b8', flexShrink: 0 }}>›</span>
            )}
          </button>
        );
      })}

      <div style={{ textAlign: 'center', padding: '20px 0', color: '#94a3b8', fontSize: '12px' }}>
        全{totalCount}レッスン • 合計{totalCount * 50} XP獲得可能
      </div>
    </div>
  );
}

/* ─── メインコンポーネント ─── */
export default function LearningScreen({
  lessonsStep1, completedStep1, onSelectStep1,
  lessonsStep2, completedStep2, onSelectStep2,
  lessonsStep3, completedStep3, onSelectStep3,
  lessonsStep4, completedStep4, onSelectStep4,
  lessonsStep5, completedStep5, onSelectStep5,
  missions, completedMissions,
  initialTab, onNavigate,
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'step1');
  const cfg = CORE_TABS.find((t) => t.key === activeTab) || CORE_TABS[0];

  const counts = {
    step1: (completedStep1 || []).length,
    step2: (completedStep2 || []).length,
    step3: (completedStep3 || []).length,
    step4: (completedStep4 || []).length,
    step5: (completedStep5 || []).length,
  };

  const stepTabData = {
    step1: { lessons: lessonsStep1, completed: completedStep1 || [], onSelect: onSelectStep1, courseId: 'step1' },
    step2: { lessons: lessonsStep2, completed: completedStep2 || [], onSelect: onSelectStep2, courseId: 'step2' },
    step3: { lessons: lessonsStep3, completed: completedStep3 || [], onSelect: onSelectStep3, courseId: 'step3' },
    step4: { lessons: lessonsStep4, completed: completedStep4 || [], onSelect: onSelectStep4, courseId: 'step4' },
    step5: { lessons: lessonsStep5, completed: completedStep5 || [], onSelect: onSelectStep5, courseId: 'step5' },
  };

  const isStepTab = ['step1', 'step2', 'step3', 'step4', 'step5'].includes(activeTab);

  return (
    <div>
      {/* Header */}
      <div className="gradient-header" style={{ paddingBottom: '20px' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>📚 学習コース</h1>
          <p>STEP1〜6で、AIを使いこなすプロへ</p>
        </div>
      </div>

      {/* タブ横スクロール */}
      <div style={{
        background: 'white', borderBottom: '1px solid #e2e8f0',
        padding: '10px 12px', position: 'sticky', top: 0, zIndex: 20,
      }}>
        <div style={{
          display: 'flex', gap: '6px', overflowX: 'auto',
          scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: '2px',
        }}>
          {CORE_TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const count = counts[tab.key];
            const showCount = tab.stepNum !== null && tab.key !== 'step6';
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flexShrink: 0, padding: '7px 12px', borderRadius: '12px',
                  border: isActive ? `2px solid ${tab.color}` : '2px solid #e2e8f0',
                  background: isActive ? tab.colorBg : 'white',
                  color: isActive ? tab.colorDark : '#94a3b8',
                  fontFamily: 'inherit', fontWeight: isActive ? 800 : 600,
                  fontSize: '11px', cursor: 'pointer', textAlign: 'center',
                  transition: 'all 0.2s', lineHeight: 1.3, minWidth: '52px',
                }}
              >
                {tab.stepNum !== null && (
                  <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '1px' }}>
                    {tab.key === 'library' ? '' : `STEP${tab.stepNum}`}
                  </div>
                )}
                <div>{tab.icon} {tab.label}</div>
                {showCount && (
                  <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.8 }}>
                    {count}/6
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isStepTab && (() => {
        const data = stepTabData[activeTab];
        return (
          <StepLessonTab
            key={activeTab}
            cfg={cfg}
            courseId={activeTab}
            lessons={data.lessons}
            completed={data.completed}
            onSelect={data.onSelect}
          />
        );
      })()}

      {activeTab === 'step6' && <GraduationTabContent />}

      {activeTab === 'library' && <LibraryTabContent />}
    </div>
  );
}
