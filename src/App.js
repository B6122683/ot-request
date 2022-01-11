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
import ActivityDesc from './Pages/Activity_Desc';
import Employee from './Pages/Employee';
import Department from './Pages/Department';
import OTManagement from './Pages/OTManagement';
import Permission from './Pages/Permission';
import CalendarOffice from './Pages/CalendarOffice';
import AdminActivity from './Pages/AdminActivity';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/attendance" element={<Attendance/>}/>
          <Route exact path="/otrequest" element={<OTRequest/>}/>
          <Route exact path="/otrequestdesc" element={<OTRequestDesc/>}/>
          <Route exact path="/leave" element={<Leave/>}/>
          <Route exact path="/activity" element={<Activity/>}/>
          <Route exact path="/activityDesc" element={<ActivityDesc/>}/>
          <Route exact path="/employee" element={<Employee/>}/>
          <Route exact path="/department" element={<Department/>}/>
          <Route exact path="/otmanagement" element={<OTManagement/>}/>
          <Route exact path="/permission" element={<Permission/>}/>
          <Route exact path="/calendaroffice" element={<CalendarOffice/>}/>
          <Route exact path="/adminactivity" element={<AdminActivity/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;