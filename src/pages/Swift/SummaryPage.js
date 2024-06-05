import React from 'react';
import { Card, Typography, Descriptions, Divider } from 'antd';
import './index.css';

const { Title, Text } = Typography;

const SummaryPage = () => {
  return (
    <div style={{ padding: '20px' }} className="custom-scrollbar">
      <Card>
        <Title level={3} style={{ textDecoration: 'underline' }}>
          PACS008 Details
        </Title>

        <Descriptions title="Business Message Details">
          <Descriptions.Item label="Business Message Identifier">
            BMID001
          </Descriptions.Item>
          <Descriptions.Item label="Payment Identification">
            PIID002
          </Descriptions.Item>
          <Descriptions.Item label="Value Date">2023-12-23</Descriptions.Item>
          <Descriptions.Item label="Currency">USD</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Ordering Customer Details">
          <Descriptions.Item label="Ordering Customer Account">
            ACCT003
          </Descriptions.Item>
          <Descriptions.Item label="Party Name">John Doe</Descriptions.Item>
          <Descriptions.Item label="Customer Street Name">
            123 Main St
          </Descriptions.Item>
          <Descriptions.Item label="Customer Town">Anytown</Descriptions.Item>
          <Descriptions.Item label="Customer County">
            Any County
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Party Details">
          <Descriptions.Item label="Intermediary Agent">
            IA004
          </Descriptions.Item>
          <Descriptions.Item label="Intermediary Branch">
            IB005
          </Descriptions.Item>
          <Descriptions.Item label="Creditor Account">CA006</Descriptions.Item>
          <Descriptions.Item label="Creditor Name">
            Jane Smith
          </Descriptions.Item>
          <Descriptions.Item label="Creditor Street Name">
            456 Oak St
          </Descriptions.Item>
          <Descriptions.Item label="Creditor Town">Anytown</Descriptions.Item>
          <Descriptions.Item label="Creditor Country">USA</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Other Details">
          <Descriptions.Item label="Remittance Information">
            RI007
          </Descriptions.Item>
          <Descriptions.Item label="Sender Information">
            SI008
          </Descriptions.Item>
          <Descriptions.Item label="Charge Bearer">CB009</Descriptions.Item>
          <Descriptions.Item label="Transmit Date">
            2023-12-23
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default SummaryPage;
