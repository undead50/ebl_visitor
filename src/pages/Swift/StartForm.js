import React from 'react';
import { Form, Input, Button, Flex, Card } from 'antd';
import { useState } from 'react';

const StartForm = () => {
  const [messageStatus, setMessageStatus] = useState('');

  const onFinish = (values) => {
    // Handle form submission here
    console.log('Received values:', values);
    setMessageStatus('success');
  };

  const handleChange = (e) => {
    if (!e.target.value) {
      setMessageStatus('');
    }
  };

  return (
    <Card loading={false}>
      <Flex vertical={false}>
        <Form
          name="businessMessageForm"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            businessMessageIdentifier: '', // Set initial value if needed
          }}
        >
          <Form.Item
            label="MT"
            name="customerID"
            hasFeedback
            validateStatus={messageStatus}
            rules={[
              {
                required: true,
                message: 'Please enter the MT!',
              },
            ]}
          >
            <Input allowClear id={messageStatus} onChange={handleChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round">
              Check
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Card>
  );
};

export default StartForm;
