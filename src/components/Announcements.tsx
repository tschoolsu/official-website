import { useEffect, useMemo, useState } from 'react'
import type { Post } from '../lib/posts'
import { formatDate, loadPosts } from '../lib/posts'
import Markdown from './Markdown'
import './Announcements.css'

const INITIAL_COUNT = 5

export default function Announcements() {
  const [posts, setPosts] = useState<Post[]>([])
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('全部')
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [selected, setSelected] = useState<Post | null>(null)

  useEffect(() => {
    loadPosts().then(setPosts)
  }, [])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return ['全部', ...Array.from(set).sort()]
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchTag = tag === '全部' || p.tags.includes(tag)
      const q = query.trim().toLowerCase()
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      return matchTag && matchQuery
    })
  }, [posts, query, tag])

  return (
    <section id="announcements" className="announce">
      <div className="announce-inner">
        <h2 className="announce-title">
          公告系統<span className="announce-title-dot">.</span>
        </h2>

        <div className="announce-tools">
          <label className="announce-search">
            <span className="visually-hidden">搜尋公告</span>
              <input
                className="announce-search-input"
                type="search"
                placeholder="搜尋公告..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setVisibleCount(INITIAL_COUNT)
                }}
              />
            </label>

            <div className="announce-tags">
              {allTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`announce-tag ${tag === t ? 'is-active' : ''}`}
                  onClick={() => {
                    setTag(t)
                    setVisibleCount(INITIAL_COUNT)
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
        </div>

        <div className="announce-list">
          {filtered.slice(0, visibleCount).map((p) => (
            <button
              key={p.slug}
              type="button"
              className="announce-card"
              onClick={() => setSelected(p)}
            >
              <div className="announce-card-top">
                <span className="announce-card-date">{formatDate(p.date)}</span>
                <div className="announce-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="announce-card-tag">{t}</span>
                  ))}
                </div>
              </div>
              <h3 className="announce-card-title">{p.title}</h3>
              <div className="announce-card-meta">
                <span className="announce-card-author">{p.author}</span>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="announce-empty">找不到符合條件的公告。</p>
        )}

        {visibleCount < filtered.length && (
          <div className="announce-more-wrap">
            <button
              type="button"
              className="announce-more"
              onClick={() => setVisibleCount((c) => c + INITIAL_COUNT)}
            >
              查看更多
            </button>
          </div>
        )}
      </div>

      {selected && (
        <AnnouncementModal post={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}

function AnnouncementModal({ post, onClose }: { post: Post; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={post.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div className="modal-meta">
            <span className="modal-date">{formatDate(post.date)}</span>
            {post.tags.map((t) => (
              <span key={t} className="announce-card-tag">{t}</span>
            ))}
          </div>
          <button
            type="button"
            className="modal-close"
            aria-label="關閉"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <h3 className="modal-title">{post.title}</h3>
        <div className="modal-author">{post.author}</div>
        <div className="modal-body">
          <Markdown>{post.content}</Markdown>
        </div>
      </div>
    </div>
  )
}
