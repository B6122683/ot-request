import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Attendance from './Pages/Attendance';
import Activity from './Pages/Activity';
import OTRequest from './Pages/OTRequest';
import Leave from './Pages/Leave';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/attendance" element={<Attendance/>}/>
          <Route exact path="/otrequest" element={<OTRequest/>}/>
          <Route exact path="/leave" element={<Leave/>}/>
          <Route exact path="/activity" element={<Activity/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;