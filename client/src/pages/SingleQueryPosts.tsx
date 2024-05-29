import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthClient } from '../api/client';
import Loading from '../components/Loading';
import PostCardI from '../components/postcard/PostCardI';
import Wrapper from '../assets/wrappers/SingleQueryPosts';
import { IoFilm } from 'react-icons/io5';
import { message } from 'antd';
import { AxiosError } from 'axios';
import Pagination from '../components/Pagination';

interface SingleQueryPostsProps {
  className?: string;
}

interface Post {
  _id: string;
  title: string;
  posterVerticalPath: string;
  type: string;
  duration: number;
  episodeCount: number;
}

const SingleQueryPosts: React.FC<SingleQueryPostsProps> = ({ className }) => {
  const navigate = useNavigate();

  const [curPage, setCurPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (loading === false) {
      const getAllPosts = async () => {
        try {
          setLoading(true);
          const response = await getAuthClient().get(`/posts?page=${curPage}`);
          setPosts(response.data.posts);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        } catch (err) {
          const error = err as AxiosError;
          message.error((error.response!.data as any).msg);
          setLoading(false);
        }
      };
      getAllPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage]);

  const handleChangePage = (page: number) => {
    setCurPage(page);
  };

  return (
    <Wrapper className={className}>
      <header>
        <span className='fav-icon'>
          <IoFilm />
        </span>
        <p>recentyl updated</p>
      </header>
      {loading ? (
        <Loading
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        <div className='container'>
          {posts.map((post) => {
            return (
              <PostCardI
                duration={post.duration}
                episodeCount={post.episodeCount}
                imgUrl={post.posterVerticalPath}
                title={post.title}
                type={post.type}
                className='post'
                key={post._id}
                onClick={() => {
                  navigate(`/posts/${post._id}`);
                }}
              />
            );
          })}
        </div>
      )}
      <Pagination
        disabled={loading}
        curPage={curPage}
        setCurPage={handleChangePage}
        totalPages={totalPages}
      />
    </Wrapper>
  );
};

export default SingleQueryPosts;
