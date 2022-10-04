import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'

import { Router } from './Router'
import { BookmarksProvider } from './contexts/BookmarksContexts'
import { TransactionsProvider } from './contexts/TransactionsContexts'

import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <BookmarksProvider>
          <TransactionsProvider>
            <Router />
          </TransactionsProvider>
        </BookmarksProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}
