import { useContextSelector } from 'use-context-selector'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Funnel, MagnifyingGlass } from 'phosphor-react'

import { BookmarksContext } from '../../../../contexts/BookmarksContexts'
import { quantityItemsDisplay } from '../../../../utils/formatter'

import {
  FilterContainer,
  Query,
  SearchFormAction,
  SearchFormContainer,
} from './styles'
import { useState } from 'react'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const [query, setQuery] = useState('')

  const fetchItems = useContextSelector(BookmarksContext, (context) => {
    return context.fetchItemsFiltered
  })

  const { register, reset, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  function handleSearchItems(data: SearchFormInputs) {
    setQuery(data.query)
    fetchItems(data.query)
    reset()
  }

  const quantityItems = useContextSelector(BookmarksContext, (context) => {
    return context.quantityItems
  })

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchItems)}>
      <FilterContainer>
        <Query variant={query}>
          {query ? (
            <Funnel size={32} weight="fill" color="#F7A407" />
          ) : (
            <Funnel size={32} weight="duotone" color="#D9D9D9" />
          )}
          <span>{query}</span>
        </Query>
        <span>{quantityItemsDisplay(quantityItems)}</span>
      </FilterContainer>
      <SearchFormAction>
        <input
          type="text"
          placeholder="Pesquisar itens..."
          {...register('query')}
        />
        <button>
          <MagnifyingGlass size={16} weight="bold" />
          <span>Pesquisar</span>
        </button>
      </SearchFormAction>
    </SearchFormContainer>
  )
}
