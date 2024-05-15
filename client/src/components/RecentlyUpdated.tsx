import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/RecentlyUpdated';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import PostCardI from './postcard/PostCardI';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';

const dump = Array.from(Array(9).keys());

interface RecentlyUpdatedProps {
  className?: string;
}

const RecentlyUpdated: React.FC<RecentlyUpdatedProps> = ({ className }) => {
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState<number>(1);
  return (
    <Wrapper className={className}>
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
              imgUrl={process.env.PUBLIC_URL + '98240316_p0.png'}
              title='Kore kara watashi tachi ha'
              type='TV'
              className='post'
              key={index}
              onClick={() => {
                navigate('/posts/1');
              }}
            />
          );
        })}
      </div>
      <Pagination curPage={curPage} totalPages={20} setCurPage={setCurPage} />
    </Wrapper>
  );
};

export default RecentlyUpdated;
