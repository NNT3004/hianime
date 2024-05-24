import React from 'react';
import Wrapper from '../assets/wrappers/Table';
import { BsThreeDots } from 'react-icons/bs';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface TableProps {
  fields: { title: string; key: string; map?: (v: any) => any }[];
  data: { [key: string]: any }[];
  onUpdateClick: (value: any) => void;
  onDeleteClick: (value: any) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  fields,
  onDeleteClick,
  onUpdateClick,
}) => {
  return (
    <Wrapper cellSpacing={0} cellPadding={0}>
      <thead>
        <tr>
          {fields.map((value, index) => {
            return <th key={index}>{value.title}</th>;
          })}
          <th key={-1}></th>
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
              <td key={-1} className='action'>
                <div className='action-btn'>
                  <BsThreeDots className='action-icon' />
                  <div className='btn-menu'>
                    <div
                      className='btn-item'
                      onClick={() => onUpdateClick(row)}
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </div>
                    <div
                      className='btn-item'
                      onClick={() => onDeleteClick(row)}
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Wrapper>
  );
};

export default Table;
