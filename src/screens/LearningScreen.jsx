import { useState } from 'react';
import { COURSES, getCourseById } from '../data/courses';
import { SPECIAL_LECTURES, LECTURE_CATEGORIES } from '../data/specialLectures';

const CORE_TABS = [
  { key: 'beginner',     label: '初級',     icon: '📗', color: '#3b82f6', colorDark: '#1d4ed8', colorBg: 'rgba(59,130,246,0.08)', colorBorder: 'rgba(59,130,246,0.25)', colorLight: 'rgba(59,130,246,0.12)', tagBg: 'rgba(59,130,246,0.12)', tagColor: '#1d4ed8' },
  { key: 'advanced',     label: '中級',     icon: '📘', color: '#10b981', colorDark: '#065f46', colorBg: 'rgba(16,185,129,0.08)', colorBorder: 'rgba(16,185,129,0.25)', colorLight: 'rgba(16,185,129,0.12)', tagBg: 'rgba(16,185,129,0.12)', tagColor: '#065f46' },
  { key: 'expert',       label: '上級',     icon: '📙', color: '#8b5cf6', colorDark: '#5b21b6', colorBg: 'rgba(139,92,246,0.08)', colorBorder: 'rgba(139,92,246,0.25)', colorLight: 'rgba(139,92,246,0.12)', tagBg: 'rgba(139,92,246,0.12)', tagColor: '#5b21b6' },
  { key: 'practice',     label: '実践',     icon: '⚡', color: '#f59e0b', colorDark: '#92400e', colorBg: 'rgba(245,158,11,0.08)', colorBorder: 'rgba(245,158,11,0.25)', colorLight: 'rgba(245,158,11,0.12)', tagBg: 'rgba(245,158,11,0.12)', tagColor: '#92400e' },
  { key: 'professional', label: 'プロ',     icon: '💼', color: '#0ea5e9', colorDark: '#0369a1', colorBg: 'rgba(14,165,233,0.08)', colorBorder: 'rgba(14,165,233,0.25)', colorLight: 'rgba(14,165,233,0.12)', tagBg: 'rgba(14,165,233,0.12)', tagColor: '#0369a1' },
  { key: 'business',     label: 'ビジネス', icon: '💰', color: '#ec4899', colorDark: '#9d174d', colorBg: 'rgba(236,72,153,0.08)', colorBorder: 'rgba(236,72,153,0.25)', colorLight: 'rgba(236,72,153,0.12)', tagBg: 'rgba(236,72,153,0.12)', tagColor: '#9d174d' },
  { key: 'startup',      label: '起業',     icon: '🚀', color: '#f97316', colorDark: '#9a3412', colorBg: 'rgba(249,115,22,0.08)', colorBorder: 'rgba(249,115,22,0.25)', colorLight: 'rgba(249,115,22,0.12)', tagBg: 'rgba(249,115,22,0.12)', tagColor: '#9a3412' },
  { key: 'graduation',   label: '卒業制作', icon: '🎓', color: '#eab308', colorDark: '#713f12', colorBg: 'rgba(234,179,8,0.08)', colorBorder: 'rgba(234,179,8,0.25)', colorLight: 'rgba(234,179,8,0.12)', tagBg: 'rgba(234,179,8,0.12)', tagColor: '#713f12' },
  { key: 'special',      label: '特別講座', icon: '⭐', color: '#7c3aed', colorDark: '#4c1d95', colorBg: 'rgba(124,58,237,0.08)', colorBorder: 'rgba(124,58,237,0.25)', colorLight: 'rgba(124,58,237,0.12)', tagBg: 'rgba(124,58,237,0.12)', tagColor: '#4c1d95' },
];

const DIFFICULTY_COLOR = {
  '初級':         '#10b981',
  '初級〜中級':  '#3b82f6',
  '中級':         '#3b82f6',
  '中級〜上級':  '#8b5cf6',
  '上級':         '#8b5cf6',
  'プロ':         '#0ea5e9',
  'プロ〜エキスパート': '#f97316',
  '総合':         '#eab308',
};

/* ─── コース詳細カード（プロ・ビジネス・起業） ─── */
function CourseDetailCard({ courseId, onNavigate }) {
  const course = getCourseById(courseId);
  if (!course) return null;

  return (
    <div style={{ padding: '16px' }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${course.color}18 0%, ${course.color}06 100%)`,
        border: `2px solid ${course.color}35`,
        borderRadius: '20px', padding: '24px', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: `${course.color}20`, border: `2px solid ${course.color}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', flexShrink: 0,
          }}>{course.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: course.color, letterSpacing: '1.5px', marginBottom: '4px' }}>
              {course.level}
            </div>
            <div style={{ fontSize: '19px', fontWeight: 900, color: '#1e293b', lineHeight: 1.2, marginBottom: '4px' }}>
              {course.name}
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>{course.subtitle}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px',
            background: `${course.color}20`, color: course.color, border: `1px solid ${course.color}30`,
          }}>
            {course.lessonCount}レッスン
          </span>
          <span style={{
            fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px',
            background: `${DIFFICULTY_COLOR[course.difficulty] || '#64748b'}15`,
            color: DIFFICULTY_COLOR[course.difficulty] || '#64748b',
          }}>
            難易度：{course.difficulty}
          </span>
          {course.badgeStatus === 'recommended' ? (
            <span style={{
              fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '20px',
              background: '#fef9c3', color: '#854d0e', border: '1px solid #fde047',
            }}>⭐ おすすめ次ステージ</span>
          ) : (
            <span style={{
              fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px',
              background: '#f1f5f9', color: '#94a3b8',
            }}>🗺️ ロードマップ公開中</span>
          )}
        </div>

        {/* Goal banner */}
        <div style={{
          background: `${course.color}12`, border: `1px solid ${course.color}25`,
          borderRadius: '12px', padding: '12px',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: course.color, marginBottom: '4px' }}>🎯 到達目標</div>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b', lineHeight: 1.5 }}>
            {course.goal}
          </div>
        </div>
      </div>

      {/* Course metadata */}
      <div className="card" style={{ marginBottom: '12px' }}>
        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '12px' }}>📋 コース詳細</div>
        {[
          { label: '対象者',   value: course.target },
          { label: '学習目的', value: course.purpose },
          { label: '修了後',   value: course.afterCompletion },
        ].map((item) => (
          <div key={item.label} style={{
            display: 'flex', gap: '10px', paddingBottom: '10px', marginBottom: '10px',
            borderBottom: '1px solid #f1f5f9',
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', width: '60px', flexShrink: 0, paddingTop: '1px' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: 600, flex: 1, lineHeight: 1.5 }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="card" style={{ marginBottom: '12px' }}>
        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '10px' }}>🎯 獲得できるスキル</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {course.skills.map((skill) => (
            <span key={skill} style={{
              fontSize: '12px', fontWeight: 700, padding: '5px 12px',
              borderRadius: '10px', background: `${course.color}12`, color: course.color,
              border: `1px solid ${course.color}25`,
            }}>
              ✓ {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Lesson list with real titles */}
      <div className="card" style={{ marginBottom: '12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '12px',
        }}>
          <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b' }}>
            📚 レッスン一覧
          </div>
          <span style={{
            fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '8px',
            background: '#f1f5f9', color: '#64748b',
          }}>全{course.lessonCount}本</span>
        </div>

        {(course.lessons || []).map((lesson, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 0',
            borderBottom: i < course.lessons.length - 1 ? '1px solid #f8fafc' : 'none',
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: `${course.color}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', flexShrink: 0,
            }}>{lesson.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', lineHeight: 1.4 }}>
                {lesson.no}. {lesson.title}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '1px' }}>
                🕐 {lesson.duration}
              </div>
            </div>
            <div style={{
              fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '6px',
              background: '#f1f5f9', color: '#94a3b8', flexShrink: 0,
            }}>準備中</div>
          </div>
        ))}
      </div>

      {/* Roadmap notice */}
      <div style={{
        background: 'linear-gradient(135deg, #f0f9ff, #f5f3ff)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '16px', padding: '16px', textAlign: 'center',
      }}>
        <div style={{ fontSize: '22px', marginBottom: '8px' }}>🗺️</div>
        <div style={{ fontWeight: 800, fontSize: '14px', color: '#6366f1', marginBottom: '4px' }}>
          ロードマップ公開中
        </div>
        <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>
          レッスン本文は順次公開予定。<br />
          まずは初級〜実践コースで土台を固めましょう！
        </div>
        {onNavigate && (
          <button
            style={{
              marginTop: '12px', padding: '10px 20px', border: 'none', borderRadius: '10px',
              background: '#6366f1', color: 'white', fontFamily: 'inherit',
              fontWeight: 700, fontSize: '13px', cursor: 'pointer',
            }}
            onClick={() => onNavigate('learning', { type: 'beginnerTab' })}
          >
            ← 初級から学ぶ
          </button>
        )}
      </div>

      <div style={{ height: '8px' }} />
    </div>
  );
}

/* ─── 卒業制作タブ ─── */
function GraduationTabContent({ onNavigate }) {
  const course = getCourseById('graduation');

  return (
    <div style={{ padding: '16px' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '20px', padding: '24px', marginBottom: '16px', color: 'white',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎓</div>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#eab308', letterSpacing: '2px', marginBottom: '6px' }}>
          FINAL PROJECT — Lv.8
        </div>
        <div style={{ fontSize: '20px', fontWeight: 900, marginBottom: '6px' }}>卒業制作</div>
        <div style={{ fontSize: '13px', opacity: 0.75, marginBottom: '16px' }}>
          自分だけのAIサービスを公開する
        </div>
        <div style={{
          display: 'inline-flex', gap: '8px', background: 'rgba(255,255,255,0.08)',
          borderRadius: '12px', padding: '10px 16px',
        }}>
          <span style={{ fontSize: '12px', fontWeight: 700 }}>🎯 到達目標</span>
          <span style={{ fontSize: '12px', opacity: 0.85 }}>独自のAIサービスを公開し卒業証を取得</span>
        </div>
      </div>

      {/* 卒業制作カード（ステータス表示） */}
      <div className="card" style={{ marginBottom: '14px', border: '2px solid rgba(234,179,8,0.3)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9',
        }}>
          <span style={{ fontSize: '20px' }}>🗂️</span>
          <span style={{ fontWeight: 800, fontSize: '15px', color: '#1e293b' }}>卒業制作カード</span>
          <span style={{
            marginLeft: 'auto', fontSize: '11px', fontWeight: 700, padding: '3px 8px',
            borderRadius: '8px', background: '#f1f5f9', color: '#94a3b8',
          }}>未認定</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { label: '作品名',   value: '未登録', icon: '📛' },
            { label: '公開URL',  value: '未登録', icon: '🌐' },
            { label: 'GitHub',  value: '未登録', icon: '🐙' },
            { label: '制作状況', value: '未提出', icon: '📋' },
          ].map((item) => (
            <div key={item.label} style={{
              background: '#f8fafc', borderRadius: '10px', padding: '10px 12px',
            }}>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>
                {item.icon} {item.label}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '12px', padding: '10px 12px', borderRadius: '10px',
          background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)',
        }}>
          <div style={{ fontSize: '11px', color: '#92400e', fontWeight: 700, marginBottom: '3px' }}>
            🏆 卒業判定
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>未認定</div>
        </div>
      </div>

      {/* 10ステップフロー */}
      <div className="card" style={{ marginBottom: '14px' }}>
        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '14px' }}>
          📍 卒業制作の流れ（10ステップ）
        </div>

        {(course?.lessons || []).map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px', flexShrink: 0 }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: '#f1f5f9', border: '2px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', fontWeight: 800, color: '#94a3b8',
              }}>
                {step.no}
              </div>
              {i < course.lessons.length - 1 && (
                <div style={{ width: '2px', flex: 1, background: '#e2e8f0', marginTop: '4px', minHeight: '20px' }} />
              )}
            </div>
            <div style={{ flex: 1, paddingBottom: i < course.lessons.length - 1 ? '8px' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>{step.emoji}</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', lineHeight: 1.3 }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                    目安 {step.duration}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="card" style={{ marginBottom: '14px' }}>
        <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '10px' }}>
          🎯 卒業制作で証明できるスキル
        </div>
        {['総合設計力', 'AIサービス開発', 'GitHub公開', 'Vercel公開', 'ポートフォリオ構築'].map((skill) => (
          <div key={skill} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 0', borderBottom: '1px solid #f8fafc',
            fontSize: '13px', fontWeight: 600, color: '#1e293b',
          }}>
            <span style={{ color: '#eab308', fontWeight: 800 }}>✓</span> {skill}
          </div>
        ))}
      </div>

      {/* 卒業証プレビュー */}
      <div style={{
        background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
        border: '2px dashed #cbd5e1', borderRadius: '20px', padding: '20px',
        textAlign: 'center', marginBottom: '8px',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '8px', opacity: 0.4 }}>🔒</div>
        <div style={{ fontSize: '15px', fontWeight: 900, color: '#94a3b8', marginBottom: '4px' }}>
          AIスクール認定 AIクリエイター
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>
          全コース修了＋卒業制作提出で取得できます
        </div>
      </div>

      <div style={{ height: '8px' }} />
    </div>
  );
}

/* ─── 実践タブ ─── */
function PracticeTabContent({ missions, completedMissions, onNavigate }) {
  const done = completedMissions.length;
  const pct = Math.round((done / 6) * 100);
  return (
    <div style={{ padding: '16px' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, white 100%)',
        border: '1.5px solid rgba(245,158,11,0.3)',
        borderRadius: '16px', padding: '20px', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'rgba(245,158,11,0.15)', fontSize: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>⚡</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b' }}>実践ミッション</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>実際に動くものを作って学習を定着させる</div>
          </div>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
            <span>{done} / 6 ミッション完了</span>
            <span style={{ fontWeight: 800, color: '#f59e0b' }}>{pct}%</span>
          </div>
          <div style={{ height: '8px', borderRadius: '99px', background: '#e2e8f0', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '99px', background: '#f59e0b', width: `${pct}%` }} />
          </div>
        </div>
        <button
          style={{
            width: '100%', padding: '13px', border: 'none', borderRadius: '12px',
            background: '#f59e0b', color: 'white', fontFamily: 'inherit',
            fontWeight: 800, fontSize: '15px', cursor: 'pointer',
          }}
          onClick={() => onNavigate('practice')}
        >
          ⚡ 実践ミッションへ
        </button>
      </div>

      {missions.slice(0, 4).map((m) => {
        const isDone = completedMissions.includes(m.id);
        return (
          <div
            key={m.id}
            className="card card-hover"
            style={{ marginBottom: '10px', opacity: isDone ? 0.75 : 1 }}
            onClick={() => onNavigate('practice', { type: 'mission', id: m.id })}
          >
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ fontSize: '28px', flexShrink: 0 }}>{m.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '3px' }}>{m.title}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{m.difficulty} • {m.duration} • +100 XP</div>
              </div>
              {isDone
                ? <span style={{ fontSize: '20px', flexShrink: 0 }}>✅</span>
                : <span style={{ color: '#f59e0b', fontSize: '18px', flexShrink: 0 }}>›</span>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── 特別講座タブ ─── */
function SpecialLecturesTabContent() {
  const [activeCat, setActiveCat] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const cats = ['all', ...LECTURE_CATEGORIES];
  const filtered = activeCat === 'all'
    ? SPECIAL_LECTURES
    : SPECIAL_LECTURES.filter((l) => l.category === activeCat);

  return (
    <div style={{ padding: '16px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, white 100%)',
        border: '1.5px solid rgba(124,58,237,0.2)',
        borderRadius: '16px', padding: '16px', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'rgba(124,58,237,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px',
          }}>⭐</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '16px', color: '#1e293b' }}>特別講座</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>
              {SPECIAL_LECTURES.length}講座 — ツール・テーマを深掘りする専門コース
            </div>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div style={{
        display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px',
        scrollbarWidth: 'none',
      }}>
        {cats.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            style={{
              flexShrink: 0, padding: '5px 12px', borderRadius: '20px', fontFamily: 'inherit',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              border: activeCat === cat ? 'none' : '1.5px solid #e2e8f0',
              background: activeCat === cat ? '#7c3aed' : 'white',
              color: activeCat === cat ? 'white' : '#64748b',
            }}
          >
            {cat === 'all' ? `すべて (${SPECIAL_LECTURES.length})` : cat}
          </button>
        ))}
      </div>

      {/* Lecture list (single column with rich cards) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((lecture) => {
          const isExpanded = expandedId === lecture.id;
          return (
            <div
              key={lecture.id}
              style={{
                background: 'white',
                border: isExpanded ? `2px solid ${lecture.color}50` : '1.5px solid #e2e8f0',
                borderRadius: '16px', overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              {/* Card header (always visible) */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : lecture.id)}
                style={{
                  display: 'flex', gap: '12px', alignItems: 'center',
                  padding: '14px', cursor: 'pointer',
                  background: isExpanded ? `${lecture.color}08` : 'white',
                }}
              >
                <div style={{
                  width: '46px', height: '46px', borderRadius: '12px',
                  background: `${lecture.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', flexShrink: 0,
                }}>{lecture.emoji}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: '#1e293b', marginBottom: '3px' }}>
                    {lecture.name}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px',
                      background: `${lecture.color}12`, color: lecture.color,
                    }}>{lecture.category}</span>
                    <span style={{
                      fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px',
                      background: '#f1f5f9', color: '#64748b',
                    }}>{lecture.difficulty}</span>
                    <span style={{
                      fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: '6px',
                      background: '#f8fafc', color: '#94a3b8',
                    }}>{lecture.recommendedLevel}</span>
                  </div>
                </div>

                <span style={{
                  color: '#94a3b8', fontSize: '18px', flexShrink: 0,
                  transform: isExpanded ? 'rotate(90deg)' : 'none',
                  transition: 'transform 0.2s',
                }}>›</span>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div style={{ padding: '0 14px 14px', borderTop: `1px solid ${lecture.color}20` }}>
                  <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, marginBottom: '12px', paddingTop: '12px' }}>
                    {lecture.description}
                  </div>

                  {/* What you learn */}
                  {lecture.whatYouLearn && (
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                        📖 学ぶこと
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {lecture.whatYouLearn.map((item) => (
                          <span key={item} style={{
                            fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '7px',
                            background: `${lecture.color}10`, color: lecture.color,
                            border: `1px solid ${lecture.color}20`,
                          }}>
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tools */}
                  {lecture.tools && (
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>
                        🛠️ 使うツール
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {lecture.tools.map((tool) => (
                          <span key={tool} style={{
                            fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '7px',
                            background: '#f1f5f9', color: '#475569',
                          }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* After completion */}
                  {lecture.afterCompletion && (
                    <div style={{
                      background: `${lecture.color}08`, border: `1px solid ${lecture.color}20`,
                      borderRadius: '10px', padding: '10px',
                    }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: lecture.color, marginBottom: '3px' }}>
                        🚀 受講後にできること
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b', lineHeight: 1.5 }}>
                        {lecture.afterCompletion}
                      </div>
                    </div>
                  )}

                  <div style={{
                    marginTop: '10px', fontSize: '11px', fontWeight: 700, color: '#94a3b8',
                    textAlign: 'center', padding: '6px',
                    background: '#f8fafc', borderRadius: '8px',
                  }}>
                    🔒 コンテンツ準備中 — 近日公開
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', padding: '20px 0' }}>
        随時追加予定 — リクエストはマイページから
      </div>
    </div>
  );
}

/* ─── メインコンポーネント ─── */
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
  missions,
  completedMissions,
  initialTab,
  onNavigate,
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'beginner');

  const cfg = CORE_TABS.find((t) => t.key === activeTab) || CORE_TABS[0];

  const currentLessons =
    activeTab === 'beginner' ? lessons :
    activeTab === 'advanced' ? lessonsAdvanced :
    activeTab === 'expert'   ? lessonsExpert :
    [];

  const completedCurrent =
    activeTab === 'beginner' ? completedLessons :
    activeTab === 'advanced' ? (completedAdvancedLessons || []) :
    activeTab === 'expert'   ? (completedExpertLessons || []) :
    [];

  const onSelect =
    activeTab === 'beginner' ? onSelectLesson :
    activeTab === 'advanced' ? onSelectAdvancedLesson :
    activeTab === 'expert'   ? onSelectExpertLesson :
    null;

  const completedCount = completedCurrent.length;
  const totalCount = currentLessons.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const nextLesson = currentLessons.find((l) => !completedCurrent.includes(l.id));
  const categories = [...new Set(currentLessons.map((l) => l.category))];

  const counts = {
    beginner: completedLessons.length,
    advanced: (completedAdvancedLessons || []).length,
    expert: (completedExpertLessons || []).length,
    practice: (completedMissions || []).length,
  };

  const isCoreLessonTab = ['beginner', 'advanced', 'expert'].includes(activeTab);
  const isAdvancedCourseTab = ['professional', 'business', 'startup'].includes(activeTab);

  return (
    <div>
      {/* Gradient Header */}
      <div className="gradient-header" style={{ paddingBottom: '20px' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>📚 学習コース</h1>
          <p>初級から卒業制作まで、9カテゴリで学ぼう</p>
        </div>
      </div>

      {/* ===== Horizontally Scrollable Tabs ===== */}
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
            const showCount = ['beginner', 'advanced', 'expert', 'practice'].includes(tab.key);
            const max = tab.key === 'practice' ? 6 : 12;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flexShrink: 0, padding: '8px 12px', borderRadius: '12px',
                  border: isActive ? `2px solid ${tab.color}` : '2px solid #e2e8f0',
                  background: isActive ? tab.colorBg : 'white',
                  color: isActive ? tab.colorDark : '#94a3b8',
                  fontFamily: 'inherit', fontWeight: isActive ? 800 : 600,
                  fontSize: '12px', cursor: 'pointer', textAlign: 'center',
                  transition: 'all 0.2s', lineHeight: 1.3, minWidth: '60px',
                }}
              >
                <div>{tab.icon} {tab.label}</div>
                {showCount && (
                  <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.8 }}>
                    {count}/{max}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== Practice Tab ===== */}
      {activeTab === 'practice' && (
        <PracticeTabContent
          missions={missions || []}
          completedMissions={completedMissions || []}
          onNavigate={onNavigate}
        />
      )}

      {/* ===== Advanced Course Tabs (pro / business / startup) ===== */}
      {isAdvancedCourseTab && (
        <CourseDetailCard courseId={activeTab} onNavigate={onNavigate} />
      )}

      {/* ===== Graduation Tab ===== */}
      {activeTab === 'graduation' && (
        <GraduationTabContent onNavigate={onNavigate} />
      )}

      {/* ===== Special Lectures Tab ===== */}
      {activeTab === 'special' && <SpecialLecturesTabContent />}

      {/* ===== Core Lesson Tabs (beginner / advanced / expert) ===== */}
      {isCoreLessonTab && (
        <div style={{ padding: '16px' }}>
          {/* Status Card */}
          <div style={{
            background: cfg.colorBg, border: `1.5px solid ${cfg.colorBorder}`,
            borderRadius: '16px', padding: '16px', marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px' }}>{cfg.icon}</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: cfg.colorDark }}>{cfg.label}コース</span>
              <span style={{ marginLeft: 'auto', fontSize: '18px', fontWeight: 900, color: cfg.color }}>
                {progressPct}%
              </span>
            </div>

            {nextLesson ? (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', background: cfg.colorLight,
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

          {/* Lesson List */}
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
                          background: cfg.color, padding: '6px 10px', borderRadius: '8px', flexShrink: 0,
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
      )}
    </div>
  );
}
