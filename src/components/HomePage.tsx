import TabBar from './TabBar'
import About from './About'
import Announcements from './Announcements'
import BottomNav from './BottomNav'
import './HomePage.css'

export default function HomePage() {
  const handleNavigate = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // 其餘 tab 留空不採取任何動作
  }

  return (
    <div className="home">
      <div id="top" />
      <TabBar onNavigate={handleNavigate} />
      <main>
        <About />
        <Announcements />
      </main>
      <BottomNav />
    </div>
  )
}
