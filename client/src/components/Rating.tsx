import React from 'react';
import Wrapper from '../assets/wrappers/Rating';
import { FaStar } from 'react-icons/fa';
import { FaFaceGrinStars, FaFaceGrimace, FaFaceGrin } from 'react-icons/fa6';

interface RatingProps {
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <section className='score-info'>
        <div className='score'>
          <FaStar className='star' />
          <span>9.2</span>
        </div>
        <p>Vote now</p>
      </section>
      <section className='quote'>What do you think about this anime?</section>
      <li className='btn-container'>
        <ul className='btn'>
          <FaFaceGrimace className='icon' />
          <span>Boring</span>
        </ul>
        <ul className='btn'>
          <FaFaceGrin className='icon' />
          <span>Good</span>
        </ul>
        <ul className='btn'>
          <FaFaceGrinStars className='icon' />
          <span>Great</span>
        </ul>
      </li>
    </Wrapper>
  );
};

export default Rating;
