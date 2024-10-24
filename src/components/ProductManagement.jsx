import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getData } from '../services/NetworkService'
import axios from 'axios'
import { Button, Input, Space, Table, Tag, Drawer } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

function ProductManagement() {
getData('products')
  const [fiilterClicked, setFilterClicked] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false); // State for Drawer visibility

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const columns = [
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (text) => <img src={text} alt="Product Image" width={50} height={50} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a><EditOutlined /></a> {/* Edit icon */}
          <a><DeleteOutlined /></a> {/* Delete icon */}
          <a><EyeOutlined /></a> {/* View icon */}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Product 1',
      category: 'Category 1',
      images: 'https://picsum.photos/200/300',
    },
    {
      key: '2',
      name: 'Product 2',
      category: 'Category 2',
      images: 'https://picsum.photos/200/301',
    },
    {
      key: '3',
      name: 'Product 3',
      category: 'Category 3',
      images: 'https://picsum.photos/200/302',
    },
  ];

  return (
    <>
    <div className='flex flex-row justify-between'>
      <h1 className='text-2xl font-semibold'>Products</h1>
      <div className='flex gap-4'>
        <Button onClick={() => setFilterClicked(!fiilterClicked)}>Filters</Button>
        <Button onClick={showDrawer}>Add Products</Button>
      </div>

    </div>
    {fiilterClicked && (
      <>
        <div className='h-44 rounded-lg w-full mt-8 px-2 bg-gray-100 '>
          <div className='flex flex-row gap-4'>
          <div className='w-1/2'>
            <h2 className='mt-8'>PRODUCT NAME</h2>
            <Input placeholder='PRODUCT NAME' className='mt-3'/>
          </div>
          <div className='w-1/2'>
          <h2 className='mt-8'>CATEGORY</h2>
          <Input placeholder='CATEGORY' className='mt-3'/>
          </div>
          </div>
        <div className='mt-6'>
          <Button type='primary'>Submit</Button>
        </div>
        </div>
        </>
    )}
    <Table columns={columns} dataSource={data} className='mt-16'/>
    <Drawer title="Add Product" onClose={onClose} open={drawerVisible}>
        <p className='mt-3'>Product Name: <Input placeholder="Enter product name" /></p>
        <p className='mt-3'>Category: <Input placeholder="Enter category" /></p>
        <p className='mt-3'>Image URL: <Input placeholder="Enter image URL" /></p>
        <div style={{ marginTop: 20 }}>
          <Button type="primary" onClick={onClose}>Submit</Button>
        </div>
      </Drawer>
    </>
  )
}

export default ProductManagement
