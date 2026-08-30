export interface Post {
  id: string
  title: string
  date: string
  tags: string[]
  author: string
  content: string
  slug: string
}

// Vite: import all markdown files under /public/post as raw strings
const modules = import.meta.glob('/public/post/*.md', { query: '?raw', import: 'default' })

export async function loadPosts(): Promise<Post[]> {
  const entries = Object.entries(modules)
  const posts: Post[] = []

  for (const [path, loader] of entries) {
    const raw = (await loader()) as string
    const parsed = parsePost(raw, path)
    if (parsed) posts.push(parsed)
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

function parsePost(raw: string, path: string): Post | null {
  const frontmatter = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/)
  if (!frontmatter) return null

  const meta = frontmatter[1]
  const get = (key: string) => {
    const m = meta.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    return m ? m[1].trim() : ''
  }

  const id = get('id')
  const title = get('title')
  const date = get('date')
  const author = get('author')

  const tagsRaw = get('tags')
  const tags = tagsRaw
    .replace(/^\[/, '')
    .replace(/\]$/, '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  const content = raw.slice(frontmatter[0].length).trim()
  const slug = path.split('/').pop()?.replace(/\.md$/, '') || id

  return { id, title, date, tags, author, content, slug }
}

export function formatDate(date: string): string {
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
    const [y, m, d] = date.split('-')
    return `${y}/${m}/${d}`
  }
  return date
}
