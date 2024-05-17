import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/Episodes';
import HeadNav from '../../components/HeadNav';
import Table from '../../components/Table';
import PrimaryButton from '../../components/PrimaryButton';
import { FaPlus } from 'react-icons/fa';
import Modal from '../../components/Modal';
import EpisodeFrom from '../../components/admin/EpisodeForm';

const dump1 = [
  { title: 'EP Number', key: 'epNumber' },
  { title: 'Title', key: 'title' },
  { title: 'Duration', key: 'duration' },
  { title: 'Release', key: 'release' },
];

const dump2 = [
  {
    epNumber: '1',
    title: 'A gentle perch',
    duration: '23:12',
    release: '2024/05/16',
  },
  {
    epNumber: '2',
    title: 'Old friends/one for the road',
    duration: '23:12',
    release: '2024/05/16',
  },
  {
    epNumber: '3',
    title: 'The perfect taste',
    duration: '24:12',
    release: '2024/05/16',
  },
  {
    epNumber: '4',
    title: 'Retribution on this handsome thief',
    duration: '23:12',
    release: '2024/05/16',
  },
  {
    epNumber: '5',
    title: 'The first drop',
    duration: '23:45',
    release: '2024/05/16',
  },
  {
    epNumber: '6',
    title: 'The true face',
    duration: '23:12',
    release: '2024/05/16',
  },
];

const Episodes: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  return (
    <Wrapper>
      <HeadNav
        navs={[
          { name: 'Posts', to: '/admin/posts' },
          { name: 'Korekara', to: '/admin/posts/1' },
          { name: 'Episodes' },
        ]}
      />
      <Modal display={showForm} setDisplay={setShowForm}>
        <EpisodeFrom
          episodeNumber={7}
          releaseDate='2024/12/12'
          title='To international competive'
        />
      </Modal>
      <div className='card-container'>
        <div className='btn-container'>
          <PrimaryButton startIcon={FaPlus}>New episode</PrimaryButton>
        </div>
      </div>
    </Wrapper>
  );
};

export default Episodes;
