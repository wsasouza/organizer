import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Article, ChalkboardTeacher, Play, PlusCircle, X } from 'phosphor-react'

import { BookmarksContext } from '../../../../contexts/BookmarksContexts'

import {
  CloseButton,
  Content,
  Overlay,
  ItemType,
  ItemTypeButton,
  Title,
} from './styles'

const newBookmarkFormSchema = z.object({
  title: z.string(),
  origin: z.string(),
  link: z.string(),
  type: z.enum(['artigo', 'curso', 'videoaula']),
})

interface NewBookmarkModalProps {
  setOpen: (state: boolean) => void
}

type NewBookmarkFormInputs = z.infer<typeof newBookmarkFormSchema>

export function NewBookmarkModal({ setOpen }: NewBookmarkModalProps) {
  const createBookmark = useContextSelector(BookmarksContext, (context) => {
    return context.createArticleItem
  })

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewBookmarkFormInputs>({
    resolver: zodResolver(newBookmarkFormSchema),
  })

  function handleCreateNewBookmark(data: NewBookmarkFormInputs) {
    const { title, origin, link, type } = data

    createBookmark({
      title,
      origin,
      link,
      type,
    })

    reset()
    setOpen(false)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>
          <PlusCircle size={24} />
          Novo Item
        </Title>
        <CloseButton asChild onClick={() => reset()}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewBookmark)}>
          <input
            type="text"
            placeholder="Título"
            {...register('title')}
            required
          />

          <input
            type="text"
            placeholder="Origem"
            required
            {...register('origin')}
          />

          <input
            type="text"
            placeholder="Link"
            required
            {...register('link')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <ItemType onValueChange={field.onChange} value={field.value}>
                  <ItemTypeButton value="artigo">
                    <Article size={20} weight="duotone" />
                    Artigo
                  </ItemTypeButton>

                  <ItemTypeButton value="curso">
                    <ChalkboardTeacher size={20} weight="duotone" />
                    Curso
                  </ItemTypeButton>

                  <ItemTypeButton value="videoaula">
                    <Play size={20} weight="duotone" />
                    Videoaula
                  </ItemTypeButton>
                </ItemType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Adicionar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
