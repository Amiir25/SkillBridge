import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import RoleRoute from './components/RoleRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/register' element={ <Register/> } />

      {/* Company dashboard */}
      <Route path='/company/dashboard' element={
        <RoleRoute role='Company'>
          <CompanyDashboard/>
        </RoleRoute>
      } />
    </Routes>
  )
}

export default App
