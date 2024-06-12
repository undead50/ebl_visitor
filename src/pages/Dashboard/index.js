import {
  FolderOpenOutlined ,
  CheckCircleOutlined ,
  ClockCircleOutlined,
  PlusOutlined, 
  UserOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './index.css';
import CountUp from 'react-countup';

import { Tag, Avatar, Card, Col, Row, Statistic } from 'antd';
import { fetchVisitorsAsync } from '../../store/slices/visitorSlice';
import { fetchDepartmentsAsync } from '../../store/slices/departmentSlice';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      const formatter = (value) => `${value} pending`;

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    };

    updateGreeting(); // Set the initial greeting when the component mounts

    // Update the greeting every minute to handle time changes
    const intervalId = setInterval(updateGreeting, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  

  const { visitors, visitor_loading, error } = useSelector(
    (state) => state.visitor
  );

  useEffect(()=>{
    dispatch(fetchVisitorsAsync())
    dispatch(fetchDepartmentsAsync())
  },[])

  const formatter = (num) => <CountUp end={num.toString().replace(/,/g, '')} />;

  const handleClick = (param) => {
    navigate(param);
  };

  return <><h4>Dashboard</h4>
    <h1>
        <Avatar size="small" icon={<UserOutlined />} />{' '}
        <Tag color="green" size="large">
          {greeting}, {data.Data.name}
        </Tag>
      </h1>
      <Row gutter={12}>
        <Col span={6}>
          <Card
            style={{ backgroundColor: '#F2DEDE' }}
            className="hoverable-card"
            onClick={() => handleClick('visitor-index')}
          >
            <Statistic
              title="Visitors"
              prefix={<TeamOutlined  style={{ marginRight: 8 }} />}
              style={{ fontWeight: 'bold' }}
              value={visitors.length}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{ backgroundColor: '#F0FBEF' }}
            className="hoverable-card"
            onClick={() => handleClick('visitor-add')}
          >
            <Statistic
              title="Create Visitor"
              prefix={<PlusOutlined style={{ marginRight: 8 }} />}
              style={{ fontWeight: 'bold' }}
              
            />
          </Card>
        </Col>
      </Row>
  </>;
};

export default Dashboard;
