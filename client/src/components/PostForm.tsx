import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/PostForm';
import { Input, Select, InputNumber, DatePicker } from 'antd';
import ImageUpload from './ImageUpload';
import PrimaryButton from './PrimaryButton';
import { FaCloudUploadAlt } from 'react-icons/fa';

const PostForm: React.FC = () => {
  const [verImgUrl, setVerImgUrl] = useState<string>('');
  const [horImgUrl, setHorImgUrl] = useState<string>('');

  return (
    <Wrapper>
      <div className='wrapper'>
        <div className='form-row'>
          <label htmlFor='title'>Title</label>
          <Input type='text' id='title' className='input' />
        </div>
        <div className='form-row'>
          <label htmlFor='description'>Description</label>
          <TextArea
            id='description'
            autoSize={{ minRows: 2 }}
            maxLength={200}
            className='input'
          />
        </div>
        <div className='form-row'>
          <div className='col'>
            <label htmlFor='duration'>Duration</label>
            <InputNumber
              id='duration'
              min={1}
              max={400}
              defaultValue={3}
              className='input'
            />
          </div>
          <div className='col'>
            <label htmlFor='type'>Type</label>
            <Select
              id='type'
              defaultValue='tv'
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
          <RangePicker id='aired' className='input' />
        </div>
        <div className='form-row'>
          <div className='col'>
            <label htmlFor='studio'>Studio</label>
            <Select
              id='studio'
              defaultValue='kyoto'
              options={[
                { value: 'liber', label: 'Liber' },
                { value: 'kyoto', label: 'Kyoto Animation' },
                { value: 'mappa', label: 'Mappa' },
                { value: 'madhouse', label: 'Mad House' },
              ]}
              className='input'
            />
          </div>
          <div className='col'>
            <label htmlFor='status'>Status</label>
            <Select
              id='status'
              defaultValue='tv'
              options={[
                { value: 'tv', label: 'Finished Airing' },
                { value: 'movie', label: 'Currently Airing' },
                { value: 'ova', label: 'Not yet aired' },
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
            options={[
              { value: 'comdey', label: 'Comedy' },
              { value: 'horror', label: 'Horror' },
              { value: 'fiction', label: 'Fiction' },
            ]}
            className='input'
          />
        </div>
        <div className='form-row'></div>
        <div className='form-row'>
          <div className='col-ver'>
            <label htmlFor='ver-poster'>Vertical Poster</label>
            <ImageUpload
              imageUrl={verImgUrl}
              setImageUrl={setVerImgUrl}
              id='ver-poster'
            />
          </div>
          <div className='col-ver'>
            <label htmlFor='hor-poster'>Horizon Poster</label>
            <ImageUpload
              imageUrl={horImgUrl}
              setImageUrl={setHorImgUrl}
              id='hor-poster'
            />
          </div>
        </div>
        <div className='btns'>
          <PrimaryButton startIcon={FaCloudUploadAlt}>Update</PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

const TextArea = Input.TextArea;
const RangePicker = DatePicker.RangePicker;

export default PostForm;
