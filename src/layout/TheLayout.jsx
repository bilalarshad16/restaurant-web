import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import CategoryManagement from '../components/CategoryManagement'
import DealsManagement from '../components/DealsManagement'
import Settings from '../components/Settings'
import Dashboard from '../components/Dashboard'
import ProductManagement from '../components/ProductManagement'
import LayoutForm from './LayoutForm'

const TheLayout = () => {
  return (
    <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category-management" element={<CategoryManagement />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/deals-coupans" element={<DealsManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes> 
  )
}

export default TheLayout