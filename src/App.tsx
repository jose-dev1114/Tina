
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AstroQuiz from './pages/AstroQuiz';
import Shop from './pages/Shop';
import Learn from './pages/Learn';
import Community from './pages/Community';
import About from './pages/About';
import Coaching from './pages/Coaching';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<AstroQuiz />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/coaching" element={<Coaching />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;