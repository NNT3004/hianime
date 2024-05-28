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
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);
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
    <>
      <SearchForm />
      <Wrapper>
        <HeadNav navs={[{ name: 'Posts' }]} />
        {loading ? (
          <Loading />
        ) : (
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
        )}
        <Pagination
          disabled={loading}
          curPage={curPage}
          setCurPage={handleChangePage}
          totalPages={totalPages}
        />
      </Wrapper>
    </>
  );
};

export default AllPosts;
