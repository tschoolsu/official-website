import './BottomNav.css'

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  )
}

export default function BottomNav() {
  return (
    <footer id="bottom" className="bottomnav">
      <div className="bottomnav-col bottomnav-left">
        <a href="#top" className="bottomnav-logo" aria-label="臺北市數位實驗高中學生會">
          <img className="bottomnav-logo-img" src="/logotype.svg" alt="" />
        </a>
        <div className="bottomnav-social">
          <a className="bottomnav-social-link" href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a className="bottomnav-social-link" href="https://facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a className="bottomnav-social-link" href="mailto:studentcouncil@tschool.tp.edu.tw" aria-label="Email">
            <EmailIcon />
          </a>
        </div>
      </div>

      <div className="bottomnav-col bottomnav-mid" aria-hidden="true" />

      <div className="bottomnav-col bottomnav-right">
        <span className="bottomnav-title">特別感謝</span>
        <div className="bottomnav-thanks">
          <a
            className="bottomnav-thanks-item"
            href="https://hackmd.io/"
            target="_blank"
            rel="noreferrer"
            aria-label="HackMD"
          >
            <img className="bottomnav-thanks-img" src="/support/hackmd.webp" alt="HackMD" />
          </a>
          <a
            className="bottomnav-thanks-item"
            href="https://ncse.tw"
            target="_blank"
            rel="noreferrer"
            aria-label="NCSE"
          >
            <img className="bottomnav-thanks-img" src="/support/ncse.webp" alt="NCSE" />
          </a>
        </div>
      </div>
    </footer>
  )
}
