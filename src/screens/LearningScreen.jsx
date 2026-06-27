import { useState } from 'react';
import { getCourseById } from '../data/courses';
import { LIBRARY_ITEMS } from '../data/library';

const CORE_TABS = [
  { key: 'step1',   label: 'AI基礎',    icon: '🤖', stepNum: 1, color: '#3b82f6', colorDark: '#1d4ed8', colorBg: 'rgba(59,130,246,0.08)',   colorBorder: 'rgba(59,130,246,0.25)',   colorLight: 'rgba(59,130,246,0.12)',  tagBg: 'rgba(59,130,246,0.12)',   tagColor: '#1d4ed8' },
  { key: 'step2',   label: 'AI実践',    icon: '💼', stepNum: 2, color: '#10b981', colorDark: '#065f46', colorBg: 'rgba(16,185,129,0.08)',   colorBorder: 'rgba(16,185,129,0.25)',   colorLight: 'rgba(16,185,129,0.12)', tagBg: 'rgba(16,185,129,0.12)',   tagColor: '#065f46' },
  { key: 'step3',   label: 'AIクリエイト', icon: '🎨', stepNum: 3, color: '#ec4899', colorDark: '#9d174d', colorBg: 'rgba(236,72,153,0.08)',   colorBorder: 'rgba(236,72,153,0.25)',   colorLight: 'rgba(236,72,153,0.12)', tagBg: 'rgba(236,72,153,0.12)',   tagColor: '#9d174d' },
  { key: 'step4',   label: 'AI開発',    icon: '💻', stepNum: 4, color: '#8b5cf6', colorDark: '#5b21b6', colorBg: 'rgba(139,92,246,0.08)',   colorBorder: 'rgba(139,92,246,0.25)',   colorLight: 'rgba(139,92,246,0.12)', tagBg: 'rgba(139,92,246,0.12)',   tagColor: '#5b21b6' },
  { key: 'step5',   label: 'AI収益化',  icon: '💰', stepNum: 5, color: '#f59e0b', colorDark: '#92400e', colorBg: 'rgba(245,158,11,0.08)',   colorBorder: 'rgba(245,158,11,0.25)',   colorLight: 'rgba(245,158,11,0.12)', tagBg: 'rgba(245,158,11,0.12)',   tagColor: '#92400e' },
  { key: 'step6',   label: '卒業制作',  icon: '🎓', stepNum: 6, color: '#eab308', colorDark: '#713f12', colorBg: 'rgba(234,179,8,0.08)',   colorBorder: 'rgba(234,179,8,0.25)',   colorLight: 'rgba(234,179,8,0.12)', tagBg: 'rgba(234,179,8,0.12)',   tagColor: '#713f12' },
  { key: 'library', label: 'ライブラリ', icon: '📚', stepNum: null, color: '#6366f1', colorDark: '#4338ca', colorBg: 'rgba(99,102,241,0.08)', colorBorder: 'rgba(99,102,241,0.25)', colorLight: 'rgba(99,102,241,0.12)', tagBg: 'rgba(99,102,241,0.12)', tagColor: '#4338ca' },
];

/* ─── コース概要バナー ─── */
function CourseSummaryBanner({ courseId, cfg, completedCount, totalCount }) {
  const course = getCourseById(courseId);
  if (!course) return null;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const allDone = completedCount >= totalCount;

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '14px', padding: '16px', marginBottom: '12px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: `${cfg.color}12`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', flexShrink: 0,
        }}>{course.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: cfg.color, letterSpacing: '1px', marginBottom: '2px', textTransform: 'uppercase' }}>
            STEP {course.order}
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {course.goal}
          </div>
        </div>
        <div style={{
          fontSize: '14px', fontWeight: 800,
          color: allDone ? 'var(--success)' : cfg.color,
          flexShrink: 0,
        }}>
          {pct}%
        </div>
      </div>
      <div style={{ height: '4px', borderRadius: '99px', background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: '99px', background: allDone ? 'var(--success)' : cfg.color, width: `${pct}%`, transition: 'width 0.5s ease' }} />
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '5px' }}>
        {completedCount} / {totalCount} レッスン完了
      </div>
    </div>
  );
}

/* ─── 卒業制作タブ ─── */
function GraduationTabContent() {
  const course = getCourseById('step6');

  return (
    <div style={{ padding: '16px' }}>
      <div style={{
        background: 'var(--navy)',
        borderRadius: '16px', padding: '24px', marginBottom: '16px', color: 'white', textAlign: 'center',
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
          background: 'var(--surface)',
          borderLeft: `3px solid ${cfg.color}`,
          border: `1px solid var(--border)`,
          borderLeftWidth: '3px',
          borderLeftColor: cfg.color,
          borderRadius: '12px', padding: '14px', marginBottom: '12px',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: cfg.color, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            次のレッスン
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '26px', lineHeight: 1, flexShrink: 0 }}>
              {nextLesson.emoji}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nextLesson.title}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                約 {nextLesson.duration}
              </div>
            </div>
          </div>
          <button
            style={{
              width: '100%', padding: '11px', border: 'none', borderRadius: '8px',
              background: cfg.color, color: 'white', fontFamily: 'inherit',
              fontWeight: 700, fontSize: '14px', cursor: 'pointer',
            }}
            onClick={() => onSelect(nextLesson.id)}
          >
            学習を続ける
          </button>
        </div>
      ) : (
        <div style={{
          padding: '14px', marginBottom: '12px',
          background: 'var(--success-bg)',
          border: '1px solid #a7f3d0',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ fontSize: '20px' }}>✓</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--success)' }}>
            このSTEPのレッスンをすべて完了！
          </span>
        </div>
      )}

      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
        レッスン一覧
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
                <span>{lesson.duration}</span>
                {done && (
                  <span style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>
                    完了
                  </span>
                )}
                {!done && isNext && (
                  <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>
                    次のレッスン
                  </span>
                )}
                {!done && !isNext && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>+50 XP</span>
                )}
              </div>
            </div>
            {done ? (
              <span style={{ fontSize: '16px', color: 'var(--success)', flexShrink: 0 }}>✓</span>
            ) : isNext ? (
              <span style={{
                fontSize: '12px', fontWeight: 700, color: 'white',
                background: cfg.color, padding: '5px 10px', borderRadius: '6px', flexShrink: 0,
              }}>▶</span>
            ) : (
              <span style={{ fontSize: '16px', color: 'var(--text-muted)', flexShrink: 0 }}>›</span>
            )}
          </button>
        );
      })}

      <div style={{ padding: '16px 0 4px', color: 'var(--text-muted)', fontSize: '11px', textAlign: 'center' }}>
        {totalCount}レッスン · 最大 {totalCount * 50} XP
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
      <div className="gradient-header">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>学習コース</h1>
          <p>STEP 1〜6 でAIを実践的に習得する</p>
        </div>
      </div>

      {/* タブ横スクロール */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 12px',
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        <div style={{
          display: 'flex', gap: '0', overflowX: 'auto',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        }}>
          {CORE_TABS.map((tab) => {
            const isActive  = activeTab === tab.key;
            const count     = counts[tab.key];
            const showCount = tab.stepNum !== null && tab.key !== 'step6' && tab.key !== 'library';
            const isLibrary = tab.key === 'library';
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flexShrink: 0,
                  padding: isLibrary ? '10px 10px 11px' : '11px 10px 12px',
                  border: 'none',
                  borderBottom: isActive
                    ? `2px solid ${tab.color}`
                    : '2px solid transparent',
                  background: 'transparent',
                  color: isActive ? tab.color : isLibrary ? 'var(--border)' : 'var(--text-muted)',
                  fontFamily: 'inherit',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: isLibrary ? '10px' : '11px',
                  cursor: 'pointer', textAlign: 'center',
                  transition: 'color 0.15s, border-color 0.15s',
                  lineHeight: 1.3,
                  minWidth: isLibrary ? '44px' : '52px',
                }}
              >
                {!isLibrary && tab.stepNum !== null && (
                  <div style={{ fontSize: '9px', opacity: isActive ? 1 : 0.6, marginBottom: '2px', fontWeight: 700, letterSpacing: '0.3px' }}>
                    S{tab.stepNum}
                  </div>
                )}
                <div style={{ fontSize: isLibrary ? '10px' : '11px' }}>{tab.label}</div>
                {showCount && (
                  <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.75 }}>
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
