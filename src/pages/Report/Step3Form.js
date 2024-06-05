import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Card,Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const Step3Form = ()=>{
    const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [headerList, setHeaderList] = useState([]);

  const addHeader = () => {
    setHeaderList([...headerList, {}]);
  };

  const removeHeader = (index) => {
    const newHeaderList = [...headerList];
    newHeaderList.splice(index, 1);
    setHeaderList(newHeaderList);
  };

  const addField = () => {
    setFields([...fields, {}]);
  };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    // You can perform actions with the form values here
  };
    return <>
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {fields.map((field, index) => (
          <Row gutter={16} key={index}>
            <Col span={6}>
              <Form.Item
                label={`Report Param ${index + 1}`}
                name={['params', index, 'param']}
                rules={[
                  { required: true, message: 'Please input the Report Param!' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={`Report Datatype ${index + 1}`}
                name={['params', index, 'datatype']}
                rules={[
                  { required: true, message: 'Please select the Datatype!' },
                ]}
              >
                <Select placeholder="Select a Datatype">
                  <Option value="string">String</Option>
                  <Option value="int">Integer</Option>
                  <Option value="date">Date</Option>
                  <Option value="datetime">Datetime</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Button type="danger" onClick={() => removeField(index)}>
              <DeleteOutlined />
              </Button>
            </Col>
          </Row>
        ))}
        <Row gutter={16}>
          <Col span={6}>
            <Button type="dashed" onClick={addField} style={{ width: '100%' }}>
              + Field Param
            </Button>
          </Col>
        </Row>
        <br/>
        <Divider type="horizontal" />
        {headerList.map((header, index) => (
            <Row gutter={16} key={index}>
              <Col span={6}>
                <Form.Item
                  label={`Column Header ${index + 1}`}
                  name={['headerList', index, 'displayName']}
                  rules={[
                    { required: true, message: 'Please input the Display Name!' },
                  ]}
                >
                  <Input placeholder="Display Name" />
                </Form.Item>
              </Col>
              
              <Col span={6}>
                <Button type="danger" onClick={() => removeHeader(index)}>
                <DeleteOutlined />
                </Button>
              </Col>
            </Row>
          ))}
          <br/>
          <Row gutter={16}>
            <Col span={6}>
              <Button type="dashed" onClick={addHeader} style={{ width: '100%' }}>
                + Column
              </Button>
            </Col>
          </Row>
      </Form>
      
    </Card>
  </>
 }
 export default Step3Form