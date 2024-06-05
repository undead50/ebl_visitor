import { Form, Select, Button, Card, Row, Col } from 'antd';

const { Option } = Select;
const Step4Form = ()=>{
    return <Card>
    <Form layout="vertical" >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Select Privileges"
            name="privileges"
            rules={[
              { required: true, message: 'Please select at least one privilege!' },
            ]}
          >
            <Select mode="multiple" placeholder="Select Privileges">
              <Option value="read">BM</Option>
              <Option value="write">RM</Option>
              <Option value="delete">HOD</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </Card>
 }
 export default Step4Form