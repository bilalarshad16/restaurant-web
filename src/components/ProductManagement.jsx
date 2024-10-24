import React, { useEffect, useState } from 'react'
import { getData } from '../services/NetworkService'
import { Button, Input, Space, Table, Tag, Drawer, Spin } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

function ProductManagement() {
  const [fiilterClicked, setFilterClicked] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false); // State for Drawer visibility
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  const getProducts = async () => {
    const response = await getData('products');
    if (response && response.data){
      setData(response.data.filter(product => product.isActive)
                            .map(product => ({...product, key: product.id}))
      );
    }
    setLoading(false)
  }
  
  useEffect(() => {
    getProducts()
  }, [])

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
      render: (text) => <img src={text || "https://www.thespruceeats.com/thmb/xNnc7LZcZ-sDeK_3Ox7RI0BXOE0=/5616x3744/filters:fill(auto,1)/GettyImages-676294571-7d58c21598a54c1b813fa12334fee6ad.jpg"} alt="Product Image" width={50} height={50} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => <Tag color={category ? 'yellow' : 'red'} >{category ? category.name.toUpperCase() : "N/A"}</Tag>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a><EyeOutlined /></a>
          <a><EditOutlined /></a>
          <a style={{color: 'red'}}><DeleteOutlined /></a>
        </Space>
      ),
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
    <Table columns={columns} dataSource={data} className='mt-16' loading={loading}/>
    
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
