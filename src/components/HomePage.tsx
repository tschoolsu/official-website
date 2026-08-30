import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home">
      <header className="navbar">
        <a href="#" className="nav-logo" aria-label="數位學生學生會">
          <img className="nav-logo-img" src="/logotype.svg" alt="數位學生學生會 T-SCHOOL SU" />
        </a>
        <nav className="nav-links">
          <a href="#about">關於</a>
          <a href="#news">消息</a>
          <a href="#projects">專案</a>
          <a href="#contact">聯絡</a>
        </nav>
      </header>
      <main className="hero">
        <h1>數位學生學生會</h1>
        <p className="hero-en">T-SCHOOL SU</p>
      </main>
    </div>
  )
}
