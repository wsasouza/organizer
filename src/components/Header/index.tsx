import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import autoAnimate from '@formkit/auto-animate'
import { Bookmarks, Money, NotePencil, List, X } from 'phosphor-react'

import logo from '../../assets/logo.svg'
import { NavMobile } from '../NavMobile'

import { HeaderContainer, HeaderMenu, MenuMobile } from './styles'

interface HeaderProps {
  scroll: boolean
}

export function Header({ scroll }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <HeaderContainer scroll={scroll} ref={parent}>
      <nav>
        <Link to="/" title="Home">
          <img src={logo} alt="" width={200} />
        </Link>
        <HeaderMenu>
          <NavLink to="/bookmarks" title="Favoritos">
            <Bookmarks size={22} weight="duotone" />
            <span>Favoritos</span>
          </NavLink>
          <NavLink to="/money" title="Finanças">
            <Money size={22} weight="duotone" />
            <span>Finanças</span>
          </NavLink>
          <NavLink to="/tasks" title="Tarefas">
            <NotePencil size={22} weight="duotone" />
            <span>Tarefas</span>
          </NavLink>
        </HeaderMenu>
        <MenuMobile>
          <button onClick={toggle}>
            {isOpen ? (
              <X size={40} weight="bold" />
            ) : (
              <List size={40} weight="bold" />
            )}
          </button>
        </MenuMobile>
      </nav>
      {isOpen && <NavMobile setOpen={setIsOpen} />}
    </HeaderContainer>
  )
}
