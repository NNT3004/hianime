import React from 'react';
import Wrapper from '../assets/wrappers/SearchForm';
import PrimaryButton from './PrimaryButton';
import HeadNav from './HeadNav';
import { DatePicker, Select } from 'antd';
import { FaFilter } from "react-icons/fa";

interface SearchFormProps {}

const SearchForm: React.FC<SearchFormProps> = () => {
  return (
    <Wrapper>
      <HeadNav navs={[{ name: 'Filter' }]} />
      <div className='card-container'>
        <div className='filter'>
          <div className='filter-item'>
            <label htmlFor='type' className='what'>
              Type
            </label>
            <Select
              style={{ flexGrow: 1 }}
              id='type'
              defaultValue='all'
              options={[
                { value: 'all', label: 'All' },
                { value: 'tv', label: 'TV' },
                { value: 'movie', label: 'Movie' },
                { value: 'ova', label: 'OVA' },
                { value: 'ona', label: 'ONA' },
              ]}
            />
          </div>
          <div className='filter-item'>
            <label htmlFor='status' className='what'>
              Status
            </label>
            <Select
              style={{ flexGrow: 1 }}
              defaultValue='all'
              id='status'
              options={[
                { value: 'all', label: 'All' },
                { value: '0', label: 'Finished Airing' },
                { value: '1', label: 'Currently Airing' },
                { value: '2', label: 'Not yet aired' },
              ]}
            />
          </div>
          <div className='filter-item'>
            <label htmlFor='season' className='what'>
              Season
            </label>
            <Select
              style={{ flexGrow: 1 }}
              defaultValue='all'
              id='season'
              options={[
                { value: 'all', label: 'All' },
                { value: 'spring', label: 'Spring' },
                { value: 'summer', label: 'Summer' },
                { value: 'fall', label: 'Fall' },
                { value: 'winter', label: 'Winter' },
              ]}
            />
          </div>
          <div className='filter-item'>
            <label htmlFor='year' className='what'>
              Year
            </label>
            <DatePicker picker='year' id='year' style={{ flexGrow: 1 }}/>
          </div>
          <div className='filter-item'>
            <label htmlFor='sort' className='what'>
              Sort
            </label>
            <Select
              style={{ flexGrow: 1 }}
              defaultValue='0'
              id='sort'
              options={[
                { value: '0', label: 'Name A-Z' },
                { value: '1', label: 'Name Z-A' },
                { value: '2', label: 'Recently added' },
                { value: '3', label: 'Recently updated' },
              ]}
            />
          </div>
        </div>
        <div className='genres'>
          <label htmlFor='genres' className='what'>
            Genres
          </label>
          <Select
            mode='multiple'
            allowClear
            style={{ flexGrow: 1 }}
            placeholder='Genres'
            id='genres'
            options={[
              { value: 'comdey', label: 'Comedy' },
              { value: 'horror', label: 'Horror' },
              { value: 'fiction', label: 'Fiction' },
            ]}
          />
        </div>
        <div className='btn-container'>
          <PrimaryButton startIcon={FaFilter}>Filter</PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchForm;
