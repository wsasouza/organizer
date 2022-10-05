import { useContextSelector } from 'use-context-selector'

import { TasksContext } from '../contexts/TasksContexts'
import { dateFormatter } from '../utils/formatter'

interface Task {
  id: string
  title: string
  done: boolean
  createdAt: Date
}

export function useTasksSummary() {
  const tasks = useContextSelector(TasksContext, (context) => {
    return context.tasks
  })

  function getLastItemDate(collection: Task[], hasDone: boolean) {
    const collectionFiltered = collection.filter(
      (task) => task.done === hasDone,
    )

    if (collectionFiltered.length === 0) return 0

    const lastItemDate = new Date(
      Math.max.apply(
        Math,
        collectionFiltered.map((task) => task.createdAt.getTime()),
      ),
    )

    return lastItemDate
  }

  function getTasksInterval(collection: Task[]) {
    const firstTaskInterval = new Date(
      Math.min.apply(
        Math,
        collection.map((task) => new Date(task.createdAt).getTime()),
      ),
    )

    const lastTaskInterval = new Date(
      Math.max.apply(
        Math,
        collection.map((task) => new Date(task.createdAt).getTime()),
      ),
    )

    const validDate = !isNaN(firstTaskInterval.getDate())

    if (!validDate) return 'Não há tarefas'

    return `De ${dateFormatter.format(
      firstTaskInterval,
    )} à ${dateFormatter.format(lastTaskInterval)}`
  }

  const unDone = false
  const done = true

  const lastTaskCreated = getLastItemDate(tasks, unDone)
  const lastDateTaskCreated =
    lastTaskCreated === 0
      ? 'Nenhuma tarefa criada'
      : `Última tarefa adicionada em ${dateFormatter.format(lastTaskCreated)}`

  const lastTaskDone = getLastItemDate(tasks, done)
  const lastDateTaskDone =
    lastTaskDone === 0
      ? 'Nenhuma tarefa concluída'
      : `Última tarefa concluída em ${dateFormatter.format(lastTaskDone)}`

  const tasksInterval = getTasksInterval(tasks)

  const resume = tasks.reduce(
    (acc, task) => {
      if (task.done) {
        acc.done += 1
      } else {
        acc.created += 1
      }
      return acc
    },
    { created: 0, done: 0 },
  )

  const todo = resume.created

  function setVariant(todo: number): 'yellow' | 'green' | 'red' {
    if (todo === 0) return 'green'
    else if (todo > 0 && todo <= 5) return 'yellow'
    else return 'red'
  }

  const variant = setVariant(todo)

  return {
    resume,
    lastDateTaskCreated,
    lastDateTaskDone,
    tasksInterval,
    todo,
    variant,
  }
}
