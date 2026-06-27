import { useState, useEffect, useRef } from 'react';
import './App.css';

import { useProgress } from './hooks/useProgress';
import { lessonsStep1 } from './data/lessonsStep1';
import { lessonsStep2 } from './data/lessonsStep2';
import { lessonsStep3 } from './data/lessonsStep3';
import { lessonsStep4 } from './data/lessonsStep4';
import { lessonsStep5 } from './data/lessonsStep5';
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
import RoadmapScreen from './screens/RoadmapScreen';

const ALL_STEPS = {
  step1: { lessons: lessonsStep1, completedKey: 'completedStep1', courseType: 'step1' },
  step2: { lessons: lessonsStep2, completedKey: 'completedStep2', courseType: 'step2' },
  step3: { lessons: lessonsStep3, completedKey: 'completedStep3', courseType: 'step3' },
  step4: { lessons: lessonsStep4, completedKey: 'completedStep4', courseType: 'step4' },
  step5: { lessons: lessonsStep5, completedKey: 'completedStep5', courseType: 'step5' },
};

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
  } = useProgress();

  const completeFns = {
    step1: completeStep1Lesson,
    step2: completeStep2Lesson,
    step3: completeStep3Lesson,
    step4: completeStep4Lesson,
    step5: completeStep5Lesson,
  };

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

  function handleStepLessonComplete(stepKey) {
    if (!subScreen || subScreen.type !== stepKey) return;
    const fn = completeFns[stepKey];
    const result = fn?.(subScreen.id);
    if (result) {
      triggerXpToast(result.xp);
      if (result.newBadges.length > 0) triggerBadge(result.newBadges[0]);
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

  function getLearningInitialTab() {
    if (subScreen?.type === 'step2Tab') return 'step2';
    if (subScreen?.type === 'step3Tab') return 'step3';
    if (subScreen?.type === 'step4Tab') return 'step4';
    if (subScreen?.type === 'step5Tab') return 'step5';
    if (subScreen?.type === 'step6Tab') return 'step6';
    if (subScreen?.type === 'libraryTab') return 'library';
    return 'step1';
  }

  function renderContent() {
    // Roadmap screen
    if (activeTab === 'home' && subScreen?.type === 'roadmap') {
      return (
        <RoadmapScreen
          progress={progress}
          onBack={handleBack}
          onNavigate={handleNavigate}
        />
      );
    }

    // Step lesson detail screens
    const stepTypes = ['step1', 'step2', 'step3', 'step4', 'step5'];
    if (activeTab === 'learning' && stepTypes.includes(subScreen?.type)) {
      const stepKey = subScreen.type;
      const { lessons, completedKey, courseType } = ALL_STEPS[stepKey];
      const lessonIdx = lessons.findIndex((l) => l.id === subScreen.id);
      const lesson = lessons[lessonIdx];
      if (!lesson) return null;
      return (
        <LessonDetailScreen
          key={subScreen.id}
          lesson={lesson}
          isCompleted={(progress[completedKey] || []).includes(subScreen.id)}
          onComplete={() => handleStepLessonComplete(stepKey)}
          onBack={handleBack}
          onQuizSubmit={(isCorrect) => recordQuizResult(subScreen.id, isCorrect)}
          courseType={courseType}
          courseIndex={lessonIdx + 1}
          prevLesson={lessonIdx > 0 ? lessons[lessonIdx - 1] : null}
          nextLesson={lessonIdx < lessons.length - 1 ? lessons[lessonIdx + 1] : null}
          onNavigateLesson={(id) => { setSubScreen({ type: stepKey, id }); scrollToTop(); }}
        />
      );
    }

    // Mission detail
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
            getTitle={getTitle}
            lessonsStep1={lessonsStep1}
            lessonsStep2={lessonsStep2}
            lessonsStep3={lessonsStep3}
            lessonsStep4={lessonsStep4}
            lessonsStep5={lessonsStep5}
            missions={missions}
            onNavigate={handleNavigate}
          />
        );
      case 'learning':
        return (
          <LearningScreen
            lessonsStep1={lessonsStep1}
            completedStep1={progress.completedStep1}
            onSelectStep1={(id) => { setSubScreen({ type: 'step1', id }); scrollToTop(); }}
            lessonsStep2={lessonsStep2}
            completedStep2={progress.completedStep2}
            onSelectStep2={(id) => { setSubScreen({ type: 'step2', id }); scrollToTop(); }}
            lessonsStep3={lessonsStep3}
            completedStep3={progress.completedStep3}
            onSelectStep3={(id) => { setSubScreen({ type: 'step3', id }); scrollToTop(); }}
            lessonsStep4={lessonsStep4}
            completedStep4={progress.completedStep4}
            onSelectStep4={(id) => { setSubScreen({ type: 'step4', id }); scrollToTop(); }}
            lessonsStep5={lessonsStep5}
            completedStep5={progress.completedStep5}
            onSelectStep5={(id) => { setSubScreen({ type: 'step5', id }); scrollToTop(); }}
            missions={missions}
            completedMissions={progress.completedMissions}
            initialTab={getLearningInitialTab()}
            onNavigate={handleNavigate}
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
            getTitle={getTitle}
            onReset={resetAll}
            quizStats={getQuizStats()}
            isGraduated={isGraduated}
            onNavigate={handleNavigate}
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
