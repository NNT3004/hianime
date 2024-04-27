import React from 'react';
import Wrapper from '../assets/wrappers/TopAnime';
import PostCardU from './postcard/PostCardU';

const dump = Array.from(Array(9).keys());

interface TopAnimeProps {
  className?: string;
}

const TopAnime: React.FC<TopAnimeProps> = ({ className }) => {
  return (
    <Wrapper className={className}>
      <header>
        <p>Top Anime</p>
        <span>
          <button className='activate'>Day</button>
          <button>Week</button>
          <button>Month</button>
        </span>
      </header>
      <div className='container'>
        {dump.map((_, index) => {
          return (
            <div className='item' key={index}>
              <span className='rank'>{index + 1}</span>
              <PostCardU
                episodeCount={12 + index}
                imgUrl={process.env.PUBLIC_URL + '98240316_p0.png'}
                title='Kore kara watashi tachi ha'
                type='TV'
                className='post'
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default TopAnime;
