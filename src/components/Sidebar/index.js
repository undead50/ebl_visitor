import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  PieChartOutlined,
  UserOutlined,
  SettingTwoTone,
  SnippetsTwoTone,
  DisconnectOutlined,
  FileDoneOutlined,
  SettingOutlined
} from '@ant-design/icons';
import './index.css';

const { SubMenu } = Menu;

function SideBard() {
  // const { userInfo } = useSelector((state) => state.user);

  const { userInfo } = useSelector((state) => state.user);

  return (
    // <div className='custom-scrollbar-sidebar'>
    <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to={'/'}>Dashboard</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<FileDoneOutlined />} title="Visitor">
        <Menu.Item key="8">
          <Link to={'/visitor-add'}>visitor-add</Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to={'/visitor-index'}>visitors-list</Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link to={'/card-index'}>id-card-no</Link>
        </Menu.Item>
      </SubMenu>
      {userInfo.isSuperAdmin ? (<SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
        <Menu.Item key="9">
          <Link to={'/department'}>Department</Link>
        </Menu.Item>
        <Menu.Item key="10">
          <Link to={'/employee'}>Employee</Link>
        </Menu.Item>
      </SubMenu>):null}
      
    </Menu>
    // </div>
  );
}

export default SideBard;
