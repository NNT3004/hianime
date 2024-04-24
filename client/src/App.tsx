import Footer from './components/Footer';
import NavBar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <NavBar />
      <div style={{ backgroundColor: 'var(--black)' }}>
        <div style={{ height: '60px' }} />
        <Home />
        <Footer />
      </div>
    </div>
  );
}

export default App;
