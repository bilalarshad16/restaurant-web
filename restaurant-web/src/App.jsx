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

function App() {
  return (
    <>
      <Router>
        <LayoutForm />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product-management" element={<ProductManagement />} />
          </Routes> 
      </Router>
    </>
  )
}

export default App
