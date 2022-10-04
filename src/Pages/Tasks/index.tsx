import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import {
  Calendar,
  CalendarBlank,
  CalendarCheck,
  NotePencil,
  PlusCircle,
} from 'phosphor-react'

import { SummaryCard } from '../../components/SummaryCard'

import {
  TasksContainer,
  TasksHeader,
  AddButtonContainer,
  AddNewTaskButton,
  SummaryCardContainer,
  ItemCardContainer,
} from './styles'
import { NewTaskModal } from './components/NewTaskModal'
import { useTasksSummary } from '../../hooks/useTasksSummary'
import { quantityTasksDisplay } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import { TasksContext } from '../../contexts/TasksContexts'
import { ItemCard } from './components/ItemCard'

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

  const {
    lastDateTaskCreated,
    lastDateTaskDone,
    resume,
    tasksInterval,
    todo,
    variant,
  } = useTasksSummary()

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
      <ItemCardContainer>
        {itemsCard.map((item) => {
          return (
            <ItemCard
              key={item.id}
              title={item.title}
              category={item.category}
              createdAt={item.createdAt}
              id={item.id}
              onDeleteTask={deleteTask}
              onToggleTask={taskDone}
            />
          )
        })}
      </ItemCardContainer>
    </TasksContainer>
  )
}
