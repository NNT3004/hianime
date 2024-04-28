import React from 'react';
import NavBar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/SharedLayout';
import Footer from '../components/Footer';

const SharedLayout: React.FC = () => {
  return (
    <Wrapper>
      <NavBar />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default SharedLayout;
