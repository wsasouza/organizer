import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  CalendarBlank,
  Trash,
  Play,
  Article,
  ChalkboardTeacher,
  X,
  Link,
  Eraser,
} from 'phosphor-react'

import { bookmarksCategories } from '../../../../utils/categories'
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

interface ItemCardProps {
  id: string
  title: string
  origin: string
  link: string
  type: 'artigo' | 'curso' | 'videoaula'
  createdAt: Date
  onDeleteCard: (id: string) => void
}

export function ItemCard(data: ItemCardProps) {
  const [open, setOpen] = useState(false)

  const { link, origin, title, createdAt } = data

  const bookmark = bookmarksCategories.find((type) => type.key === data.type)

  function iconFinder(icon: string) {
    if (icon === 'artigo')
      return <Article size={22} color="#070500" weight="duotone" />

    if (icon === 'curso')
      return <ChalkboardTeacher size={22} color="#070500" weight="duotone" />

    if (icon === 'videoaula')
      return <Play size={22} color="#070500" weight="duotone" />
  }

  return (
    <ItemCardContainer>
      <span className="title">{title}</span>

      <a href={link} target="_blank" rel="noreferrer" className="origin">
        <Link size={20} weight="duotone" color="#070500" />
        {origin}
      </a>

      <div className="category">
        {iconFinder(bookmark!.key)}
        <span>{bookmark!.name}</span>
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
            Tem certeza que deseja apagar este item?
          </DialogDescription>
          <DialogAction>
            <CancelButton>Cancelar</CancelButton>
            <DeleteButton onClick={() => data.onDeleteCard(data.id)}>
              Confirmar
            </DeleteButton>
          </DialogAction>
        </DialogContent>
      </Dialog.Root>
    </ItemCardContainer>
  )
}
