import React from 'react';
import Wrapper from '../assets/wrappers/Comment';
import { FaReply, FaRegThumbsUp,FaRegThumbsDown } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';
import CommentReplies from './CommentReplies';

interface CommentProps {}

const Comment: React.FC<CommentProps> = () => {
  return (
    <Wrapper>
      <div className='left'>
        <img alt='avt' src={process.env.PUBLIC_URL + '/99225206_p0.png'} />
      </div>
      <div className='right'>
        <div className='header'>
          <span className='name'>John Lennon</span>
          <span className='time'>1 hour ago</span>
        </div>
        <p className='content'>imagine there's no heaven</p>
        <div className='btn-container'>
          <PrimaryButton startIcon={FaReply}>Reply</PrimaryButton>
          <PrimaryButton startIcon={FaRegThumbsUp}>{'1'}</PrimaryButton>
          <PrimaryButton startIcon={FaRegThumbsDown}>1</PrimaryButton>
        </div>
        <CommentReplies />
      </div>
    </Wrapper>
  );
};

export default Comment;
