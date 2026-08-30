import { useCallback, useEffect, useRef, useState } from 'react'
import './About.css'

const GOALS = [
  '維護本校學生權益',
  '促進本校學生福祉利益',
  '實踐校園民主',
  '推動與學生相關之議題倡議',
  '推動學生權益相關知能普及',
  '凝聚本校學生社群，維繫學生間之互動與連結',
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const logoWrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = logoWrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    // rotate the logo toward the cursor
    setTilt({
      ry: (px - 0.5) * 32,
      rx: (0.5 - py) * 32,
    })
    // glow follows the cursor
    setGlow({ x: px * 100, y: py * 100, on: true })
  }, [])

  const handleLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 })
    setGlow((g) => ({ ...g, on: false }))
  }, [])

  return (
    <section
      ref={ref}
      id="about"
      className={`about ${visible ? 'is-visible' : ''}`}
    >
      <div aria-hidden className="about-grid" />
      <div aria-hidden className="about-glow about-glow-a" />
      <div aria-hidden className="about-glow about-glow-b" />

      <div aria-hidden className="about-fx about-fx-hex1" />
      <div aria-hidden className="about-fx about-fx-hex2" />
      <div aria-hidden className="about-fx about-fx-hex3" />

      <div className="about-inner">
        <div
          ref={logoWrapRef}
          className="about-logo-wrap"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <div
            className={`about-logo-3d ${glow.on ? 'is-tracking' : ''}`}
            style={{
              transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            }}
          >
            <img
              className="about-logo"
              src="/logo.svg"
              alt="臺北市數位實驗高中學生會"
              style={{ animationDelay: '0.15s' }}
            />
            <span
              aria-hidden
              className="about-logo-glare"
              style={{
                background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, color-mix(in oklch, var(--card) 75%, transparent), transparent 45%)`,
                opacity: glow.on ? 1 : 0,
              }}
            />
          </div>
        </div>

        <h1 className="about-title" style={{ animationDelay: '0.3s' }}>
          臺北市數位實驗高中學生會
        </h1>
        <p className="about-sub" style={{ animationDelay: '0.45s' }}>
          臺北市數位實驗高級中等學校學生會（T-School SU）為代表本校學生之利益團體
        </p>

        <div className="about-goals" style={{ animationDelay: '0.6s' }}>
          <h2 className="about-goals-title">
            <span className="about-goals-flag">★</span> 宗旨
          </h2>
          <ol className="about-goals-list">
            {GOALS.map((goal, i) => (
              <li key={goal} className="about-goal" style={{ animationDelay: `${0.7 + i * 0.12}s` }}>
                <span className="about-goal-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="about-goal-text">{goal}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
