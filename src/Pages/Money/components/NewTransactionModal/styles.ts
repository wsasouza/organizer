import styled from 'styled-components'
import * as Dialog from '@radix-ui/react-dialog'
import * as Radio from '@radix-ui/react-radio-group'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  z-index: 5;
  width: 35rem;
  border-radius: 6px;
  padding: 3rem;
  background: linear-gradient(90deg, #f1f1f1 0%, #f4e8d2 100%);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    input {
      font-size: 1rem;
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-100']};
      color: ${(props) => props.theme['gray-700']};
      padding: 0.75rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-400']};
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-500']};
      }
    }

    button[type='submit'] {
      height: 3rem;
      border: 0;
      border-radius: 6px;
      background: linear-gradient(180deg, #f2cb81 0%, #f7a407 100%);
      color: ${(props) => props.theme['gray-900']};
      font-weight: bold;
      padding: 0 1.25rem;
      margin-top: 1.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: linear-gradient(180deg, #f7a407 0%, #f2cb81 100%);
      }
    }
  }

  @media (max-width: 512px) {
    max-width: calc(100% - 2rem);
    padding: 1.5rem 2rem;
    top: 60%;

    form {
      margin-top: 1rem;
    }
  }
`
export const Title = styled(Dialog.Title)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border-radius: 50%;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};

  &:hover {
    color: ${(props) => props.theme['gray-900']};
  }
`

export const TransactionType = styled(Radio.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`
interface TypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(Radio.Item)<TypeButtonProps>`
  background: ${(props) => props.theme['gray-300']};
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme['gray-900']};
  color: ${(props) => props.theme['gray-900']};

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-500']
        : props.theme['red-700']};
  }

  &[data-state='unchecked']:hover {
    transition: background-color 0.5s;
    background: ${(props) => props.theme['yellow-300']};
  }

  &[data-state='checked'] {
    background: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-100']
        : props.theme['red-300']};
  }
`
export const SelectCategory = styled.select`
  margin-top: 1rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 0;
  background: ${(props) => props.theme['gray-300']};
  color: ${(props) => props.theme['gray-900']};
  padding: 1rem;
  cursor: pointer;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-500']};
  }
`
