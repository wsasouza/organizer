import { Funnel, MagnifyingGlass } from 'phosphor-react'
import {
  FilterContainer,
  Query,
  SearchFormAction,
  SearchFormContainer,
} from './styles'

export function SearchForm() {
  return (
    <SearchFormContainer>
      <FilterContainer>
        <Query>
          <Funnel size={32} weight="duotone" color="#D9D9D9" />
          <span>Query</span>
        </Query>
        <span>11 itens</span>
      </FilterContainer>
      <SearchFormAction>
        <input type="text" placeholder="Pesquisar itens..." />
        <button>
          <MagnifyingGlass size={16} weight="bold" />
          <span>Pesquisar</span>
        </button>
      </SearchFormAction>
    </SearchFormContainer>
  )
}
