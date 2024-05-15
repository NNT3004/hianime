import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/AllPosts';
import Pagination from '../../components/Pagination';
import PostCardE from '../../components/postcard/PostCardE';
import { useNavigate } from 'react-router-dom';

const dump = [1, 1, 1, 1, 1, 1, 1, 1, 1];

const AllPosts: React.FC = () => {
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState<number>(1);
  return (
    <Wrapper>
      <div className='post-container'>
        {dump.map((_, index) => {
          return (
            <PostCardE
              duration='23m'
              episodeCount={12 + index}
              imgUrl={process.env.PUBLIC_URL + '/98240316_p0.png'}
              title='Kore kara watashi tachi ha'
              type='TV'
              className='post'
              key={index}
              onClick={() => {
                navigate('1');
              }}
            />
          );
        })}
      </div>
      <Pagination curPage={curPage} setCurPage={setCurPage} totalPages={10} />
    </Wrapper>
  );
};

export default AllPosts;
