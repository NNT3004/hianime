import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/PostMain';
import EpisodeList from '../../components/EpisodeList';
import PlayerNav from '../../components/PlayerNav';
import { GoDotFill } from 'react-icons/go';
import RatingContainer from '../../components/RatingContainer';
import CommentSection from '../../components/CommentSection';

interface PostMainProps {
  postId: string;
  curEpisodeId: string;
}

const PostMain: React.FC<PostMainProps> = ({ curEpisodeId, postId }) => {
  const [episode, changeEpisode] = useState<number>(1);
  return (
    <Wrapper>
      <div className='main'>
        <p className='nav'>
          <span>Home</span>
          <GoDotFill className='sep-dot' />
          <span>TV</span>
          <GoDotFill className='sep-dot' />
          <span>Kore kara watashi tachi ha</span>
        </p>
        <section className='watch'>
          <EpisodeList
            className='episode-list'
            curEpisode={episode}
            episodes={[
              { episode: 1, title: 'Episode 1' },
              { episode: 2, title: 'Episode 2' },
              { episode: 3, title: 'Episode 3' },
              { episode: 4, title: 'Episode 4' },
              { episode: 5, title: 'Episode 5' },
              { episode: 6, title: 'Episode 6' },
              { episode: 7, title: 'Episode 6' },
              { episode: 8, title: 'Episode 6' },
              { episode: 9, title: 'Episode 6' },
              { episode: 10, title: 'Episode 6' },
              { episode: 11, title: 'Episode 6' },
              { episode: 12, title: 'Episode 6' },
              { episode: 13, title: 'Episode 6' },
              { episode: 14, title: 'Episode 6' },
              { episode: 15, title: 'Episode 6' },
              { episode: 16, title: 'Episode 6' },
              { episode: 17, title: 'Episode 6' },
              { episode: 18, title: 'Episode 6' },
            ]}
            onChangeEpisode={(ep) => {
              changeEpisode(ep);
            }}
          />
          <div className='player'>
            <div className='frame'></div>
            <PlayerNav />
          </div>
        </section>
        <RatingContainer />
      </div>
      <CommentSection />
    </Wrapper>
  );
};

export default PostMain;
