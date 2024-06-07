import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createDepartmentAsync,
    deleteDepartmentAsync,
      fetchDepartmentsAsync,
        updateDepartmentAsync,
} from '../../store/slices/departmentSlice';
// import { useNotification } from '../../hooks/index';

const DepartmentTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);

  // const { callNotification } = useNotification();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const { departments, loading, error } = useSelector(
    (state) => state.department
  );

  // Function to handle opening the modal for adding/editing a record
  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditMode(true);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditMode(false);
    form.setFieldsValue({});
    setIsModalVisible(true);
  };

  // Function to handle deleting a record
  const handleDelete = (record) => {
    dispatch(deleteDepartmentAsync(record.id));
    // callNotification('Department deleted Successfully', 'success');
  };

  useEffect(() => {
    dispatch(fetchDepartmentsAsync());
    console.log(departments);
  }, []);

  const dataSource = departments;

  const onFinish = (values) => {
    console.log(values);
    values.created_by = userInfo.userName;
    if (editMode) {
      dispatch(updateDepartmentAsync(values));
      // callNotification('Department Edited Successfully', 'success');
    } else {
      dispatch(createDepartmentAsync(values));
      // callNotification('Department Created Successfully', 'success');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

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
  title: 'created_by',
    dataIndex: 'created_by',
      key: 'created_by',
      },



{
  title: 'created_at',
    dataIndex: 'created_at',
      key: 'created_at',
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

return (
  <div>
    <Button
      type="primary"
      onClick={() => handleAdd()}
      style={{ marginBottom: '16px' }}
    >
      Add
    </Button>
    <Table dataSource={dataSource} columns={columns} />

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
        
        <Form.Item name="id" label="id" hidden>
          <Input />
        </Form.Item>
        
        <Form.Item name="name" label="name">
          <Input />
        </Form.Item>
        
        {/* <Form.Item name="created_by" label="created_by">
          <Input />
        </Form.Item> */}
        
        {/* <Form.Item name="created_at" label="created_at">
          <Input />
        </Form.Item> */}
        
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

export default DepartmentTable;