import { useState } from 'react'
import './TabBar.css'

interface TabBarProps {
  active: string
  onNavigate: (id: string) => void
}

const NAV_ITEMS = [
  { id: 'home', label: '首頁' },
  { id: 'org', label: '組織架構' },
  { id: 'members', label: '部員介紹' },
  { id: 'history', label: '歷史改革' },
  { id: 'data', label: '公開資料' },
]

export default function TabBar({ active, onNavigate }: TabBarProps) {
  const [open, setOpen] = useState(false)

  const handleClick = (id: string) => {
    setOpen(false)
    onNavigate(id)
  }

  return (
    <header className="tabbar">
      <a href="#top" className="tabbar-logo" aria-label="臺北市數位實驗高中學生會">
        <img className="tabbar-logo-img" src="/logotype.svg" alt="" />
      </a>

      <nav className={`tabbar-nav ${open ? 'is-open' : ''}`} aria-label="主要導覽">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`tabbar-link ${active === item.id ? 'is-active' : ''}`}
            aria-current={active === item.id ? 'page' : undefined}
            onClick={() => handleClick(item.id)}
          >
            {item.label}
          </button>
        ))}
        <a className="tabbar-link" href="https://law.tschoolsu.org/" target="_blank" rel="noreferrer">
          法規系統
        </a>
        <a
          className="tabbar-portal"
          href="https://portal.tschoolsu.org/"
          target="_blank"
          rel="noreferrer"
        >
          數位服務系統
        </a>
      </nav>

      <button
        type="button"
        className={`tabbar-toggle ${open ? 'is-open' : ''}`}
        aria-label="選單"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="tabbar-toggle-bar" />
        <span className="tabbar-toggle-bar" />
        <span className="tabbar-toggle-bar" />
      </button>
    </header>
  )
}
