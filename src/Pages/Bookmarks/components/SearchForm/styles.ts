import styled from 'styled-components'

export const SearchFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Query = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export const SearchFormAction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    padding: 0.5rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
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
`
