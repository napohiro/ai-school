const TABS = [
  { id: 'home', label: 'ホーム', icon: '🏠' },
  { id: 'learning', label: '学習', icon: '📚' },
  { id: 'practice', label: '実践', icon: '⚡' },
  { id: 'tools', label: 'ツール', icon: '🛠️' },
  { id: 'mypage', label: 'マイページ', icon: '👤' },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item${activeTab === tab.id ? ' active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
