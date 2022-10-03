import { useContextSelector } from 'use-context-selector'

// import { ItemsContext } from '../contexts/ItemsContexts'

interface Item {
  id: string
  title: string
  origin: string
  link: string
  type: 'artigo' | 'curso' | 'videoaula'
  createdAt: string
}

export function useBookmarksSummary() {
  // const items = useContextSelector(ItemsContext, (context) => {
  //   return context.items
  // })

  function getLastItemDate(
    collection: Item[],
    type: 'artigo' | 'curso' | 'videoaula',
  ) {
    const collectionFilttered = collection.filter((item) => item.type === type)

    if (collectionFilttered.length === 0) return 0

    const lastItemDate = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((item) => new Date(item.createdAt).getTime()),
      ),
    )

    return lastItemDate
  }

  const lastItemArticle = getLastItemDate(items, 'artigo')

  const lastItemCourse = getLastItemDate(items, 'curso')

  const lastItemVideo = getLastItemDate(items, 'videoaula')

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
    lastItemArticle,
    lastItemCourse,
    lastItemVideo,
  }
}
