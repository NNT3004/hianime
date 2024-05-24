import React from 'react';
import Wrapper from '../assets/wrappers/PlayerNav';
import { TbPlayerTrackNextFilled } from 'react-icons/tb';
import { TbPlayerTrackPrevFilled } from 'react-icons/tb';

interface PlayerNavProps {
  autoPlay: boolean;
  onClickAutoPlay: () => void;
  autoNext: boolean;
  onClickAutoNext: () => void;
  onNextClicked: () => void;
  onPrevClicked: () => void;
  disabledPrev: boolean;
  disabledNext: boolean;
}

const PlayerNav: React.FC<PlayerNavProps> = ({
  autoNext,
  autoPlay,
  disabledNext,
  disabledPrev,
  onClickAutoNext,
  onClickAutoPlay,
  onNextClicked,
  onPrevClicked,
}) => {
  return (
    <Wrapper>
      <li className='setting'>
        <ul className='btn' onClick={onClickAutoPlay}>
          <span>Auto Play </span>
          <span className={autoPlay ? 'on' : 'off'}>
            {autoPlay ? 'On' : 'Off'}
          </span>
        </ul>
        <ul className='btn' onClick={onClickAutoNext}>
          <span>Auto Next </span>
          <span className={autoNext ? 'on' : 'off'}>
            {autoNext ? 'On' : 'Off'}
          </span>
        </ul>
      </li>
      <li className='nav'>
        <ul
          className={disabledPrev ? 'btn disabled' : 'btn'}
          onClick={onPrevClicked}
        >
          <TbPlayerTrackPrevFilled className='icon' />
          <span>Prev</span>
        </ul>
        <ul
          className={disabledNext ? 'btn disabled' : 'btn'}
          onClick={onNextClicked}
        >
          <span>Next</span>
          <TbPlayerTrackNextFilled className='icon' />
        </ul>
      </li>
    </Wrapper>
  );
};

export default PlayerNav;
