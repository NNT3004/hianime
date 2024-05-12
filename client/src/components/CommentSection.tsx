import React from 'react';
import Wrapper from '../assets/wrappers/CommentSection';
import CommentInput from './CommentInput';
import Comment from './Comment';

interface CommentSectionProps {}

const dump = [1, 1, 1, 1, 1, 1];

const CommentSection: React.FC<CommentSectionProps> = () => {
  return (
    <Wrapper>
      <header>
        <p>comment</p>
      </header>
      <CommentInput />
      <div className='comment-container'>
        {dump.map((_, index) => {
          return <Comment />;
        })}
      </div>
    </Wrapper>
  );
};

export default CommentSection;
