import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import {
  Calendar,
  CalendarBlank,
  CalendarCheck,
  NotePencil,
  PlusCircle,
} from 'phosphor-react'

import { SummaryCard } from '../../components/SummaryCard'
import { useTasksSummary } from '../../hooks/useTasksSummary'
import { NewTaskModal } from './components/NewTaskModal'
import { TasksContext } from '../../contexts/TasksContexts'
import { SearchForm } from './components/SearchForm'
import { quantityTasksDisplay } from '../../utils/formatter'
import { ItemCard } from './components/ItemCard'

import {
  TasksContainer,
  TasksHeader,
  AddButtonContainer,
  AddNewTaskButton,
  SummaryCardContainer,
  ItemCardContainer,
} from './styles'

export function Tasks() {
  const [open, setOpen] = useState(false)

  const itemsCard = useContextSelector(TasksContext, (context) => {
    return context.tasksFiltered
  })

  const deleteTask = useContextSelector(TasksContext, (context) => {
    return context.deleteTask
  })

  const taskDone = useContextSelector(TasksContext, (context) => {
    return context.toggleTaskDone
  })

  const onDragEnd = useContextSelector(TasksContext, (context) => {
    return context.onDragEnd
  })

  const {
    lastDateTaskCreated,
    lastDateTaskDone,
    resume,
    tasksInterval,
    todo,
    variant,
  } = useTasksSummary()

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    borderTop: isDragging ? '3px solid #F7A407 ' : 'none',
    borderRight: isDragging ? '3px solid #F7A407 ' : 'none',
    borderRadius: '6px',
    ...draggableStyle,
  })

  return (
    <TasksContainer>
      <TasksHeader>
        <AddButtonContainer>
          <h1>
            <NotePencil size={32} weight="duotone" />
            Tarefas
          </h1>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <AddNewTaskButton>
                <PlusCircle size={16} color="#070500" weight="duotone" />
                Nova Tarefa
              </AddNewTaskButton>
            </Dialog.Trigger>
            <NewTaskModal setOpen={setOpen} />
          </Dialog.Root>
        </AddButtonContainer>
        <SummaryCardContainer>
          <SummaryCard
            title="Criadas"
            icon={<CalendarBlank size={32} color="#070500" weight="duotone" />}
            content={quantityTasksDisplay(resume.created)}
            detail={lastDateTaskCreated}
          />
          <SummaryCard
            title="Concluídas"
            icon={<CalendarCheck size={32} color="#070500" weight="duotone" />}
            content={quantityTasksDisplay(resume.done)}
            detail={lastDateTaskDone}
          />
          <SummaryCard
            title="A Fazer"
            icon={<Calendar size={32} color="#070500" weight="duotone" />}
            content={quantityTasksDisplay(todo)}
            detail={tasksInterval}
            variant={variant}
          />
        </SummaryCardContainer>
      </TasksHeader>
      <SearchForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
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
                          category={item.category}
                          createdAt={item.createdAt}
                          done={item.done}
                          id={item.id}
                          onDeleteTask={deleteTask}
                          onToggleTask={taskDone}
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
    </TasksContainer>
  )
}
