import React, { Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import CategoryManagement from '../components/CategoryManagement'
import DealsManagement from '../components/DealsManagement'
import Settings from '../components/Settings'
import Dashboard from '../components/Dashboard'
import ProductManagement from '../components/ProductManagement'
import LayoutForm from './LayoutForm'
import { routes } from '../routes'

const TheLayout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routes.map(({ key, route, component: Component, children }) => (
        <Route key={key} path={route} element={<Component />}>
          {/* Check if the route has children and map over them */}
          {/* {children && children.map(({ key: childKey, route: childRoute, component: ChildComponent }) => (
            <Route key={childKey} path={childRoute} element={<ChildComponent />} />
          ))} */}
        </Route>
      ))}
  
      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </Suspense>
  
  )
}

export default TheLayout