function NavIcon({ type }) {
  const s = {
    width: 22, height: 22, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: '1.75', strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  if (type === 'home') return (
    <svg {...s}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
  if (type === 'book') return (
    <svg {...s}>
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  );
  if (type === 'bolt') return (
    <svg {...s}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
  if (type === 'grid') return (
    <svg {...s}>
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  );
  if (type === 'user') return (
    <svg {...s}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
  return null;
}

const TABS = [
  { id: 'home',     label: 'ホーム',     iconType: 'home' },
  { id: 'learning', label: '学習',       iconType: 'book' },
  { id: 'practice', label: '実践',       iconType: 'bolt' },
  { id: 'tools',    label: 'ツール',     iconType: 'grid' },
  { id: 'mypage',   label: 'マイページ', iconType: 'user' },
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
          <span className="nav-icon">
            <NavIcon type={tab.iconType} />
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
