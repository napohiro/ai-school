import { useState } from 'react';

const STORAGE_KEY = 'ai-school-progress-v1';

const INITIAL_STATE = {
  completedLessons: [],
  completedMissions: [],
  completedAdvancedLessons: [],
  completedExpertLessons: [],
  xp: 0,
  missionMemos: {},
  badges: [],
  welcomeSeen: false,
  quizResults: {},
};

// hidden: true のバッジはUIに表示しない（LocalStorage互換のために残す）
const BADGES = {
  first_lesson:          { emoji: '⭐', name: 'はじめての一歩',   desc: '初レッスン完了',    hidden: true },
  three_lessons:         { emoji: '🌟', name: '3レッスン達成',    desc: '3レッスン完了',     hidden: true },
  first_mission:         { emoji: '⚡', name: '初実践クリア',     desc: '初ミッション達成',   hidden: true },
  ai_doctor:             { emoji: '🔍', name: 'AI探求者',        desc: '5レッスン達成',     hidden: true },
  // メインバッジ（表示する7種）
  beginner_complete:     { emoji: '📗', name: '基礎修了',         desc: '基礎編 全レッスン完了' },
  advanced_complete:     { emoji: '📘', name: '活用修了',         desc: '活用編 全レッスン完了' },
  expert_complete:       { emoji: '📙', name: '開発修了',         desc: '開発編 全レッスン完了' },
  practice_complete:     { emoji: '⚡', name: '実践修了',         desc: '実践編 全ミッション完了' },
  monetization_complete: { emoji: '💰', name: '収益化修了',       desc: '収益化編 全レッスン完了' },
  graduation_submitted:  { emoji: '🎓', name: '卒業制作提出',     desc: '卒業制作を完成・提出' },
  all_graduate:          { emoji: '👑', name: 'AIスクール修了',   desc: '基礎〜実践を全て修了' },
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

function detectProgressBadges(prevBadges, lessons, missions) {
  const newBadges = [];
  if (lessons.length >= 1  && !prevBadges.includes('first_lesson'))  newBadges.push('first_lesson');
  if (lessons.length >= 3  && !prevBadges.includes('three_lessons')) newBadges.push('three_lessons');
  if (missions.length >= 1 && !prevBadges.includes('first_mission')) newBadges.push('first_mission');
  if (lessons.length >= 5  && !prevBadges.includes('ai_doctor'))     newBadges.push('ai_doctor');
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
    const newBadges = detectProgressBadges(progress.badges, newLessons, progress.completedMissions);

    if (newLessons.length >= 12 && !progress.badges.includes('beginner_complete') && !newBadges.includes('beginner_complete')) {
      newBadges.push('beginner_complete');
    }

    const allBadges = [...progress.badges, ...newBadges];

    const expertDone = (progress.completedExpertLessons || []).length;
    if (newLessons.length >= 12 &&
        (progress.completedAdvancedLessons || []).length >= 12 &&
        expertDone >= 12 &&
        progress.completedMissions.length >= 6 &&
        !allBadges.includes('all_graduate')) {
      newBadges.push('all_graduate');
      allBadges.push('all_graduate');
    }

    update({ ...progress, completedLessons: newLessons, xp: newXp, badges: allBadges });
    return { xp: 50, newBadges: newBadges.filter((b) => !BADGES[b]?.hidden) };
  }

  function completeMission(missionId) {
    if (progress.completedMissions.includes(missionId)) return null;

    const newMissions = [...progress.completedMissions, missionId];
    const newXp = progress.xp + 100;
    const newBadges = detectProgressBadges(progress.badges, progress.completedLessons, newMissions);
    const allBadges = [...progress.badges, ...newBadges];

    if (newMissions.length >= 6 && !allBadges.includes('practice_complete')) {
      newBadges.push('practice_complete');
      allBadges.push('practice_complete');
    }

    const expertDone = (progress.completedExpertLessons || []).length;
    if (progress.completedLessons.length >= 12 &&
        (progress.completedAdvancedLessons || []).length >= 12 &&
        expertDone >= 12 &&
        newMissions.length >= 6 &&
        !allBadges.includes('all_graduate')) {
      newBadges.push('all_graduate');
      allBadges.push('all_graduate');
    }

    update({ ...progress, completedMissions: newMissions, xp: newXp, badges: allBadges });
    return { xp: 100, newBadges: newBadges.filter((b) => !BADGES[b]?.hidden) };
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
    if (xp >= 2000) return { level: 7, name: 'AI個人開発者', emoji: '👑', nextXp: null };
    if (xp >= 1500) return { level: 6, name: 'AIクリエイター', emoji: '🎨', nextXp: 2000 };
    if (xp >= 1000) return { level: 5, name: 'AI実践者',    emoji: '🏆', nextXp: 1500 };
    if (xp >= 700)  return { level: 4, name: 'AI活用者',    emoji: '🚀', nextXp: 1000 };
    if (xp >= 400)  return { level: 3, name: 'AIビギナー',  emoji: '⭐', nextXp: 700 };
    if (xp >= 150)  return { level: 2, name: 'AI見習い',    emoji: '🌱', nextXp: 400 };
    return              { level: 1, name: 'AI初心者',    emoji: '🎮', nextXp: 150 };
  }

  function getLevelProgress() {
    const xp = progress.xp;
    const thresholds = [0, 150, 400, 700, 1000, 1500, 2000];
    const level = getLevel().level;
    if (level >= 7) return 100;
    const start = thresholds[level - 1];
    const end = thresholds[level];
    return Math.round(((xp - start) / (end - start)) * 100);
  }

  function completeAdvancedLesson(lessonId) {
    if ((progress.completedAdvancedLessons || []).includes(lessonId)) return null;
    const newLessons = [...(progress.completedAdvancedLessons || []), lessonId];
    const newXp = progress.xp + 50;
    const newBadges = [];

    if (newLessons.length >= 12 && !progress.badges.includes('advanced_complete')) {
      newBadges.push('advanced_complete');
    }
    const allBadges = [...progress.badges, ...newBadges];

    const expertDone = (progress.completedExpertLessons || []).length;
    if (progress.completedLessons.length >= 12 &&
        newLessons.length >= 12 &&
        expertDone >= 12 &&
        progress.completedMissions.length >= 6 &&
        !allBadges.includes('all_graduate')) {
      newBadges.push('all_graduate');
      allBadges.push('all_graduate');
    }

    update({ ...progress, completedAdvancedLessons: newLessons, xp: newXp, badges: allBadges });
    return { xp: 50, newBadges };
  }

  function completeExpertLesson(lessonId) {
    if ((progress.completedExpertLessons || []).includes(lessonId)) return null;
    const newLessons = [...(progress.completedExpertLessons || []), lessonId];
    const newXp = progress.xp + 50;
    const newBadges = [];

    if (newLessons.length >= 12 && !progress.badges.includes('expert_complete')) {
      newBadges.push('expert_complete');
    }
    const allBadges = [...progress.badges, ...newBadges];

    if (progress.completedLessons.length >= 12 &&
        (progress.completedAdvancedLessons || []).length >= 12 &&
        newLessons.length >= 12 &&
        progress.completedMissions.length >= 6 &&
        !allBadges.includes('all_graduate')) {
      newBadges.push('all_graduate');
      allBadges.push('all_graduate');
    }

    update({ ...progress, completedExpertLessons: newLessons, xp: newXp, badges: allBadges });
    return { xp: 50, newBadges };
  }

  function getTotalProgress() {
    // 12 基礎 + 12 活用 + 12 開発 + 6 実践 = 42
    const total = 42;
    const completed =
      progress.completedLessons.length +
      (progress.completedAdvancedLessons || []).length +
      (progress.completedExpertLessons || []).length +
      progress.completedMissions.length;
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

  function isGraduated() {
    return (
      progress.completedLessons.length >= 12 &&
      (progress.completedAdvancedLessons || []).length >= 12 &&
      (progress.completedExpertLessons || []).length >= 12 &&
      progress.completedMissions.length >= 6
    );
  }

  // 7段階の称号（XPベース）
  function getTitle() {
    const xp = progress.xp;
    if (xp >= 3000) return { title: 'AIマスター',          displayLevel: 50, emoji: '🏆' };
    if (xp >= 2000) return { title: 'AI個人開発者',        displayLevel: 40, emoji: '👑' };
    if (xp >= 1500) return { title: 'AIビジネス実践者',    displayLevel: 30, emoji: '💰' };
    if (xp >= 1000) return { title: 'AIデベロッパー',      displayLevel: 20, emoji: '🚀' };
    if (xp >= 500)  return { title: 'AIクリエイター',      displayLevel: 10, emoji: '✨' };
    if (xp >= 150)  return { title: 'AI活用者',            displayLevel: 5,  emoji: '🌱' };
    return              { title: 'AI初心者',           displayLevel: 1,  emoji: '🎮' };
  }

  return {
    progress,
    completeLesson,
    completeMission,
    completeAdvancedLesson,
    completeExpertLesson,
    saveMemo,
    setWelcomeSeen,
    resetAll,
    getLevel,
    getLevelProgress,
    getTotalProgress,
    getNextLesson,
    recordQuizResult,
    getQuizStats,
    isGraduated,
    getTitle,
  };
}
