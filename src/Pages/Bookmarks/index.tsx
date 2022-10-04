import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Article,
  BookmarksSimple,
  ChalkboardTeacher,
  Play,
  PlusCircle,
} from 'phosphor-react'

import { SummaryCard } from '../../components/SummaryCard'
import { useBookmarksSummary } from '../../hooks/useBookmarksSummary'
import { ItemCard } from './components/ItemCard'
import { SearchForm } from './components/SearchForm'
import { NewBookmarkModal } from './components/NewBookmarkModal'
import { BookmarksContext } from '../../contexts/BookmarksContexts'
import { quantityItemsDisplay } from '../../utils/formatter'

import {
  AddButtonContainer,
  AddNewItemButton,
  BookmarksContainer,
  BookmarksHeader,
  ItemCardContainer,
  SummaryCardContainer,
} from './styles'

export function Bookmarks() {
  const [open, setOpen] = useState(false)

  const itemsCard = useContextSelector(BookmarksContext, (context) => {
    return context.itemsFiltered
  })

  const deleteCard = useContextSelector(BookmarksContext, (context) => {
    return context.deleteArticleItem
  })

  const onDragEnd = useContextSelector(BookmarksContext, (context) => {
    return context.onDragEnd
  })

  const {
    summary,
    lastDateItemArticle,
    lastDateItemCourse,
    lastDateItemVideo,
  } = useBookmarksSummary()

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    borderTop: isDragging ? '3px solid #F7A407 ' : 'none',
    borderRight: isDragging ? '3px solid #F7A407 ' : 'none',
    borderRadius: '6px',
    ...draggableStyle,
  })

  return (
    <BookmarksContainer>
      <BookmarksHeader>
        <AddButtonContainer>
          <h1>
            <BookmarksSimple size={32} weight="duotone" />
            Favoritos
          </h1>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="transactions">
          {(provided) => (
            <ItemCardContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {itemsCard.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
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
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ItemCardContainer>
          )}
        </Droppable>
      </DragDropContext>
    </BookmarksContainer>
  )
}
