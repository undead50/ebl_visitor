import React,{ useState, useRef }  from 'react';
import { Form, Input, Upload,Card ,Button, Modal,Image,message} from 'antd';
import { CameraOutlined,UploadOutlined } from '@ant-design/icons';
import Webcam from 'react-webcam';

const FormItem = Form.Item;

const VisitorAddForm = () => {
  const [visible, setVisible] = useState(false);
  const [imageData, setImageData] = useState(null);
  const webcamRef = useRef(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);


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
          message.error('File must be smaller than 9MB!')
          return false
        };
        reject(false);
      })
    },
    fileList,
  };


  const onFinish = (values) => {
    alert('finish')
    console.log(imageData)
    if (imageData != null) {
      const Record = {
        ...values,
        photo: imageData,
      };
      form.setFieldsValue(Record);
    }
    console.log('Received values:', values);
  };

  const stopVideoStream = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      const tracks = webcamRef.current.stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const openCamera = () => {
    setVisible(true);
    if (webcamRef.current && !webcamRef.current.stream) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
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

  const closeModal = () => {
    setVisible(false);
    stopVideoStream();
  };

  return (
    <Card style={{display:"flex",alignContent:"flex-start"}}>
     <Modal
        title="Camera Preview"
        visible={visible}
        onCancel={closeModal}
        footer={[
          <Button key="capture" onClick={captureImage}>Capture Image</Button>,
          <Button key="cancel" onClick={closeModal}>Cancel</Button>,
        ]}
      >
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%' }}
        />
      </Modal>
    <Form
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: '500px', margin: 'auto' }}
    >
      <Card>
        <Image
        width={150}  // Adjust width as needed
        src={imageData === null? process.env.PUBLIC_URL + '/images/pp.png' : imageData}
        alt="Passport Photo"
        />
      </Card>
      <br/>  
      <FormItem
        label="PP Photo Image"
        name="photo"
        rules={[{ required: true, message: 'Please upload your photo!' }]}
      >
        
          <Button icon={<CameraOutlined />} onClick={openCamera}>Take Image</Button>
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
        name="purpose"
        rules={[{ required: true, message: 'Please input the purpose of your visit!' }]}
      >
        <Input.TextArea />
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
        rules={[{ required: true, message: 'Please input the name of the visiting department!' }]}
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
  );
};

export default VisitorAddForm;
