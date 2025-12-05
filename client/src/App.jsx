import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import RoleRoute from './components/RoleRoute';
import CompanyDashboard from './pages/Dashboard/CompanyDashboard';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import CreateProject from './pages/Project/CreateProject';
import Projects from './pages/Project/Projects';
import StudentProfileSetup from './pages/Profile/StudentProfileSetup';
import CompanyProfileSetup from './pages/Profile/CompanyProfileSetup';
import ManageProjects from './pages/Project/ManageProjects';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home/> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/register' element={ <Register/> } />

      {/* Project routes */}
      <Route path='/projects' element={ <Projects/> } />
      <Route path='/create-project' element={ <CreateProject/> } />
      <Route path='/company/manage-projects' element={ <ManageProjects/> } />

      {/* Company */}
      <Route path='/company/profile-setup' element={ <CompanyProfileSetup/> } />
      <Route path='/company/dashboard' element={
        <RoleRoute role='Company'>
          <CompanyDashboard />
        </RoleRoute>
      }/>
      
      {/* Student */}
      <Route path='/student/profile-setup' element={ <StudentProfileSetup/> } />
      <Route path='/student/dashboard' element={
        <RoleRoute role='Student'>
          <StudentDashboard />
        </RoleRoute>
      }/>
    </Routes>
  )
}

export default App
