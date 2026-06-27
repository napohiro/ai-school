import { useState } from 'react';
import { getCourseById } from '../data/courses';
import { LIBRARY_ITEMS } from '../data/library';

const CORE_TABS = [
  { key: 'step1',   label: 'AI基礎',     stepNum: 1, color: '#3b82f6' },
  { key: 'step2',   label: 'AI実践',     stepNum: 2, color: '#10b981' },
  { key: 'step3',   label: 'AIクリエイト', stepNum: 3, color: '#ec4899' },
  { key: 'step4',   label: 'AI開発',     stepNum: 4, color: '#8b5cf6' },
  { key: 'step5',   label: 'AI収益化',   stepNum: 5, color: '#f59e0b' },
  { key: 'step6',   label: '卒業制作',   stepNum: 6, color: '#eab308' },
  { key: 'library', label: 'ライブラリ', stepNum: null, color: 'var(--primary)' },
];

/* ─── コース概要バナー ─── */
function CourseSummaryBanner({ courseId, cfg, completedCount, totalCount }) {
  const course = getCourseById(courseId);
  if (!course) return null;
  const pct    = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const allDone = completedCount >= totalCount;

  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: '12px', padding: '14px 16px', marginBottom: '12px',
      background: 'var(--surface)',
      boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '10px', fontWeight: 600, color: cfg.color,
            letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px',
          }}>
            STEP {course.order}
          </div>
          <div style={{
            fontSize: '14px', fontWeight: 600, color: 'var(--text)',
            lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {course.goal}
          </div>
        </div>
        <div style={{
          fontSize: '13px', fontWeight: 600, flexShrink: 0, marginLeft: '12px',
          color: allDone ? 'var(--success)' : 'var(--text-muted)',
        }}>
          {completedCount}/{totalCount}
        </div>
      </div>
      <div style={{ height: '3px', borderRadius: '99px', background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '99px',
          background: allDone ? 'var(--success)' : cfg.color,
          width: `${pct}%`, transition: 'width 0.5s ease',
        }} />
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
        borderRadius: '12px', padding: '24px 20px', marginBottom: '12px',
        color: 'white', textAlign: 'center',
      }}>
        <div style={{
          fontSize: '10px', fontWeight: 600, color: '#eab308',
          letterSpacing: '2px', marginBottom: '8px', textTransform: 'uppercase',
        }}>
          STEP 6 — FINAL PROJECT
        </div>
        <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.3px' }}>
          卒業制作
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', lineHeight: 1.6 }}>
          STEP 1〜5で学んだすべてを活かして<br />自分のAIサービスを完成・公開する
        </div>
        <div style={{
          display: 'inline-block', background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px', padding: '9px 16px',
          fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.75)',
        }}>
          公開済みAIサービス・認定証を獲得
        </div>
      </div>

      <div className="card" style={{ marginBottom: '12px' }}>
        <div style={{
          fontWeight: 600, fontSize: '13px', color: 'var(--text)',
          marginBottom: '14px', letterSpacing: '-0.1px',
        }}>
          卒業制作の流れ
        </div>
        {(course?.steps || []).map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < (course?.steps?.length - 1) ? '12px' : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px', flexShrink: 0 }}>
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%',
                background: 'var(--raised)', border: '1.5px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)',
              }}>{i + 1}</div>
              {i < (course?.steps?.length - 1) && (
                <div style={{ width: '1px', flex: 1, background: 'var(--border)', marginTop: '4px', minHeight: '12px' }} />
              )}
            </div>
            <div style={{ flex: 1, paddingBottom: i < (course?.steps?.length - 1) ? '4px' : 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)', lineHeight: 1.5 }}>{step}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'var(--raised)', border: '1.5px dashed var(--border)',
        borderRadius: '12px', padding: '20px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '5px' }}>
          AIスクール認定 AI個人開発者
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          STEP 1〜5修了＋卒業制作提出で取得できます
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
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '16px', marginBottom: '12px',
        boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
      }}>
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>
            AIライブラリ
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            ニュース・辞典・ツール大全 — 必要なときに参照する補助資料
          </div>
        </div>
        <div style={{
          background: 'var(--raised)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '10px 12px',
          fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '10px',
        }}>
          STEPを進めながら、気になる資料を参照するコレクションです。随時コンテンツを追加予定。
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {LIBRARY_ITEMS.map((item) => (
          <div key={item.id} style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '12px', padding: '14px',
            display: 'flex', alignItems: 'center', gap: '12px',
            boxShadow: '0 1px 4px rgba(15,23,42,0.04)',
          }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '10px',
              background: 'var(--raised)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', flexShrink: 0,
            }}>{item.emoji}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', marginBottom: '3px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {item.description}
              </div>
            </div>

            <div style={{
              fontSize: '10px', fontWeight: 500, padding: '3px 8px', borderRadius: '6px',
              background: 'var(--raised)', color: 'var(--text-muted)', flexShrink: 0,
            }}>
              準備中
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', padding: '20px 0' }}>
        随時追加予定
      </div>
    </div>
  );
}

/* ─── コアSTEPタブ（レッスン一覧） ─── */
function StepLessonTab({ cfg, courseId, lessons, completed, onSelect }) {
  const totalCount     = lessons.length;
  const completedCount = completed.length;
  const nextLesson     = lessons.find((l) => !completed.includes(l.id));

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
          border: '1px solid var(--border)',
          borderLeft: `3px solid ${cfg.color}`,
          borderRadius: '12px', padding: '14px', marginBottom: '12px',
          boxShadow: '0 1px 4px rgba(15,23,42,0.05)',
        }}>
          <div style={{
            fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)',
            letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px',
          }}>
            次のレッスン
          </div>
          <div style={{
            fontWeight: 600, fontSize: '14px', color: 'var(--text)',
            marginBottom: '3px', lineHeight: 1.4,
          }}>
            {nextLesson.title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            {nextLesson.duration}
          </div>
          <button
            style={{
              width: '100%', padding: '11px', border: 'none', borderRadius: '8px',
              background: 'var(--navy)', color: 'white',
              fontFamily: 'inherit', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
            }}
            onClick={() => onSelect(nextLesson.id)}
          >
            学習を続ける
          </button>
        </div>
      ) : (
        <div style={{
          padding: '13px 14px', marginBottom: '12px',
          background: 'var(--success-bg)', border: '1px solid #a7f3d0',
          borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ fontSize: '14px', color: 'var(--success)' }}>✓</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--success)' }}>
            このSTEPのレッスンをすべて完了
          </span>
        </div>
      )}

      <div style={{
        fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)',
        letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '8px',
      }}>
        レッスン一覧
      </div>

      {lessons.map((lesson, idx) => {
        const done   = completed.includes(lesson.id);
        const isNext = nextLesson?.id === lesson.id;
        return (
          <button
            key={lesson.id}
            className={`lesson-card${done ? ' completed' : ''}`}
            onClick={() => onSelect(lesson.id)}
          >
            <div className="lesson-emoji" style={{ background: done ? '#d1fae5' : 'var(--raised)', fontSize: '18px' }}>
              {done ? '✓' : lesson.emoji}
            </div>
            <div className="lesson-info">
              <div className="lesson-title">{idx + 1}. {lesson.title}</div>
              <div className="lesson-meta">
                <span>{lesson.duration}</span>
                {done && (
                  <span style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>
                    完了
                  </span>
                )}
                {!done && isNext && (
                  <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>
                    次へ
                  </span>
                )}
              </div>
            </div>
            <span style={{
              fontSize: '15px', flexShrink: 0,
              color: done ? 'var(--success)' : 'var(--border)',
            }}>
              {done ? '✓' : '›'}
            </span>
          </button>
        );
      })}

      <div style={{
        padding: '14px 0 4px', color: 'var(--text-muted)',
        fontSize: '11px', textAlign: 'center',
      }}>
        {totalCount} レッスン · 最大 {totalCount * 50} XP
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

      {/* タブ */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 8px',
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        <div style={{
          display: 'flex', overflowX: 'auto',
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
                  padding: isLibrary ? '10px 8px 11px' : '10px 9px 11px',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                  background: 'transparent',
                  color: isActive ? 'var(--primary)' : isLibrary ? 'var(--border)' : 'var(--text-muted)',
                  fontFamily: 'inherit',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: isLibrary ? '10px' : '11px',
                  cursor: 'pointer', textAlign: 'center',
                  transition: 'color 0.15s, border-color 0.15s',
                  lineHeight: 1.3,
                  minWidth: isLibrary ? '42px' : '50px',
                }}
              >
                {tab.stepNum !== null && !isLibrary && (
                  <div style={{
                    fontSize: '9px', fontWeight: 600,
                    opacity: isActive ? 0.75 : 0.5,
                    marginBottom: '2px', letterSpacing: '0.3px',
                  }}>
                    S{tab.stepNum}
                  </div>
                )}
                <div>{tab.label}</div>
                {showCount && (
                  <div style={{ fontSize: '9px', marginTop: '2px', opacity: 0.7 }}>
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

      {activeTab === 'step6'   && <GraduationTabContent />}
      {activeTab === 'library' && <LibraryTabContent />}
    </div>
  );
}
