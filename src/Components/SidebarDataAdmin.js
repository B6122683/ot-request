import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';


export const SidebarData = [
  {
    title: 'หน้าหลัก',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'ข้อมูลพนักงาน',
    path: '/employee',
    icon: <FaIcons.FaMapMarkedAlt />,
    cName: 'nav-text'
  },
  {
    title: 'ข้อมูลแผนก',
    path: '/department',
    icon: <FaIcons.FaBusinessTime />,
    cName: 'nav-text'
  },
  {
    title: 'จัดการคำขอ OT',
    path: '/manageotrequest',
    icon: <FaIcons.FaIdBadge />,
    cName: 'nav-text'
  },
  {
    title: 'จัดการสิทธิ์การใช้งาน',
    path: '/managelicense',
    icon: <FaIcons.FaGift />,
    cName: 'nav-text'
  },
  {
    title: 'ปฏิทินบริษัท',
    path: '/officecalendar',
    icon: <FaIcons.FaGift />,
    cName: 'nav-text'
  },
  {
    title: 'กิจกรรม',
    path: '/activity',
    icon: <FaIcons.FaGift />,
    cName: 'nav-text'
  },
 
];