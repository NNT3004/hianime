import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loading: React.FC = () => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{ fontSize: 60, color: 'var(--primary-500)', margin: '20px'}}
          spin
        />
      }
    />
  );
};

export default Loading;
