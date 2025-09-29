import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Find Your Meditation', href: '/quiz' },
    { name: 'Shop', href: '/shop' },
    { name: 'Learn', href: '/learn' },
    { name: 'Community', href: '/community' },
    { name: 'About Tina', href: '/about' },
    { name: 'Coaching', href: '/coaching' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-lavender-100/50">
      {/* Top banner */}
      <div className="bg-ethereal-800 text-white text-center py-2">
        <p className="text-sm font-medium">Free Gift for Every Meditation Order!</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo - Inspired by the crescent moon design */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              {/* Crescent moon logo inspired by the image */}
              <div className="w-14 h-14 relative">
                <div className="absolute inset-0 bg-blush-200 rounded-full opacity-30"></div>
                <div className="absolute inset-1 bg-white rounded-full shadow-inner"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blush-300 rounded-full relative overflow-hidden">
                    <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-ethereal-800">Our Healing Practices</h1>
              <p className="text-xs text-blush-500 font-medium italic -mt-1">Feel your lunar energy. Rest with intention.</p>
            </div>
          </Link>

          {/* Desktop Navigation - Clean and compact */}
          <nav className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-5">
              <Link
                to="/shop"
                className="text-sm font-medium text-ethereal-700 hover:text-ethereal-900 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Shop</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              <Link
                to="/learn"
                className="text-sm font-medium text-ethereal-700 hover:text-ethereal-900 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Learn</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              <Link
                to="/community"
                className="text-sm font-medium text-ethereal-700 hover:text-ethereal-900 transition-colors duration-200"
              >
                Join Our Community
              </Link>

              <Link
                to="/about"
                className="text-sm font-medium text-ethereal-700 hover:text-ethereal-900 transition-colors duration-200"
              >
                About Tina
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-lavender-50 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-ethereal-700" /> : <Menu className="h-6 w-6 text-ethereal-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-lavender-100 mt-4 pt-6">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium px-4 py-3 rounded-xl transition-colors duration-200 ${
                    isActive(item.href) ? 'text-ethereal-900 bg-lavender-50' : 'text-ethereal-600 hover:text-ethereal-900 hover:bg-lavender-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;