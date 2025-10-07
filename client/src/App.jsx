import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './company/Dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/register' element={ <Register/> } />

      {/* Company routes */}
      <Route path='/company/dashboard' element={ <Dashboard/> } />
    </Routes>
  )
}

export default App
