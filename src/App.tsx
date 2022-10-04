import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { ToastContainer } from 'react-toastify'

import { Router } from './Router'
import { BookmarksProvider } from './contexts/BookmarksContexts'
import { TransactionsProvider } from './contexts/TransactionsContexts'
import { TasksProvider } from './contexts/TasksContexts'

import { defaultTheme } from './styles/themes/default'

import 'react-toastify/dist/ReactToastify.min.css'

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
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </BrowserRouter>
  )
}
