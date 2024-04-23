import React from 'react';
import Wrapper from '../../assets/wrappers/postcard/PostCardU';
import { FaClosedCaptioning, FaDotCircle } from 'react-icons/fa';

interface PostCardUProps {
  className?: string;
  imgUrl: string;
  title: string;
  episodeCount: number;
  type: string;
}

const PostCardU: React.FC<PostCardUProps> = ({
  className,
  episodeCount,
  imgUrl,
  title,
  type,
}) => {
  return (
    <Wrapper className={className}>
      <img src={imgUrl} alt='poster' />
      <div className='info'>
        <div className='title'>{title}</div>
        <span className='meta-info'>
          <span className='count-item'>
            <FaClosedCaptioning className='icon' />
            <span className='text'>{episodeCount}</span>
          </span>
          <FaDotCircle className='sep' />
          <span className='type'>{type}</span>
        </span>
      </div>
    </Wrapper>
  );
};

export default PostCardU;
