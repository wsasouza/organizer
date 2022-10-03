import illustration from '../../assets/illustration.svg'
import { HomeContainer, Text } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <Text>
        <h1>
          Organize seus favoritos, finanças e tarefas do dia a dia em um único
          lugar
        </h1>
      </Text>
      <img src={illustration} alt="" />
    </HomeContainer>
  )
}
