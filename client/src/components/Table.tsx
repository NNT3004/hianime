import React from 'react';
import Wrapper from '../assets/wrappers/Table';

interface TableProps {
  fields: string[];
  data: { [key: string]: any }[];
}

const Table: React.FC<TableProps> = ({ data, fields }) => {
  return (
    <Wrapper>
      <tr>
        {fields.map((value, index) => {
          return <th key={index}>{value}</th>;
        })}
      </tr>
      {data.map((row, rowIndex) => {
        return (
          <tr key={rowIndex}>
            {fields.map((col, colIndex) => {
              return <td key={colIndex}>{row[col]}</td>;
            })}
          </tr>
        );
      })}
    </Wrapper>
  );
};

export default Table;
