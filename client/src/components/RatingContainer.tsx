import React from 'react';
import Wrapper from '../assets/wrappers/RatingContainer';
import Rating from './Rating';
import { FaClosedCaptioning } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';

const RatingContainer: React.FC = () => {
  return (
    <Wrapper>
      <div className='poster'>
        <img alt='poster' src={process.env.PUBLIC_URL + '/98240316_p0.png'} />
      </div>
      <div className='info'>
        <p className='title'>Jellyfish Can't Swim in the Night</p>
        <div className='meta-info'>
          <span className='item'>
            <FaClosedCaptioning className='icon' />
            <span className='text'>12</span>
          </span>
          <GoDotFill className='sep-dot' />
          <span>TV</span>
          <GoDotFill className='sep-dot' />
          <span>23m</span>
        </div>
      </div>
      <div className='rating-container'>
        <Rating className='rating'/>
      </div>
    </Wrapper>
  );
};

export default RatingContainer;
