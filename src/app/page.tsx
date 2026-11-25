// 여기는 아직 서버 컴포넌트임.
// 나중에 클라이언트와 서버 분리가 필요함.

import Notfound from "@/component/404"
import { neon } from "@neondatabase/serverless"

export const dynamic = 'force-dynamic'

export default async function Home() {
  const sql = neon(process.env.DATABASE_URL!)
  const contents = await sql`SELECT id, title, description, img FROM contents`
  .catch((error) => {
    console.error("데이터베이스를 조회하려고 했으나 실패했습니다:", error)
    return []
  })

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
                    <li 
                      key={content.id}
                      className="m-4 pt-1 pb-1 pr-2 pl-2 bg-zinc-100 rounded-md"
                    >
                      {
                        content.img
                        ? <img src={content.img} alt={content.title} />
                        : null
                      }
                      <h3>{content.title}</h3>
                      <p>{content.description}</p>
                    </li>
                  ))
                : <Notfound />
              }
            </ul>
          </article>
        </section>
      </main>
      <footer></footer>
    </div>
  )
}