import './Organization.css'

interface OrgRow {
  tone: string
  members: { name: string; desc: string }[]
}

const ORG_ROWS: OrgRow[] = [
  {
    tone: 'green',
    members: [
      {
        name: '會員大會',
        desc: '為本會最高權力機關，負責依本會章程議決各項事務。',
      },
    ],
  },
  {
    tone: 'blue',
    members: [
      {
        name: '會長副會長',
        desc: '綜理本會會務，對外代表本會，並行使本會章程及會員大會賦予之其他職權。',
      },
    ],
  },
  {
    tone: 'violet',
    members: [
      {
        name: '會本部',
        desc: '負責處理學生會幕僚事務、籌備專案、活動及學生會對外公關事務，協助學生會整體事務順利運作。',
      },
      {
        name: '學權部',
        desc: '負責統籌學生權益事務，了解學生對校園事務的意見，處理學生權益案件，並透過學權意見調查、學權救濟及學權知能傳遞等工作，完善學生權益之保障。',
      },
      {
        name: '學術部',
        desc: '負責學生知能培力、講座辦理等，幫助學生提升學習便利性並促進學生間建立學習社群。',
      },
      {
        name: '數位部',
        desc: '負責推動數位化業務，開發並維護校園數位服務平台，為全校學生提供數位服務，讓校園生活與學生會運作更有效率、更透明。',
      },
      {
        name: '設計部',
        desc: '負責學生會各項形象視覺、募款品、影片之視覺、音效、動畫設計。',
      },
    ],
  },
]

export default function Organization() {
  return (
    <section id="organization" className="org">
      <div className="org-inner">
        <h2 className="org-title">
          組織架構<span className="org-title-dot">.</span>
        </h2>

        <div className="org-chart">
          <img
            className="org-chart-img"
            src="/org.structure.svg"
            alt="臺北市數位實驗高中學生會組織架構圖"
          />
        </div>

        <div className="org-groups">
          {ORG_ROWS.map((row) => (
            <div key={row.tone} className={`org-group org-group-${row.tone}`}>
              {row.members.map((m) => (
                <article key={m.name} className="org-card">
                  <h3 className="org-card-name">{m.name}</h3>
                  <p className="org-card-desc">{m.desc}</p>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
