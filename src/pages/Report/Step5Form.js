import { Card, Row, Col, Descriptions, Tag } from 'antd';
const Step5Form = ()=>{
    const reportDetails = {
        reportName: 'Default Report Name',
        description: 'Default Description',
        reportParams: ['Param1', 'Param2', 'Param3'],
        reportPrivileges: ['Read', 'Write'],
        reportHeaders: [
          { displayName: 'Header1', type: 'Text' },
          { displayName: 'Header2', type: 'Number' },
          // Add more headers if needed
        ],
      };
    return <> <Card>
    <Descriptions title="Report Summary" bordered>
      <Descriptions.Item label="Report Name">{reportDetails.reportName}</Descriptions.Item>
      <Descriptions.Item label="Description">{reportDetails.description}</Descriptions.Item>
      <Descriptions.Item label="Report Params">
        <ul>
          {reportDetails.reportParams.map((param, index) => (
            <li key={index}>{param}</li>
          ))}
        </ul>
      </Descriptions.Item>
      <Descriptions.Item label="Report Privileges">
        <div>
          {reportDetails.reportPrivileges.map((privilege, index) => (
            <Tag key={index}>{privilege}</Tag>
          ))}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Report Headers">
        <ul>
          {reportDetails.reportHeaders.map((header, index) => (
            <li key={index}>
              {`${header.displayName} - ${header.type}`}
            </li>
          ))}
        </ul>
      </Descriptions.Item>
    </Descriptions>
  </Card></>
 }
 export default Step5Form