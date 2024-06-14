import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space,Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createCardAsync,
    deleteCardAsync,
      fetchCardsAsync,
        updateCardAsync,
} from '../../store/slices/cardSlice';
// import { useNotification } from '../../hooks/index';

const CardTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);

  // const { callNotification } = useNotification();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const { cards, loading, error } = useSelector(
    (state) => state.card
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
    dispatch(deleteCardAsync(record.id));
    // callNotification('Card deleted Successfully', 'success');
  };

  useEffect(() => {
    dispatch(fetchCardsAsync());
    console.log(cards);
  }, []);

  const dataSource = cards;

  const onFinish = (values) => {
    console.log(values);
    values.created_by = userInfo.userName;
    if (editMode) {
      dispatch(updateCardAsync(values));
      // callNotification('Card Edited Successfully', 'success');
    } else {
      dispatch(createCardAsync(values));
      // callNotification('Card Created Successfully', 'success');
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
  title: 'card_no',
    dataIndex: 'card_no',
      key: 'card_no',
      },



{
  title: 'created_by',
    dataIndex: 'created_by',
      key: 'created_by',
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
      <Card>
      <Form form={form} onFinish={onFinish}>
        {/* Add form fields here based on your column fields */}
        
        {editMode && (
            <Form.Item name="id" hidden={true}>
              <Input />
            </Form.Item>
          )}
        
        <Form.Item 
          name="card_no" 
          label="Card Number"
          rules={[
            {
              required: true,
              message: 'Please enter your card number!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        {/* <Form.Item name="created_by" label="created_by">
          <Input />
        </Form.Item> */}
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </Modal>
  </div>
);
};

export default CardTable;