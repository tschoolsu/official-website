import { useEffect, useState } from 'react'
import TabBar from './TabBar'
import About from './About'
import Organization from './Organization'
import Announcements from './Announcements'
import BottomNav from './BottomNav'
import PlaceholderPage from './PlaceholderPage'
import './HomePage.css'

type Page = 'home' | 'org' | 'members' | 'history' | 'data'

const PAGE_TITLES: Record<Exclude<Page, 'home' | 'org'>, string> = {
  members: '部員介紹',
  history: '歷史改革',
  data: '公開資料',
}

export default function HomePage() {
  const [page, setPage] = useState<Page>('home')

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [page])

  const handleNavigate = (id: string) => {
    setPage(id as Page)
  }

  return (
    <div className="home">
      <div id="top" />
      <TabBar active={page} onNavigate={handleNavigate} />
      <main>
        {page === 'home' && (
          <>
            <About />
            <Announcements />
          </>
        )}
        {page === 'org' && <Organization />}
        {(page === 'members' || page === 'history' || page === 'data') && (
          <PlaceholderPage title={PAGE_TITLES[page]} />
        )}
      </main>
      <BottomNav />
    </div>
  )
}
