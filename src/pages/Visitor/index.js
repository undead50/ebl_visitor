import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space,Tabs,Card,Tag,Image  } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createVisitorAsync,
    deleteVisitorAsync,
      fetchVisitorsAsync,
        updateVisitorAsync,
} from '../../store/slices/visitorSlice';
import { encrypt, decrypt } from '../../hooks/crypto';
import { useNavigate } from 'react-router-dom';
import {EyeOutlined,EditOutlined,DeleteOutlined,ClockCircleOutlined,CheckOutlined,ExclamationCircleOutlined}  from '@ant-design/icons';
import { fetchDepartmentsAsync } from '../../store/slices/departmentSlice';
const { confirm } = Modal;
// import { useNotification } from '../../hooks/index';

const VisitorTable = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { departments } = useSelector((state) => state.department);
  const [isCheckOutModalVisible,setIsCheckOutModalVisible] = useState(false)

  useEffect(() => {
    dispatch(fetchDepartmentsAsync());
  },[]);

  const columns = [

    

    {
      title: 'id',
        dataIndex: 'id',
          key: 'id',
          },
    
    
    
    {
      title: 'name',
        dataIndex: 'name',
          key: 'name',
          },
    
          {
            title: 'Visit to department',
            key: 'department',
            render: (_, record) => {
              return departments.map((department) => {
                if (department.id == record.department) {
                  return department.name;
                }
              });
            },
          },
    {
      title: 'Host Contact Person',
        dataIndex: 'host_contact_person',
          key: 'host_contact_person',
          },
    
    
    
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
              if (text === 'C') {
                return <Tag color="blue">IN</Tag>;
              } else if (text === 'O') {
                return <Tag color="red">OUT</Tag>;
              } else {
                return null; // You can render something else for other statuses
              }
            },
          },
    
    
    
    {
      title: 'check_in_time',
        dataIndex: 'check_in_time',
          key: 'check_in_time',
          },
          {
            title: 'check_out_time',
            key: 'check_out_time',
            render: (_, record) => {
              if (record.check_out_time === null) {
                return <ClockCircleOutlined/> ;
              } else {
                return record.check_out_time;
              }
            },
          },
    
    
    {
      title: 'Action',
        key: 'action',
          render: (_, record) => (
            <Space>
              <Button onClick={() => handleEdit(record)}><EditOutlined /></Button>
              <Button onClick={() => handleDelete(record)}><DeleteOutlined /></Button>
              <Button onClick={() => handleView(record)}><EyeOutlined /></Button>
              { record.check_out_time === null ? <Button onClick={() => handleCheckOut(record)}><CheckOutlined /></Button>:null}
              
              
            </Space>
          ),
        },
      ];
    

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const { visitors, loading, error } = useSelector(
    (state) => state.visitor
  );
  
  
  const dataSource = visitors;
  
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Checked In Visitors',
      children: <Table dataSource={dataSource} columns={columns} />,
    },
    {
      key: '2',
      label: 'Checked Out Visitors',
      children: 'Content of Tab Pane 2',
    }
  ];

  const handleCheckOut = (record) => {
    const currentDate = new Date();
    const formattedDate = new Date(currentDate);
  
    Modal.confirm({
      title: 'Confirm Checkout',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to check out this visitor?',
      onOk() {
        // Update the checkout time of the visitor record
        const updatedRecord = { ...record, check_out_time: formattedDate,status:'O' };
        
        // Dispatch updateVisitorAsync action with updatedRecord
        dispatch(updateVisitorAsync(updatedRecord));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onFinishCheckOut = (record)=>{
    alert('checkout')
  }
  

  // Function to handle opening the modal for adding/editing a record
  const handleEdit = (record) => {
    // alert(record.id)

    const url = `/visitor-add/${record.id}`;
    // alert(url)
    navigate(url);
    // form.setFieldsValue(record);
    // setEditMode(true);
    // setIsModalVisible(true);
  };

  const handleView = (record)=>{
    console.log(record)
    form.setFieldsValue(record);
    setIsModalVisible(true)
  }

  const handleAdd = () => {
    setEditMode(false);
    form.setFieldsValue({});
    setIsModalVisible(true);
  };

  // Function to handle deleting a record
  const handleDelete = (record) => {
    dispatch(deleteVisitorAsync(record.id));
    // callNotification('Visitor deleted Successfully', 'success');
  };

  useEffect(() => {
    dispatch(fetchVisitorsAsync());
    console.log(visitors);
  }, []);


  const onFinish = (values) => {
    console.log(values);
    values.CreatedBy = userInfo.userName;
    if (editMode) {
      dispatch(updateVisitorAsync(values));
      // callNotification('Visitor Edited Successfully', 'success');
    } else {
      dispatch(createVisitorAsync(values));
      // callNotification('Visitor Created Successfully', 'success');
    }
    form.resetFields();
    setIsModalVisible(false);
  };


return (
  <div>
    {/* <Button
      type="primary"
      onClick={() => handleAdd()}
      style={{ marginBottom: '16px' }}
    >
      Add
    </Button> */}
    <Tabs defaultActiveKey="1" type="card" items={items} onChange={onChange} />
    

    {/* Modal for adding/editing a record */}
    {/* <Modal 
    title="Check Out Visitor"
    width={500}
    open={isCheckOutModalVisible}
    destroyOnClose={true}
    onCancel={() => {
      setIsCheckOutModalVisible(false);
      form.resetFields();
    }}
    >
      <Form
      name="checkout"
      onFinish={onFinishCheckOut}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <Form.Item
        label="Checkout Time"
        name="checkoutTime"
        rules={[{ required: true, message: 'Please select checkout time!' }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Check Out
        </Button>
      </Form.Item>
    </Form>


    </Modal> */}

<Modal
  title="Visitor Pass"
  width={600}
  visible={isModalVisible}
  onCancel={() => {
    setIsModalVisible(false);
    form.resetFields();
  }}
  footer={null}
>
  <Card>
  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
    <thead>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <th colSpan={2} style={{ textAlign: 'center' }}>Visitor Information</th>
      </tr>
    </thead>
    <tbody>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td colSpan={2} style={{ textAlign: 'center' }}>
          <br/>
          <Image
              width={150} // Adjust width as needed
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
              src={form.getFieldValue("photo")}
              alt="Passport Photo"
            />
            <br/>
            <br/>
            <br/>
        </td>
        
        <br/>
      <br/>
      </tr>
      
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td>Name:</td>
        <td>{form.getFieldValue("name")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td>Address:</td>
        <td>{form.getFieldValue("address")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td>Purpose of Visit:</td>
        <td>{form.getFieldValue("purpose_of_visit")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td>Check-in Time:</td>
        <td>{form.getFieldValue("check_in_time")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td>Host Contact Person:</td>
        <td>{form.getFieldValue("host_contact_person")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td>Department:</td>
        <td>
          {departments.find((department) => department.id === form.getFieldValue("department"))?.name}
        </td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td>Mobile No:</td>
        <td>{form.getFieldValue("mobile_no")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td>ID Card No:</td>
        <td>{form.getFieldValue("id_card_no")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td>Signature:</td>
        <td style={{ borderTop: '1px solid black' }}></td>
      </tr>
    </tbody>
  </table>
  </Card>
</Modal>

  </div>
);
};

export default VisitorTable;