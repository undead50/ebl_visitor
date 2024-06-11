import React, { useState, useRef } from 'react';
import {
  Form,
  Input,
  Upload,
  Card,
  Button,
  Modal,
  Image,
  message,
  DatePicker,
  TimePicker,
  Tag,
  Select,
} from 'antd';
import {
  CameraOutlined,
  UploadOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Webcam from 'react-webcam';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  createVisitorAsync,
  updateVisitorAsync,
} from '../../store/slices/visitorSlice';
import { fetchDepartmentsAsync } from '../../store/slices/departmentSlice';
import { useEffect } from 'react';
import { upload } from '@testing-library/user-event/dist/upload';

const FormItem = Form.Item;
const { Option } = Select;
const VisitorAddForm = () => {
  const navigate = useNavigate();
  const changeId = useParams();
  const [form] = Form.useForm();
  const [imageData, setImageData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [existingFiles, setExistingFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const { departments } = useSelector((state) => state.department);

  const uploadUrl = process.env.REACT_APP_FILE_PATH_URL;

  const { userInfo } = useSelector((state) => state.user);

  const { visitors, visitor_loading, visitor_error } = useSelector(
    (state) => state.visitor
  );

  useEffect(() => {
    if (changeId.changeId) {
      setEditMode(true);

      // alert(changeId.changeId)
      const fetchExistingFiles = async (file) => {
        try {
          // alert(`${uploadUrl}${file}`);
          const response = await axios.get(`${uploadUrl}${file}`);
          setFileList([response.data]);
        } catch (error) {
          console.error('Error fetching existing files:', error);
        }
      };

      const changeEdit = visitors.filter(
        (change) => change.id == changeId.changeId
      );
      const selectedRecord = changeEdit[0];

      // const departmentNameValue = departments
      //   .filter(
      //     (department) => department.id == selectedRecord_initial.department
      //   )
      //   .map((department) => department.name);

      // alert(departmentNameValue);

      // const selectedRecord = {
      //   ...selectedRecord_initial,
      //   department: departmentNameValue,
      // };

      // Append custom file objects based on file names
      if (selectedRecord.uploaded_files != null) {
        selectedRecord.uploaded_files.map((file) =>
          fetchExistingFiles(file.filename)
        );
      }

      // console.log(selectedRecord)
      // alert(selectedRecord.check_in_time);
      // const antdDate = dayjs(selectedRecord.check_in_time).format('ddd, DD MMM YYYY HH:mm:ss [GMT]');
      // // Create a new object with modified check_in_time
      // const updatedRecord = {
      //   ...selectedRecord,
      //   check_in_time: antdDate,
      // };

      // alert(antdDate);
      // setEditMode(true);

      setImageData(selectedRecord.photo);
      if (selectedRecord.uploaded_files != null) {
        // Set existing files in edit mode
        const existingFilesArray = selectedRecord.uploaded_files.map(
          (file, index) => ({
            uid: index,
            name: file.filename, // Assuming your file object has a fileName property
            status: 'done',
            url: `${uploadUrl}${file.filename}`, // Assuming your file object has a fileUrl property
          })
        );

        setExistingFiles(existingFilesArray);
        console.log('editfiles');

        const modifiedRecord = {
          ...selectedRecord,
          files: existingFilesArray,
        };
        form.setFieldsValue(modifiedRecord);
        console.log(modifiedRecord);
      } else {
        form.setFieldsValue(selectedRecord);
      }
    } else {
      form.resetFields();
      setImageData(null);
    }
  }, [changeId, form]);

  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [visible, setVisible] = useState(false);

  const webcamRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDepartmentsAsync());
    console.log(departments);
    const optionDepartment = departments.map((key) => {
      return {
        value: key.id,
        label: key.name,
      };
    });
    setOptions(optionDepartment);
  }, []);

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // const disabledDate = (current) => {
  //   // Can not select days before today and today
  //   return current && current < dayjs().endOf('day');
  // };

  const props = {
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    beforeUpload: (file) => {
      return new Promise((resolve, reject) => {
        // check the file size - you can specify the file size you'd like here:
        const isLt5M = file.size / 1024 / 1024 <= 9;
        if (!isLt5M) {
          message.error('File must be smaller than 9MB!');
          return false;
        }
        reject(false);
      });
    },
    fileList,
  };

  const onFinish = async (values) => {
    // alert('finish');
    // console.log(imageData);

    if (!editMode) {
      const check_in_time = dayjs();

      const nepalTime = check_in_time.add(5, 'hours').add(45, 'minutes');
      values.check_in_time = nepalTime;
    }

    const formData = new FormData();
    values.sol_id = userInfo.solId;

    // alert(values.check_in_time)
    // return
    if (imageData != null) {
      const Record = {
        ...values,
        photo: imageData,
      };
      form.setFieldsValue(Record);
    }

    if (
      values.files === undefined ||
      values.files === null ||
      values.files.length === 0
    ) {
      delete values.files;
    }
    // Append form values to the FormData object
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        // Handle files separately
        if (key === 'files' && values[key] != null) {
          await Promise.all(
            values[key].map(async (file, index) => {
              // Check if it's an Ant Design Upload file object
              // alert(file.name);

              try {
                const res = await axios.get(`${uploadUrl}${file.name}`, {
                  responseType: 'blob',
                });
                formData.append(
                  'files',
                  new File([res.data], file.name, { type: res.data.type })
                );
              } catch (error) {
                // console.error('Error fetching file:', error);
                formData.append(`files`, file.originFileObj);
              }

              // formData.append(`files`, file.originFileObj);
            })
          );
        } else {
          formData.append(key, values[key]);
        }
      }
    }

    // Log FormData entries
    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
      if (pair[0] === 'files') {
        console.log(pair[1]);
      }
    }

    if (!editMode) {
      const confirmCreate = window.confirm(
        'Are you sure you want to create this visitor?'
      );
      if (confirmCreate) {
        dispatch(createVisitorAsync(formData));
        if (!visitor_loading) {
          form.resetFields();
          setImageData(null);
        }
      }
    } else {
      // Confirmation for updating visitor
      const confirmUpdate = window.confirm(
        'Are you sure you want to update this visitor?'
      );
      if (confirmUpdate) {
        formData.photo = imageData;
        formData.id = changeId.changeId;
        console.log('final data to post ', formData);
        dispatch(updateVisitorAsync(formData));
        navigate('/visitor-index');
      }
    }

    // console.log('Received values:', formData);
  };

  const stopVideoStream = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      const tracks = webcamRef.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const openCamera = () => {
    setImageData(null);
    setVisible(true);
    if (webcamRef.current && !webcamRef.current.stream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          webcamRef.current.srcObject = mediaStream;
        });
    }
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageData(imageSrc);
    setVisible(false);
    form.setFieldsValue({ photo: imageSrc }); // Set the image data in the form field
  };

  // const disabledDateTime = () => ({
  //   disabledHours: () => range(0, 24).splice(4, 20),
  //   disabledMinutes: () => range(30, 60),
  //   disabledSeconds: () => [55, 56],
  // });
  const disabledDate = (current) => {
    // Disable dates after today
    return current && !dayjs(current).isSame(dayjs(), 'day');
  };
  // Get current date and time
  const defaultDateTime = dayjs(); // Use dayjs to handle date/time
  const disabledDateTime = (current) => {
    // Disable times before current time if date is today
    if (current && current.isSame(dayjs(), 'day')) {
      return {
        disabledHours: () => [...Array(dayjs().hour()).keys()],
        disabledMinutes: () => [...Array(dayjs().minute()).keys()],
        disabledSeconds: () => [...Array(dayjs().second()).keys()],
      };
    }
  };
  const closeModal = () => {
    setVisible(false);
    stopVideoStream(); // Stop the video stream when the modal is closed
    if (webcamRef.current) {
      webcamRef.current.srcObject = null; // Reset the webcam reference
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'flex-start',
        background: '#F1F2F5',
      }}
    >
      <Modal
        title="Camera Preview"
        visible={visible}
        destroyOnClose={true}
        onCancel={closeModal}
        footer={[
          <Button key="capture" onClick={captureImage}>
            Capture Image
          </Button>,
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
        ]}
      >
        <div style={{ position: 'relative' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: '100%' }}
          />
          {imageData === null && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '2px solid red',
                width: '250px',
                height: '250px',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </Modal>
      <Card style={{ width: '500px' }}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: '500px', margin: 'auto' }}
        >
          <Card
            style={{
              width: '270px',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <Image
              width={250} // Adjust width as needed
              style={{
                width: '250px',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
              src={
                imageData === null
                  ? process.env.PUBLIC_URL + '/images/pp.png'
                  : imageData
              }
              alt="Passport Photo"
            />
          </Card>
          <br />
          <FormItem
            label="PP Photo Image"
            name="photo"
            rules={[{ required: true, message: 'Please upload your photo!' }]}
          >
            <Button onClick={openCamera}>
              <b>
                <Tag color="green">
                  <CameraOutlined />
                  Take PP Photo
                </Tag>
              </b>
            </Button>
          </FormItem>

          <FormItem
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input.TextArea />
          </FormItem>

          <FormItem
            label="Purpose of Visit"
            name="purpose_of_visit"
            rules={[
              {
                required: true,
                message: 'Please input the purpose of your visit!',
              },
            ]}
          >
            <Input.TextArea />
          </FormItem>
          {/* {!editMode && (
            <FormItem
              label="Check-in Time"
              name="check_in_time"
              rules={[
                { required: true, message: 'Please select the check-in time!' },
              ]}
              style={{ display: 'none' }}
              initialValue={defaultDateTime} // Set default value to current date and time
            >
              <DatePicker
                style={{ width: 250 }}
                format="ddd, DD MMM YYYY hh:mm A"
                showTime={{
                  format: 'hh:mm A',
                }}
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
              />
            </FormItem>
          )} */}

          <Form.Item
            name="files"
            label="Documents"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[
              {
                required: false,
                message: 'Please upload Supporting Documents!',
              },
            ]}
          >
            <Upload
              {...props}
              multiple
              listType="picture-card"
              accept=".pdf,.jpg,.jpeg,.xlsx,.txt,.xls"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <FormItem
            label="Name of Visiting Department"
            name="department"
            rules={[
              {
                required: true,
                message: 'Please input the name of the visiting department!',
              },
            ]}
          >
            <Select placeholder="Select Department">
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </FormItem>

          <FormItem
            label="Host/Contact Person"
            name="host_contact_person"
            rules={[
              {
                required: true,
                message: 'Please input the host_contact_person!',
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="ID Card No"
            name="id_card_no"
            rules={[
              {
                required: true,
                message: 'Please input the ID Card No!',
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="Mobile Number"
            name="mobile_no"
            rules={[
              {
                required: true,
                message: 'Please input the mobile_no!',
              },
              {
                pattern: /^[0-9]+$/,
                message: 'Please enter only numbers for the mobile number!',
              },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">
              {editMode ? 'Update' : 'Submit'}
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default VisitorAddForm;
