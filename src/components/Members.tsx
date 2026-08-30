import { useEffect, useRef, useState } from 'react'
import { DEPARTMENTS, MEMBERS } from '../data/members'
import './Members.css'

function initials(name: string) {
  return name.trim().slice(0, 1)
}

function MemberCard({ member, index }: { member: (typeof MEMBERS)[number]; index: number }) {
  const [loaded, setLoaded] = useState(false)
  const hasImg = member.img !== ''

  return (
    <article
      className="member-card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="member-avatar">
        {hasImg ? (
          <>
            {!loaded && <span className="member-avatar-fallback">{initials(member.name)}</span>}
            <img
              src={member.img}
              alt={member.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(false)}
            />
          </>
        ) : (
          <span className="member-avatar-fallback">{initials(member.name)}</span>
        )}
      </div>

      <h3 className="member-name">{member.name}</h3>
      <span className="member-job">{member.job}</span>

      <div className="member-links">
        {member.email && (
          <a
            className="member-link"
            href={`mailto:${member.email}`}
            aria-label={`寄信給 ${member.name}`}
            title={member.email}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 5L2 7" />
            </svg>
          </a>
        )}
        {member.website && (
          <a
            className="member-link"
            href={member.website}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} 的網站`}
            title={member.website}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        )}
      </div>
    </article>
  )
}

export default function Members() {
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
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="members"
      className={`members ${visible ? 'is-visible' : ''}`}
    >
      <div className="members-inner">
        <h2 className="members-title">
          部員介紹<span className="members-title-dot">.</span>
        </h2>

        {DEPARTMENTS.map((dept) => {
          const deptMembers = MEMBERS.filter((m) => m.department === dept.id)
          if (deptMembers.length === 0) return null
          return (
            <section key={dept.id} className="dept-block">
              <header className="dept-head">
                <span className="dept-num">{String(dept.id).padStart(2, '0')}</span>
                <div>
                  <h3 className="dept-title">{dept.title}</h3>
                  <p className="dept-desc">{dept.describe}</p>
                </div>
              </header>
              <div className="dept-members">
                {deptMembers.map((member, i) => (
                  <MemberCard key={member.name} member={member} index={i} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}
