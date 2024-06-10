import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store';
import { postLoginData } from '../../store/slices/authSlice';
import { useNotification } from '../../hooks/index';

import './index.css';

const Login = () => {
  const dispatch = useDispatch();
  // alert('login')
  const { data, loading, error } = useSelector((state) => state.auth);
  const { Title } = Typography;
  const navigate = useNavigate();

  const { callNotification } = useNotification();


  useEffect(() => {
    if (data) {
      if (data.Code === '0') {
        console.log(data)
        dispatch(
          setUser({
            userName: data.Data.domainName,
            solId: data.Data.branch,
            email: data.Data.email,
            departmentName: data.Data.departmentName,
            token: data.Data.token,
            employeeName: data.Data.name,
            isSuperAdmin: data.Data.systemRole === "ROLE_ADMIN" ? true : false,
            
          })
        );
        navigate('/');
        callNotification('Login Success', 'success');
      } else {
        callNotification('Login Denied', 'error');
      }
    }
  }, [data]);

  const onFinish = (values) => {
    // Call the postData function from the custom hook
    const reqData = {
      username: values.username,
      password: values.password,
    };
    dispatch(postLoginData(reqData));
    // alert(data)
    // console.log(data);
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
            src={process.env.PUBLIC_URL + '/images/everest_bank_logo_main.png'}
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
          Visitor Tracking System
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
