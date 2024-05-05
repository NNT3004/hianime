import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/AuthForm';
import PrimaryButton from './PrimaryButton';
import { Checkbox } from 'antd';
import { FaTimes } from 'react-icons/fa';

interface AuthFromProps {
  onCloseBtnClicked: () => void;
}

const AuthForm: React.FC<AuthFromProps> = ({ onCloseBtnClicked }) => {
  const [formState, setFormState] = useState<string>('login');
  const handleCloseBtnClicked = (e: React.MouseEvent) => {
    e.preventDefault();
    onCloseBtnClicked();
  };
  return (
    <Wrapper>
      <button className='close' onClick={handleCloseBtnClicked}>
        <FaTimes />
      </button>
      <div className='container'>
        <h1 className='header'>
          {formState === 'register' ? 'Create an Account' : 'Welcome back!'}
        </h1>
        {formState === 'register' && (
          <div className='form-row'>
            <label htmlFor='username'>your name</label>
            <input type='text' id='username' />
          </div>
        )}
        <div className='form-row'>
          <label htmlFor='email'>email address</label>
          <input type='text' id='email' />
        </div>
        <div className='form-row'>
          <label htmlFor='password'>password</label>
          <input type='password' id='password' />
        </div>
        {formState === 'login' ? (
          <>
            <div className='option'>
              <Checkbox className='checkbox'>Remember me</Checkbox>
              <p id='forgot-password'>Forgot password</p>
            </div>
            <PrimaryButton>Login</PrimaryButton>
            <p className='nav'>
              Don't have an account?{' '}
              <span onClick={() => setFormState('register')}>Register</span>
            </p>
          </>
        ) : (
          <>
            <div className='form-row'>
              <label htmlFor='confirmPassword'>confirm password</label>
              <input type='password' id='confirmPassword' />
            </div>
            <PrimaryButton>Register</PrimaryButton>
            <p className='nav'>
              Have an account?{' '}
              <span onClick={() => setFormState('login')}>Login</span>
            </p>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default AuthForm;
