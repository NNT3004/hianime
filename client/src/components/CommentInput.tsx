import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/CommentInput';
import { Input } from 'antd';
import PrimaryButton from './PrimaryButton';

const { TextArea } = Input;

interface CommentInputProps {}

const CommentInput: React.FC<CommentInputProps> = () => {
  const [isFocus, setFocus] = useState<boolean>(false);

  return (
    <Wrapper>
      <div className='left'>
        <img alt='avt' src={process.env.PUBLIC_URL + '/99225206_p0.png'} />
      </div>
      <div className='right'>
        <p className='header'>Comment as Kino</p>
        <TextArea
          autoSize={{ minRows: 2 }}
          maxLength={200}
          className='comment'
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {isFocus && (
          <div className='btn-container'>
            <PrimaryButton className='cancel'>Cancel</PrimaryButton>
            <PrimaryButton>Comment</PrimaryButton>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CommentInput;
