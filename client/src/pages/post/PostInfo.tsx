import React from 'react';
import Wrapper from '../../assets/wrappers/PostInfo';
import { GoDotFill } from 'react-icons/go';
import { FaClosedCaptioning, FaPlay, FaPlus } from 'react-icons/fa';
import PrimaryButton from '../../components/PrimaryButton';

interface PostInfoProps {
  imgUrl: string;
  title: string;
  episodeCount: number;
  type: string;
  duration: string;
  description: string;
  aired: string;
  premiered: string;
  status: string;
  genres: string[];
  studio: string;
}

const PostInfo: React.FC<PostInfoProps> = ({
  aired,
  description,
  duration,
  episodeCount,
  genres,
  imgUrl,
  premiered,
  status,
  studio,
  title,
  type,
}) => {
  return (
    <Wrapper>
      <div className='poster'>
        <img alt='poster' src={imgUrl} />
      </div>
      <div className='summary'>
        <p className='nav'>
          <span>Home</span>
          <GoDotFill className='sep-dot' />
          <span>{type}</span>
          <GoDotFill className='sep-dot' />
          <span>{title}</span>
        </p>
        <p className='title'>{title}</p>
        <div className='meta-info'>
          <span className='item'>
            <FaClosedCaptioning className='icon' />
            <span className='text'>{episodeCount}</span>
          </span>
          <GoDotFill className='sep-dot' />
          <span>{type}</span>
          <GoDotFill className='sep-dot' />
          <span>{duration}</span>
        </div>
        <div className='btn-container'>
          <PrimaryButton startIcon={FaPlay} className='btn'>
            Watch now
          </PrimaryButton>
          <PrimaryButton startIcon={FaPlus} className='btn-white btn'>
            Add to list
          </PrimaryButton>
        </div>
        <p className='description'>{description}</p>
      </div>
      <div className='info-container'>
        <p>
          <span className='label'>Aired:</span>
          <span>{aired}</span>
        </p>
        <p>
          <span className='label'>Premiered:</span>
          <span>{premiered}</span>
        </p>
        <p>
          <span className='label'>Duration:</span>
          <span>{duration}</span>
        </p>
        <p>
          <span className='label'>Status:</span>
          <span>{status}</span>
        </p>
        <div className='sep' />
        <p>
          <span className='label'>Genres:</span>
          {genres.map((value, index) => {
            return (
              <span key={index} className='genre'>
                {value}
              </span>
            );
          })}
        </p>
        <div className='sep' />
        <p>
          <span className='label'>Studio:</span>
          <span>{studio}</span>
        </p>
      </div>
    </Wrapper>
  );
};

export default PostInfo;
