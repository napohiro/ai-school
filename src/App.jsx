import { useState, useEffect, useRef } from 'react';
import './App.css';

import { useProgress } from './hooks/useProgress';
import { lessons } from './data/lessons';
import { lessonsAdvanced } from './data/lessonsAdvanced';
import { missions } from './data/missions';

import BottomNav from './components/BottomNav';
import WelcomeModal from './components/WelcomeModal';
import XPToast from './components/XPToast';
import BadgeModal from './components/BadgeModal';

import HomeScreen from './screens/HomeScreen';
import LearningScreen from './screens/LearningScreen';
import LessonDetailScreen from './screens/LessonDetailScreen';
import PracticeScreen from './screens/PracticeScreen';
import MissionDetailScreen from './screens/MissionDetailScreen';
import ToolsScreen from './screens/ToolsScreen';
import MyPageScreen from './screens/MyPageScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [subScreen, setSubScreen] = useState(null);
  const [xpToast, setXpToast] = useState(null);
  const [xpKey, setXpKey] = useState(0);
  const [badgeModal, setBadgeModal] = useState(null);
  const xpTimerRef = useRef(null);
  const badgeTimerRef = useRef(null);

  const {
    progress,
    completeLesson,
    completeMission,
    completeAdvancedLesson,
    saveMemo,
    setWelcomeSeen,
    resetAll,
    getLevel,
    getLevelProgress,
    getTotalProgress,
    getNextLesson,
    recordQuizResult,
    getQuizStats,
  } = useProgress();

  const showWelcome = !progress.welcomeSeen;

  function scrollToTop() {
    const el = document.querySelector('.main-content');
    if (el) el.scrollTop = 0;
  }

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSubScreen(null);
    scrollToTop();
  }

  function handleNavigate(tab, sub) {
    setActiveTab(tab);
    setSubScreen(sub || null);
    scrollToTop();
  }

  function triggerXpToast(amount) {
    if (xpTimerRef.current) clearTimeout(xpTimerRef.current);
    setXpToast(amount);
    setXpKey((k) => k + 1);
    xpTimerRef.current = setTimeout(() => setXpToast(null), 2700);
  }

  function triggerBadge(badgeId) {
    if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current);
    badgeTimerRef.current = setTimeout(() => setBadgeModal(badgeId), 500);
  }

  function handleLessonComplete() {
    if (!subScreen || subScreen.type !== 'lesson') return;
    const result = completeLesson(subScreen.id);
    if (result) {
      triggerXpToast(result.xp);
      if (result.newBadges.length > 0) triggerBadge(result.newBadges[0]);
    }
  }

  function handleAdvancedLessonComplete() {
    if (!subScreen || subScreen.type !== 'advancedLesson') return;
    const result = completeAdvancedLesson(subScreen.id);
    if (result) {
      triggerXpToast(result.xp);
    }
  }

  function handleMissionComplete() {
    if (!subScreen || subScreen.type !== 'mission') return;
    const result = completeMission(subScreen.id);
    if (result) {
      triggerXpToast(result.xp);
      if (result.newBadges.length > 0) triggerBadge(result.newBadges[0]);
    }
  }

  function handleBack() {
    setSubScreen(null);
    scrollToTop();
  }

  useEffect(() => {
    return () => {
      if (xpTimerRef.current) clearTimeout(xpTimerRef.current);
      if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current);
    };
  }, []);

  function renderContent() {
    if (activeTab === 'learning' && subScreen?.type === 'lesson') {
      const lesson = lessons.find((l) => l.id === subScreen.id);
      return (
        <LessonDetailScreen
          lesson={lesson}
          isCompleted={progress.completedLessons.includes(subScreen.id)}
          onComplete={handleLessonComplete}
          onBack={handleBack}
          onQuizSubmit={(isCorrect) => recordQuizResult(subScreen.id, isCorrect)}
        />
      );
    }

    if (activeTab === 'learning' && subScreen?.type === 'advancedLesson') {
      const lesson = lessonsAdvanced.find((l) => l.id === subScreen.id);
      return (
        <LessonDetailScreen
          lesson={lesson}
          isCompleted={progress.completedAdvancedLessons.includes(subScreen.id)}
          onComplete={handleAdvancedLessonComplete}
          onBack={handleBack}
          onQuizSubmit={(isCorrect) => recordQuizResult(subScreen.id, isCorrect)}
        />
      );
    }

    if (activeTab === 'practice' && subScreen?.type === 'mission') {
      const mission = missions.find((m) => m.id === subScreen.id);
      return (
        <MissionDetailScreen
          mission={mission}
          isCompleted={progress.completedMissions.includes(subScreen.id)}
          memo={progress.missionMemos[subScreen.id] || ''}
          onComplete={handleMissionComplete}
          onSaveMemo={saveMemo}
          onBack={handleBack}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            progress={progress}
            getLevel={getLevel}
            getLevelProgress={getLevelProgress}
            getTotalProgress={getTotalProgress}
            getNextLesson={getNextLesson}
            lessons={lessons}
            missions={missions}
            onNavigate={handleNavigate}
          />
        );
      case 'learning':
        return (
          <LearningScreen
            lessons={lessons}
            completedLessons={progress.completedLessons}
            onSelectLesson={(id) => { setSubScreen({ type: 'lesson', id }); scrollToTop(); }}
            lessonsAdvanced={lessonsAdvanced}
            completedAdvancedLessons={progress.completedAdvancedLessons}
            onSelectAdvancedLesson={(id) => { setSubScreen({ type: 'advancedLesson', id }); scrollToTop(); }}
            initialTab={subScreen?.type === 'advancedTab' ? 'advanced' : 'beginner'}
          />
        );
      case 'practice':
        return (
          <PracticeScreen
            missions={missions}
            completedMissions={progress.completedMissions}
            onSelectMission={(id) => { setSubScreen({ type: 'mission', id }); scrollToTop(); }}
          />
        );
      case 'tools':
        return <ToolsScreen />;
      case 'mypage':
        return (
          <MyPageScreen
            progress={progress}
            getLevel={getLevel}
            getLevelProgress={getLevelProgress}
            getTotalProgress={getTotalProgress}
            onReset={resetAll}
            quizStats={getQuizStats()}
          />
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div className="main-content">
        {renderContent()}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {showWelcome && <WelcomeModal onClose={setWelcomeSeen} />}

      {xpToast !== null && <XPToast key={xpKey} amount={xpToast} />}

      {badgeModal && (
        <BadgeModal badgeId={badgeModal} onClose={() => setBadgeModal(null)} />
      )}
    </>
  );
}
