import Wrapper from '../assets/wrappers/NavBar';
import { FaBars } from 'react-icons/fa';
import Logo from './Logo';
import SearchBar from './SearchBar';
import PrimaryButton from './PrimaryButton';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import AuthForm from './AuthForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import UserCircle from './UserCircle';

interface NavBarProps {
  onMenuClick?: (e: React.MouseEvent<SVGElement>) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [showAuthForm, setShowAuthFrom] = useState<boolean>(false);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user) setShowAuthFrom(false);
  }, [user]);
  return (
    <Wrapper>
      <FaBars className='menu' onClick={onMenuClick} />
      <div className='center'>
        <Logo
          onClick={() => {
            navigate('/home');
          }}
        />
        <SearchBar className='search' />
      </div>
      {user ? (
        <UserCircle />
      ) : (
        <PrimaryButton
          onClick={() => {
            setShowAuthFrom((prev) => !prev);
          }}
        >
          Sign in
        </PrimaryButton>
      )}
      <Modal display={showAuthForm} setDisplay={setShowAuthFrom}>
        {showAuthForm && (
          <AuthForm
            onCloseBtnClicked={() => {
              setShowAuthFrom(false);
            }}
          />
        )}
      </Modal>
    </Wrapper>
  );
};

export default NavBar;
