import { useContextSelector } from 'use-context-selector'

import { BookmarksContext } from '../contexts/BookmarksContexts'
import { dateFormatter } from '../utils/formatter'

interface Item {
  id: string
  title: string
  origin: string
  link: string
  type: 'artigo' | 'curso' | 'videoaula'
  createdAt: Date
}

export function useBookmarksSummary() {
  const items = useContextSelector(BookmarksContext, (context) => {
    return context.items
  })

  function getLastItemDate(
    collection: Item[],
    type: 'artigo' | 'curso' | 'videoaula',
  ) {
    const collectionFilttered = collection.filter((item) => item.type === type)

    if (collectionFilttered.length === 0) return 0

    const lastItemDate = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((item) => item.createdAt.getTime()),
      ),
    )

    return lastItemDate
  }

  const lastItemArticle = getLastItemDate(items, 'artigo')
  const lastDateItemArticle =
    lastItemArticle === 0
      ? 'Nenhum artigo adicionado'
      : `Último artigo adicionado em ${dateFormatter.format(lastItemArticle)}`

  const lastItemCourse = getLastItemDate(items, 'curso')
  const lastDateItemCourse =
    lastItemCourse === 0
      ? 'Nenhum curso adicionado'
      : `Último curso adicionado em ${dateFormatter.format(lastItemCourse)}`

  const lastItemVideo = getLastItemDate(items, 'videoaula')
  const lastDateItemVideo =
    lastItemVideo === 0
      ? 'Nenhuma videoaula adicionada'
      : `Última videoaula adicionada em ${dateFormatter.format(lastItemVideo)}`

  const summary = items.reduce(
    (acc, item) => {
      if (item.type === 'artigo') {
        acc.article += 1
      } else if (item.type === 'curso') {
        acc.course += 1
      } else {
        acc.video += 1
      }
      return acc
    },
    { article: 0, course: 0, video: 0 },
  )

  return {
    summary,
    lastDateItemArticle,
    lastDateItemCourse,
    lastDateItemVideo,
  }
}
