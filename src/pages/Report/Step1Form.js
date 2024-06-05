import { Form, Input, Button, Card,Row,Col } from 'antd';


const Step1Form = ()=>{
    const onFinish = (values) => {
        console.log('Received values:', values);
        // You can perform actions with the form values here
      };
   return (<><Card><Form
    layout='vertical'
    onFinish={onFinish}
  >
    <Row gutter={16}>
                    <Col span={6}>
    <Form.Item
      label="Report Name"
      name="reportName"
      rules={[{ required: true, message: 'Please input the Report Name!' }]}
    >
      <Input />
    </Form.Item>
    </Col>
    </Row>
    <Row gutter={16}>
        
    <Col span={8}>
    <Form.Item
      label="Description"
      name="description"
      rules={[{ required: true, message: 'Please input the Description!' }]}
    >
      <Input.TextArea />
    </Form.Item>
    </Col>
    </Row>
  </Form></Card></>)
}
export default Step1Form