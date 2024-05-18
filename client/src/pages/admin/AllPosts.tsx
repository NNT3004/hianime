import React, { useEffect, useState } from 'react';
import Wrapper from '../../assets/wrappers/AllPosts';
import Pagination from '../../components/Pagination';
import PostCardE from '../../components/postcard/PostCardE';
import { useNavigate } from 'react-router-dom';
import HeadNav from '../../components/HeadNav';
import SearchForm from '../../components/SearchForm';
import { getAuthClient } from '../../api/client';
import { message } from 'antd';
import { AxiosError } from 'axios';
import Loading from '../../components/Loading';

const AllPosts: React.FC = () => {
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState<number>(1);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed'
  >('idle');
  const [posts, setPosts] = useState<
    {
      _id: string;
      title: string;
      posterVerticalPath: string;
      duration: string;
      episodeCount: string;
      type: string;
    }[]
  >([]);
  useEffect(() => {
    if (status === 'idle') {
      const getAllPosts = async () => {
        try {
          setStatus('loading');
          const response = await getAuthClient().get('/posts');
          setPosts(response.data.posts);
          setStatus('succeeded');
        } catch (err) {
          const error = err as AxiosError;
          message.error((error.response!.data as any).msg);
          setStatus('failed');
        }
      };
      getAllPosts();
    }
  }, [status]);

  const isLoading = status === 'idle' || status === 'loading';

  return (
    <>
      <SearchForm />
      <Wrapper>
        <HeadNav navs={[{ name: 'Posts' }]} />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className='posts-container'>
              {posts.map((post, index) => {
                return (
                  <PostCardE
                    duration={post.duration}
                    episodeCount={post.episodeCount}
                    imgUrl={post.posterVerticalPath}
                    title={post.title}
                    type={post.type}
                    className='post'
                    key={index}
                    onClick={() => {
                      navigate(post._id);
                    }}
                  />
                );
              })}
            </div>
            <Pagination
              curPage={curPage}
              setCurPage={setCurPage}
              totalPages={10}
            />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default AllPosts;
