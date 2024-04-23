import React from 'react';
import Wrapper from '../assets/wrappers/SearchBar';
import { FaRegTimesCircle } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  return (
    <Wrapper {...{ className }}>
      <button>
        <FaSearch />
      </button>
      <input type='text' />
      <button>
        <FaRegTimesCircle />
      </button>
    </Wrapper>
  );
};

export default SearchBar;
