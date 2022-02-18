import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import NavbarUser from './Components/NavbarUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Attendance from './Pages/Attendance';
import Activity from './Pages/Activity';
import OTRequest from './Pages/OTRequest';
import OTRequestDesc from './Pages/OTRequestDesc';
import Leave from './Pages/Leave';
import Login from './Pages/Login';
import LoginTest from './Pages/LoginTest';
import ActivityDesc from './Pages/Activity_Desc';
import Employee from './Pages/Employee';
import Department from './Pages/Department';
import OTManagement from './Pages/OTManagement';
import SPOTManagement from './Pages/SPOTManagement';
import Permission from './Pages/Permission';
import CalendarOffice from './Pages/CalendarOffice';
import AdminActivity from './Pages/AdminActivity';
import Position from './Pages/Position';
import PositionManagement from './Pages/PositionManagement';
import DepartmentManagement from './Pages/DepartmentManagement';
import EmployeeManagement from './Pages/EmployeeManagement';
import ActivityManagement from './Pages/ActivityManagement';
import AdminOT from './Pages/AdminOT';
import SPAdminOT from './Pages/SPAdminOT';
import AdminOTManagement from './Pages/AdminOTManagement';
import Upload from './Pages/upload';
import Pagenotfound from './Pages/Pagenotfound';
import LeaveManagement from './Pages/LeaveManagement';
import SPLeaveManagement from './Pages/SPLeaveManagement';
import EditDepartment from './Pages/EditDepartment';
import EditPosition from './Pages/EditPosition';
import EditActivity from './Pages/EditActivity';
import EditAdminOT from './Pages/EditAdminOT';
import EditEmployee from './Pages/EditEmployee';
import Footer from './Components/Footer';
import SPEmployee from './Pages/SPEmployee';
import SPEmployeeManagement from './Pages/SPEmployeeManagement';
import SPEditEmployee from './Pages/SPEditEmployee';

function App() {
  return (
    <>
      <Router>
      {window.location.pathname != '/login' && <NavbarUser />}
        
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/attendance" element={<Attendance/>}/>
          <Route exact path="/otrequest" element={<OTRequest/>}/>
          <Route exact path="/otrequestdesc/:ot_id" element={<OTRequestDesc/>}/>
          <Route exact path="/leave" element={<Leave/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/logintest" element={<LoginTest/>}/>
          <Route exact path="/activity" element={<Activity/>}/>
          <Route exact path="/activityDesc/:act_id" element={<ActivityDesc/>}/>
          <Route exact path="/employee" element={<Employee/>}/>
          <Route exact path="/spemployee" element={<SPEmployee/>}/>
          <Route exact path="/employeemanagement" element={<EmployeeManagement/>}/>
          <Route exact path="/spemployeemanagement" element={<SPEmployeeManagement/>}/>
          <Route exact path="/employeemanagement/:emp_id" element={<EditEmployee/>}/>
          <Route exact path="/spemployeemanagement/:emp_id" element={<SPEditEmployee/>}/>
          <Route exact path="/department" element={<Department/>}/>
          <Route exact path="/departmentmanagement" element={<DepartmentManagement/>}/>
          <Route exact path="/departmentmanagement/:dep_id" element={<EditDepartment/>}/>
          <Route exact path="/position" element={<Position/>}/>
          <Route exact path="/positionmanagement" element={<PositionManagement/>}/>
          <Route exact path="/positionmanagement/:position_id" element={<EditPosition/>}/>
          <Route exact path="/otmanagement" element={<OTManagement/>}/>
          <Route exact path="/spotmanagement" element={<SPOTManagement/>}/>
          <Route exact path="/permission" element={<Permission/>}/>
          <Route exact path="/officecalendar" element={<CalendarOffice/>}/>
          <Route exact path="/adminactivity" element={<AdminActivity/>}/>
          <Route exact path="/activitymanagement" element={<ActivityManagement/>}/>
          <Route exact path="/activitymanagement/:act_id" element={<EditActivity/>}/>
          <Route exact path="/adminot" element={<AdminOT/>}/>
          <Route exact path="/spadminot" element={<SPAdminOT/>}/>
          <Route exact path="/upload" element={<Upload/>}/>
          <Route exact path="/adminotmanagement" element={<AdminOTManagement/>}/>
          <Route exact path="/adminotmanagement/:ot_id" element={<EditAdminOT/>}/>
          <Route path='*' exact={true}  element={<Pagenotfound/>}/>
          <Route exact path="/leavemanagement" element={<LeaveManagement/>}/>
          <Route exact path="/spleavemanagement" element={<SPLeaveManagement/>}/>

        </Routes>
      {window.location.pathname != '/login' && <Footer />}
      </Router>
    </>
  );
}

export default App;