import React, { useState } from 'react';
import {
  Steps,
  Button,
  message,
  Popconfirm,
  Typography,
  Drawer,
  Divider,
} from 'antd';
import CreateSwift from './SwiftMessage';
import { useNavigate } from 'react-router-dom';
import StartForm from './StartForm';
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  FileSearchOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import SummaryPage from './SummaryPage';

const { Step } = Steps;

const { Text, Link } = Typography;

const SwiftMessage = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = () => {};

  const next = () => {
    if (currentStep === 0) {
      // if (certificateData.length === 0) {
      //   messageApi.open({
      //     type: 'error',
      //     content: "Please provide Certificate Details.",
      //   });
      // } else {
      //   setCurrentStep(currentStep + 1);
      // }
      setCurrentStep(currentStep + 1);
    }

    if (currentStep === 1) {
      //   if (report_type === "") {
      //     messageApi.open({
      //       type: 'error',
      //       content: "Please Select the Report Type and Confirm.",
      //     });
      //   } else {
      //     setCurrentStep(currentStep + 1);
      //   }
      setCurrentStep(currentStep + 1);
    }

    if (currentStep === 2) {
      //   if (certificate_detail === "") {
      //     messageApi.open({
      //       type: 'error',
      //       content: "Please Confirm and Verify the Certificate.",
      //     });
      //   } else {
      //     setCurrentStep(currentStep + 1);
      //   }
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 3) {
      //   if (certificate_detail === "") {
      //     messageApi.open({
      //       type: 'error',
      //       content: "Please Confirm and Verify the Certificate.",
      //     });
      //   } else {
      //     setCurrentStep(currentStep + 1);
      //   }
      setCurrentStep(currentStep + 1);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div style={{ padding: '15px' }}>
      {contextHolder}
      <br />
      <Text
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '15px',
          textDecoration: 'underline',
        }}
        mark
      >
        (Request Swift Message)
      </Text>
      <Divider dashed={true} />

      <Steps current={currentStep} size="small">
        <Step title={<span>Search Swift Information</span>} />
        <Step title={<span>Message Details</span>} />
        <Step title={<span>Summary</span>} />
      </Steps>
      <br />

      {currentStep === 0 && <StartForm />}
      {currentStep === 1 && <CreateSwift />}
      {currentStep === 2 && <SummaryPage />}
      {/* {currentStep === 2 && <Step3Form />}
      {currentStep === 3 && <Step4Form />}
      {currentStep === 4 && <Step5Form />} */}
      <br />
      <div>
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} shape="round" onClick={prev}>
            Previous
          </Button>
        )}
        {currentStep < 2 && (
          <Button type="primary" shape="round" onClick={next}>
            Next
          </Button>
        )}
        {currentStep === 2 && (
          <Popconfirm
            title="Confirmation"
            description="Are you sure to Sumbit Message with the information?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleSubmit}
          >
            <Button type="primary" shape="round">
              Submit Message
            </Button>
          </Popconfirm>
        )}
      </div>
    </div>
  );
};

export default SwiftMessage;
