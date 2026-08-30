import { useEffect, useState } from 'react'
import TabBar from './TabBar'
import About from './About'
import Organization from './Organization'
import Members from './Members'
import History from './History'
import Announcements from './Announcements'
import FileZone from './FileZone'
import BottomNav from './BottomNav'
import PlaceholderPage from './PlaceholderPage'
import './HomePage.css'

type Page =
  | 'home'
  | 'org'
  | 'members'
  | 'history'
  | 'data-finance'
  | 'data-files'

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
        {page === 'members' && <Members />}
        {page === 'history' && <History />}
        {page === 'data-finance' && <PlaceholderPage title="財務報告" />}
        {page === 'data-files' && <FileZone />}
      </main>
      <BottomNav />
    </div>
  )
}
