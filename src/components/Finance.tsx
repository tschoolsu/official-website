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
  const [query, setQuery] = useState('')
  const [type, setType] = useState('全部')

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

  const allTypes = useMemo(() => {
    const set = new Set<string>()
    reports.forEach((r) => set.add(r.type))
    return ['全部', ...Array.from(set)]
  }, [reports])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return reports.filter((r) => {
      const matchType = type === '全部' || r.type === type
      const matchQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.time.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q)
      return matchType && matchQuery
    })
  }, [reports, query, type])

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
              本會財務公開文件。
            </p>

            <div className="finance-tools">
              <input
                className="finance-search"
                type="search"
                placeholder="搜尋財務報告..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="finance-types">
                {allTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`finance-type-btn ${type === t ? 'is-active' : ''}`}
                    onClick={() => setType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="finance-cards">
              {filtered.map((r, i) => (
                <button
                  key={r.slug}
                  type="button"
                  className="finance-card"
                  onClick={() => handleSelect(r.slug)}
                  style={{ animationDelay: `${i * 0.08}s` }}
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

            {filtered.length === 0 && (
              <p className="finance-empty">找不到符合條件的財務報告。</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
