import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const [visible, setVisible] = useState(false);
  const [imageData, setImageData] = useState(null);
  const webcamRef = useRef(null);

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

  };

  const closeModal = () => {
    setVisible(false);
    stopVideoStream();
  };

  return (
    <>
      <Button onClick={openCamera}>Open Camera</Button>
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
      {imageData && <img src={imageData} alt="Captured" style={{ maxWidth: '100%' }} />}
    </>
  );
};

export default CameraComponent;
