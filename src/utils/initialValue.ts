import { Item } from '../contexts/BookmarksContexts'
import { Task } from '../contexts/TasksContexts'
import { Transaction } from '../contexts/TransactionsContexts'

export function initialValueBookmarks(items: string) {
  const saved = localStorage.getItem(items)

  const initialValue = JSON.parse(saved || '[]')

  const initialValueWithDate = initialValue.map((itemCard: Item) => {
    return { ...itemCard, createdAt: new Date(itemCard.createdAt) }
  })
  return initialValueWithDate || []
}

export function initialValueMoney(items: string) {
  const saved = localStorage.getItem(items)

  const initialValue = JSON.parse(saved || '[]')

  const initialValueWithDate = initialValue.map((itemCard: Transaction) => {
    return { ...itemCard, createdAt: new Date(itemCard.createdAt) }
  })
  return initialValueWithDate || []
}

export function initialValueTasks(items: string) {
  const saved = localStorage.getItem(items)

  const initialValue = JSON.parse(saved || '[]')

  const initialValueWithDate = initialValue.map((itemCard: Task) => {
    return { ...itemCard, createdAt: new Date(itemCard.createdAt) }
  })
  return initialValueWithDate || []
}
