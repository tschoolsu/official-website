import { useEffect, useRef, useState } from 'react'
import './History.css'

interface HistoryItem {
  date: string
  title: string
  details: string[]
}

const HISTORY: HistoryItem[] = [
  {
    date: '2022.10.13',
    title: '創會',
    details: ['由會員大會表決通過制定本會《組織章程》。'],
  },
  {
    date: '2024.06.28',
    title: '第一次改組',
    details: ['增設行政部。', '美術組改組為美宣部。', '文宣組改組為書記部。'],
  },
  {
    date: '2025.09.05',
    title: '第二次改組',
    details: [
      '書記部、總務部與行政部合併改組為秘書部。',
      '美宣部併入公關部。',
      '增設活動部。',
    ],
  },
  {
    date: '2026.09.02（會員大會擬修正）',
    title: '第三次改組',
    details: [
      '授權會員大會決議本會常設部門組織事項。',
      '創設任務部門制度。',
      '本會幕僚事務轉由會本部掌理。',
      '設置學權部、學術部二個常設部門及設計部、數位部二個任務部門。',
    ],
  },
]

export default function History() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

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
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} id="history" className={`history ${visible ? 'is-visible' : ''}`}>
      <div className="history-inner">
        <h2 className="history-title">
          歷史改革<span className="history-title-dot">.</span>
        </h2>
        <p className="history-sub">學生自治組織改革的演進時刻</p>

        <div className="timeline">
          <div className="timeline-line" />
          {HISTORY.map((item) => (
            <article key={item.date} className="timeline-item">
              <div className="timeline-dot">
                <span className="timeline-dot-core" />
              </div>
              <div className="timeline-card">
                <span className="timeline-date">{item.date}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <ul className="timeline-details">
                  {item.details.map((d, j) => (
                    <li key={j} className="timeline-detail">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
