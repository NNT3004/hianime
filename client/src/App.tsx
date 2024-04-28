import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import SharedLayout from './pages/SharedLayout';
import PostInfo from './pages/post/PostInfo';
import PostMain from './pages/post/PostMain';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route path='' element={<Navigate to='home' replace />} />
            <Route path='home' element={<Home />} />
            <Route
              path='posts/:post-id'
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
              path='posts/:post-id/episodes/:episode-id'
              element={<PostMain curEpisodeId='' postId='' />}
            />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
