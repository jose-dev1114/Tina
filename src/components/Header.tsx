import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Menu, X } from 'lucide-react';
import SignInButton from './auth/SignInButton';
import SignUpButton from './auth/SignUpButton';
import UserButton from './auth/UserButton';

// Auth buttons component
const AuthButtons = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-3">
        <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center">
        <UserButton afterSignOutUrl="/" showName={false} />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <SignInButton
        mode="modal"
        className="text-primary-700 hover:text-primary-900 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-primary-100"
      >
        <span>Sign In</span>
      </SignInButton>
      <SignUpButton
        mode="modal"
        className="bg-primary-700 text-white px-4 py-2 rounded-full font-medium hover:bg-primary-800 transition-colors duration-200 shadow-sm"
      >
        <span>Sign Up</span>
      </SignUpButton>
    </div>
  );
};

// Mobile auth buttons component
const MobileAuthButtons = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="space-y-3">
        <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center justify-center py-2">
        <UserButton afterSignOutUrl="/" showName={true} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <SignInButton
        mode="modal"
        className="w-full text-center bg-white border-2 border-primary-200 text-primary-700 px-4 py-3 rounded-xl font-medium hover:bg-primary-50 hover:border-primary-300 transition-all duration-200"
      >
        <span>Sign In</span>
      </SignInButton>
      <SignUpButton
        mode="modal"
        className="w-full text-center bg-primary-700 text-white px-4 py-3 rounded-xl font-medium hover:bg-primary-800 transition-colors duration-200 shadow-sm"
      >
        <span>Create Account</span>
      </SignUpButton>
    </div>
  );
};

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
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-none">
      {/* Top banner */}
      {/* <div className="bg-primary-700 text-white text-center py-2">
        <p className="text-sm font-medium">Free Gift for Every Meditation Order!</p>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img
                src="/logo.jpg"
                alt="Our Healing Practices Logo"
                className="w-14 h-14 object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-primary-700">Our Healing Practices</h1>
              <p className="text-xs text-primary-600 font-medium italic -mt-1">Feel your lunar energy. Rest with intention.</p>
            </div>
          </Link>

          {/* Desktop Navigation - Clean and compact */}
          <nav className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-5">
              <Link
                to="/shop"
                className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Shop</span>
                {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg> */}
              </Link>

              <Link
                to="/learn"
                className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Learn</span>
              </Link>

              <Link
                to="/community"
                className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors duration-200"
              >
                Join Our Community
              </Link>

              <Link
                to="/about"
                className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors duration-200"
              >
                About Tina
              </Link>

              <Link
                to="/coaching"
                className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors duration-200"
              >
                1:1 Coaching
              </Link>
            </div>
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-primary-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-primary-700" /> : <Menu className="h-6 w-6 text-primary-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 mt-4 pt-6">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium px-4 py-3 rounded-xl transition-colors duration-200 ${
                    isActive(item.href) ? 'text-primary-700 bg-primary-100' : 'text-primary-600 hover:text-primary-700 hover:bg-primary-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 mt-4">
                <MobileAuthButtons />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;