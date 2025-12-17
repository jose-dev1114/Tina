import { useState, useEffect } from 'react';
import { Star, Play, Download, ShoppingCart, Filter, Package, Music, Sparkles, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types/database';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState<'recordings' | 'cards'>('recordings');
  const { addToCart, cart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when component mounts and handle loading
  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);
  
  const filters = [
    { id: 'all', name: 'All Meditations' },
    { id: 'fire', name: 'Fire Signs' },
    { id: 'earth', name: 'Earth Signs' },
    { id: 'air', name: 'Air Signs' },
    { id: 'water', name: 'Water Signs' }
  ];

  // Digital Products - Recordings
  const recordings: Product[] = [
    {
      id: 'rec-1',
      name: 'Aries Sun + Scorpio Moon: Fierce Heart Transformation',
      description: 'A powerful practice for the passionate soul who feels deeply. Channel your warrior spirit into deep emotional healing.',
      price: 35,
      currency: 'USD',
      type: 'digital',
      category: 'recording',
      images: ['https://images.pexels.com/photos/3820295/pexels-photo-3820295.jpeg?auto=compress&cs=tinysrgb&w=800'],
      featured: true,
      isActive: true,
      duration: '42 minutes',
      format: 'MP3',
      fileSize: '96 MB',
      sunSign: 'Aries',
      moonSign: 'Scorpio',
      element: 'fire',
      tags: ['transformation', 'emotional-healing', 'warrior-spirit'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rec-2',
      name: 'Taurus Sun + Pisces Moon: Grounded Dreams Meditation',
      description: 'Perfect for the dreamer who needs grounding and stability. Root your dreams in practical manifestation.',
      price: 32,
      currency: 'USD',
      type: 'digital',
      category: 'recording',
      images: ['https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800'],
      featured: false,
      isActive: true,
      duration: '38 minutes',
      format: 'MP3',
      fileSize: '87 MB',
      sunSign: 'Taurus',
      moonSign: 'Pisces',
      element: 'earth',
      tags: ['grounding', 'manifestation', 'dreams'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rec-3',
      name: 'Gemini Sun + Cancer Moon: Mindful Heart Connection',
      description: 'Harmonize your curious mind with your nurturing heart. Bridge the gap between mind and heart.',
      price: 30,
      currency: 'USD',
      type: 'digital',
      category: 'recording',
      images: ['https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800'],
      featured: false,
      isActive: true,
      duration: '35 minutes',
      format: 'MP3',
      fileSize: '80 MB',
      sunSign: 'Gemini',
      moonSign: 'Cancer',
      element: 'air',
      tags: ['mindfulness', 'heart-connection', 'balance'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rec-4',
      name: 'Cancer Sun + Capricorn Moon: Sacred Structure Healing',
      description: 'For the sensitive soul who needs structure and support. Balance emotional flow with grounded wisdom.',
      price: 38,
      currency: 'USD',
      type: 'digital',
      category: 'recording',
      images: ['https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800'],
      featured: false,
      isActive: true,
      duration: '45 minutes',
      format: 'MP3',
      fileSize: '103 MB',
      sunSign: 'Cancer',
      moonSign: 'Capricorn',
      element: 'water',
      tags: ['structure', 'emotional-healing', 'wisdom'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rec-5',
      name: 'Leo Sun + Virgo Moon: Radiant Perfectionism Release',
      description: 'Let your inner sun warm away perfectionist tendencies. Shine your light while releasing self-criticism.',
      price: 33,
      currency: 'USD',
      type: 'digital',
      category: 'recording',
      images: ['https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800'],
      featured: false,
      isActive: true,
      duration: '40 minutes',
      format: 'MP3',
      fileSize: '92 MB',
      sunSign: 'Leo',
      moonSign: 'Virgo',
      element: 'fire',
      tags: ['self-love', 'perfectionism', 'radiance'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'rec-6',
      name: 'Virgo Sun + Sagittarius Moon: Organized Adventure',
      description: 'Perfect for the organized dreamer seeking expansion. Find freedom within structure and routine.',
      price: 31,
      currency: 'USD',
      type: 'digital',
      category: 'recording',
      images: ['https://images.pexels.com/photos/3820295/pexels-photo-3820295.jpeg?auto=compress&cs=tinysrgb&w=800'],
      featured: false,
      isActive: true,
      duration: '37 minutes',
      format: 'MP3',
      fileSize: '85 MB',
      sunSign: 'Virgo',
      moonSign: 'Sagittarius',
      element: 'earth',
      tags: ['adventure', 'organization', 'freedom'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Physical Products - Tina's Cards
  const physicalProducts: Product[] = [
    {
      id: 'card-journal-1',
      name: 'Self-discovery & Intention Journal | Mindfulness | Mindset | Self Awareness | Personal Growth',
      description: 'A beautifully designed journal for self-discovery and setting intentions. Perfect for mindfulness practice, personal growth, and developing self-awareness. Features guided prompts and space for reflection.',
      price: 19.95,
      currency: 'USD',
      type: 'physical',
      category: 'card-deck',
      images: ['/img/card_one.png'],
      featured: true,
      isActive: true,
      requiresShipping: true,
      weight: 300,
      dimensions: { length: 21, width: 15, height: 2 },
      inventory: 50,
      tags: ['journal', 'self-discovery', 'mindfulness', 'mindset', 'self-awareness', 'personal-growth', 'intention-setting'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'card-deck-2',
      name: '100 Self-discovery & Intention Cards | Mindfulness | Journal Prompts | Self Awareness | Personal Growth',
      description: 'A set of 100 beautifully illustrated cards featuring self-discovery prompts, journal questions, and intention-setting exercises. Perfect for daily mindfulness practice, personal growth, and deepening self-awareness.',
      price: 19.95,
      currency: 'USD',
      type: 'physical',
      category: 'card-deck',
      images: ['/img/card_two.png'],
      featured: true,
      isActive: true,
      requiresShipping: true,
      weight: 350,
      dimensions: { length: 12, width: 9, height: 4 },
      inventory: 50,
      tags: ['cards', 'self-discovery', 'mindfulness', 'journal-prompts', 'self-awareness', 'personal-growth', 'intention-cards'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Get current products based on selected tab
  const currentProducts = selectedTab === 'recordings' ? recordings : physicalProducts;

  // Filter recordings by element
  const filteredProducts = selectedTab === 'recordings' && selectedFilter !== 'all'
    ? currentProducts.filter(product => product.element === selectedFilter)
    : currentProducts;

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast.success(
      <div className="flex items-center space-x-2">
        <div>
          <p className="font-semibold">Added to cart!</p>
          <p className="text-sm text-gray-600">{product.name}</p>
        </div>
      </div>,
      {
        duration: 3000,
        position: 'top-right',
        
      }
    );
  };

  const isInCart = (productId: string) => {
    return cart.some(item => item.product.id === productId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/60 px-4 py-2 rounded-full w-32 h-8 mx-auto mb-4"></div>
            <div className="h-10 bg-primary-200/50 rounded-lg w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-primary-100/50 rounded w-2/3 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-64 bg-primary-200/50"></div>
                <div className="p-6">
                  <div className="h-6 bg-primary-200/50 rounded w-3/4 mb-4"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-primary-100/50 rounded w-full"></div>
                    <div className="h-4 bg-primary-100/50 rounded w-5/6"></div>
                  </div>
                  <div className="h-10 bg-primary-300/50 rounded-full w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-700 font-medium mb-4">
            <Star className="h-4 w-4" />
            <span>Sacred Shop</span>
          </div>

          <h1 className="text-4xl font-serif font-bold text-primary-700 mb-4">
            Lunar Nidra Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover personalized meditation recordings and sacred tools to deepen your spiritual practice.
          </p>
        </div>

        {/* Product Type Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedTab('recordings')}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
              selectedTab === 'recordings'
                ? 'bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-700'
            }`}
          >
            <Music className="h-5 w-5" />
            <span>Digital Recordings</span>
          </button>
          <button
            onClick={() => setSelectedTab('cards')}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
              selectedTab === 'cards'
                ? 'bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-700'
            }`}
          >
            <Sparkles className="h-5 w-5" />
            <span>Tina's Cards</span>
          </button>
        </div>

        {/* CTA to take quiz */}
        {/* <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl p-8 text-white text-center mb-12">
          <h2 className="text-2xl font-serif font-bold mb-4">Not Sure Which Meditation is Right for You?</h2>
          <p className="text-primary-100 mb-6">Take our personalized quiz to discover your perfect practice based on your birth chart.</p>
          <a href="/quiz" className="bg-white text-primary-700 px-8 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors duration-300">
            Find My Perfect Meditation
          </a>
        </div> */}

        {/* Filters - Only show for recordings */}
        {selectedTab === 'recordings' && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 text-gray-600 mb-4">
              <Filter className="h-5 w-5" />
              <span className="font-medium">Filter by Element:</span>
            </div>
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-700 border border-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-rose-100">
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium z-10">
                    Featured
                  </div>
                )}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.type === 'physical' && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium z-10 flex items-center space-x-1">
                    <Package className="h-3 w-3" />
                    <span>Physical Product</span>
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {product.description}
                </p>

                {/* Product Details */}
                <div className="space-y-2 mb-6">
                  {product.duration && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">⏱️</span>
                      <span>{product.duration}</span>
                    </div>
                  )}
                  {product.format && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">📁</span>
                      <span>{product.format} • {product.fileSize}</span>
                    </div>
                  )}
                  {product.sunSign && product.moonSign && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">✨</span>
                      <span>{product.sunSign} Sun + {product.moonSign} Moon</span>
                    </div>
                  )}
                  {product.type === 'digital' && (
                    <div className="flex items-center text-sm text-green-600 font-medium">
                      <Download className="h-4 w-4 mr-2" />
                      <span>Instant Download + Free PDF Guide</span>
                    </div>
                  )}
                  {product.type === 'physical' && (
                    <div className="flex items-center text-sm text-blue-600 font-medium">
                      <Package className="h-4 w-4 mr-2" />
                      <span>Ships within 3-5 business days</span>
                    </div>
                  )}
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-900">${product.price}</div>
                    <div className="text-xs text-gray-500">
                      {product.type === 'digital' ? 'Instant download' : 'Free shipping over $50'}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {product.type === 'digital' && (
                      <button className="p-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors duration-200">
                        <Play className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isInCart(product.id)}
                      className={`px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 ${
                        isInCart(product.id)
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-ethereal-700 to-blush-600 text-white'
                      }`}
                    >
                      {isInCart(product.id) ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>In Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Cart Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <Link
              to="/checkout"
              className="bg-gradient-to-r from-primary-700 to-primary-600 text-white px-6 py-4 rounded-full font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-3"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>View Cart ({cart.length})</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                ${cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
              </span>
            </Link>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Digital Delivery</h3>
              <p className="text-gray-600 text-sm">Download immediately after purchase. No waiting, no shipping.</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Lifetime Access</h3>
              <p className="text-gray-600 text-sm">Download and keep forever. Practice whenever you need.</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">Your purchase is protected with industry-standard encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;