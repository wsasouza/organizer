import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PlusCircle, X } from 'phosphor-react'

import { TasksContext } from '../../../../contexts/TasksContexts'

import { CloseButton, Content, Overlay, Title, SelectCategory } from './styles'
import { tasksCategories } from '../../../../utils/categories'

const newTaskFormSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(3),
})

interface NewTaskModalProps {
  setOpen: (state: boolean) => void
}

type NewTaskFormInputs = z.infer<typeof newTaskFormSchema>

export function NewTaskModal({ setOpen }: NewTaskModalProps) {
  const createTask = useContextSelector(TasksContext, (context) => {
    return context.createTask
  })

  const { register, handleSubmit, reset } = useForm<NewTaskFormInputs>({
    resolver: zodResolver(newTaskFormSchema),
  })

  function handleCreateNewTask(data: NewTaskFormInputs) {
    const { title, category } = data

    createTask({
      title,
      category,
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
          Nova Tarefa
        </Title>
        <CloseButton asChild onClick={() => reset()}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTask)}>
          <textarea
            rows={3}
            placeholder="Adicione uma nova tarefa"
            {...register('title')}
            required
          />

          <SelectCategory {...register('category')}>
            <option value="no" hidden>
              Selecione a categoria
            </option>
            {tasksCategories.map((category) => {
              return (
                <option key={category.key} value={category.key}>
                  {category.name}
                </option>
              )
            })}
          </SelectCategory>

          <button type="submit">Criar</button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
