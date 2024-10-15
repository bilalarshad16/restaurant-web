import React, { useState, useEffect } from 'react';
import {
  DashboardOutlined,
  ProductOutlined,
  PieChartOutlined,
  GiftOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Dashboard', '1', <DashboardOutlined />),
  getItem('Product Management', '2', <ProductOutlined />),
  getItem('Category Management', '3', <PieChartOutlined />),
  getItem('Deals & Coupans', '4', <GiftOutlined />),
  getItem('Settings', '5', <SettingOutlined />),
];

const breadcrumbNameMap = {
  '/dashboard': 'Dashboard',
  '/product-management': 'Product Management',
  '/category-management': 'Category Management',
  '/deals-coupans': 'Deals & Coupans',
  '/settings': 'Settings',
};

const LayoutForm = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Get navigate from React Router
  const location = useLocation(); // Get current route location

  const handleMenuClick = ({ key }) => {
    // Handle navigation based on the menu item clicked
    switch (key) {
      case '1':
        navigate('/dashboard');
        break;
      case '2':
        navigate('/product-management');
        break;
      case '3':
        navigate('/category-management');
        break;
      case '4':
        navigate('/deals-coupans');
        break;
      case '5':
        navigate('/settings');
        break;
      default:
        break;
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Dynamically update breadcrumbs based on the route
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      title: 'Home / '+ breadcrumbNameMap[url] || 'Home', // Use breadcrumb map for title
    };
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={220}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          className="mt-20"
          onClick={handleMenuClick} // Handle menu clicks
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Outlet to render child routes */}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutForm;
