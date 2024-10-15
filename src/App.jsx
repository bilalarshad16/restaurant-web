import { useState } from 'react'
import './index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LayoutForm from './layout/LayoutForm';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import Login from './components/login/Login';
import CategoryManagement from './components/CategoryManagement';
import DealsManagement from './components/DealsManagement';
import Settings from './components/Settings';
import LoginForm from './components/login/Login';

function App() {
  return (
    <>
      <Router>
       
      {/* <LayoutForm /> */}
          <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/category-management" element={<CategoryManagement />} />
          <Route path="/deals-coupans" element={<DealsManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<LoginForm />} />
      
          </Routes> 
      </Router>
    </>
  )
}

export default App
