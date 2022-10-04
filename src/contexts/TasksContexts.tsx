import { ReactNode, useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { createContext } from 'use-context-selector'

import { initialValueTasks } from '../utils/initialValue'

export interface Task {
  id: string
  title: string
  category: string
  done: boolean
  createdAt: Date
}

interface CreateTaskInput {
  title: string
  category: string
}

interface TasksContextType {
  quantityTasks: number
  tasks: Task[]
  tasksFiltered: Task[]
  fetchTasksFiltered: (query?: string) => void
  createTask: (data: CreateTaskInput) => void
  toggleTaskDone: (id: string) => void
  deleteTask: (id: string) => void
}

interface TasksProviderProps {
  children: ReactNode
}

export const TasksContext = createContext({} as TasksContextType)

const TASKS_ITEMS = '@Organizer:tasks'

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(initialValueTasks(TASKS_ITEMS))

  const [tasksFiltered, setTasksFiltered] = useState<Task[]>([])

  const [quantityTasks, setQuantityTasks] = useState(0)

  const fetchTasksFiltered = useCallback(
    (query?: string) => {
      if (query) {
        const queryFormatted = query.toLowerCase()

        const result = tasks.filter(function (task) {
          if (
            task.title.toLowerCase().includes(queryFormatted) ||
            task.category.toLowerCase().includes(queryFormatted)
          ) {
            return task
          } else return ''
        })

        setTasksFiltered(result)
        setQuantityTasks(result.length)
      } else {
        setTasksFiltered(tasks)
        setQuantityTasks(tasks.length)
      }
    },
    [tasks],
  )

  function createTask(data: CreateTaskInput) {
    const taskWithSameTitle = tasks.find((task) => task.title === data.title)

    if (taskWithSameTitle) {
      toast.error(`Tarefa ${data.title} já foi cadastrada.`)
      return
    }

    const newTask = {
      id: uuidv4(),
      title: data.title,
      category: data.category,
      done: false,
      createdAt: new Date(),
    }

    setTasks((oldState) => [...oldState, newTask])

    toast.info(`Tarefa ${newTask.title} foi criada.`)
  }

  function toggleTaskDone(id: string) {
    const updatedTasks = tasks.map((task) => ({ ...task }))
    const foundTask = updatedTasks.find((task) => task.id === id)

    if (!foundTask) return

    foundTask.done = !foundTask.done

    if (foundTask.done) {
      toast.success(`Tarefa ${foundTask.title} foi concluída.`)
    }

    setTasks(updatedTasks)
  }

  function deleteTask(id: string) {
    setTasks((oldState) => oldState.filter((task) => task.id !== id))

    const deletedTask = tasks.find((task) => task.id === id)

    toast.warn(`Tarefa ${deletedTask?.title} foi apagada.`)
  }

  useEffect(() => {
    localStorage.setItem(TASKS_ITEMS, JSON.stringify(tasks))
    fetchTasksFiltered()
  }, [fetchTasksFiltered, tasks])

  return (
    <TasksContext.Provider
      value={{
        quantityTasks,
        tasks,
        tasksFiltered,
        fetchTasksFiltered,
        createTask,
        toggleTaskDone,
        deleteTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
