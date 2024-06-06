import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/SharedLayout';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { FaHome, FaClock } from 'react-icons/fa';

const SharedLayout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [initalSidebar, setInitalSidebar] = useState(false);

  const handleMenuClicked = (e: React.MouseEvent) => {
    if (!initalSidebar) {
      setInitalSidebar(true);
    }
    setShowSidebar(true);
  };
  return (
    <Wrapper>
      {initalSidebar && (
        <Sidebar
          show={showSidebar}
          setShow={setShowSidebar}
          items={[
            { icon: FaHome, name: 'Home', to: '/home' },
            { icon: FaClock, name: 'Recently', to: '/recently-updated' },
          ]}
        />
      )}
      <NavBar onMenuClick={handleMenuClicked} />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default SharedLayout;
