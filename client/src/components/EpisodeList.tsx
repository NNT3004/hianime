import React from 'react';
import Wrapper from '../assets/wrappers/EpisodeList';
import { FaPlayCircle } from 'react-icons/fa';

interface EpisodeListProps {
  episodes: {
    episode: number;
    title: string;
  }[];
  curEpisode: number;
  onChangeEpisode: (episode: number) => void;
  className?: string;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  curEpisode,
  episodes,
  onChangeEpisode,
  className,
}) => {
  return (
    <Wrapper className={className}>
      <header>
        <span>List of episode</span>
      </header>
      <li>
        {episodes.map((value, index) => {
          return (
            <ul
              key={index}
              onClick={() => onChangeEpisode(value.episode)}
              className={value.episode === curEpisode ? 'activate' : 'watched'}
            >
              <span className='episode'>{value.episode}</span>
              <span className='title'>{value.title}</span>
              {value.episode === curEpisode && (
                <FaPlayCircle className='play-icon' />
              )}
            </ul>
          );
        })}
      </li>
    </Wrapper>
  );
};

export default EpisodeList;
