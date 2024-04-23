import React from 'react';
import Wrapper from '../assets/wrappers/RecentlyUpdated';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import PostCardI from './postcard/PostCardI';

const dump = Array.from(Array(8).keys());

const RecentlyUpdated: React.FC = () => {
  return (
    <Wrapper>
      <header>
        <p>recently updated</p>
        <nav>
          <button disabled={true} onClick={() => console.log('232323')}>
            <FaAngleLeft />
          </button>
          <button>
            <FaAngleRight />
          </button>
        </nav>
      </header>
      <div className='container'>
        {dump.map((_, index) => {
          return (
            <PostCardI
              duration='23m'
              episodeCount={12 + index}
              imgUrl={process.env.PUBLIC_URL + '99225206_p0.png'}
              title='Kore kara watashi tachi ha'
              type='TV'
              className='post'
              key={index}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default RecentlyUpdated;
