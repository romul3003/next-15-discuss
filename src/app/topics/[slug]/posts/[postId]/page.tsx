import { Suspense } from 'react'
import Link from 'next/link'

import CommentCreateForm from '@/components/comments/comment-create-form'
import CommentList from '@/components/comments/comment-list'
import PostShow from '@/components/posts/post-show'
import paths from '@/paths'
import PostShowLoading from '@/components/posts/post-show-loading'

interface PostShowPageProps {
  params: Promise<{
    slug: string
    postId: string
  }>
}

const PostShowPage = async ({ params }: PostShowPageProps) => {
  const { slug, postId } = await params

  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShow(slug)}
      >
        {'< '}Back to {slug}
      </Link>

      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>

      <CommentCreateForm
        postId={postId}
        startOpen
      />
      <CommentList postId={postId} />
    </div>
  )
}

export default PostShowPage
