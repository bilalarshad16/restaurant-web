import { useContext } from 'react'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LayoutForm from './layout/LayoutForm';
import LoginForm from './components/login/Login';
import { UserContext } from './contexts/UserProvider';

function App() {
  const { user } = useContext(UserContext)
  
  return (
    <>
      <Router>
          <Routes>
            {user.auth?
            <Route path="*" element={<LayoutForm />} />
          :
          <>
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/login" replace />} /> 
          </>
          }
          </Routes> 
      </Router>
    </>
  )
}

export default App
