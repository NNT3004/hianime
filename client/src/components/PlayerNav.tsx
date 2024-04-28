import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/PlayerNav';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { TbPlayerTrackPrevFilled } from 'react-icons/tb';

interface PlayerSetting {
  autoPlay: boolean;
  autoNext: boolean;
}

const PlayerNav: React.FC = () => {
  const [settings, setSettings] = useState<PlayerSetting>({
    autoNext: false,
    autoPlay: false,
  });
  return (
    <Wrapper>
      <li className='setting'>
        <ul
          className='btn'
          onClick={() => {
            setSettings((settings) => {
              return { ...settings, autoPlay: !settings.autoPlay };
            });
          }}
        >
          <span>Auto Play </span>
          <span className={settings.autoPlay ? 'on' : 'off'}>
            {settings.autoPlay ? 'On' : 'Off'}
          </span>
        </ul>
        <ul
          className='btn'
          onClick={() => {
            setSettings((settings) => {
              return { ...settings, autoNext: !settings.autoNext };
            });
          }}
        >
          <span>Auto Next </span>
          <span className={settings.autoNext ? 'on' : 'off'}>
            {settings.autoNext ? 'On' : 'Off'}
          </span>
        </ul>
      </li>
      <li className='nav'>
        <ul className='btn'>
          <TbPlayerTrackPrevFilled className='icon' />
          <span>Prev</span>
        </ul>
        <ul className='btn'>
          <span>Next</span>
          <TbPlayerTrackNextFilled className='icon' />
        </ul>
      </li>
    </Wrapper>
  );
};

export default PlayerNav;
