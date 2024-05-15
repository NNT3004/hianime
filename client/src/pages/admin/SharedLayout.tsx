import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/admin/SharedLayout';
import Sidebar from '../../components/Sidebar';
import NavBar from '../../components/Navbar';
import { MdMovie } from 'react-icons/md';
import Footer from '../../components/Footer';

const SharedLayout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <Sidebar
        show={showSidebar}
        setShow={setShowSidebar}
        items={[{ icon: MdMovie, name: 'Posts', to: 'posts' }]}
      />
      <NavBar onMenuClick={() => setShowSidebar(true)} />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default SharedLayout;
