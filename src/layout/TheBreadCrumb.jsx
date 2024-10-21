import { Breadcrumb } from 'antd';
import { HomeFilled, HomeOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import React from 'react';

// Generate breadcrumb items array
const generateBreadcrumbItems = (menuItems, pathSnippets) => {
    let breadcrumbItems = [];
    let currentPath = ''; // This will keep track of the reconstructed path
    if(currentPath !== '/dashboard'){
        breadcrumbItems.push({
        //   key: item.key,
          title: (
            <>
              <HomeOutlined/>
            </>
          ),
          href: '/dashboard',
        });
      }
    // Traverse through the menuItems to find the matching paths
    menuItems.forEach(item => {
      currentPath = `/${item.route}`; // Rebuild the current path for parent
     
      if (pathSnippets[0] === item.route) { // Check if first part of the path matches the parent
        breadcrumbItems.push({
          key: item.key,
          title: (
            <>
              {/* {item.icon && <span>{React.createElement(item.icon)}</span>} */}
              <span>{item.title}</span>
            </>
          ),
          href: currentPath,
        });
  
        // Check if there are child routes
        if (item.children) {
          // Continue matching the child routes with pathSnippets
          item.children.forEach(child => {
            const childPath = `${item.route}/${child.route.split('/').pop()}`; // Rebuild the child path
            
            if (pathSnippets.includes(child.route.split('/').pop())) {
              breadcrumbItems.push({
                key: child.key,
                title: (
                  <>
                    {/* {child.icon && <span>{React.createElement(child.icon)}</span>} */}
                    <span>{child.title}</span>
                  </>
                ),
                href: `/${childPath}`,
              });
            }
          });
        }
      }
    });
  
    return breadcrumbItems;
  };
  

export const MyBreadcrumb = ({ menuItems }) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const breadcrumbItems = generateBreadcrumbItems(menuItems, pathSnippets);

  return (
    <Breadcrumb
      separator={<RightCircleOutlined />}
      items={breadcrumbItems.map(item => ({
        key: item.key,
        title: item.title,
        href: item.href,
      }))}
    />
  );
};


