import React from 'react';
import Wrapper from '../../assets/wrappers/postcard/PostCardA';
import { FaCalendarTimes } from 'react-icons/fa';

interface PostCardAProps {
  title: string;
  description: string;
  airedDate: string;
  $imgUrl: string;
  className?: string;
}

const PostCardA: React.FC<PostCardAProps> = ({
  title,
  description,
  airedDate,
  className,
  $imgUrl,
}) => {
  return (
    <Wrapper {...{ className, $imgUrl }}>
      <div className='shadow'>
        <div className='content'>
          <h1 className='title'>{title}</h1>
          <div className='info'>
            <span className='info-item'>
              <FaCalendarTimes className='icon' />
              <span className='text'>{airedDate}</span>
            </span>
            <span className='info-item'>
              <FaCalendarTimes className='icon' />
              <span className='text'>{airedDate}</span>
            </span>
          </div>
          <div className='description'>{description}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PostCardA;
