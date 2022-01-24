import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
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
import Permission from './Pages/Permission';
import CalendarOffice from './Pages/CalendarOffice';
import AdminActivity from './Pages/AdminActivity';
import Position from './Pages/Position';
import PositionManagement from './Pages/PositionManagement';
import DepartmentManagement from './Pages/DepartmentManagement';
import EmployeeManagement from './Pages/EmployeeManagement';
import ActivityManagement from './Pages/ActivityManagement';
import AdminOT from './Pages/AdminOT';
import AdminOTManagement from './Pages/AdminOTManagement';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/attendance" element={<Attendance/>}/>
          <Route exact path="/otrequest" element={<OTRequest/>}/>
          <Route exact path="/otrequestdesc/:ot_id" element={<OTRequestDesc/>}/>
          <Route exact path="/leave" element={<Leave/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/logintest" element={<LoginTest/>}/>
          <Route exact path="/activity" element={<Activity/>}/>
          <Route exact path="/activityDesc" element={<ActivityDesc/>}/>
          <Route exact path="/employee" element={<Employee/>}/>
          <Route exact path="/employeemanagement" element={<EmployeeManagement/>}/>
          <Route exact path="/department" element={<Department/>}/>
          <Route exact path="/departmentmanagement" element={<DepartmentManagement/>}/>
          <Route exact path="/position" element={<Position/>}/>
          <Route exact path="/positionmanagement" element={<PositionManagement/>}/>
          <Route exact path="/otmanagement" element={<OTManagement/>}/>
          <Route exact path="/permission" element={<Permission/>}/>
          <Route exact path="/calendaroffice" element={<CalendarOffice/>}/>
          <Route exact path="/adminactivity" element={<AdminActivity/>}/>
          <Route exact path="/activitymanagement" element={<ActivityManagement/>}/>
          <Route exact path="/adminot" element={<AdminOT/>}/>
          <Route exact path="/adminotmanagement" element={<AdminOTManagement/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;