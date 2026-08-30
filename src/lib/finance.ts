export interface FinanceReport {
  id: string
  title: string
  type: string
  time: string
  date: string
  content: string
  slug: string
}

const TYPE_ORDER: Record<string, number> = {
  '預算': 1,
  '決算': 2,
  '追加（減）預算': 3,
}

const modules = import.meta.glob('/public/finance/*.md', {
  query: '?raw',
  import: 'default',
})

export async function loadFinanceReports(): Promise<FinanceReport[]> {
  const entries = Object.entries(modules)
  const reports: FinanceReport[] = []

  for (const [path, loader] of entries) {
    const raw = (await loader()) as string
    const parsed = parseReport(raw, path)
    if (parsed) reports.push(parsed)
  }

  return reports.sort((a, b) => {
    const typeDiff = (TYPE_ORDER[a.type] ?? 9) - (TYPE_ORDER[b.type] ?? 9)
    if (typeDiff !== 0) return typeDiff
    return b.date.localeCompare(a.date)
  })
}

function parseReport(raw: string, path: string): FinanceReport | null {
  const frontmatter = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/)
  if (!frontmatter) return null

  const meta = frontmatter[1]
  const get = (key: string) => {
    const m = meta.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    return m ? m[1].trim() : ''
  }

  const report: FinanceReport = {
    id: get('id'),
    title: get('title'),
    type: get('type'),
    time: get('time'),
    date: get('date'),
    content: raw.slice(frontmatter[0].length).trim(),
    slug: path.split('/').pop()?.replace(/\.md$/, '') || get('id'),
  }

  return report
}

export function formatFinanceDate(date: string): string {
  return date.replace(/\//g, '.')
}

export function typeTone(type: string): 'green' | 'blue' | 'orange' {
  if (type.includes('預算') && !type.includes('決算')) return 'blue'
  if (type.includes('決算')) return 'green'
  return 'orange'
}
