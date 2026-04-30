import type { AppPage } from './navigation'
import { navigationItems } from './navigation'

interface SidebarProps {
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <button className="brand" type="button" onClick={() => onNavigate('dashboard')}>
        <span className="brand-mark">W</span>
        <span>
          <strong>Wellbe</strong>
          <small>Portfolio</small>
        </span>
      </button>
      <nav className="sidebar-nav" aria-label="Navigation principale">
        {navigationItems.map((item) => (
          <button
            key={item.page}
            className={activePage === item.page ? 'is-active' : ''}
            type="button"
            onClick={() => onNavigate(item.page)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
