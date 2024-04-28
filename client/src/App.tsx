import Footer from './components/Footer';
import NavBar from './components/Navbar';
import RatingContainer from './components/RatingContainer';
import Home from './pages/Home';
import PostInfo from './pages/post/PostInfo';
import PostMain from './pages/post/PostMain';

function App() {
  
  return (
    <div>
      <NavBar />
      <div style={{ backgroundColor: 'var(--black)' }}>
        <div style={{ height: '60px' }} />
        <Home />
        <PostInfo
          aired='Apr 4, 2024 to ?'
          description='Hidden in the backstreets of the Ginza district is Eden Hall, a lone bar operated by Ryuu Sasakura, the prodigy bartender who is said to mix the most incredible cocktails anyone has ever tasted. However, not just anyone can find Eden Hall; rather, it is Eden Hall that must find you. Customers of varying backgrounds, each plagued with their own troubles, wander into this bar. Nevertheless, Ryuu always knows the ideal cocktail to console and guide each distraught soul.'
          duration='23m'
          episodeCount={24}
          genres={['Drama', 'Slice of Life', 'Seinen']}
          imgUrl={process.env.PUBLIC_URL + '98240316_p0.png'}
          premiered=' Spring 2024'
          status='Currently Airing'
          studio='Liber'
          title='Kore kara watashi tachi ha'
          type='TV'
        />
        <PostMain curEpisodeId='' postId=''/>
        <RatingContainer />
        <Footer />
      </div>
    </div>
  );
}

export default App;
