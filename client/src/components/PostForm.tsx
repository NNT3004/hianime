import React, { useEffect, useMemo, useState } from 'react';
import Wrapper from '../assets/wrappers/PostForm';
import {
  Input,
  Select,
  InputNumber,
  DatePicker,
  notification,
  message,
} from 'antd';
import ImageUpload from './ImageUpload';
import PrimaryButton from './PrimaryButton';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { SiSteelseries } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectGenres } from '../store/slices/genresSlice';
import { selectStudios } from '../store/slices/studiosSlice';
import { client, getAuthClient } from '../api/client';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Loading from './Loading';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

interface PostFormProps {
  _id?: string;
}

interface Post {
  _id: string;
  title: string;
  posterVerticalPath: string;
  posterHorizonPath: string;
  description: string;
  type: string;
  airedFrom: string;
  airedTo: string;
  status: string;
  duration: string;
  studio: string;
  group: string;
  genres: string[];
}

const getInitialPost = () => {
  return {
    _id: '',
    title: '',
    posterVerticalPath: '',
    posterHorizonPath: '',
    description: '',
    type: '',
    airedFrom: '2024/05/18',
    airedTo: '2025/05/18',
    status: '',
    duration: '',
    studio: '',
    group: '',
    genres: [],
  };
};

const PostForm: React.FC<PostFormProps> = ({ _id }) => {
  const navigate = useNavigate();

  const genres = useSelector(selectGenres);
  const studios = useSelector(selectStudios);

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed'
  >('idle');

  const [firstGet, setFirstGet] = useState(false);

  const genresSelect = useMemo(
    () =>
      genres.map((genre) => {
        return { value: genre._id, label: genre.name };
      }),
    [genres]
  );

  const studiosSelect = useMemo(
    () =>
      studios.map((studio) => {
        return { value: studio._id, label: studio.name };
      }),
    [studios]
  );
  const [api, contextHolder] = notification.useNotification();

  const [post, setPost] = useState<Post>(getInitialPost());

  useEffect(() => {
    if (_id && status === 'idle') {
      const getPost = async () => {
        try {
          setStatus('loading');
          setFirstGet(true);
          const response = await client.get(`/posts/${_id}`);
          setStatus('succeeded');
          setPost(response.data.post);
        } catch (err) {
          setStatus('failed');
          const error = err as AxiosError;
          api.error({
            message: 'Error',
            description: (error.response!.data as { msg: string }).msg,
            duration: 0,
          });
        }
        setFirstGet(false);
      };
      getPost();
    }
  }, [status, _id, api]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({ ...post, [e.target.id]: e.target.value });
  };

  const loading =
    status === 'loading' || ((_id && status === 'idle') as boolean);

  const handleSubmit = async () => {
    if (_id) {
      try {
        setStatus('loading');
        const response = await getAuthClient().put(`/posts/${_id}`, post);
        setStatus('succeeded');
        setPost(response.data.post);
        message.success('updated successfully');
      } catch (err) {
        setStatus('failed');
        const error = err as AxiosError;
        message.error((error.response!.data as { msg: string }).msg);
      }
    } else {
      try {
        setStatus('loading');
        const response = await getAuthClient().post(`/posts`, post);
        setStatus('succeeded');
        setPost(response.data.post);
        setPost(getInitialPost());
        message.success('added successfully');
      } catch (err) {
        setStatus('failed');
        const error = err as AxiosError;
        message.error((error.response!.data as { msg: string }).msg);
      }
    }
  };

  if (loading && firstGet) {
    return <Loading />;
  }

  return (
    <Wrapper>
      {contextHolder}
      <div className='wrapper'>
        <div className='form-row'>
          <label htmlFor='title'>Title</label>
          <Input
            type='text'
            id='title'
            className='input'
            value={post.title}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='description'>Description</label>
          <TextArea
            id='description'
            autoSize={{ minRows: 2 }}
            maxLength={8192}
            className='input'
            value={post.description}
            onChange={handleChange}
          />
        </div>
        <div className='form-row'>
          <div className='col'>
            <label htmlFor='duration'>Duration</label>
            <InputNumber
              id='duration'
              className='input'
              value={post.duration}
              onChange={(duration) => {
                if (duration) setPost({ ...post, duration });
              }}
            />
          </div>
          <div className='col'>
            <label htmlFor='type'>Type</label>
            <Select
              id='type'
              value={post.type}
              onChange={(type) => setPost({ ...post, type })}
              options={[
                { value: 'tv', label: 'TV' },
                { value: 'movie', label: 'Movie' },
                { value: 'ova', label: 'OVA' },
                { value: 'ona', label: 'ONA' },
              ]}
              className='input'
            />
          </div>
        </div>
        <div className='form-row'>
          <label htmlFor='aired'>Aired</label>
          <RangePicker
            id='aired'
            className='input'
            value={[
              dayjs(post.airedFrom, dateFormat),
              dayjs(post.airedTo, dateFormat),
            ]}
            format={dateFormat}
            onChange={(_, dateStrings) => {
              const airedFrom = dateStrings[0];
              const airedTo = dateStrings[1];
              setPost({ ...post, airedFrom, airedTo });
            }}
          />
        </div>
        <div className='form-row'>
          <div className='col'>
            <label htmlFor='studio'>Studio</label>
            <Select
              id='studio'
              options={studiosSelect}
              className='input'
              value={post.studio}
              onChange={(studio) => setPost({ ...post, studio })}
            />
          </div>
          <div className='col'>
            <label htmlFor='status'>Status</label>
            <Select
              id='status'
              value={post.status}
              onChange={(status) => setPost({ ...post, status })}
              options={[
                { value: 'completed', label: 'Finished Airing' },
                { value: 'airing', label: 'Currently Airing' },
                { value: 'waiting', label: 'Not yet aired' },
              ]}
              className='input'
            />
          </div>
        </div>
        <div className='form-row'>
          <label htmlFor='genres'>Genres</label>
          <Select
            id='genres'
            mode='multiple'
            allowClear
            placeholder='Please select'
            options={genresSelect}
            className='input'
            value={post.genres}
            onChange={(genres) => setPost({ ...post, genres })}
          />
        </div>
        <div className='form-row'></div>
        <div className='form-row'>
          <div className='col-ver'>
            <label htmlFor='ver-poster'>Vertical Poster</label>
            <ImageUpload
              imageUrl={post.posterVerticalPath}
              setImageUrl={(posterVerticalPath: string) => {
                setPost({ ...post, posterVerticalPath });
              }}
              className='ver-poster'
            />
          </div>
          <div className='col-ver'>
            <label htmlFor='hor-poster'>Horizon Poster</label>
            <ImageUpload
              imageUrl={post.posterHorizonPath}
              setImageUrl={(posterHorizonPath: string) => {
                setPost({ ...post, posterHorizonPath });
              }}
              className='hor-poster'
            />
          </div>
        </div>
        <div className='btns'>
          {_id && (
            <PrimaryButton
              startIcon={SiSteelseries}
              onClick={() => navigate(`/admin/posts/${_id}/episodes`)}
              disabled={loading}
            >
              Epsodes
            </PrimaryButton>
          )}
          <PrimaryButton
            startIcon={FaCloudUploadAlt}
            onClick={handleSubmit}
            disabled={loading}
          >
            {_id ? 'Update' : 'Add'}
          </PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

const TextArea = Input.TextArea;
const RangePicker = DatePicker.RangePicker;

export default PostForm;
