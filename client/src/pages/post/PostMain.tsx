import React, { useEffect, useMemo, useRef, useState } from 'react';
import Wrapper from '../../assets/wrappers/PostMain';
import EpisodeList from '../../components/EpisodeList';
import PlayerNav from '../../components/PlayerNav';
import { GoDotFill } from 'react-icons/go';
import RatingContainer from '../../components/RatingContainer';
import { useParams, useSearchParams } from 'react-router-dom';
import { client, getAuthClient } from '../../api/client';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  type MediaTimeUpdateEventDetail,
} from '@vidstack/react';
import {
  PlyrLayout,
  plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';

interface Episode {
  _id: string;
  index: number;
  episodeNumber: number;
  title: string;
  path: string;
  duration: string;
  releaseDate: string;
}

const PostMain: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { postId } = useParams();

  const user = useSelector(selectUser);

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'succeeded' | 'failed'
  >('idle');

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [curEpisode, setCurEpisode] = useState<Episode>();
  const [initialPosition, setInitialPosition] = useState<number>();
  const player = useRef<MediaPlayerInstance>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [autoNext, setAutoNext] = useState<boolean>(false);

  const curIndex = episodes.findIndex(
    (episode) => episode._id === curEpisode?._id
  );
  const disableNext = curIndex >= episodes.length - 1;
  const disablePrev = curIndex <= 0;

  useEffect(() => {
    if (status === 'idle') {
      const getEpisodes = async () => {
        setStatus('loading');
        try {
          const { episodes } = (
            await client.get(`/episodes/watch?post=${postId}`)
          ).data;
          setEpisodes(episodes);

          let history: { episode: string; position: number } | null = null;
          if (user) {
            history = (await getAuthClient().get(`/histories?post=${postId}`))
              .data.history;
          }

          const episodeId = searchParams.get('episode');
          if (episodeId) {
            const episode = episodes.find(
              (episode: Episode) => episode._id === episodeId
            );
            if (episode) {
              setCurEpisode(episode);
              if (history && history.episode === episode._id) {
                setInitialPosition(history.position);
              }
            } else {
              setSearchParams();
            }
          } else if (history) {
            const episode = episodes.find(
              (episode: Episode) => episode._id === history?.episode
            );
            setSearchParams({ episode: episode._id });
            setCurEpisode(episode);
            setInitialPosition(history.position);
          } else {
            const episode = episodes.length > 0 ? episodes[0] : undefined;
            if (episode) setSearchParams({ episode: episode._id });
            setCurEpisode(episode);
          }
          setStatus('succeeded');
        } catch (err) {
          setStatus('failed');
        }
      };
      getEpisodes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const onEpisodeChange = (episode: Episode) => {
    setInitialPosition(undefined);
    setCurEpisode(episode);
    if (searchParams.get('episode') !== episode._id) {
      setSearchParams({ episode: episode._id });
    }
  };

  const updateHistory = () => {
    let timeOutId: ReturnType<typeof setTimeout>;
    let position = initialPosition || 0;
    return (e: MediaTimeUpdateEventDetail) => {
      if (!curEpisode) return;
      const currentTime = e.currentTime;
      if (Math.abs(currentTime - position) > 10) {
        position = currentTime;
        clearTimeout(timeOutId);
        timeOutId = setTimeout(async () => {
          await getAuthClient().post(`/histories?post=${postId}`, {
            episode: curEpisode._id,
            position: position,
          });
        }, 3000);
      }
    };
  };

  const increasView = async () => {
    try {
      await client.post(`/posts/${postId}/watch`);
    } catch (err) {}
  };

  const onVideoStarted = () => {
    increasView();
    if (initialPosition) {
      player.current!.currentTime = initialPosition;
    }
  };

  const handleTimeUpdate = useMemo(
    () => (user && curEpisode ? updateHistory() : undefined),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, curEpisode]
  );

  const nextEpisode = () => {
    if (!disableNext) {
      onEpisodeChange(episodes[curIndex + 1]);
    }
  };

  const prevpisode = () => {
    if (!disablePrev) {
      onEpisodeChange(episodes[curIndex - 1]);
    }
  };

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
            curEpisode={curEpisode}
            episodes={episodes}
            onChangeEpisode={onEpisodeChange}
          />
          <div className='player'>
            {curEpisode ? (
              <MediaPlayer
                key={curEpisode._id}
                title={curEpisode.title}
                src={curEpisode.path}
                className='frame'
                onTimeUpdate={handleTimeUpdate}
                ref={player}
                onStarted={onVideoStarted}
                autoPlay={autoPlay}
                onEnded={() => {
                  if (autoNext) nextEpisode();
                }}
                autoFocus
              >
                <MediaProvider />
                <PlyrLayout icons={plyrLayoutIcons} />
              </MediaPlayer>
            ) : (
              <div className='frame' />
            )}
            <PlayerNav
              autoNext={autoNext}
              autoPlay={autoPlay}
              disabledNext={disableNext}
              disabledPrev={disablePrev}
              onClickAutoNext={() => setAutoNext((v) => !v)}
              onClickAutoPlay={() => setAutoPlay((v) => !v)}
              onNextClicked={nextEpisode}
              onPrevClicked={prevpisode}
            />
          </div>
        </section>
        <RatingContainer />
      </div>
    </Wrapper>
  );
};

export default PostMain;
