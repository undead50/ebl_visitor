import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space,Tabs,Card,Tag,Image,List  } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createVisitorAsync,
    deleteVisitorAsync,
      fetchVisitorsAsync,
        updateVisitorAsync,
        checkOutVisitorAsync,
} from '../../store/slices/visitorSlice';
import { encrypt, decrypt } from '../../hooks/crypto';
import { useNavigate } from 'react-router-dom';
import {FileExcelOutlined,EyeOutlined,EditOutlined,PrinterOutlined,DeleteOutlined,SearchOutlined,ClockCircleOutlined,CheckOutlined,ExclamationCircleOutlined}  from '@ant-design/icons';
import { fetchDepartmentsAsync } from '../../store/slices/departmentSlice';
import './index.css'
import dayjs from 'dayjs';
import { fetchCardsAsync } from '../../store/slices/cardSlice';
import * as XLSX from 'xlsx';

const { confirm } = Modal;
// import { useNotification } from '../../hooks/index';

const VisitorTable = () => {


  const exportToExcel = () => {
    // Generate a timestamp string in ISO 8601 format
    const timestamp = new Date().toISOString();
  
    // Remove the 'T' and '.000Z' parts to get a cleaner filename format
    const cleanTimestamp = timestamp.replace(/[-T:\.Z]/g, '');
  
    // Append the timestamp to the base filename
    const fileName = `${cleanTimestamp}.xlsx`;

    // Create a new worksheet
    const ws = XLSX.utils.json_to_sheet(dataSource.map(item => {
        // Find department name by its id
        const department = departments.find(department => department.id === item.department);

        // Customize the data format if needed
        return {
            visitor_name: item.name,
            Department: department ? department.name : '', // If department found, use its name, otherwise empty string
            host_contact_person: item.host_contact_person,
            status: item.status === "C" ? "IN" : "OUT",
            check_in_time: formatDateAndTime(item.check_in_time),
            check_out_time: formatDateAndTime(item.check_out_time)
            // Add more columns as needed
        };
    }));

    // Create a new workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Visitors');

    // Write the workbook to a file
    XLSX.writeFile(wb, fileName);
};
  

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { departments } = useSelector((state) => state.department);
  const { cards } = useSelector((state)=> state.card);
  const [searchText, setSearchText] = useState('');
  const [searchCheckInTime, setSearchCheckInTime] = useState('');
  const [searchCheckOutTime, setSearchCheckOutTime] = useState('');
  const uploadUrl = process.env.REACT_APP_FILE_PATH_URL;

  useEffect(()=>{
    dispatch(fetchCardsAsync())

  },[])

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
      title: 'Visitor Name',
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
            // Define onFilter
            onFilter: (value, record) => record.status === value,
            filters: [
              { text: 'IN', value: 'C' },
              { text: 'OUT', value: 'O' },
            ],
          },
    
    
    
    {
      title: 'check_in_time',
        dataIndex: 'check_in_time',
          key: 'check_in_time',
          render: (text) =>formatDateAndTime(text),
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
              <DatePicker
                style={{ marginBottom: 8, display: 'block' }}
                value={selectedKeys.length > 0? dayjs(selectedKeys[0], 'YYYY-MM-DD') : null}
                format="YYYY-MM-DD"
                onChange={(date, dateString) => setSelectedKeys(dateString? [dateString] : [])}
              />
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    confirm();
                    setSearchCheckInTime(selectedKeys[0]); // Updated to use setSearchCheckInTime
                  }}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
                >
                  Search
                </Button>
                <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                  Reset
                </Button>
              </Space>
            </div>
          ),
          onFilter: (value, record) => {
            const formattedValue = dayjs(value).format('YYYY-MM-DD');
            const formattedCheckInTime = dayjs(record.check_in_time).format('YYYY-MM-DD');
            return formattedValue === formattedCheckInTime;
          },
          },
          {
            title: 'check_out_time',
            key: 'check_out_time',
            render: (_, record) => {
              if (record.check_out_time === null) {
                return <ClockCircleOutlined/> ;
              } else {
                return formatDateAndTime(record.check_out_time);
              }
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
              <div style={{ padding: 8 }}>
                <DatePicker
                  style={{ marginBottom: 8, display: 'block' }}
                  value={selectedKeys.length > 0? dayjs(selectedKeys[0], 'YYYY-MM-DD') : null}
                  format="YYYY-MM-DD"
                  onChange={(date, dateString) => setSelectedKeys(dateString? [dateString] : [])}
                />
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      confirm();
                      setSearchCheckOutTime(selectedKeys[0]); // Updated to use setSearchCheckInTime
                    }}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                  >
                    Search
                  </Button>
                  <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                    Reset
                  </Button>
                </Space>
              </div>
            ),
            onFilter: (value, record) => {
              const formattedValue = dayjs(value).format('YYYY-MM-DD');
              const formattedCheckOutTime = dayjs(record.check_in_time).format('YYYY-MM-DD');
              return formattedValue === formattedCheckOutTime;
            },
          },
    
    
    {
      title: 'Action',
        key: 'action',
          render: (_, record) => (
            <Space>

              {record.status === "C"? <Button onClick={() => handleEdit(record)}><EditOutlined /></Button>:null}              
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
  
  const formatDateAndTime = (datetimeString) => {
    const date = new Date(datetimeString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${year}-${month}-${day} ${hours}:${minutes} ${period}`;
  };
  
  const dataSource = visitors;
  
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Visitors Information',
      children: <Table dataSource={dataSource} columns={columns} />,
    },
    // {
    //   key: '2',
    //   label: 'Checked Out Visitors',
    //   children: 'Content of Tab Pane 2',
    // }
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
        dispatch(checkOutVisitorAsync(updatedRecord));
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

  const handlePrint=() =>{
    window.print();
  }


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
    <Button onClick={exportToExcel} type="primary" shape='round'>
        Export excel<FileExcelOutlined />
      </Button>
    <br/>
    <br/> 

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
  <div className="printable-content" id="printable-area">
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
        <td style={{display:'flex',justifyContent:'right'}}><b>Name:</b></td>
        <td>{form.getFieldValue("name")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{display:'flex',justifyContent:'right'}}><b>Address:</b></td>
        <td>{form.getFieldValue("address")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{display:'flex',justifyContent:'right'}}><b>Purpose of Visit:</b></td>
        <td>{form.getFieldValue("purpose_of_visit")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{display:'flex',justifyContent:'right'}}><b>Check-in Time:</b></td>
        <td>{formatDateAndTime(form.getFieldValue("check_in_time"))}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{display:'flex',justifyContent:'right'}}><b>Host Contact Person:</b></td>
        <td>{form.getFieldValue("host_contact_person")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{display:'flex',justifyContent:'right'}}><b>Department:</b></td>
        <td>
          {departments.find((department) => department.id === form.getFieldValue("department"))?.name}
        </td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{display:'flex',justifyContent:'right'}}><b>Mobile No:</b></td>
        <td>{form.getFieldValue("mobile_no")}</td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{display:'flex',justifyContent:'right'}}><b>ID Card No:</b></td>
        <td>{ cards.map((cards)=>{
          if(form.getFieldValue("id_card_no") == cards.id){
            return cards.card_no;
          }
        })}
        </td>
      </tr>
      <tr style={{ borderBottom: '1px solid #ddd' }}>
        <td style={{display:'flex',justifyContent:'right'}}><b>Signature:</b></td>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <td style={{ borderTop: '1px solid black' }}></td>
      </tr>
    </tbody>
  </table>
  </div>
  <Card>
  <List
    header="File:"
    bordered
    dataSource={form.getFieldValue("uploaded_files")}
    renderItem={(item) => (
      <List.Item>
        {item.filename.toLowerCase().endsWith('.jpg') || item.filename.toLowerCase().endsWith('.png') ? (
          <div>
            <a target="_blank" rel="noopener noreferrer">
              <Image src={`${uploadUrl}${item.filename}`} alt={item.originalname} style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </a>
            <br />
            <a href={`${uploadUrl}${item.filename}`} target="_blank" rel="noopener noreferrer">
              {item.originalname}
            </a>
          </div>
        ) : (
          <a href={`${uploadUrl}${item.filename}`} target="_blank" rel="noopener noreferrer">
            {item.originalname}
          </a>
        )}
      </List.Item>
    )}
  />
    </Card>
    <Card>
    <Button size="large" onClick={handlePrint}>Print Pass<PrinterOutlined /></Button>
    </Card>
  </Card>

</Modal>

  </div>
);
};

export default VisitorTable;