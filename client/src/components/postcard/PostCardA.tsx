import React from 'react';
import Wrapper from '../../assets/wrappers/postcard/PostCardA';
import { FaCalendarTimes, FaPlay, FaAngleRight } from 'react-icons/fa';
import PrimaryButton from '../PrimaryButton';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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
          <div className='nav-container'>
          <PrimaryButton startIcon={FaPlay} className='nav' onClick={() => {navigate('/posts/1/episodes/1')}}>
            Watch now
          </PrimaryButton>
          <PrimaryButton endIcon={FaAngleRight} className='nav-white nav' onClick={() => {navigate('/posts/1')}}>
            Details
          </PrimaryButton>
        </div>
          <div className='description'>{description}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PostCardA;
