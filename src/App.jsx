import './App.css';
import { Login } from './Components/login'
import { Home } from './Components/Home'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import AddUser from './Components/AddUser'
import { Student } from './Components/student'
import { Faculty } from './Components/faculty'
import { Admin } from './Components/admin'
import { SuperAdmin } from './Components/superAdmin'
import { ProtectedRoute } from './Components/ProtectedRoute'
function App() {
  return (
    <>
      <Router>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/student" element={
            <ProtectedRoute allowedRole={["STUDENT"]}>
              <Student />
            </ProtectedRoute>
          } />
          <Route path="/faculty" element={
            <ProtectedRoute allowedRole={["FACULTY"]}>
              <Faculty />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRole={["ADMIN"]}>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/superAdmin" element={
            <ProtectedRoute allowedRole={["SUPERADMIN"]}>
              <SuperAdmin />
            </ProtectedRoute>
          } />
        </Routes>

      </Router>
    </>
  )
}
export default App
