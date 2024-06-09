import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../containers/adminlayout';
import Dashboard from '../pages/Dashboard';
import CreateReport from '../pages/Report';
import Login from '../pages/Auth';
import SwiftMessage from '../pages/Swift';
import CameraComponent from '../pages/Test/Camera';
import VisitorAddForm from '../pages/Visitor/addVisitor';
import DepartmentTable from '../pages/Department';
import VisitorTable from '../pages/Visitor';
import EmployeeTable from '../pages/Employee';

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-report" element={<CreateReport />} />
          <Route path="/initiate-swift" element={<SwiftMessage />} />
          <Route path="/camera" element={<CameraComponent/>}/>
          <Route path="/visitor-add" element={<VisitorAddForm/>}/>
          <Route path="visitor-add/:changeId" element={<VisitorAddForm />} />
          <Route path="/department" element={<DepartmentTable/>}/>
          <Route path="/visitor-index" element={<VisitorTable/>}/>
          <Route path="/employee" element={<EmployeeTable/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
