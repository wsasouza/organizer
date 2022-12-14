import styled, { css } from 'styled-components'

interface SummaryCardProps {
  variant?: 'yellow' | 'green' | 'red'
}

export const SummaryCardContainer = styled.div<SummaryCardProps>`
  font-family: 'MuseoModerno', cursive;
  width: 100%;
  min-width: 19rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(90deg, #f4e8d2 0%, #f7a407 100%);
  padding: 2rem 1rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.25rem;
  }

  & > strong {
    font-size: 1.75rem;
  }

  span {
    color: ${(props) => props.theme['gray-700']};
    font-size: 0.75rem;
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: linear-gradient(90deg, #f4e8d2 0%, #07a31c 100%);
    `};

  ${(props) =>
    props.variant === 'red' &&
    css`
      background: linear-gradient(90deg, #f4e8d2 0%, #f75a68 100%);
    `};
`
