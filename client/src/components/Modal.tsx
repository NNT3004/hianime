import React from 'react';
import Wrapper from '../assets/wrappers/Modal';

interface ModalProps {
  children: React.ReactElement;
  display: boolean;
  setDisplay: (display: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, display, setDisplay }) => {
  const onClickExceptChild = (e: React.MouseEvent) => {
    if (e.currentTarget !== e.target) return;
    setDisplay(false);
  };

  if (display) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = 'scroll';
  }

  return (
    <Wrapper
      onClick={onClickExceptChild}
      style={{ display: display ? 'flex' : 'none' }}
    >
      {children}
    </Wrapper>
  );
};

export default Modal;
