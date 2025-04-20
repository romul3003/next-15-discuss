'use client'

import { FormEvent, startTransition, useActionState } from 'react'
import { Input, Button, Popover, PopoverTrigger, PopoverContent, Textarea } from '@nextui-org/react'

import * as actions from '@/actions'
import FormButton from '../common/form-button'

interface PostCreateFormProps {
  slug: string
}

const PostCreateForm = ({ slug }: PostCreateFormProps) => {
  const [formState, action, isPending] = useActionState(actions.createPost.bind(null, slug), {
    errors: {},
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startTransition(() => {
      action(formData)
    })
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>

            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />

            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />

            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400 rounded">
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}

            <FormButton isLoading={isPending}>Create Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default PostCreateForm
