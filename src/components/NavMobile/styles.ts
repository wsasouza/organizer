import styled from 'styled-components'

export const NavMobileContainer = styled.aside`
  width: 100%;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(13.5px);
  border: 1px solid 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 4rem;

  a {
    font-family: 'MuseoModerno', cursive;
    color: ${(props) => props.theme['gray-900']};
    background: ${(props) => props.theme['gray-100']};
    border: 1px solid ${(props) => props.theme['gray-900']};
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 6px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
      color: ${(props) => props.theme['gray-900']};
      background: ${(props) => props.theme['yellow-500']};
      font-weight: bold;

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
`
