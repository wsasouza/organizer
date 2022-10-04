import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Funnel, MagnifyingGlass } from 'phosphor-react'

import { TasksContext } from '../../../../contexts/TasksContexts'
import { quantityTasksDisplay } from '../../../../utils/formatter'

import {
  FilterContainer,
  Query,
  SearchFormAction,
  SearchFormContainer,
} from './styles'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const [query, setQuery] = useState('')

  const fetchTasks = useContextSelector(TasksContext, (context) => {
    return context.fetchTasksFiltered
  })

  const { register, reset, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  function handleSearchTransactions(data: SearchFormInputs) {
    setQuery(data.query)
    fetchTasks(data.query)
    reset()
  }

  const quantityTasks = useContextSelector(TasksContext, (context) => {
    return context.quantityTasks
  })

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <FilterContainer>
        <Query variant={query}>
          {query ? (
            <Funnel size={32} weight="fill" color="#F7A407" />
          ) : (
            <Funnel size={32} weight="duotone" color="#D9D9D9" />
          )}
          <span>{query}</span>
        </Query>
        <span>{quantityTasksDisplay(quantityTasks)}</span>
      </FilterContainer>
      <SearchFormAction>
        <input
          type="text"
          placeholder="Pesquisar transações..."
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
