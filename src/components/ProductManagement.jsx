import React, { useEffect, useRef, useState } from "react";
import { deleteData, getData } from "../services/NetworkService";
import { Button, Input, Space, Table, Tag, Drawer, Spin, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import ProductForm from "../forms/ProductForm";

function ProductManagement() {
  const [filterClicked, setFilterClicked] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false); // State for Drawer visibility
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState(null);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [filterName, setFilterName] = useState(""); // State for Name filter
  const [filterCategory, setFilterCategory] = useState(""); // State for Category filter
  const formRef = useRef();
  const { confirm } = Modal;

  const getProducts = async () => {
    const response = await getData("products");
    if (response && response.data) {
      const productData = response.data.map((product) => ({
        ...product,
        key: product.id,
      }));
      setData(productData);
      setFilteredData(productData); // Initialize filtered data with the full data
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleDelete = async (id) => {
    confirm({
      title: "Are you sure you want to delete?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      maskClosable: true,
      keyboard: true,
      onOk: async () => {
        await deleteData("products/" + id);
        let newData = await getData("products");
        if (newData && newData.data) {
          const updatedData = newData.data.map((product) => ({
            ...product,
            key: product.id,
          }));
          setData(updatedData);
          setFilteredData(updatedData); // Update both main and filtered data
        }
        console.log("OK", newData);
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  const handleFilterSubmit = () => {
    const filtered = data.filter((product) => {
      const matchesName =
        filterName.trim() === "" ||
        product.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesCategory =
        filterCategory.trim() === "" ||
        (product.category &&
          product.category.name
            .toLowerCase()
            .includes(filterCategory.toLowerCase()));
      return matchesName && matchesCategory;
    });
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (text) => (
        <img
          src={
            text ||
            "https://www.thespruceeats.com/thmb/xNnc7LZcZ-sDeK_3Ox7RI0BXOE0=/5616x3744/filters:fill(auto,1)/GettyImages-676294571-7d58c21598a54c1b813fa12334fee6ad.jpg"
          }
          alt="Product Image"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color={category ? "yellow" : "red"}>
          {category ? category.name.toUpperCase() : "N/A"}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "blue" : "red"}>
          {isActive ? "ACTIVE" : "IN-ACTIVE"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <EyeOutlined />
          </a>
          <a>
            <EditOutlined />
          </a>
          <a style={{ color: "red" }}>
            <DeleteOutlined onClick={() => handleDelete(record.id)} />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex gap-4">
          <Button onClick={() => setFilterClicked(!filterClicked)}>
            Filters
          </Button>
          <Button onClick={showDrawer}>Add Products</Button>
        </div>
      </div>
      {filterClicked && (
        <>
          <div className="h-44 rounded-lg w-full mt-8 px-2 bg-gray-100 ">
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                <h2 className="mt-8">PRODUCT NAME</h2>
                <Input
                  placeholder="PRODUCT NAME"
                  className="mt-3"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <h2 className="mt-8">CATEGORY</h2>
                <Input
                  placeholder="CATEGORY"
                  className="mt-3"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button
                type="primary"
                className="bg-black"
                onClick={handleFilterSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
      <Table
        columns={columns}
        dataSource={filteredData}
        className="mt-16"
        loading={loading}
      />
      <Drawer
        title="Add Product"
        onClose={onClose}
        open={drawerVisible}
        width={450}
        destroyOnClose={true}
      >
        <ProductForm
          add={add}
          onClose={onClose}
          ref={formRef}
          item={item}
          view={view}
          edit={edit}
        />
      </Drawer>
    </>
  );
}

export default ProductManagement;
