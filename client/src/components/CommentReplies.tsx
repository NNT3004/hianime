import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/CommentReplies';
import PrimaryButton from './PrimaryButton';
import { GoTriangleDown } from 'react-icons/go';

interface CommentRepliesProps {}

const CommentReplies: React.FC<CommentRepliesProps> = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const handleClicked = () => {
    setShow((isShow) => !isShow);
  };
  return (
    <Wrapper>
      <PrimaryButton
        startIcon={GoTriangleDown}
        className={`${isShow ? 'rotated ' : ''}view-reply-btn`}
        onClick={handleClicked}
      >
        {isShow ? 'Hide replies' : 'View replies'}
      </PrimaryButton>
    </Wrapper>
  );
};

export default CommentReplies;
