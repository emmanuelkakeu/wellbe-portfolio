import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { signOut } from '../../features/auth/authSlice'
import { selectCurrentUser } from '../../features/user/userSelectors'
import type { AppPage } from './navigation'
import { navigationItems } from './navigation'

interface HeaderProps {
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

export function Header({ activePage, onNavigate }: HeaderProps) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const activeLabel =
    navigationItems.find((item) => item.page === activePage)?.label ?? 'Recette'

  return (
    <header className="app-header">
      <div>
        <span className="header-kicker">Demo frontend fictive</span>
        <h1>{activeLabel}</h1>
      </div>
      <div className="header-actions">
        <select
          aria-label="Navigation mobile"
          value={activePage}
          onChange={(event) => onNavigate(event.target.value as AppPage)}
        >
          {activePage === 'meal-detail' ? (
            <option value="meal-detail">Recette</option>
          ) : null}
          {navigationItems.map((item) => (
            <option key={item.page} value={item.page}>
              {item.label}
            </option>
          ))}
        </select>
        <button
          className="profile-pill"
          type="button"
          onClick={() => onNavigate('profile')}
        >
          <img src={user.avatarUrl} alt="" />
          <span>{user.firstName}</span>
        </button>
        <button
          className="logout-button"
          type="button"
          onClick={() => dispatch(signOut())}
        >
          Quitter
        </button>
      </div>
    </header>
  )
}
