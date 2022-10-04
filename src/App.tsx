import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'

import { Router } from './Router'
import { BookmarksProvider } from './contexts/BookmarksContexts'
import { TransactionsProvider } from './contexts/TransactionsContexts'

import { defaultTheme } from './styles/themes/default'
import { TasksProvider } from './contexts/TasksContexts'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <BookmarksProvider>
          <TransactionsProvider>
            <TasksProvider>
              <Router />
            </TasksProvider>
          </TransactionsProvider>
        </BookmarksProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}
