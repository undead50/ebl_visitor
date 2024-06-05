import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import './index.css';

const Login = () => {
  // alert('login')
  const { Title } = Typography;
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Call the postData function from the custom hook
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #FFFFFF, #FFFFFF)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card className="custom-card">
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + '/images/swift-logo-new.svg'}
            alt="Logo"
          />
        </div>

        <Title
          level={4}
          code
          style={{
            textAlign: 'center',
            marginBottom: '15px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          Everest Swift
        </Title>

        <Form name="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter your username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
            {/* <Tooltip placement="topLeft" title="Click to Start Assessment':'Click to View Assessment"></Tooltip> */}
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                style={{
                  width: '30%',
                  boxShadow: '6px 2px 9px rgba(0, 0, 0, 0.2)',
                }}
              >
                Log In
              </Button>
            </div>
          </Form.Item>
          {/* {loading && <Spinner />} */}
          {/* <Outlet/> */}
        </Form>
      </Card>
    </div>
  );
};

export default Login;
