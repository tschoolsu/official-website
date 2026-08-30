import { useEffect, useState } from 'react'
import TabBar from './TabBar'
import About from './About'
import Announcements from './Announcements'
import BottomNav from './BottomNav'
import './HomePage.css'

export default function HomePage() {
  const [active, setActive] = useState('home')

  // scroll-spy: highlight the section currently in view
  useEffect(() => {
    const sections = ['about', 'announcements', 'bottom'].map((id) =>
      document.getElementById(id),
    )

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (entry.target.id === 'about') setActive('home')
            else if (entry.target.id === 'announcements') setActive('home')
            else if (entry.target.id === 'bottom') setActive('home')
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavigate = (id: string) => {
    setActive(id)
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // 其餘 tab 留空不採取任何動作
  }

  return (
    <div className="home">
      <div id="top" />
      <TabBar active={active} onNavigate={handleNavigate} />
      <main>
        <About />
        <Announcements />
      </main>
      <BottomNav />
    </div>
  )
}
