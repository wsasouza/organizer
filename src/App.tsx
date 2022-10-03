import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'

import { Router } from './Router'

import { defaultTheme } from './styles/themes/default'
import { BookmarksProvider } from './contexts/BookmarksContexts'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <BookmarksProvider>
          <Router />
        </BookmarksProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}
