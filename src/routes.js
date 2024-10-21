import React, { Children } from 'react';
import {
  DashboardOutlined,
  ProductOutlined,
  PieChartOutlined,
  GiftOutlined,
  SettingOutlined,
} from '@ant-design/icons';


// Lazy load components
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const ProductManagement = React.lazy(() => import('./components/ProductManagement'));
const DealsManagement = React.lazy(() => import('./components/DealsManagement'));
const CategoryManagement = React.lazy(() => import('./components/CategoryManagement'));
const Settings = React.lazy(() => import('./components/Settings'));
const AddCat = React.lazy(() => import('./components/AddCat'));

export const routes = [
  { key: 1, route: '/', title: 'Home', href: '/dashboard', component: Dashboard},
  { key: 2, route: 'dashboard', title: 'Dashboard', component: Dashboard },
  { key: 3, route: 'products', title: 'Products', component: ProductManagement},
  { key: 4, route: 'deals-coupans', title: 'Deals', component: DealsManagement },
  { key: 5, route: 'categories', title: 'Categories', component: CategoryManagement },
  { key: 5, route: 'categories/add', title: 'Add Categories', component: AddCat},
  { key: 6, route: 'settings', title: 'Settings', component: Settings },
];

export const menuItems = [
    { key: 1, route: '/', title: 'Home', href: '/dashboard', icon: DashboardOutlined },
    { key: 2, route: 'dashboard', title: 'Dashboard' , icon: DashboardOutlined},
    { key: 3, route: 'products', title: 'Products', icon: ProductOutlined },
    { key: 4, route: 'deals-coupans', title: 'Deals' , icon: GiftOutlined},
    { key: 5, route: 'categories', title: 'Categories' , icon: PieChartOutlined,children:[
        { key: 5.1, route: 'categories/add', title: 'Add Categories' , icon: PieChartOutlined}
    ]},
    { key: 6, route: 'settings', title: 'Settings' , icon: SettingOutlined },
  ];