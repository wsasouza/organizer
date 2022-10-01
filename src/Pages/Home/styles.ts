import styled from 'styled-components'

export const HomeContainer = styled.main`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin: 10rem auto 0 auto;
  max-width: 72rem;
  padding: 6rem 3rem;
  background: linear-gradient(180deg, #f1f1f1 0%, #f4e8d2 100%);
  border-radius: 6px;
  gap: 2rem;

  img {
    opacity: 0.8;
  }

  @media (max-width: 940px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 3rem;
    margin-bottom: 2rem;
  }
`

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  h1 {
    font-family: 'MuseoModerno', cursive;
    font-size: 3rem;
    color: ${(props) => props.theme['gray-800']};
    opacity: 0.8;
    letter-spacing: 2px;
    line-height: 1.3;

    &::before {
      content: '';
      display: inline-block;
      width: 1rem;
      height: 2rem;
      margin-right: 8px;
      border-radius: 4px;
      background: ${(props) => props.theme['yellow-500']};
    }

    &::after {
      content: '✍🏻';
      display: inline-block;
      font-size: 4rem;
      line-height: 0.5rem;
      margin-left: 2px;
    }
  }

  @media (max-width: 940px) {
    h1 {
      font-size: 2.6rem;
    }
  }
`
