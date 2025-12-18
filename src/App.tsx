
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import HomePage from './pages/HomePage';
import AstroQuiz from './pages/AstroQuiz';
import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Learn from './pages/Learn';
import Article from './pages/Article';
import Community from './pages/Community';
import About from './pages/About';
import Coaching from './pages/Coaching';
import Profile from './pages/Profile';
import { articles } from './data/articles';

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
      <CartProvider>
        <Toaster position="bottom-right" />
        <Router>
          <div className="min-h-screen bg-white">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz" element={<AstroQuiz />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/learn/:slug" element={<Article articles={articles} />} />
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
      </CartProvider>
    </ClerkProvider>
  );
}

export default App;