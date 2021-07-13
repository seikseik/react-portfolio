import { createClient } from "contentful"

  export async function getStaticProps(){

    const client = createClient({
      space: "eboqqdlmb7kk",
      accessToken:"RCUA7VvunO68Ee5poATlJWqQ_5FDM690t9il_Wq8mSc",
    })

  const res = await client.getEntries({
    content_type: 'projects'
  })


  return {
    props: {
      projects: res.items
    }
  }
}


export default function Home({ projects }) {
console.log(projects)
  return (
    <div className="recipe-list">
      {projects.map((item) => (
        <div key={item.sys.id}>{item.fields.title}</div>
      ))}
    </div>
  )
}
