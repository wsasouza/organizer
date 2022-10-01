import { Article, ChalkboardTeacher, Play, PlusCircle } from 'phosphor-react'
import { SummaryCard } from '../../components/SummaryCard'
import { SearchForm } from './components/SearchForm'
import {
  AddButtonContainer,
  AddNewItemButton,
  BookmarksContainer,
  BookmarksHeader,
  SummaryCardContainer,
} from './styles'

export function Bookmarks() {
  return (
    <BookmarksContainer>
      <BookmarksHeader>
        <AddButtonContainer>
          <AddNewItemButton>
            <PlusCircle size={16} color="#070500" weight="duotone" />
            Novo Item
          </AddNewItemButton>
        </AddButtonContainer>
        <SummaryCardContainer>
          <SummaryCard
            title="Artigo"
            icon={<Article size={32} color="#070500" weight="duotone" />}
            content="04 Itens"
            detail="Último artigo adicionado em 30/09/2022"
          />
          <SummaryCard
            title="Curso"
            icon={
              <ChalkboardTeacher size={32} color="#070500" weight="duotone" />
            }
            content="04 Itens"
            detail="Último curso adicionado em 30/09/2022"
          />
          <SummaryCard
            title="Vídeo Aula"
            icon={<Play size={32} color="#070500" weight="duotone" />}
            content="04 Itens"
            detail="Última vídeo aula adicionado em 30/09/2022"
          />
        </SummaryCardContainer>
      </BookmarksHeader>
      <SearchForm />
    </BookmarksContainer>
  )
}
