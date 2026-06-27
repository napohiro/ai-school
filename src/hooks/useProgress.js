import { useState } from 'react';

const STORAGE_KEY = 'ai-school-v2';

const INITIAL_STATE = {
  completedStep1: [],
  completedStep2: [],
  completedStep3: [],
  completedStep4: [],
  completedStep5: [],
  completedMissions: [],
  xp: 0,
  missionMemos: {},
  badges: [],
  welcomeSeen: false,
  quizResults: {},
};

const BADGES = {
  first_lesson:    { emoji: '⭐', name: 'はじめての一歩', desc: '初レッスン完了',    hidden: true },
  three_lessons:   { emoji: '🌟', name: '3レッスン達成',  desc: '3レッスン完了',     hidden: true },
  first_mission:   { emoji: '⚡', name: '初実践クリア',   desc: '初ミッション達成',   hidden: true },
  step1_complete:  { emoji: '🤖', name: 'AI基礎修了',     desc: 'STEP1全レッスン完了' },
  step2_complete:  { emoji: '💼', name: 'AI実践修了',     desc: 'STEP2全レッスン完了' },
  step3_complete:  { emoji: '🎨', name: 'クリエイト修了', desc: 'STEP3全レッスン完了' },
  step4_complete:  { emoji: '💻', name: 'AI開発修了',     desc: 'STEP4全レッスン完了' },
  step5_complete:  { emoji: '💰', name: '収益化修了',     desc: 'STEP5全レッスン完了' },
  practice_complete: { emoji: '⚡', name: '実践修了',     desc: '全ミッション完了' },
  all_graduate:    { emoji: '👑', name: 'AIスクール修了', desc: 'STEP1〜5を全て修了' },
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

function getTotalCompleted(prog) {
  return (
    prog.completedStep1.length +
    prog.completedStep2.length +
    prog.completedStep3.length +
    prog.completedStep4.length +
    prog.completedStep5.length
  );
}

function detectEarlyBadges(prevBadges, totalLessons, missionCount) {
  const newBadges = [];
  if (totalLessons >= 1 && !prevBadges.includes('first_lesson')) newBadges.push('first_lesson');
  if (totalLessons >= 3 && !prevBadges.includes('three_lessons')) newBadges.push('three_lessons');
  if (missionCount >= 1 && !prevBadges.includes('first_mission')) newBadges.push('first_mission');
  return newBadges;
}

export function useProgress() {
  const [progress, setProgress] = useState(loadFromStorage);

  function update(newProgress) {
    setProgress(newProgress);
    saveToStorage(newProgress);
  }

  function makeStepCompleter(stepKey, badgeKey) {
    return function completeStepLesson(lessonId) {
      const current = progress[stepKey] || [];
      if (current.includes(lessonId)) return null;

      const newList = [...current, lessonId];
      const newXp = progress.xp + 50;
      const totalLessons = getTotalCompleted({ ...progress, [stepKey]: newList });
      const newBadges = detectEarlyBadges(progress.badges, totalLessons, progress.completedMissions.length);

      if (newList.length >= 6 && !progress.badges.includes(badgeKey) && !newBadges.includes(badgeKey)) {
        newBadges.push(badgeKey);
      }
      const allBadges = [...progress.badges, ...newBadges];

      const nextProgress = { ...progress, [stepKey]: newList, xp: newXp, badges: allBadges };
      const all5Done =
        nextProgress.completedStep1.length >= 6 &&
        nextProgress.completedStep2.length >= 6 &&
        nextProgress.completedStep3.length >= 6 &&
        nextProgress.completedStep4.length >= 6 &&
        nextProgress.completedStep5.length >= 6;
      if (all5Done && !allBadges.includes('all_graduate')) {
        newBadges.push('all_graduate');
        nextProgress.badges = [...allBadges, 'all_graduate'];
      }

      update(nextProgress);
      return { xp: 50, newBadges: newBadges.filter((b) => !BADGES[b]?.hidden) };
    };
  }

  const completeStep1Lesson = makeStepCompleter('completedStep1', 'step1_complete');
  const completeStep2Lesson = makeStepCompleter('completedStep2', 'step2_complete');
  const completeStep3Lesson = makeStepCompleter('completedStep3', 'step3_complete');
  const completeStep4Lesson = makeStepCompleter('completedStep4', 'step4_complete');
  const completeStep5Lesson = makeStepCompleter('completedStep5', 'step5_complete');

  function completeMission(missionId) {
    if (progress.completedMissions.includes(missionId)) return null;

    const newMissions = [...progress.completedMissions, missionId];
    const newXp = progress.xp + 100;
    const totalLessons = getTotalCompleted(progress);
    const newBadges = detectEarlyBadges(progress.badges, totalLessons, newMissions.length);
    const allBadges = [...progress.badges, ...newBadges];

    if (newMissions.length >= 6 && !allBadges.includes('practice_complete')) {
      newBadges.push('practice_complete');
      allBadges.push('practice_complete');
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

  function getTotalProgress() {
    // 30 lessons (STEP1-5, 6 each) + 6 missions = 36
    const total = 36;
    const completed = getTotalCompleted(progress) + progress.completedMissions.length;
    return Math.round((completed / total) * 100);
  }

  function getNextLesson(stepKey, lessons) {
    const completed = progress[stepKey] || [];
    return lessons.find((l) => !completed.includes(l.id)) || null;
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
      progress.completedStep1.length >= 6 &&
      progress.completedStep2.length >= 6 &&
      progress.completedStep3.length >= 6 &&
      progress.completedStep4.length >= 6 &&
      progress.completedStep5.length >= 6
    );
  }

  function getTitle() {
    const xp = progress.xp;
    if (xp >= 2500) return { title: 'AIマスター',        displayLevel: 50, emoji: '🏆' };
    if (xp >= 2000) return { title: 'AI個人開発者',      displayLevel: 40, emoji: '👑' };
    if (xp >= 1500) return { title: 'AI収益化者',        displayLevel: 30, emoji: '💰' };
    if (xp >= 1000) return { title: 'AIデベロッパー',    displayLevel: 20, emoji: '💻' };
    if (xp >= 500)  return { title: 'AIクリエイター',    displayLevel: 10, emoji: '🎨' };
    if (xp >= 150)  return { title: 'AI活用者',          displayLevel: 5,  emoji: '🌱' };
    return              { title: 'AI初心者',         displayLevel: 1,  emoji: '🎮' };
  }

  return {
    progress,
    completeStep1Lesson,
    completeStep2Lesson,
    completeStep3Lesson,
    completeStep4Lesson,
    completeStep5Lesson,
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
    isGraduated,
    getTitle,
  };
}
