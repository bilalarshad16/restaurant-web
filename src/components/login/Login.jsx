import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox, Card, Avatar } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import './LoginForm.css'; // CSS file for custom styling
import { postData } from '../../services/NetworkService';
import { UserContext } from '../../contexts/UserProvider';
const LoginForm = () => {
  const {login} = useContext(UserContext)
  const onFinish =async (values) => {
   const response = await postData('auth/login', values)
   if(response){
    login(response.data.data)
   }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        {/* <div className="login-icon">
          <UserOutlined style={{ fontSize: '50px', color: '#a64ac9' }} />
        </div> */}
         <Avatar className='login-icon' style={{ backgroundColor:'#8D448B', color: '#fff' }} size={64} icon={<UserOutlined />} />
        <h2 className="login-title">Admin Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember Me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot Password
            </a>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {<LoginOutlined/>}Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
