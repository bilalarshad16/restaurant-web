import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import { getData, postData, putData } from "../services/NetworkService";
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const CategoryForm = ({ add, onClose, item, view, edit }) => {
  console.log("data", item);

  const [form] = Form.useForm();
  const [productData, setProductData] = useState([]);
  const getProducts = async () => {
    const response = await getData("products");
    if (response && response.data) {
      setProductData(
        response.data
          .filter((o) => !o.category)
          .map((product) => ({
            ...product,
            key: product.id,
            label: product.name,
            value: product.id,
          }))
      );
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [componentVariant, setComponentVariant] = useState("outlined");
  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    if (typeof values.productIds[0] === "object") {
      let pIds = [];
      values.productIds.forEach((o) => pIds.push(o.id));
      values.productIds = pIds;
    }
    if (edit) {
      const response = await putData("categories/" + item.id, values);
      console.log("ksnd", response);

      if (response && response.data) {
        form.resetFields();
        onClose();
      }
    } else {
      const response = await postData("categories", values);
      if (response && response.data) {
        form.resetFields();
        onClose();
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      {...formItemLayout}
      onValuesChange={onFormVariantChange}
      variant={componentVariant}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        variant: componentVariant,
        name: item?.name,
        productIds: item?.products.map((product) => ({
          ...product,
          key: product.id,
          label: product.name,
          value: product.id,
        })),
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input the name!",
          },
        ]}
      >
        <Input placeholder="Category Name"></Input>
      </Form.Item>
      <Form.Item name="productIds">
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="Select Products"
          // defaultValue={[]}
          onChange={handleChange}
          options={productData}
          optionRender={(option) => (
            <Space>
              <span role="img" aria-label={option.data.id}>
                {option.data.id}
              </span>
              {option.data.name}
            </Space>
          )}
        />
      </Form.Item>
      {!view && (
        <Form.Item
          wrapperCol={{
            // offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
export default CategoryForm;
