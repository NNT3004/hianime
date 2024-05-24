import React from 'react';
import Wrapper from '../assets/wrappers/EpisodeList';
import { FaPlayCircle } from 'react-icons/fa';

interface Episode {
  _id: string;
  index: number;
  episodeNumber: number;
  title: string;
  path: string;
  duration: string;
  releaseDate: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  curEpisode?: Episode;
  onChangeEpisode: (episode: Episode) => void;
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
        {episodes.map((episode) => {
          return (
            <ul
              key={episode._id}
              onClick={() => onChangeEpisode(episode)}
              className={
                episode._id === curEpisode?._id ? 'activate' : 'watched'
              }
            >
              <span className='episode'>{episode.episodeNumber}</span>
              <span className='title'>{episode.title}</span>
              {episode._id === curEpisode?._id && (
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
