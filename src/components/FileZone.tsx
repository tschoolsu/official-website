import { useMemo, useState } from 'react'
import { FILES } from '../data/files'
import './FileZone.css'

function formatDate(date: string): string {
  const [y, m, d] = date.split('-')
  return `${y}/${m}/${d}`
}

export default function FileZone() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('全部')

  const allTags = useMemo(() => {
    const set = new Set<string>()
    FILES.forEach((f) =>
      f.tag.split(',').map((t) => t.trim()).filter(Boolean).forEach((t) => set.add(t)),
    )
    return ['全部', ...Array.from(set).sort()]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FILES.filter((f) => {
      const matchTag = tag === '全部' || f.tag.split(',').map((t) => t.trim()).includes(tag)
      const matchQuery =
        !q || f.title.toLowerCase().includes(q) || f.date.includes(q)
      return matchTag && matchQuery
    }).sort((a, b) => b.date.localeCompare(a.date))
  }, [query, tag])

  return (
    <section id="filezone" className="filezone">
      <div className="filezone-inner">
        <h2 className="filezone-title">
          檔案專區<span className="filezone-title-dot">.</span>
        </h2>

        <div className="filezone-tools">
          <input
            className="filezone-search"
            type="search"
            placeholder="搜尋檔案..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="filezone-tags">
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                className={`filezone-tag ${tag === t ? 'is-active' : ''}`}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="filezone-list">
          {filtered.map((f) => (
            <a
              key={f.title}
              className="filezone-card"
              href={f.target}
              target="_blank"
              rel="noreferrer"
            >
              <div className="filezone-card-top">
                <span className="filezone-date">{formatDate(f.date)}</span>
                <span className="filezone-arrow" aria-hidden="true">↗</span>
              </div>
              <h3 className="filezone-title2">{f.title}</h3>
              <div className="filezone-card-tags">
                {f.tag.split(',').map((t) => t.trim()).filter(Boolean).map((t) => (
                  <span key={t} className="filezone-tag-badge">{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="filezone-empty">找不到符合條件的檔案。</p>
        )}
      </div>
    </section>
  )
}
