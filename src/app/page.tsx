import Link from "next/link"
import { neon } from "@neondatabase/serverless"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const sql = neon(process.env.DATABASE_URL!)
  const contents = await sql`SELECT id, title FROM contents`

  return(
    <div>
      <header></header>
      <main>
        <div>
          <h1>hello world</h1>
        </div>
        <section>
          <h2>만든 것들</h2>
          <article>
            <ul>
              {
                contents.length > 0
                ? contents.map((content) => (
                    <li key={content.id}>{content.title}</li>
                  ))
                : <span>콘텐츠를 불러오지 못헀습니다.</span>
              }
            </ul>
          </article>
        </section>
      </main>
      <footer></footer>
    </div>
  )
}