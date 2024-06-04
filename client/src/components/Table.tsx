import React, { useEffect, useRef, useState } from 'react';
import Wrapper from '../assets/wrappers/Table';
import { BsThreeDots } from 'react-icons/bs';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Spin } from 'antd';

interface TableProps {
  fields: { title: string; key: string; map?: (v: any) => any }[];
  data: { [key: string]: any }[];
  onUpdateClick: (value: any) => void;
  onDeleteClick: (value: any) => void;
  changeAction?: (value: any) => boolean;
}

const Table: React.FC<TableProps> = ({
  data,
  fields,
  onDeleteClick,
  onUpdateClick,
  changeAction,
}) => {
  return (
    <Wrapper cellSpacing={0} cellPadding={0}>
      <thead>
        <tr>
          {fields.map((value, index) => {
            return <th key={index}>{value.title}</th>;
          })}
          <th key={-1} className='action'></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {fields.map((col, colIndex) => {
                return (
                  <td key={colIndex}>
                    {col.map ? col.map(row[col.key]) : row[col.key]}
                  </td>
                );
              })}
              <td key={-1}>
                {changeAction && changeAction(row) ? (
                  <Spin size='small' />
                ) : (
                  <ActionBtn
                    onDeleteClick={() => onDeleteClick(row)}
                    onUpdateClick={() => onUpdateClick(row)}
                    key={rowIndex}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Wrapper>
  );
};

interface ActionBtnProps {
  onUpdateClick: () => void;
  onDeleteClick: () => void;
  disabled?: boolean;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  onDeleteClick,
  onUpdateClick,
  disabled,
}) => {
  const [show, setShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mouseup', handleClickOutside);
    } else {
      document.removeEventListener('mouseup', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [show]);

  return (
    <div className='action-container'>
      <button
        className='action-btn'
        onClick={() => setShow(true)}
        disabled={disabled}
      >
        <BsThreeDots className='btn-icon' />
      </button>
      {show && (
        <div className='btn-menu' ref={ref}>
          <div
            className='btn-item'
            onClick={() => {
              setShow(false);
              onUpdateClick();
            }}
          >
            <FaEdit />
            <span>Edit</span>
          </div>
          <div className='sep' />
          <div
            className='btn-item'
            onClick={() => {
              console.log(show);
              setShow(false);
              onDeleteClick();
            }}
          >
            <FaTrash />
            <span>Delete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
