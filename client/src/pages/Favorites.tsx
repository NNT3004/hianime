import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthClient } from '../api/client';
import Loading from '../components/Loading';
import PostCardI from '../components/postcard/PostCardI';
import Wrapper from '../assets/wrappers/Favorites';
import { FaTimes, FaHeart } from 'react-icons/fa';
import { message } from 'antd';
import { AxiosError } from 'axios';

interface FavoritesProps {
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

const Favorites: React.FC<FavoritesProps> = ({ className }) => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed'
  >('idle');

  const [actionLoading, setActionLoaind] = useState(false);

  const loading = status === 'idle' || status === 'loading';

  const [favorites, setFavorites] = useState<Post[]>([]);

  useEffect(() => {
    if (status === 'idle') {
      const getMyFavorites = async () => {
        setStatus('loading');
        try {
          const response = await getAuthClient().get(`/favorites`);
          setFavorites(response.data.favorites);
          setStatus('succeeded');
        } catch (err) {
          setStatus('failed');
        }
      };
      getMyFavorites();
    }
  }, [status]);

  const deleteFavorite = async (post: string) => {
    setActionLoaind(true);

    try {
      await getAuthClient().delete(`/favorites?post=${post}`);
      setFavorites([...favorites.filter((favorite) => favorite._id !== post)]);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }

    setActionLoaind(false);
  };

  return (
    <Wrapper className={className}>
      <header>
        <span className='fav-icon'>
          <FaHeart />
        </span>
        <p>my favorites</p>
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
          {favorites.map((post) => {
            return (
              <div className='post-with-btn'>
                <PostCardI
                  duration={post.duration + 'm'}
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
                <button
                  className='delete-btn'
                  onClick={() => deleteFavorite(post._id)}
                  disabled={actionLoading}
                >
                  <FaTimes />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default Favorites;
