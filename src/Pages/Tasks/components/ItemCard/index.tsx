import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  CalendarBlank,
  Trash,
  X,
  Eraser,
  Crosshair,
  ChatsCircle,
  Briefcase,
  PersonSimpleRun,
  BookOpen,
  TerminalWindow,
  CheckCircle,
  Circle,
} from 'phosphor-react'

import { tasksCategories } from '../../../../utils/categories'
import { dateFormatter } from '../../../../utils/formatter'

import {
  CancelButton,
  CloseButton,
  DeleteButton,
  DialogAction,
  DialogContent,
  DialogDescription,
  ItemCardContainer,
  Overlay,
  Title,
} from './styles'

interface TaskCardProps {
  id: string
  title: string
  category: string
  done: boolean
  createdAt: Date
  onDeleteTask: (id: string) => void
  onToggleTask: (id: string) => void
}

export function ItemCard(data: TaskCardProps) {
  const [open, setOpen] = useState(false)

  const { title, createdAt } = data

  const categoryTask = tasksCategories.find(
    (category) => category.key === data.category,
  )

  function iconFinder(icon: string) {
    if (icon === 'desenvolvimento')
      return <TerminalWindow size={22} color="#070500" weight="duotone" />

    if (icon === 'estudo')
      return <BookOpen size={22} color="#070500" weight="duotone" />

    if (icon === 'esportes')
      return <PersonSimpleRun size={22} color="#070500" weight="duotone" />

    if (icon === 'trabalho')
      return <Briefcase size={22} color="#070500" weight="duotone" />

    if (icon === 'networking')
      return <ChatsCircle size={22} color="#070500" weight="duotone" />

    if (icon === 'objetivo')
      return <Crosshair size={22} color="#070500" weight="duotone" />
  }

  return (
    <ItemCardContainer>
      <span className="title" onClick={() => data.onToggleTask(data.id)}>
        {data.done ? (
          <CheckCircle size={24} color="#F7A407" weight="fill" />
        ) : (
          <Circle size={24} weight="duotone" />
        )}
        {title}
      </span>

      <div className="category">
        {iconFinder(categoryTask!.key)}
        <span>{categoryTask!.name}</span>
      </div>
      <div className="date">
        <CalendarBlank size={16} color="#F7A407" weight="bold" />
        {dateFormatter.format(createdAt)}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="delete" title="Apagar Item">
            <Trash size={20} />
          </button>
        </Dialog.Trigger>
        <Overlay />
        <DialogContent>
          <Title>
            <Eraser size={24} />
            Apagar item
          </Title>
          <CloseButton asChild>
            <X size={24} />
          </CloseButton>
          <DialogDescription>
            Tem certeza que deseja apagar esta tarefa?
          </DialogDescription>
          <DialogAction>
            <CancelButton>Cancelar</CancelButton>
            <DeleteButton onClick={() => data.onDeleteTask(data.id)}>
              Confirmar
            </DeleteButton>
          </DialogAction>
        </DialogContent>
      </Dialog.Root>
    </ItemCardContainer>
  )
}
