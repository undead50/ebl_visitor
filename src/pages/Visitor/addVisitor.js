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
} from 'antd';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import Webcam from 'react-webcam';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createVisitorAsync } from '../../store/slices/visitorSlice';
dayjs.extend(customParseFormat);

const FormItem = Form.Item;

const VisitorAddForm = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [imageData, setImageData] = useState(null);
  const webcamRef = useRef(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

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
    alert('finish');
    console.log(imageData);
    const formData = new FormData();

    if (imageData != null) {
      const Record = {
        ...values,
        photo: imageData,
      };
      form.setFieldsValue(Record);
    }
    // Append form values to the FormData object
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        // Handle files separately
        if (key === 'files' && values[key] != null) {
          await Promise.all(
            values[key].map(async (file, index) => {
              // Check if it's an Ant Design Upload file object

              alert('file called');
              // console.error('Error fetching file:', error);
              formData.append(`files`, file.originFileObj);

              // formData.append(`files`, file.originFileObj);
            })
          );
        } else {
          alert(key);
          formData.append(key, values[key]);
        }
      }
    }

    dispatch(createVisitorAsync(formData));
    console.log('Received values:', formData);
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

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });

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
            <Button icon={<CameraOutlined />} onClick={openCamera}>
              Take Image
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

          <FormItem
            label="Check-in Time"
            name="check_in_time"
            rules={[
              { required: true, message: 'Please select the check-in time!' },
            ]}
          >
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={disabledDate}
              disabledTime={disabledDateTime}
              showTime={{
                defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
              }}
            />
          </FormItem>

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
            <Input />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};

export default VisitorAddForm;
