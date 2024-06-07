import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space,Tabs  } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createVisitorAsync,
    deleteVisitorAsync,
      fetchVisitorsAsync,
        updateVisitorAsync,
} from '../../store/slices/visitorSlice';
import { encrypt, decrypt } from '../../hooks/crypto';
import { useNavigate } from 'react-router-dom';
// import { useNotification } from '../../hooks/index';

const VisitorTable = () => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);

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
      title: 'address',
        dataIndex: 'address',
          key: 'address',
          },
    
    
    
    {
      title: 'status',
        dataIndex: 'status',
          key: 'status',
          },
    
    
    
    {
      title: 'check_in_time',
        dataIndex: 'check_in_time',
          key: 'check_in_time',
          },
    
    
    
    {
      title: 'Action',
        key: 'action',
          render: (_, record) => (
            <Space>
              <Button onClick={() => handleEdit(record)}>Update</Button>
              <Button onClick={() => handleDelete(record)}>Delete</Button>
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
    <Modal
      title={editMode ? 'Edit Record' : 'Add Record'}
      open={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
        form.resetFields();
      }}
      footer={null}
    >
      <Form form={form} onFinish={onFinish}>
        {/* Add form fields here based on your column fields */}
        
        <Form.Item name="id" label="id">
          <Input />
        </Form.Item>
        
        <Form.Item name="name" label="name">
          <Input />
        </Form.Item>
        
        <Form.Item name="address" label="address">
          <Input />
        </Form.Item>
        
        <Form.Item name="status" label="status">
          <Input />
        </Form.Item>
        
        <Form.Item name="check_in_time" label="check_in_time">
          <Input />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
);
};

export default VisitorTable;