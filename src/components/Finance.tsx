import { useEffect, useMemo, useState } from 'react'
import type { FinanceReport } from '../lib/finance'
import { formatFinanceDate, loadFinanceReports, typeTone } from '../lib/finance'
import Markdown from './Markdown'
import './Finance.css'

function TypeBadge({ type }: { type: string }) {
  const tone = typeTone(type)
  return <span className={`finance-type finance-type-${tone}`}>{type}</span>
}

export default function Finance() {
  const [reports, setReports] = useState<FinanceReport[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    loadFinanceReports().then(setReports)
  }, [])

  // sync activeId with URL hash (#report-slug)
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace(/^#/, '')
      setActiveId(hash || null)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    if (activeId) {
      window.scrollTo({ top: 0 })
    }
  }, [activeId])

  const active = useMemo(
    () => reports.find((r) => r.slug === activeId) ?? null,
    [reports, activeId],
  )

  const handleSelect = (slug: string) => {
    window.history.pushState(null, '', `#${slug}`)
    setActiveId(slug)
  }

  const handleBack = () => {
    window.history.replaceState(null, '', window.location.pathname)
    setActiveId(null)
  }

  return (
    <section className="finance">
      <div className="finance-inner">
        {active ? (
          <article className="finance-detail">
            <button type="button" className="finance-back" onClick={handleBack}>
              ← 返回財務報告列表
            </button>
            <div className="finance-detail-head">
              <div className="finance-detail-meta">
                <TypeBadge type={active.type} />
                <span className="finance-detail-date">
                  通過日期 {formatFinanceDate(active.date)}
                </span>
              </div>
              <h2 className="finance-detail-title">{active.title}</h2>
              <div className="finance-detail-time">
                <span className="finance-detail-time-label">時程</span>
                {active.time}
              </div>
            </div>
            <div className="finance-detail-body">
              <Markdown>{active.content}</Markdown>
            </div>
          </article>
        ) : (
          <div className="finance-list-view">
            <h2 className="finance-title">
              財務報告<span className="finance-title-dot">.</span>
            </h2>
            <p className="finance-sub">
              依學生自治相關知能之普及與公開透明原則，公開本會財務文件。
            </p>

            <div className="finance-cards">
              {reports.map((r, i) => (
                <button
                  key={r.slug}
                  type="button"
                  className="finance-card"
                  onClick={() => handleSelect(r.slug)}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="finance-card-top">
                    <TypeBadge type={r.type} />
                    <span className="finance-card-date">
                      {formatFinanceDate(r.date)}
                    </span>
                  </div>
                  <h3 className="finance-card-title">{r.title}</h3>
                  <div className="finance-card-bottom">
                    <span className="finance-card-time">{r.time}</span>
                    <span className="finance-card-open" aria-hidden="true">
                      檢視 ↗
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {reports.length === 0 && (
              <p className="finance-empty">暫無財務報告。</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
