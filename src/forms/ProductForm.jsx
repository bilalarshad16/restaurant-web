import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
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
const ProductForm = ({ add, onClose, item, view, edit }) => {
  console.log("data", item);
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [productData, setProductData] = useState([]);
  const [componentVariant, setComponentVariant] = useState("outlined");

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

  const onFormVariantChange = ({ variant }) => {
    setComponentVariant(variant);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    values.price = parseFloat(values.price);
    values.categoryId = parseFloat(values.categoryId);
    // if (typeof values.productIds[0] === "object") {
    //   let pIds = [];
    //   values.productIds.forEach((o) => pIds.push(o.id));
    //   values.productIds = pIds;
    // }
    if (edit) {
      const response = await putData("products/" + item.id, values);
      console.log("dnai", response);

      if (response && response.data) {
        form.resetFields();
        onClose();
      }
    } else {
      const response = await postData("products", values);
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
        minWidth: 400,
        overflowX: "hidden",
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
        <Input placeholder="Product Name"></Input>
      </Form.Item>
      {/* <Form.Item
        name="categoryame"
        rules={[
          {
            required: true,
            message: "Please input the name!",
          },
        ]}
      >
        <Input placeholder="Category Name"></Input>
      </Form.Item> */}
      <Form.Item
        name="description"
        rules={[
          {
            required: true,
            message: "Please input the description!",
          },
        ]}
      >
        <TextArea
          placeholder="Description"
          autoSize={{
            minRows: 2,
            maxRows: 6,
          }}
        />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[
          {
            required: true,
            message: "Please input the price!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: 200,
          }}
          defaultValue="0"
          min="0"
          max="10"
          step="0.00"
          // onChange={onChange}
          stringMode
        />
      </Form.Item>
      {/* <Form.Item name="productIds">
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
      </Form.Item> */}
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
export default ProductForm;
