import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'


export function CommonLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const openMobileNav = useCallback(() => setMobileNavOpen(true), [])
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onOpenMobileNav={openMobileNav} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <div className="rounded-xl border border-slate-200 bg-white shadow-soft">
            <Sidebar />
          </div>
        </aside>

        <main className="min-w-0">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-40 md:hidden',
          mobileNavOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!mobileNavOpen}
      >
        <div
          className={[
            'absolute inset-0 bg-slate-900/30 transition-opacity',
            mobileNavOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={closeMobileNav}
        />

        <div
          className={[
            'absolute left-0 top-0 h-full w-72 border-r border-slate-200 bg-white shadow-2xl transition-transform',
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex items-center justify-between border-b border-slate-200 p-3">
            <div className="text-sm font-semibold text-slate-900">Menu</div>
            <button
              type="button"
              onClick={closeMobileNav}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
              aria-label="Close navigation"
            >
              ✕
            </button>
          </div>

          <Sidebar onNavigate={closeMobileNav} />
        </div>
      </div>
    </div>
  )
}

