import React, { useState } from 'react';
import { Steps, Button, message,Popconfirm  } from 'antd';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';
import Step5Form from './Step5Form';
import { useNavigate } from 'react-router-dom';

const { Step } = Steps;

const CreateReport = () => {


  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = () => {
    

  }

  const next = () =>
    {
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
    <div>
      {contextHolder}
      <Steps current={currentStep}>
      <Step title={<span style={{ fontSize: '12px' }}>Information</span>} />
 <Step title={<span style={{ fontSize: '11px' }}>SQL and Connection Properties</span>} />
 <Step title={<span style={{ fontSize: '12px' }}>Report Params</span>} />
 <Step title={<span style={{ fontSize: '12px' }}>Report Previlage</span>} />
 <Step title={<span style={{ fontSize: '12px' }}>Report Summary</span>} />
      </Steps>
      <br />
      <br />
      {currentStep === 0 && <Step1Form />}
      {currentStep === 1 && <Step2Form />}
      {currentStep === 2 && <Step3Form />}
      {currentStep === 3 && <Step4Form />}
      {currentStep === 4 && <Step5Form/>}
      <br />
      <div>
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} shape="round" onClick={prev}>
            Previous
          </Button>
        )}
        {currentStep < 4 && (
        //   <Popconfirm
        //   title="Confirmation"
        //   description="Are you sure to Proceed with the 
        //   information?"
        //   okText="Yes"
        //     cancelText="No"
        //     onConfirm={next} 
        // >
          <Button type="primary" shape="round" onClick={next}>
            Next
            </Button>
            // </Popconfirm>
        )}
        {currentStep === 4 && (
          <Popconfirm
          title="Confirmation"
          description="Are you sure to Generate Report with the 
          information?"
          okText="Yes"
            cancelText="No"
            onConfirm={handleSubmit} 
        >
            <Button type="primary" shape="round">
              Generate Report
            </Button>
            </Popconfirm>
        )}
      </div>
    </div>
  );
};

export default CreateReport;
