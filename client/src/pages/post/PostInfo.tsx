import React, { useEffect, useState } from 'react';
import Wrapper from '../../assets/wrappers/PostInfo';
import { GoDotFill } from 'react-icons/go';
import { FaClosedCaptioning, FaPlay, FaPlus, FaTrash } from 'react-icons/fa';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import { client, getAuthClient } from '../../api/client';
import Loading from '../../components/Loading';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';
import { AxiosError } from 'axios';
import { message } from 'antd';

interface Post {
  _id: string;
  title: string;
  posterVerticalPath: string;
  description: string;
  type: string;
  airedFrom: string;
  airedTo: string;
  status: string;
  duration: number;
  episodeCount: number;
  studio: { _id: string; name: string };
  genres: { _id: string; name: string }[];
}

interface PostInfoProps {
  className?: string;
}

const PostInfo: React.FC<PostInfoProps> = ({ className }) => {
  const navigate = useNavigate();

  const { postId } = useParams();

  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState<Post>();
  const [isFavorited, setFavorited] = useState(false);
  const [actionLoading, setActionLoaind] = useState(false);

  useEffect(() => {
    const getPostInfo = async () => {
      setLoading(true);
      try {
        const response = await client.get(`/posts/${postId}?info=true`);
        setPost(response.data.post);

        if (user) {
          const { isFavorited } = (
            await getAuthClient().get(`/favorites/isFavorited?post=${postId}`)
          ).data;
          setFavorited(isFavorited);
        }
      } catch (err) {
        navigate('/home');
      }
      setLoading(false);
    };
    getPostInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const deleteFavorite = async (post?: string) => {
    if (!post) return;
    setActionLoaind(true);

    try {
      await getAuthClient().delete(`/favorites?post=${post}`);
      setFavorited(false);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }

    setActionLoaind(false);
  };

  const addFavorite = async (post?: string) => {
    if (!post) return;
    setActionLoaind(true);

    try {
      await getAuthClient().post(`/favorites?post=${post}`);
      setFavorited(true);
    } catch (err) {
      const error = err as AxiosError;
      message.error((error.response?.data as any).msg);
    }

    setActionLoaind(false);
  };

  if (loading) {
    return (
      <Loading
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  return (
    <Wrapper className={className}>
      <div className='poster'>
        <img alt='poster' src={post?.posterVerticalPath} />
      </div>
      <div className='summary'>
        <p className='nav'>
          <span onClick={() => navigate('/home')}>Home</span>
          <GoDotFill className='sep-dot' />
          <span>
            {post?.type === 'movie' ? 'Movie' : post?.type.toUpperCase()}
          </span>
          <GoDotFill className='sep-dot' />
          <span className='cgrey'>{post?.title}</span>
        </p>
        <p className='title'>{post?.title}</p>
        <div className='meta-info'>
          <span className='item'>
            <FaClosedCaptioning className='icon' />
            <span className='text'>{post?.episodeCount}</span>
          </span>
          <GoDotFill className='sep-dot' />
          <span>
            {post?.type === 'movie' ? 'Movie' : post?.type.toUpperCase()}
          </span>
          <GoDotFill className='sep-dot' />
          <span>{post?.duration + 'm'}</span>
        </div>
        <div className='btn-container'>
          <PrimaryButton
            startIcon={FaPlay}
            className='btn'
            onClick={() => {
              navigate(`/posts/${postId}/episodes`);
            }}
          >
            Watch now
          </PrimaryButton>
          {isFavorited ? (
            <PrimaryButton
              startIcon={FaTrash}
              className='btn-red btn'
              onClick={() => deleteFavorite(postId)}
              disabled={actionLoading}
            >
              Favorited
            </PrimaryButton>
          ) : (
            <PrimaryButton
              startIcon={FaPlus}
              className='btn-white btn'
              onClick={() => addFavorite(postId)}
              disabled={actionLoading}
            >
              Favorite
            </PrimaryButton>
          )}
        </div>
        <p className='description'>{post?.description}</p>
      </div>
      <div className='info-container'>
        <p>
          <span className='label'>Aired:</span>
          <span>
            {new Date(post?.airedFrom || '').toLocaleDateString() +
              ' - ' +
              new Date(post?.airedTo || '').toLocaleDateString()}
          </span>
        </p>
        <p>
          <span className='label'>Premiered:</span>
          <span>{getSeasonYear(new Date(post?.airedFrom || ''))}</span>
        </p>
        <p>
          <span className='label'>Duration:</span>
          <span>{post?.duration}</span>
        </p>
        <p>
          <span className='label'>Status:</span>
          <span className='capitalize'>{post?.status}</span>
        </p>
        <div className='sep' />
        <p>
          <span className='label'>Genres:</span>
          {post?.genres.map((genre) => {
            return (
              <span key={genre._id} className='genre'>
                {genre.name}
              </span>
            );
          })}
        </p>
        <div className='sep' />
        <p>
          <span className='label'>Studio:</span>
          <span>{post?.studio.name}</span>
        </p>
      </div>
    </Wrapper>
  );
};

export default PostInfo;

function getSeasonYear(date: Date): string {
  const month = date.getMonth() + 1;
  let season: string;
  let year: number;

  switch (true) {
    case month >= 3 && month <= 5:
      season = 'Spring';
      break;
    case month >= 6 && month <= 8:
      season = 'Summer';
      break;
    case month >= 9 && month <= 11:
      season = 'Fall';
      break;
    default:
      season = 'Winter';
  }

  if (month >= 3) {
    year = date.getFullYear();
  } else {
    year = date.getFullYear() - 1;
  }

  return `${season} ${year}`;
}
