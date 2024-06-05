import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SharedLayout from './pages/SharedLayout';
import SharedAdminLayout from './pages/admin/SharedLayout';
import AllPosts from './pages/admin/AllPosts';
import PostInfo from './pages/post/PostInfo';
import PostMain from './pages/post/PostMain';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Post from './pages/admin/Post';
import Episodes from './pages/admin/Episodes';
import { useEffect } from 'react';
import { AppDispatch, RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/authSlice';
import Loading from './components/Loading';
import Genres from './pages/admin/Genres';
import Studios from './pages/admin/Studios';
import Histories from './pages/Histories';
import Favorites from './pages/Favorites';
import SingleQueryPosts from './pages/SingleQueryPosts';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Statistics from './pages/admin/Statistics';
TimeAgo.addDefaultLocale(en);

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUser());
  });
  const gettingUser = useSelector((state: RootState) => state.auth.gettingUser);
  if (gettingUser) {
    return (
      <Loading
        style={{
          marginTop: '60px',
          height: '550px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route path='' element={<Navigate to='home' replace />} />
            <Route path='home' element={<Home />} />
            <Route path='posts/:postId' element={<PostInfo />} />
            <Route path='posts/:postId/episodes' element={<PostMain />} />
            <Route path='histories' element={<Histories />} />
            <Route path='favorites' element={<Favorites />} />
            <Route path='recently-updated' element={<SingleQueryPosts />} />
          </Route>
          <Route path='/admin' element={<SharedAdminLayout />}>
            <Route path='posts' element={<AllPosts />} />
            <Route path='posts/:postId' element={<Post key='post-update' />} />
            <Route path='posts/:postId/episodes' element={<Episodes />} />
            <Route path='add-post' element={<Post key='post-add' />} />
            <Route path='genres' element={<Genres />} />
            <Route path='studios' element={<Studios />} />
            <Route path='statistics' element={<Statistics />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
