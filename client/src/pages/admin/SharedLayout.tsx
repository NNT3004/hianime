import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/admin/SharedLayout';
import Sidebar from '../../components/admin/Sidebar';
import Navbar from '../../components/admin/Navbar';
import Logo from '../../components/Logo';
import { FaBars, FaCaretLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';

const SharedLayout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const user = useSelector(selectUser);
  if(!user || user.role !== 'admin') {
    return <Navigate to='/home'/>
  }
  return (
    <Wrapper>
      <main className='dashboard'>
        <div className='toggle-sidebar'>
          <div className={showSidebar ? 'toggle-btn hide' : 'toggle-btn'} onClick={() => setShowSidebar(true)}>
            <FaBars />
          </div>
          <Logo />
          <div className={showSidebar ? 'toggle-btn' : 'toggle-btn hide'} onClick={() => setShowSidebar(false)}>
            <FaCaretLeft />
          </div>
        </div>
        <Sidebar showSidebar={showSidebar}/>
        <div className='dashboard-main'>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
