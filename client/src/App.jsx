import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import RoleRoute from './components/RoleRoute';
import CompanyDashboard from './pages/Dashboard/CompanyDashboard';
import StudentDashboard from './pages/Dashboard/StudentDashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/register' element={ <Register/> } />

      {/* Company dashboard */}
      <Route path='/company/dashboard' element={
        <RoleRoute role='Company'>
          <CompanyDashboard />
        </RoleRoute>
      }/>
      
      {/* Student dashboard */}
      <Route path='/student/dashboard' element={
        <RoleRoute role='Student'>
          <StudentDashboard />
        </RoleRoute>
      }/>
    </Routes>
  )
}

export default App
