import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import {
  CalendarBlank,
  Trash,
  X,
  Eraser,
  Coins,
  GameController,
  Coffee,
  GraduationCap,
  Handbag,
  House,
  Car,
  ShoppingCart,
} from 'phosphor-react'

import { moneyCategories } from '../../../../utils/categories'
import { dateFormatter, priceFormatter } from '../../../../utils/formatter'

import {
  CancelButton,
  CloseButton,
  DeleteButton,
  DialogAction,
  DialogContent,
  DialogDescription,
  ItemCardContainer,
  Overlay,
  PriceHighlight,
  Title,
} from './styles'

interface TransactionCardProps {
  id: string
  description: string
  category: string
  type: 'income' | 'outcome'
  value: number
  createdAt: Date
  onDeleteCard: (id: string) => void
}

export function ItemCard(data: TransactionCardProps) {
  const [open, setOpen] = useState(false)

  const { description, value, type, createdAt } = data

  const categoryTransaction = moneyCategories.find(
    (category) => category.key === data.category,
  )

  function iconFinder(icon: string) {
    if (icon === 'supermercado')
      return <ShoppingCart size={22} color="#070500" weight="duotone" />

    if (icon === 'carro')
      return <Car size={22} color="#070500" weight="duotone" />

    if (icon === 'casa')
      return <House size={22} color="#070500" weight="duotone" />

    if (icon === 'compras')
      return <Handbag size={22} color="#070500" weight="duotone" />

    if (icon === 'estudo')
      return <GraduationCap size={22} color="#070500" weight="duotone" />

    if (icon === 'lanche')
      return <Coffee size={22} color="#070500" weight="duotone" />

    if (icon === 'lazer')
      return <GameController size={22} color="#070500" weight="duotone" />

    if (icon === 'rendimentos')
      return <Coins size={22} color="#070500" weight="duotone" />
  }

  return (
    <ItemCardContainer>
      <span className="description">{description}</span>

      <PriceHighlight variant={type} className="value">
        {type === 'outcome' && '- '}
        {priceFormatter.format(value)}
      </PriceHighlight>

      <div className="category">
        {iconFinder(categoryTransaction!.key)}
        <span>{categoryTransaction!.name}</span>
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
