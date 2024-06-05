import React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Card,
  Divider,
  Skeleton,
} from 'antd';
import { Space, Typography } from 'antd';
import './index.css';
const { Text, Link } = Typography;

const { Option } = Select;

export default function CreateSwift() {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <Skeleton loading={false} active>
      <div className="custom-scrollbar">
        <Card style={{}}>
          <Form
            layout="vertical"
            labelCol={{ span: 16 }}
            wrapperCol={{ span: 12 }}
            name="basic"
            onFinish={onFinish}
            style={{}}
          >
            {/* <Text
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '18px',
              textDecoration: 'underline',
            }}
            mark
          >
            Message Details
          </Text> */}

            <Card title="PACS008 Details:">
              {/* <h3 style={{ textDecoration: 'underline' }}></h3> */}
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={<span>Business Message Identifier</span>}
                    name="businessMessageIdentifier"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Payment Identification"
                    name="paymentIdentification"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Value Date" name="valueDate">
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Currency" name="currency">
                    <Select style={{ width: '100%' }}>
                      <Option value="USD">USD</Option>
                      <Option value="EUR">EUR</Option>
                      {/* Add more currencies as needed */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Divider
              orientation="left"
              style={{
                borderWidth: '1px',
                borderColor: '#000',
                borderStyle: 'solid',
              }}
            />
            <Card title="Ordering Customer Details:">
              {/* Ordering Customer Details */}

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label={<span>Ordering Customer Account</span>}
                    name="orderingCustomerAccount"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Party Name" name="partyName">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Customer Street Name"
                    name="customerStreetName"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Customer Town" name="customerTown">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Customer County" name="customerCounty">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Divider
              style={{
                borderWidth: '1px',
                borderColor: '#000',
                borderStyle: 'solid',
              }}
            />
            {/* Party Details */}
            <Card title="Party Details:">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Intermediary Agent"
                    name="intermediaryAgent"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Intermediary Branch"
                    name="intermediaryBranch"
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Creditor Account" name="creditorAccount">
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Creditor Name" name="creditorName">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Creditor Street Name"
                    name="creditorStreetName"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Creditor Town" name="creditorTown">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Creditor Country" name="creditorCountry">
                    <Select style={{ width: '100%' }}>
                      <Option value="USA">USA</Option>
                      <Option value="UK">UK</Option>
                      {/* Add more countries as needed */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item label="">
                    <Button type='primary' shape='round' >Validate</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Divider
              style={{
                borderWidth: '1px',
                borderColor: '#000',
                borderStyle: 'solid',
              }}
            />
            {/* Other Details */}
            <Card title="Other Details:">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Remittance Information"
                    name="remittanceInformation"
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Sender Information"
                    name="senderInformation"
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Charge Bearer" name="chargeBearer">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Transmit Date" name="transmitDate">
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Transmit By" name="transmitBy">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            {/* Submit Button */}
            <br />
            {/* <Form.Item wrapperCol={{ offset: 0, span: 10 }}>
            <Button type="primary" htmlType="submit" shape="round">
              Submit
            </Button>
          </Form.Item> */}
          </Form>
        </Card>
      </div>
    </Skeleton>
  );
}
