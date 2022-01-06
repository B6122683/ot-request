import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GrIcons from 'react-icons/gr';


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Attendance',
    path: '/attendance',
    icon: <FaIcons.FaMapMarkedAlt />,
    cName: 'nav-text'
  },
  {
    title: 'OTRequest',
    path: '/otrequest',
    icon: <FaIcons.FaBusinessTime />,
    cName: 'nav-text'
  },
  {
    title: 'Leave',
    path: '/leave',
    icon: <FaIcons.FaIdBadge />,
    cName: 'nav-text'
  },
  {
    title: 'Activity',
    path: '/activity',
    icon: <FaIcons.FaGift />,
    cName: 'nav-text'
  },
 
];