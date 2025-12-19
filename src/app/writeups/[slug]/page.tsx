import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function WriteupPage({ params }: PageProps) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "article" && slug.current == $slug][0]`,
    { slug }
  )

  if (!post) {
    notFound()
  }

  return (
    <article>
      <h1>{post.title}</h1>
      {/* render body properly here */}
    </article>
  )
}
