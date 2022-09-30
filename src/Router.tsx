import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Bookmarks } from './Pages/Bookmarks'
import { Home } from './Pages/Home'
import { Money } from './Pages/Money'
import { Tasks } from './Pages/Tasks'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/money" element={<Money />} />
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  )
}
