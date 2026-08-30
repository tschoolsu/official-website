import './About.css'

const GOALS = [
  '實踐校園民主與學生自治精神',
  '暢通本校與學生之意見交流管道',
  '維護學生權益',
  '維繫學生之間互動與連結',
  '推動學生自治相關知能之普及',
]

export default function About() {
  return (
    <section id="about" className="about">
      <div
        aria-hidden
        className="about-dots"
      />
      <div className="about-inner">
        <img className="about-logo" src="/logo.svg" alt="臺北市數位實驗高中學生會" />
        <h1 className="about-title">臺北市數位實驗高中學生會</h1>
        <p className="about-sub">
          「臺北市數位實驗高級中等學校學生自治會」是本校的學生自治組織
        </p>

        <div className="about-goals">
          <h2 className="about-goals-title">宗旨</h2>
          <ol className="about-goals-list">
            {GOALS.map((goal, i) => (
              <li key={goal} className="about-goal">
                <span className="about-goal-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{goal}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
