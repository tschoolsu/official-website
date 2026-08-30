import './PlaceholderPage.css'

interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className="placeholder">
      <div className="placeholder-inner">
        <span className="placeholder-mark" aria-hidden="true">
          ?
        </span>
        <h2 className="placeholder-title">{title}</h2>
        <p className="placeholder-sub">此頁面內容籌備中，敬請期待。</p>
      </div>
    </section>
  )
}
