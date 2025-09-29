
import { Moon, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-ethereal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 relative">
                <div className="absolute inset-0 bg-blush-200 rounded-full opacity-30"></div>
                <div className="absolute inset-1 bg-white rounded-full shadow-inner"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blush-300 rounded-full relative overflow-hidden">
                    <div className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Our Healing Practices</h3>
                <p className="text-sm text-blush-200 font-medium italic">Feel your lunar energy. Rest with intention.</p>
              </div>
            </div>
            <p className="text-ethereal-200 mb-6 leading-relaxed">
              Discover your personalized Yoga Nidra & Lunar Nidra practice based on your unique astrological blueprint.
              Join our sacred community of souls seeking deeper connection through the wisdom of the moon.
            </p>
            
            {/* Newsletter Signup */}
            <div className="bg-lavender-gradient/20 rounded-2xl p-6 backdrop-blur-sm border border-lavender-300/20">
              <h4 className="font-medium mb-3 text-white">Receive Moon Phase Reminders & Free Meditations</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your sacred email..."
                  className="flex-1 px-4 py-3 rounded-l-full bg-white/10 text-white placeholder-ethereal-300 border-0 focus:outline-none focus:ring-2 focus:ring-lavender-400 backdrop-blur-sm"
                />
                <button className="px-6 py-3 bg-lavender-500 hover:bg-lavender-400 rounded-r-full transition-colors duration-200 font-medium text-white">
                  JOIN
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-white">Sacred Paths</h4>
            <ul className="space-y-3">
              <li><Link to="/quiz" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">Find Your Meditation</Link></li>
              <li><Link to="/shop" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">Digital Products</Link></li>
              <li><Link to="/community" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">Join Our Circle</Link></li>
              <li><Link to="/coaching" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">1:1 Coaching</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif text-lg mb-4 text-white">Wisdom & Learning</h4>
            <ul className="space-y-3">
              <li><Link to="/learn" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">Articles & Guides</Link></li>
              <li><Link to="/about" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">About Tina Maat</Link></li>
              <li><a href="#" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">Free Moon Sign Calculator</a></li>
              <li><a href="#" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">Privacy & Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-ethereal-600/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-ethereal-300 text-sm mb-4 md:mb-0">
            © 2024 Our Healing Practices. All rights reserved. Made with sacred intention.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" className="text-ethereal-300 hover:text-lavender-200 transition-colors duration-200">
              <Mail className="h-5 w-5" />
            </a>

            {/* Trust Badges */}
            <div className="ml-6 flex items-center space-x-3">
              <div className="bg-lavender-500/20 border border-lavender-400/30 px-4 py-2 rounded-full text-xs text-lavender-200 font-medium">
                🔒 Secure Checkout
              </div>
              <div className="bg-blush-500/20 border border-blush-400/30 px-4 py-2 rounded-full text-xs text-blush-200 font-medium">
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