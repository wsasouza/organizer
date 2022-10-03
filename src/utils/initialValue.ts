import { Item } from '../contexts/BookmarksContexts'

export function initialValueBookmarks(items: string) {
  const saved = localStorage.getItem(items)

  const initialValue = JSON.parse(saved || '[]')

  const initialValueWithDate = initialValue.map((itemCard: Item) => {
    return { ...itemCard, createdAt: new Date(itemCard.createdAt) }
  })
  return initialValueWithDate || []
}
