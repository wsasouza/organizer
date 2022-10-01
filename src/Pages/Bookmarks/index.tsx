import { Article, ChalkboardTeacher, Play, PlusCircle } from 'phosphor-react'
import { SummaryCard } from '../../components/SummaryCard'
import { ItemCard } from './components/ItemCard'
import { SearchForm } from './components/SearchForm'
import {
  AddButtonContainer,
  AddNewItemButton,
  BookmarksContainer,
  BookmarksHeader,
  ItemCardContainer,
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
      <ItemCardContainer>
        <ItemCard
          title="Testando Cartão mockado"
          link="https://www.google.com"
          origin="Site"
          type="curso"
          createdAt="2022-10-01T03:24:47.302Z"
        />
        <ItemCard
          title="Testando Cartão mockado"
          link="https://www.google.com"
          origin="Site"
          type="artigo"
          createdAt="2022-10-01T03:24:47.302Z"
        />
        <ItemCard
          title="Testando Cartão mockado"
          link="https://www.google.com"
          origin="You Tube"
          type="videoaula"
          createdAt="2022-10-01T03:24:47.302Z"
        />
      </ItemCardContainer>
    </BookmarksContainer>
  )
}
