import { useState } from 'react';

const STORAGE_KEY = 'ai-school-progress-v1';

const INITIAL_STATE = {
  completedLessons: [],
  completedMissions: [],
  xp: 0,
  missionMemos: {},
  badges: [],
  welcomeSeen: false,
  quizResults: {},
};

const BADGES = {
  first_lesson: { emoji: '🎓', name: 'はじめての学習', desc: '初レッスン完了' },
  three_lessons: { emoji: '🌟', name: '3レッスン完了', desc: 'レッスン3個達成' },
  first_mission: { emoji: '⚡', name: '初ミッション完了', desc: '初ミッション達成' },
  ai_doctor: { emoji: '🏆', name: 'AIツール博士', desc: 'レッスン5個達成' },
};

export const BADGE_DEFS = BADGES;

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...INITIAL_STATE, ...parsed };
    }
  } catch {
    // ignore
  }
  return { ...INITIAL_STATE };
}

function saveToStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function detectNewBadges(prevBadges, lessons, missions) {
  const newBadges = [];
  if (lessons.length >= 1 && !prevBadges.includes('first_lesson')) newBadges.push('first_lesson');
  if (lessons.length >= 3 && !prevBadges.includes('three_lessons')) newBadges.push('three_lessons');
  if (missions.length >= 1 && !prevBadges.includes('first_mission')) newBadges.push('first_mission');
  if (lessons.length >= 5 && !prevBadges.includes('ai_doctor')) newBadges.push('ai_doctor');
  return newBadges;
}

export function useProgress() {
  const [progress, setProgress] = useState(loadFromStorage);

  function update(newProgress) {
    setProgress(newProgress);
    saveToStorage(newProgress);
  }

  function completeLesson(lessonId) {
    if (progress.completedLessons.includes(lessonId)) return null;

    const newLessons = [...progress.completedLessons, lessonId];
    const newXp = progress.xp + 50;
    const newBadges = detectNewBadges(progress.badges, newLessons, progress.completedMissions);
    const allBadges = [...progress.badges, ...newBadges];

    update({ ...progress, completedLessons: newLessons, xp: newXp, badges: allBadges });
    return { xp: 50, newBadges };
  }

  function completeMission(missionId) {
    if (progress.completedMissions.includes(missionId)) return null;

    const newMissions = [...progress.completedMissions, missionId];
    const newXp = progress.xp + 100;
    const newBadges = detectNewBadges(progress.badges, progress.completedLessons, newMissions);
    const allBadges = [...progress.badges, ...newBadges];

    update({ ...progress, completedMissions: newMissions, xp: newXp, badges: allBadges });
    return { xp: 100, newBadges };
  }

  function saveMemo(missionId, memo) {
    update({ ...progress, missionMemos: { ...progress.missionMemos, [missionId]: memo } });
  }

  function setWelcomeSeen() {
    update({ ...progress, welcomeSeen: true });
  }

  function resetAll() {
    const fresh = { ...INITIAL_STATE };
    setProgress(fresh);
    saveToStorage(fresh);
  }

  function getLevel() {
    const xp = progress.xp;
    if (xp >= 1000) return { level: 5, name: 'AI実践者', emoji: '🏆', nextXp: null };
    if (xp >= 700) return { level: 4, name: 'AI活用者', emoji: '🚀', nextXp: 1000 };
    if (xp >= 400) return { level: 3, name: 'AIビギナー', emoji: '⭐', nextXp: 700 };
    if (xp >= 150) return { level: 2, name: 'AI見習い', emoji: '🌱', nextXp: 400 };
    return { level: 1, name: 'AI初心者', emoji: '🎮', nextXp: 150 };
  }

  function getLevelProgress() {
    const xp = progress.xp;
    const thresholds = [0, 150, 400, 700, 1000];
    const level = getLevel().level;
    if (level >= 5) return 100;
    const start = thresholds[level - 1];
    const end = thresholds[level];
    return Math.round(((xp - start) / (end - start)) * 100);
  }

  function getTotalProgress() {
    const total = 12 + 6;
    const completed = progress.completedLessons.length + progress.completedMissions.length;
    return Math.round((completed / total) * 100);
  }

  function getNextLesson(lessons) {
    return lessons.find((l) => !progress.completedLessons.includes(l.id)) || null;
  }

  function recordQuizResult(lessonId, isCorrect) {
    update({ ...progress, quizResults: { ...progress.quizResults, [lessonId]: isCorrect } });
  }

  function getQuizStats() {
    const results = Object.values(progress.quizResults);
    const attempted = results.length;
    const correct = results.filter(Boolean).length;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : null;
    return { attempted, correct, accuracy };
  }

  return {
    progress,
    completeLesson,
    completeMission,
    saveMemo,
    setWelcomeSeen,
    resetAll,
    getLevel,
    getLevelProgress,
    getTotalProgress,
    getNextLesson,
    recordQuizResult,
    getQuizStats,
  };
}
