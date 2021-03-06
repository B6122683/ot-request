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
    title: 'ลงชื่อเข้า-ออกงาน',
    path: '/attendance',
    icon: <FaIcons.FaMapMarkedAlt />,
    cName: 'nav-text'
  },
  {
    title: 'แจ้งขอ OT',
    path: '/otrequest',
    icon: <FaIcons.FaBusinessTime />,
    cName: 'nav-text'
  },
  {
    title: 'แจ้งลา',
    path: '/leave',
    icon: <FaIcons.FaIdBadge />,
    cName: 'nav-text'
  },
  {
    title: 'กิจกรรม',
    path: '/activity',
    icon: <FaIcons.FaGift />,
    cName: 'nav-text'
  },
 
];