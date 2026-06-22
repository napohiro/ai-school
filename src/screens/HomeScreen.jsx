export default function HomeScreen({ progress, getLevel, getLevelProgress, getTotalProgress, getNextLesson, lessons, missions, onNavigate }) {
  const levelInfo = getLevel();
  const levelPct = getLevelProgress();
  const totalPct = getTotalProgress();
  const nextLesson = getNextLesson(lessons);
  const nextMission = missions.find((m) => !progress.completedMissions.includes(m.id));

  const completedCount = progress.completedLessons.length + progress.completedMissions.length;

  return (
    <div>
      {/* Hero */}
      <div className="home-hero">
        <div className="home-hero-content">
          <h1>🤖 AIスクール</h1>
          <p>AIを基礎の基礎から、使える力へ</p>

          <div className="progress-card">
            <div className="level-badge">
              <span>{levelInfo.emoji}</span>
              <span>Lv.{levelInfo.level} {levelInfo.name}</span>
            </div>
            <div className="xp-counter">✨ {progress.xp} XP 獲得中</div>
            <div className="progress-label">
              <span>レベル進捗</span>
              <span>{levelPct}%</span>
            </div>
            <div className="progress-bar-white">
              <div className="progress-bar-white-inner" style={{ width: `${levelPct}%` }} />
            </div>
            {levelInfo.nextXp && (
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '6px' }}>
                次のレベルまで {levelInfo.nextXp - progress.xp} XP
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="section" style={{ paddingTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          {[
            { label: '完了レッスン', value: progress.completedLessons.length, max: 12, icon: '📚' },
            { label: '完了ミッション', value: progress.completedMissions.length, max: 6, icon: '⚡' },
            { label: '獲得バッジ', value: progress.badges.length, max: 4, icon: '🏅' },
          ].map((item) => (
            <div key={item.label} className="card" style={{ textAlign: 'center', padding: '12px 8px' }}>
              <div style={{ fontSize: '20px', marginBottom: '4px' }}>{item.icon}</div>
              <div style={{ fontSize: '22px', fontWeight: 900, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>/ {item.max} {item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Progress */}
      <div className="section" style={{ paddingTop: '16px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700 }}>📊 学習達成率</span>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#6366f1' }}>{totalPct}%</span>
          </div>
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: `${totalPct}%` }} />
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
            {completedCount} / 18 コンテンツ完了
          </div>
        </div>
      </div>

      {/* Next Lesson */}
      {nextLesson && (
        <div className="section" style={{ paddingTop: '20px' }}>
          <div className="section-title">📖 次に学ぶレッスン</div>
          <div
            className="card card-hover"
            onClick={() => onNavigate('learning', { type: 'lesson', id: nextLesson.id })}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ fontSize: '36px' }}>{nextLesson.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{nextLesson.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{nextLesson.description}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <span className="tag tag-primary">{nextLesson.category}</span>
                  <span className="tag tag-gray">🕐 {nextLesson.duration}</span>
                </div>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '18px' }}>›</span>
            </div>
          </div>
        </div>
      )}

      {/* Today's Mission */}
      {nextMission && (
        <div className="section" style={{ paddingTop: '20px' }}>
          <div className="section-title">⚡ 今日の実践ミッション</div>
          <div
            className="card card-hover"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(139,92,246,0.05) 100%)', border: '1.5px solid rgba(99,102,241,0.2)' }}
            onClick={() => onNavigate('practice', { type: 'mission', id: nextMission.id })}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ fontSize: '36px' }}>{nextMission.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{nextMission.title}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{nextMission.description}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <span className="tag tag-purple">{nextMission.difficulty}</span>
                  <span className="tag tag-gray">🕐 {nextMission.duration}</span>
                  <span className="tag tag-warning">+100 XP</span>
                </div>
              </div>
              <span style={{ color: '#6366f1', fontSize: '18px' }}>›</span>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Lessons */}
      <div className="section" style={{ paddingTop: '20px', paddingBottom: '8px' }}>
        <div className="section-title">🌟 おすすめレッスン</div>
        <div className="scroll-x">
          {lessons.slice(0, 5).map((lesson) => {
            const done = progress.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className="snap-card card card-hover"
                onClick={() => onNavigate('learning', { type: 'lesson', id: lesson.id })}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{lesson.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                  {lesson.title}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', lineHeight: 1.5 }}>
                  {lesson.description}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tag tag-gray">🕐 {lesson.duration}</span>
                  {done && <span className="tag tag-success">✓ 完了</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="section" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div style={{ fontSize: '20px', marginBottom: '8px' }}>💡</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
            AIスクールの使い方
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.7 }}>
            ①「学習」でレッスンを読む → ②「実践」でミッションに挑戦 → ③「ツール」でAIを探す。この流れで学習すると効果的です！
          </div>
        </div>
      </div>
    </div>
  );
}
