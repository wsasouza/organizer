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

import { articleTypes } from '../../../../utils/articleTypes'
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
  title: string
  origin: string
  link: string
  type: 'artigo' | 'curso' | 'videoaula'
  createdAt: string
}

export function ItemCard(data: ItemCardProps) {
  const [open, setOpen] = useState(false)

  const { link, origin, title, createdAt } = data

  const article = articleTypes.find((type) => type.key === data.type)

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
        {iconFinder(article!.key)}
        <span>{article!.name}</span>
      </div>
      <div className="date">
        <CalendarBlank size={16} color="#F7A407" weight="bold" />
        {dateFormatter.format(new Date(createdAt))}
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
            <DeleteButton>Confirmar</DeleteButton>
          </DialogAction>
        </DialogContent>
      </Dialog.Root>
    </ItemCardContainer>
  )
}
