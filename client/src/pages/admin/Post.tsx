import React from 'react';
import Wrapper from '../../assets/wrappers/admin/Post';
import PostForm from '../../components/PostForm';

const Post: React.FC = () => {
  return (
    <Wrapper>
      <div className="container">
        <PostForm />
      </div>
    </Wrapper>
  );
};

export default Post;
