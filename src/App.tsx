
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import HomePage from './pages/HomePage';
import AstroQuiz from './pages/AstroQuiz';
import Shop from './pages/Shop';
import Learn from './pages/Learn';
import Community from './pages/Community';
import About from './pages/About';
import Coaching from './pages/Coaching';
import Profile from './pages/Profile';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
        elements: {
          footer: {
            display: 'none',
          },
          footerAction: {
            display: 'none',
          },
          footerActionText: {
            display: 'none',
          },
          footerActionLink: {
            display: 'none',
          },
        },
      }}
    >
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
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ClerkProvider>
  );
}

export default App;