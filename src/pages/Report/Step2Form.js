import { Form, Input, Button, Card, Row, Col, Select } from 'antd';

const { Option } = Select;

const Step2Form = ()=>{
    return <>
    <Card>
      <Form layout="vertical" >
        
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              label="SQL"
              name="sql"
              rules={[{ required: true, message: 'Please input the SQL!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="DataSource"
              name="dataSource"
              rules={[
                {
                  required: true,
                  message: 'Please select the DataSource!',
                },
              ]}
            >
              <Select placeholder="Select a DataSource">
                <Option value="dataSource1">DataSource 1</Option>
                <Option value="dataSource2">DataSource 2</Option>
                {/* Add more options if needed */}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
      </Form>
    </Card>
  </>
 }
 export default Step2Form