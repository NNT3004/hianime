import Wrapper from '../assets/wrappers/NavBar';
import { FaBars } from 'react-icons/fa';
import Logo from './Logo';
import SearchBar from './SearchBar';
import PrimaryButton from './PrimaryButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <FaBars className='menu' />
      <div className='center'>
        <Logo onClick={() => {navigate('/home')}}/>
        <SearchBar className='search' />
      </div>
      <PrimaryButton>Sign in</PrimaryButton>
    </Wrapper>
  );
};

export default NavBar;
