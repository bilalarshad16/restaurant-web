import React, { useEffect, useRef, useState } from "react";
import { deleteData, getData } from "../services/NetworkService";
import { Button, Drawer, Input, Space, Table, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
} from "@ant-design/icons";
import CategoryForm from "../forms/CategoryForm";
import { Modal, Radio } from "antd";

function CategoryManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fiilterClicked, setFilterClicked] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [add, setAdd] = useState(false);
  const [item, setItem] = useState(null);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const formRef = useRef();
  const { confirm } = Modal;
  const getCategories = async () => {
    const response = await getData("categories");
    if (response && response.data) {
      setData(
        response.data.map((category) => ({ ...category, key: category.id }))
      );
      console.log(response.data);

      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const showDrawer = () => {
    setAdd(true);
    setDrawerVisible(true);
  };

  const onClose = () => {
    if (formRef.current) {
      formRef.current.resetFields(); // Reset form fields when drawer closes
    }
    setDrawerVisible(false);
    if (add) {
      getCategories();
      setAdd(false);
    }
    if (edit) {
      setEdit(false);
    }
    setItem(null);
    setView(false);
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

      onOk() {
        deleteData("categories/" + id);
        let newData = data.filter((o) => o.id !== id);
        setData(newData);

        console.log("OK");
      },
      onCancel() {
        // setOpen(false)
        console.log("Cancelled");
      },
    });
  };
  const columns = [
    {
      title: "",
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
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products) =>
        products.map((product) => (
          <Tag color={product.isActive ? "yellow" : "red"} key={product.id}>
            {product.name}
          </Tag>
        )),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <EyeOutlined
              onClick={() => {
                setItem(record);
                setView(true);
                showDrawer();
              }}
            />
          </a>
          <a>
            <EditOutlined
              onClick={() => {
                setItem(record);
                setEdit(true);
                showDrawer();
              }}
            />
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
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="flex gap-4">
          <Button onClick={() => setFilterClicked(!fiilterClicked)}>
            Filters
          </Button>
          <Button onClick={showDrawer}>Add Categories</Button>
        </div>
      </div>
      {fiilterClicked && (
        <>
          <div className="h-44 rounded-lg w-full mt-8 px-2 bg-gray-100 ">
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                <h2 className="mt-8">PRODUCT NAME</h2>
                <Input placeholder="PRODUCT NAME" className="mt-3" />
              </div>
              <div className="w-1/2">
                <h2 className="mt-8">CATEGORY</h2>
                <Input placeholder="CATEGORY" className="mt-3" />
              </div>
            </div>
            <div className="mt-6">
              <Button type="primary" className="bg-black">
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
      <Table
        columns={columns}
        dataSource={data}
        className="mt-16"
        loading={loading}
      />

      <Drawer
        title="Add Categories of Products"
        onClose={onClose}
        open={drawerVisible}
        width={400}
        destroyOnClose={true}
      >
        <CategoryForm
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

export default CategoryManagement;
