import MyRoutes from './routes';
import { ConfigProvider } from 'antd';
function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Poppins', // replace with your desired font,
            fontSize: 12,
            sizeStep: 3,
            sizeUnit: 2,
            borderRadius: 4,
            colorPrimary: '#0067b2',
            colorInfo: '#0067b2',
            colorSuccess: '#42b086',
            // borderRadiusXS: 16,
            // borderRadiusSM: 16,
            // borderRadius: 16,
            // borderRadiusLG: 16,
          },
        }}
      >
        <MyRoutes />
      </ConfigProvider>
    </>
  );
}

export default App;
