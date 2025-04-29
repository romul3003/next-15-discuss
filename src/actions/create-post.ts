'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import type { Post } from '@prisma/client'
import { db } from '@/db'
import paths from '@/paths'
import { auth } from '@/auth'

const createPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: 'Must be lowercase letters or dashes without spaces' }),
  content: z.string().min(10),
})

interface CreatePostFormState {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

export const createPost = async (
  slug: string,
  formState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> => {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const session = await auth()

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    }
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  })

  if (!topic) {
    return {
      errors: {
        _form: ['Cannot find topic'],
      },
    }
  }

  let post: Post

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      }
    }
  }

  revalidatePath(paths.topicShow(slug))
  revalidatePath('/')
  redirect(paths.postShow(slug, post.id))
}
