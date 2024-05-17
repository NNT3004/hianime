import React from 'react';
import Wrapper from '../../assets/wrappers/admin/EpisodeForm';
import { InputNumber, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PrimaryButton from '../../components/PrimaryButton';
import { FaCheckDouble } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

interface EpisodeProps {
  id?: string;
  episodeNumber: number;
  title: string;
  releaseDate: string;
}

const EpisodeFrom: React.FC<EpisodeProps> = ({
  episodeNumber,
  releaseDate,
  title,
  id,
}) => {
  return (
    <Wrapper>
      <div className='form-container'>
        <p className='for-what'>{id ? 'Edit episode' : 'Update episode'}</p>
        <div className='form-row'>
          <label htmlFor='ep-number'>EP Number</label>
          <InputNumber defaultValue={episodeNumber} className='input' />
        </div>
        <div className='form-row'>
          <label htmlFor='title'>Title</label>
          <Input
            type='text'
            id='title'
            className='input'
            defaultValue={title}
          />
        </div>
        <div className='form-row'>
          <label htmlFor='release-date'>Release date</label>
          <DatePicker
            defaultValue={dayjs(releaseDate, dateFormat)}
            format={dateFormat}
            id='release-date'
            className='input'
          />
        </div>
        <div className='btn-container'>
          <PrimaryButton startIcon={FaCheckDouble}>Update</PrimaryButton>
          <PrimaryButton startIcon={FaTimes} className='btn-cancel'>
            Cancel
          </PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default EpisodeFrom;
