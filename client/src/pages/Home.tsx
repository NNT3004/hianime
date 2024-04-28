import React, { useRef } from 'react';
import Wrapper from '../assets/wrappers/Home';
import PostCardA from '../components/postcard/PostCardA';
import RecentlyUpdated from '../components/RecentlyUpdated';
import TopAnime from '../components/TopAnime';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';

const dump = Array.from(Array(5).keys());

function Home() {
  const swiperRef = useRef<SwiperClass>();
  return (
    <Wrapper>
      <Swiper
        onSwiper={(swiper: SwiperClass) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        className='swiper'
      >
        {dump.map((_, index) => {
          return (
            <SwiperSlide key={index}>
              <PostCardA
                airedDate='Jan 4,2024'
                $imgUrl={
                  process.env.PUBLIC_URL +
                  '/294311672_497713595493938_8362089767383049501_n.jpg'
                }
                title='K-ON!'
                description="A fresh high school year always means much to come, and one of those things is joining a club. Being in a dilemma about which club to join, Yui Hirasawa stumbles upon and applies for the Light Music Club, which she misinterprets to be about playing simple instruments, such as castanets. Unable to play an instrument, she decides to visit to apologize and quit. Meanwhile, the Light Music Club faces disbandment due to a lack of members. This causes the club members to offer anything, from food to slacking off during club time, in order to convince Yui to join. Despite their efforts, Yui insists on leaving due to her lack of musical experience. As a last resort, they play a piece for Yui, which sparks her fiery passion and finally convinces her to join the club. From then onward, it's just plain messing around with bits and pieces of practice. The members of the Light Music Club are ready to make their time together a delightful one!"
              />
            </SwiperSlide>
          );
        })}
        <div className='btn-container'>
          <button
            onClick={() => swiperRef.current!.slidePrev()}
            className='btn'
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => swiperRef.current!.slideNext()}
            className='btn'
          >
            <FaAngleRight />
          </button>
        </div>
      </Swiper>
      <div className='combine'>
        <RecentlyUpdated className='recently' />
        <TopAnime className='top-anime' />
      </div>
    </Wrapper>
  );
}

export default Home;
