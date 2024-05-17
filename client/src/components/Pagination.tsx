import React, { useMemo } from 'react';
import Wrapper from '../assets/wrappers/Pagination';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleRight,
} from 'react-icons/fa';

interface PaginationProps {
  totalPages: number;
  curPage: number;
  setCurPage: (page: number | ((page: number) => number)) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  curPage,
  totalPages,
  setCurPage,
}) => {
  const pages = useMemo<number[]>(
    () => getSurroundingPages(totalPages, curPage),
    [curPage, totalPages]
  );
  return (
    <Wrapper>
      {curPage > 2 && (
        <nav onClick={() => setCurPage(1)}>
          <FaAngleDoubleLeft />
        </nav>
      )}
      {curPage > 1 && (
        <nav onClick={() => setCurPage((page) => page - 1)}>
          <FaAngleLeft />
        </nav>
      )}
      {pages.map((page) => {
        return (
          <nav key={page} className={curPage === page ? 'activate' : ''} onClick={() => setCurPage(page)}>
            {page}
          </nav>
        );
      })}
      {curPage < totalPages && (
        <nav>
          <FaAngleRight onClick={() => setCurPage((page) => page + 1)}/>
        </nav>
      )}
      {curPage < totalPages - 1 && (
        <nav>
          <FaAngleDoubleRight onClick={() => setCurPage(totalPages)}/>
        </nav>
      )}
    </Wrapper>
  );
};

export default Pagination;

const getSurroundingPages = (totalPages: number, page: number) => {
  if (page < 1 || page > totalPages) {
    return [];
  }

  const leftPage = Math.max(1, page - 2);
  const rightPage = Math.min(totalPages, page + 2);

  const surroundingPages: number[] = [];
  for (let i = leftPage; i <= rightPage; ++i) {
    surroundingPages.push(i);
  }
  return surroundingPages;
};
