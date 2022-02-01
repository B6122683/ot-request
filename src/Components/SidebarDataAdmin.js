import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';


export const SidebarAdminData = [
  {
    title: 'หน้าหลัก',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'ข้อมูลพนักงาน',
    path: '/employee',
    icon: <FaIcons.FaUsersCog />,
    cName: 'nav-text'
  },
  {
    title: 'ข้อมูลแผนก',
    path: '/department',
    icon: <FaIcons.FaBuilding />,
    cName: 'nav-text'
  },
  {
    title: 'ข้อมูลตำแหน่ง',
    path: '/position',
    icon: <BsIcons.BsFillPersonLinesFill />,
    cName: 'nav-text'
  },
  {
    title: 'จัดการคำขอ OT',
    path: '/otmanagement',
    icon: <AiIcons.AiTwotoneSchedule/>,
    cName: 'nav-text'
  },
  {
    title: 'จัดการข้อมูล OT',
    path: '/adminot',
    icon: <AiIcons.AiTwotoneSnippets />,
    cName: 'nav-text'
  },
  {
    title: 'ปฏิทินบริษัท',
    path: '/officecalendar',
    icon: <FaIcons.FaCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'จัดการคำขอลางาน',
    path: '/leavemanagement',
    icon: <BsIcons.BsCalendar3WeekFill />,
    cName: 'nav-text'
  },
  {
    title: 'จัดการกิจกรรม',
    path: '/adminactivity',
    icon: <FaIcons.FaGift />,
    cName: 'nav-text'
  },
 
];