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

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUser());
  });
  const gettingUser = useSelector((state: RootState) => state.auth.gettingUser);
  if (gettingUser) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route path='' element={<Navigate to='home' replace />} />
            <Route path='home' element={<Home />} />
            <Route
              path='posts/:postId'
              element={
                <PostInfo
                  aired='Apr 4, 2024 to ?'
                  description='Hidden in the backstreets of the Ginza district is Eden Hall, a lone bar operated by Ryuu Sasakura, the prodigy bartender who is said to mix the most incredible cocktails anyone has ever tasted. However, not just anyone can find Eden Hall; rather, it is Eden Hall that must find you. Customers of varying backgrounds, each plagued with their own troubles, wander into this bar. Nevertheless, Ryuu always knows the ideal cocktail to console and guide each distraught soul.'
                  duration='23m'
                  episodeCount={24}
                  genres={['Drama', 'Slice of Life', 'Seinen']}
                  imgUrl={process.env.PUBLIC_URL + '/98240316_p0.png'}
                  premiered=' Spring 2024'
                  status='Currently Airing'
                  studio='Liber'
                  title='Kore kara watashi tachi ha'
                  type='TV'
                />
              }
            />
            <Route
              path='posts/:postId/episodes/:episodeId'
              element={<PostMain curEpisodeId='' postId='' />}
            />
          </Route>
          <Route path='admin' element={<SharedAdminLayout />}>
            <Route path='posts' element={<AllPosts />} />
            <Route path='posts/:postId' element={<Post />} />
            <Route path='posts/:postId/episodes' element={<Episodes />} />
            <Route path='genres' element={<Genres />} />
            <Route path='studios' element={<Studios />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
