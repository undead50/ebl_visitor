import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input,Tag, DatePicker, Space,Card,Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import {
  createEmployeeAsync,
    deleteEmployeeAsync,
      fetchEmployeesAsync,
        updateEmployeeAsync,
} from '../../store/slices/employeeSlice';
import './index.css'
// import { useNotification } from '../../hooks/index';

const { Option } = Select;

const EmployeeTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [searchTextRole, setSearchTextRole] = useState('');



  // const { callNotification } = useNotification();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const { employees, employee_loading, error } = useSelector(
    (state) => state.employee
  );
  const uniqueRoles = [...new Set(employees.map((employee) => employee.role))];


  const [searchTextEmail, setSearchTextEmail] = useState('');

  const uniqueEmails = [...new Set(employees.map((employee) => employee.email))];
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
    dispatch(deleteEmployeeAsync(record.id));
    // callNotification('Employee deleted Successfully', 'success');
  };

  useEffect(() => {
    dispatch(fetchEmployeesAsync());
    console.log(employees);
  }, []);

  const dataSource = employees;

  const onFinish = (values) => {
    console.log(values);
    values.CreatedBy = userInfo.userName;
    if (editMode) {
      dispatch(updateEmployeeAsync(values));
      // callNotification('Employee Edited Successfully', 'success');
    } else {
      dispatch(createEmployeeAsync(values));
      // callNotification('Employee Created Successfully', 'success');
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
        filterSearch: true,
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        render: (_, record) => (
          <span>
            {record.name}
          </span>
        ),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search name"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => {
                  confirm();
                  setSearchText(selectedKeys[0]);
                }}
              >
                Search
              </button>
              <button type="button" onClick={() => clearFilters()}>
                Reset
              </button>
            </div>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
      },

{
  title: 'domainName',
    dataIndex: 'domainName',
      key: 'domainName',
      },



      {
        title: 'role',
        dataIndex: 'role',
        key: 'role',
        filterSearch: true,
        onFilter: (value, record) => record.role.toLowerCase().includes(value.toLowerCase()),
        render: (_, record) => (
          <span>
            {record.role}
          </span>
        ),
        filters: uniqueRoles.map(role => ({
          text: role,
          value: role
        })),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search role"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => {
                  confirm();
                  setSearchTextRole(selectedKeys[0]);
                }}
              >
                Search
              </button>
              <button type="button" onClick={() => clearFilters()}>
                Reset
              </button>
            </div>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
      },
      



{
  title: 'departmentName',
    dataIndex: 'departmentName',
      key: 'departmentName',
      },

      {
        title: 'cbsUsername',
          dataIndex: 'cbsUsername',
            key: 'cbsUsername',
            },



{
  title: 'branch',
    dataIndex: 'branch',
      key: 'branch',
      },
      {
        title: 'System Role',
          dataIndex: 'systemRole',
            key: 'systemRole',
            },

            {
              title: 'Status',
              dataIndex: 'isActive',
              key: 'isActive',
              render: (isActive) => (
                <Tag color={isActive === 'Y' ? 'green' : 'red'} className={isActive === 'Y' ? 'blink' : ''}>
          {isActive === 'Y' ? 'Active' : 'Inactive'}
        </Tag>
              ),
            },   



      {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
        filterSearch: true,
        onFilter: (value, record) => record.email.toLowerCase().includes(value.toLowerCase()),
        render: (_, record) => (
          <span>
            {record.email}
          </span>
        ),
        filters: uniqueEmails.map(email => ({
          text: email,
          value: email
        })),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search email"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => {
                  confirm();
                  setSearchTextEmail(selectedKeys[0]);
                }}
              >
                Search
              </button>
              <button type="button" onClick={() => clearFilters()}>
                Reset
              </button>
            </div>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
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
    <Table loading = {employee_loading} dataSource={dataSource} columns={columns} />

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
        
        <Form.Item name="name" label="name">
          <Input />
        </Form.Item>
        <Form.Item name="cbsUsername" label="cbsUsername">
          <Input />
        </Form.Item>
        <Form.Item name="domainName" label="domainName">
          <Input />
        </Form.Item>
        
        <Form.Item name="role" label="role">
          <Input />
        </Form.Item>
        
        <Form.Item name="departmentName" label="departmentName">
          <Input />
        </Form.Item>
        
        <Form.Item name="branch" label="branch">
          <Input />
        </Form.Item>

        <Form.Item name="isActive" label="isActive">
        <Select>
          <Option value="Y">Active</Option>
          <Option value="N">InActive</Option>
        </Select>
        </Form.Item>

        <Form.Item name="systemRole" label="System Role">
        <Select>
          <Option value="ROLE_USER">User</Option>
          <Option value="ROLE_ADMIN">Admin</Option>
        </Select>
      </Form.Item>
        
        <Form.Item name="email" label="email">
          <Input />
        </Form.Item>
        
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

export default EmployeeTable;