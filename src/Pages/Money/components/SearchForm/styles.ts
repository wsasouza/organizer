import styled, { css } from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
interface QueryProps {
  variant?: string
}

export const Query = styled.div<QueryProps>`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  ${(props) =>
    props.variant &&
    css`
      span {
        padding: 0.25rem 1rem;
        border-radius: 6px;
        background: ${(props) => props.theme['yellow-300']};
      }
    `}
`

export const SearchFormAction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    flex: 1;
    font-size: 1rem;
    border-radius: 6px;
    height: 2.5rem;
    border: 0;
    padding: 0.5rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    height: 2.5rem;
    padding: 0.25rem 0.5rem;
    background: linear-gradient(180deg, #f2cb81 0%, #f7a407 100%);
    border: none;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
      background: linear-gradient(180deg, #f7a407 0%, #f2cb81 100%);
      svg {
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

  @media (max-width: 400px) {
    button {
      padding: 0.25rem 0.875rem;
      span {
        display: none;
      }
    }
  }
`
