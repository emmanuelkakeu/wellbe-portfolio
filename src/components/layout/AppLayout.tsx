import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  removeNotification,
  type AppNotification,
} from '../../features/notifications/notificationSlice'
import { Header } from './Header'
import type { AppPage } from './navigation'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  activePage: AppPage
  children: ReactNode
  onNavigate: (page: AppPage) => void
}

export function AppLayout({ activePage, children, onNavigate }: AppLayoutProps) {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector((state) => state.notifications.items)

  useEffect(() => {
    if (notifications.length === 0) {
      return
    }

    const timers = notifications.map((notification: AppNotification) =>
      window.setTimeout(() => {
        dispatch(removeNotification(notification.id))
      }, 4200),
    )

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [dispatch, notifications])

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="app-main">
        <Header activePage={activePage} onNavigate={onNavigate} />
        <main>{children}</main>
      </div>
      <div className="notification-stack" aria-live="polite">
        {notifications.map((notification) => (
          <div
            className={`notification notification--${notification.tone}`}
            key={notification.id}
          >
            <strong>{notification.title}</strong>
            <span>{notification.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
