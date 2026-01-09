
import { Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - Replace with actual newsletter API
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('🌙 Welcome to our sacred circle! Check your email for a special gift.', {
        duration: 5000,
      });

      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Our Healing Practices Logo"
                  className="w-20 h-20 object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Our Healing Practices</h3>
                <p className="text-sm text-primary-200 font-medium italic">Feel your lunar energy. Rest with intention.</p>
              </div>
            </div>
            <p className="text-primary-100 mb-6 leading-relaxed">
              Discover your personalized Yoga Nidra & Lunar Nidra practice based on your unique astrological blueprint.
              Join our sacred community of souls seeking deeper connection through the wisdom of the moon.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-primary-600/30 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="font-medium mb-3 text-white">Receive Moon Phase Reminders & Free Meditations</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your sacred email..."
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 rounded-l-full bg-white/10 text-white placeholder-primary-200 border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 backdrop-blur-sm disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-400 rounded-r-full transition-colors duration-200 font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '...' : 'JOIN'}
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-white">Sacred Paths</h4>
            <ul className="space-y-3">
              <li><Link to="/quiz" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">Find Your Meditation</Link></li>
              <li><Link to="/shop" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">Digital Products</Link></li>
              <li><Link to="/community" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">Join Our Circle</Link></li>
              <li><Link to="/coaching" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">1:1 Coaching</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-white">Wisdom & Learning</h4>
            <ul className="space-y-3">
              <li><Link to="/learn" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">Articles & Guides</Link></li>
              <li><Link to="/about" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">About Tina Maat</Link></li>
              <li><a href="#" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">Free Moon Sign Calculator</a></li>
              <li><a href="#" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-200 text-sm mb-4 md:mb-0">
            © 2024 Our Healing Practices. All rights reserved. Made with sacred intention.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="text-primary-200 hover:text-primary-100 transition-colors duration-200">
              <Mail className="h-5 w-5" />
            </a>

            {/* Trust Badges */}
            <div className="ml-6 flex items-center space-x-3">
              <div className="bg-primary-500/20 px-4 py-2 rounded-full text-xs text-primary-200 font-medium">
                🔒 Secure Checkout
              </div>
              <div className="bg-primary-500/20 px-4 py-2 rounded-full text-xs text-primary-200 font-medium">
                ⚡ Instant Delivery
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;