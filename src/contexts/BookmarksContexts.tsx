import { ReactNode, useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { createContext } from 'use-context-selector'

import { initialValueBookmarks } from '../utils/initialValue'

export interface Item {
  id: string
  title: string
  origin: string
  link: string
  type: 'artigo' | 'curso' | 'videoaula'
  createdAt: Date
}

interface CreateBookmarkInput {
  title: string
  origin: string
  link: string
  type: 'artigo' | 'curso' | 'videoaula'
}

interface BookmarksContextType {
  quantityItems: number
  items: Item[]
  itemsFiltered: Item[]
  fetchItemsFiltered: (query?: string) => void
  createArticleItem: (data: CreateBookmarkInput) => void
  deleteArticleItem: (id: string) => void
}

interface ItemProviderProps {
  children: ReactNode
}

export const BookmarksContext = createContext({} as BookmarksContextType)

const BOOKMARKS_ITEMS = '@Organizer:bookmarks'

export function BookmarksProvider({ children }: ItemProviderProps) {
  const [items, setItems] = useState<Item[]>(
    initialValueBookmarks(BOOKMARKS_ITEMS),
  )

  const [itemsFiltered, setItemsFiltered] = useState<Item[]>([])

  const [quantityItems, setQuantityItems] = useState(0)

  const fetchItemsFiltered = useCallback(
    (query?: string) => {
      if (query) {
        const queryFormatted = query.toLowerCase()

        const result = items.filter(function (item) {
          if (
            item.title.toLowerCase().includes(queryFormatted) ||
            item.origin.toLowerCase().includes(queryFormatted) ||
            item.link.toLowerCase().includes(queryFormatted) ||
            item.type.toLowerCase().includes(queryFormatted)
          ) {
            return item
          } else return ''
        })

        setItemsFiltered(result)
        setQuantityItems(result.length)
      } else {
        setItemsFiltered(items)
        setQuantityItems(items.length)
      }
    },
    [items],
  )

  function createArticleItem(data: CreateBookmarkInput) {
    const { title, origin, link, type } = data
    const itemSameLink = items.find((item) => item.link === link)

    if (itemSameLink) {
      toast.warning('Este artigo já está cadastrado.')
      return
    }

    const newItem = {
      id: uuidv4(),
      title,
      origin,
      link,
      type,
      createdAt: new Date(),
    }

    setItems((oldState) => [...oldState, newItem])
    toast.success('Novo item adicionado.')
  }

  function deleteArticleItem(id: string) {
    setItems((oldState) => oldState.filter((item) => item.id !== id))
    toast.info('Item foi removido com sucesso.')
  }

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_ITEMS, JSON.stringify(items))
    fetchItemsFiltered()
  }, [fetchItemsFiltered, items])

  return (
    <BookmarksContext.Provider
      value={{
        quantityItems,
        items,
        itemsFiltered,
        fetchItemsFiltered,
        createArticleItem,
        deleteArticleItem,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  )
}
