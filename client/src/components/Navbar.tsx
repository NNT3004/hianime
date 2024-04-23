import Wrapper from '../assets/wrappers/NavBar';
import { FaBars } from 'react-icons/fa';
import Logo from './Logo';
import SearchBar from './SearchBar';
import PrimaryButton from './PrimaryButton';
import React from 'react';

const NavBar: React.FC = () => {
  return (
    <Wrapper>
      <FaBars className='menu' />
      <div className='center'>
        <Logo />
        <SearchBar className='search' />
      </div>
      <PrimaryButton>Sign in</PrimaryButton>
    </Wrapper>
  );
};

export default NavBar;
