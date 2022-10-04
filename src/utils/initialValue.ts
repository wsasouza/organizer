import { Item } from '../contexts/BookmarksContexts'
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
