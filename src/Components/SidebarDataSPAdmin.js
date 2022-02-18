import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';


export const SidebarSPAdminData = [
  {
    title: 'หน้าหลัก',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'ข้อมูลพนักงาน',
    path: '/spemployee',
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
    path: '/spotmanagement',
    icon: <AiIcons.AiTwotoneSchedule/>,
    cName: 'nav-text'
  },
  {
    title: 'จัดการข้อมูล OT',
    path: '/spadminot',
    icon: <AiIcons.AiTwotoneSnippets />,
    cName: 'nav-text'
  },
  {
    title: 'จัดการคำขอลางาน',
    path: '/spleavemanagement',
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