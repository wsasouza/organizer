import { House, Bookmarks, Money, NotePencil } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { NavMobileContainer } from './styles'

interface NavMobileProps {
  setOpen: (state: boolean) => void
}

export function NavMobile({ setOpen }: NavMobileProps) {
  return (
    <NavMobileContainer>
      <NavLink end to="/" title="Home" onClick={() => setOpen(false)}>
        <House size={22} weight="duotone" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/bookmarks" title="Artigos" onClick={() => setOpen(false)}>
        <Bookmarks size={22} weight="duotone" />
        <span>Artigos</span>
      </NavLink>
      <NavLink to="/money" title="Artigo" onClick={() => setOpen(false)}>
        <Money size={22} weight="duotone" />
        <span>Financeiro</span>
      </NavLink>
      <NavLink to="/tasks" title="Tarefa" onClick={() => setOpen(false)}>
        <NotePencil size={22} weight="duotone" />
        <span>Tarefas</span>
      </NavLink>
    </NavMobileContainer>
  )
}
