import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Article, ChalkboardTeacher, Play, PlusCircle } from 'phosphor-react'

import { SummaryCard } from '../../components/SummaryCard'
import { useBookmarksSummary } from '../../hooks/useBookmarksSummary'
import { ItemCard } from './components/ItemCard'
import { SearchForm } from './components/SearchForm'

import {
  AddButtonContainer,
  AddNewItemButton,
  BookmarksContainer,
  BookmarksHeader,
  ItemCardContainer,
  SummaryCardContainer,
} from './styles'
import { NewBookmarkModal } from './components/NewBookmarkModal'
import { useContextSelector } from 'use-context-selector'
import { BookmarksContext } from '../../contexts/BookmarksContexts'

export function Bookmarks() {
  const [open, setOpen] = useState(false)

  const itemsCard = useContextSelector(BookmarksContext, (context) => {
    return context.itemsFiltered
  })

  const deleteCard = useContextSelector(BookmarksContext, (context) => {
    return context.deleteArticleItem
  })

  const {
    summary,
    lastDateItemArticle,
    lastDateItemCourse,
    lastDateItemVideo,
  } = useBookmarksSummary()

  const quantityItemsDisplay = (quantityItems: number) => {
    if (quantityItems === 0) return 'Nenhum item'
    else if (quantityItems === 1) {
      return `${`${quantityItems}`.padStart(2, '0')} item`
    } else return `${`${quantityItems}`.padStart(2, '0')} itens`
  }

  return (
    <BookmarksContainer>
      <BookmarksHeader>
        <AddButtonContainer>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <AddNewItemButton>
                <PlusCircle size={16} color="#070500" weight="duotone" />
                Novo Item
              </AddNewItemButton>
            </Dialog.Trigger>
            <NewBookmarkModal setOpen={setOpen} />
          </Dialog.Root>
        </AddButtonContainer>
        <SummaryCardContainer>
          <SummaryCard
            title="Artigo"
            icon={<Article size={32} color="#070500" weight="duotone" />}
            content={quantityItemsDisplay(summary.article)}
            detail={lastDateItemArticle}
          />
          <SummaryCard
            title="Curso"
            icon={
              <ChalkboardTeacher size={32} color="#070500" weight="duotone" />
            }
            content={quantityItemsDisplay(summary.course)}
            detail={lastDateItemCourse}
          />
          <SummaryCard
            title="Vídeo Aula"
            icon={<Play size={32} color="#070500" weight="duotone" />}
            content={quantityItemsDisplay(summary.video)}
            detail={lastDateItemVideo}
          />
        </SummaryCardContainer>
      </BookmarksHeader>
      <SearchForm />
      <ItemCardContainer>
        {itemsCard.map((item) => {
          return (
            <ItemCard
              key={item.id}
              title={item.title}
              origin={item.origin}
              link={item.link}
              type={item.type}
              createdAt={item.createdAt}
              id={item.id}
              onDeleteCard={deleteCard}
            />
          )
        })}
      </ItemCardContainer>
    </BookmarksContainer>
  )
}
