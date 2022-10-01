import styled from 'styled-components'

export const BookmarksContainer = styled.main`
  margin: 17rem auto 0 auto;
  width: 100%;
  max-width: 72rem;
  padding: 0 1rem 2rem 1rem;
  // height: 200vh;
  border-radius: 6px;
  background: linear-gradient(180deg, #f1f1f1 0%, #f4e8d2 100%);
`
export const BookmarksHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: -7rem auto 1rem auto;
  overflow-x: auto;
`

export const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

export const AddNewItemButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: none;
  background: linear-gradient(180deg, #f2cb81 0%, #f7a407 100%);
  margin-bottom: 0.5rem;
  cursor: pointer;

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
`

export const SummaryCardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
`
