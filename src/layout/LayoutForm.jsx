import React, { useState, useContext } from 'react';
import {
  DashboardOutlined,
  ProductOutlined,
  PieChartOutlined,
  GiftOutlined,
  SettingOutlined,
  PoweroffOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import TheLayout from './TheLayout';
import { UserContext } from '../contexts/UserProvider';
import { menuItems, routes } from '../routes';
import { MyBreadcrumb } from './TheBreadCrumb';

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
  getItem('Settings', '5', <SettingOutlined />,
  //    [
  //   {
  //     key: '5.1',
  //     label: 'Option 5',
  //   },
  // ]
  ),
];



const LayoutForm = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const {logout} = useContext(UserContext)

  const handleMenuClick = ({ key }) => {
    let selectedRoute = ''
    let selectedChild = ''

    if(key.includes('.')){
      selectedRoute = menuItems.find(route=>route.key == key.split('.')[0])
      selectedChild = selectedRoute.children.find(child=>child.key == key).route
    }
    else{
     selectedRoute = routes.find(r=>r.key ==key).route
    }
    switch (key) {
      case key:
        if(selectedChild !== ''){
          navigate(selectedChild)
        }
      else{
        navigate(selectedRoute)
        }
      default:
        break;
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const pathSnippets = location.pathname;


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={220}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['/dashboard']}
          mode="inline"
          items={menuItems
            .filter(r => r.key !== 1) // Assuming you want to skip the first item (Home)
            .map(r => ({
              key: r.key, 
              label: r.title, 
              icon: React.createElement(r.icon),
              route: r.route,
              children: r.children ? r.children.map(child => ({
                key: child.key,
                label: child.title,
                // icon: React.createElement(child.icon), // Child icon
                route: child.route,
              })) : undefined 
            }))}
          className="mt-20"
          onClick={handleMenuClick}
       />
      </Sider>
      <Layout>
        <Header style={{ margin:15,padding: 10, background: colorBgContainer ,display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius:5}} >
   
<MyBreadcrumb menuItems={menuItems} />
        <Button 
        variant='filled'
         icon={<PoweroffOutlined style={{cursor:'pointer'}}/>}
         style={{background: colorBgContainer}}
        onClick={()=>{logout()}}>
        </Button>
    
        </Header>
        <Content style={{ margin: '16px 16px' }}>
     
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <TheLayout/>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default LayoutForm;
