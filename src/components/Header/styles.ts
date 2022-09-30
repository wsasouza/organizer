import styled, { css } from 'styled-components'

export const HeaderContainer = styled.header<{ scroll: boolean }>`
  position: fixed;
  width: 100%;
  z-index: 2;
  transition: 0.5s;
  padding: 1.5rem 1rem;

  ${(props) => props.scroll && scrollStyle};

  nav {
    display: flex;
    align-items: center;
    display: flex;
    max-width: 80rem;
    width: 100%;
    margin: 0 auto;
    justify-content: space-between;
  }
`

const scrollStyle = css`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`

export const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  a {
    font-family: 'MuseoModerno', cursive;
    color: ${(props) => props.theme['gray-900']};
    background: ${(props) => props.theme['gray-100']};
    border: 1px solid ${(props) => props.theme['gray-900']};
    width: 8rem;
    padding: 4px 8px;
    border-radius: 6px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
      color: ${(props) => props.theme['gray-900']};
      background: ${(props) => props.theme['yellow-500']};
      font-weight: bold;
      transition: background 0.3s;

      svg {
        color: ${(props) => props.theme['gray-900']};
        animation: icon 0.7s;
      }

      @keyframes icon {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1.3);
        }
      }
    }
  }

  a.active {
    box-shadow: 0 0 16px 4px rgba(247, 167, 7, 0.6);

    span {
      display: none;
    }

    svg {
      transform: scale(1);
    }
  }

  @media (max-width: 940px) {
    display: none;
  }
`

export const MenuMobile = styled.div`
  display: none;

  button {
    background: transparent;
    border: none;
    cursor: pointer;

    svg {
      color: ${(props) => props.theme['gray-900']};
    }
  }

  @media (max-width: 940px) {
    display: flex;
  }
`
