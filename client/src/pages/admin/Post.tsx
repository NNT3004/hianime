import React from 'react';
import Wrapper from '../../assets/wrappers/admin/Post';
import PostForm from '../../components/PostForm';
import HeadNav from '../../components/HeadNav';

const Post: React.FC = () => {
  return (
    <Wrapper>
      <HeadNav
        navs={[{ name: 'Posts', to: '/admin/posts' }, { name: 'Korekara' }]}
      />
      <div className='card-container'>
        <PostForm />
      </div>
    </Wrapper>
  );
};

export default Post;
