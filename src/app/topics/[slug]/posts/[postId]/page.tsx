import CommentCreateForm from '@/components/comments/comment-create-form'
import CommentList from '@/components/comments/comment-list'
import PostShow from '@/components/posts/post-show'
import { fetchCommentsByPostId } from '@/db/queries/comments'
import paths from '@/paths'
import Link from 'next/link'

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

      <PostShow postId={postId} />
      <CommentCreateForm
        postId={postId}
        startOpen
      />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  )
}

export default PostShowPage
