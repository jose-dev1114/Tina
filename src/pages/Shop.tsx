import { useState } from 'react';
import { Star, Play, Download, ShoppingCart, Filter } from 'lucide-react';

const Shop = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const filters = [
    { id: 'all', name: 'All Meditations' },
    { id: 'fire', name: 'Fire Signs' },
    { id: 'earth', name: 'Earth Signs' },
    { id: 'air', name: 'Air Signs' },
    { id: 'water', name: 'Water Signs' }
  ];

  const sampleMeditations = [
    {
      id: 1,
      title: 'Aries Sun + Scorpio Moon: Fierce Heart Transformation',
      sunSign: 'Aries',
      moonSign: 'Scorpio',
      duration: '42 minutes',
      element: 'fire',
      price: '$35',
      intention: 'Channel your warrior spirit into deep emotional healing',
      description: 'A powerful practice for the passionate soul who feels deeply.',
      featured: true
    },
    {
      id: 2,
      title: 'Taurus Sun + Pisces Moon: Grounded Dreams Meditation',
      sunSign: 'Taurus',
      moonSign: 'Pisces',
      duration: '38 minutes',
      element: 'earth',
      price: '$32',
      intention: 'Root your dreams in practical manifestation',
      description: 'Perfect for the dreamer who needs grounding and stability.'
    },
    {
      id: 3,
      title: 'Gemini Sun + Cancer Moon: Mindful Heart Connection',
      sunSign: 'Gemini',
      moonSign: 'Cancer',
      duration: '35 minutes',
      element: 'air',
      price: '$30',
      intention: 'Bridge the gap between mind and heart',
      description: 'Harmonize your curious mind with your nurturing heart.'
    },
    {
      id: 4,
      title: 'Cancer Sun + Capricorn Moon: Sacred Structure Healing',
      sunSign: 'Cancer',
      moonSign: 'Capricorn',
      duration: '45 minutes',
      element: 'water',
      price: '$38',
      intention: 'Balance emotional flow with grounded wisdom',
      description: 'For the sensitive soul who needs structure and support.'
    },
    {
      id: 5,
      title: 'Leo Sun + Virgo Moon: Radiant Perfectionism Release',
      sunSign: 'Leo',
      moonSign: 'Virgo',
      duration: '40 minutes',
      element: 'fire',
      price: '$33',
      intention: 'Shine your light while releasing self-criticism',
      description: 'Let your inner sun warm away perfectionist tendencies.'
    },
    {
      id: 6,
      title: 'Virgo Sun + Sagittarius Moon: Organized Adventure',
      sunSign: 'Virgo',
      moonSign: 'Sagittarius',
      duration: '37 minutes',
      element: 'earth',
      price: '$31',
      intention: 'Find freedom within structure and routine',
      description: 'Perfect for the organized dreamer seeking expansion.'
    }
  ];

  const filteredMeditations = selectedFilter === 'all' 
    ? sampleMeditations 
    : sampleMeditations.filter(med => med.element === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-rose-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-700 font-medium mb-4">
            <Star className="h-4 w-4" />
            <span>Digital Sanctuary</span>
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-purple-900 mb-4">
            Personalized Meditation Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each meditation is carefully crafted to align with your unique Sun and Moon sign combination. 
            Choose based on your astrological blueprint for the most transformative experience.
          </p>
        </div>

        {/* CTA to take quiz */}
        <div className="bg-gradient-to-r from-ethereal-800 to-blush-700 rounded-xl p-8 text-white text-center mb-12">
          <h2 className="text-2xl font-serif font-bold mb-4">Not Sure Which Meditation is Right for You?</h2>
          <p className="text-blush-100 mb-6">Take our personalized quiz to discover your perfect practice based on your birth chart.</p>
          <a href="/quiz" className="bg-white text-ethereal-900 px-8 py-3 rounded-full font-medium hover:bg-blush-50 transition-colors duration-300">
            Find My Perfect Meditation
          </a>
        </div>

        {/* Filters */}
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
                  ? 'bg-gradient-to-r from-ethereal-700 to-blush-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-ethereal-50 hover:text-ethereal-700 border border-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Meditations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeditations.map((meditation) => (
            <div key={meditation.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              {/* Card Header */}
              <div className="relative bg-gradient-to-br from-purple-100 to-rose-100 p-6">
                {meditation.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
                
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-1">
                      <span className="text-white font-bold text-sm">☉</span>
                    </div>
                    <p className="text-xs text-gray-600">{meditation.sunSign}</p>
                  </div>
                  <span className="text-purple-400">+</span>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mb-1">
                      <span className="text-white font-bold text-sm">☽</span>
                    </div>
                    <p className="text-xs text-gray-600">{meditation.moonSign}</p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3 line-clamp-2">
                  {meditation.title}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {meditation.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">⏱️</span>
                    <span>{meditation.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">🎯</span>
                    <span className="line-clamp-1">{meditation.intention}</span>
                  </div>
                  <div className="flex items-center text-sm text-green-600 font-medium">
                    <Download className="h-4 w-4 mr-2" />
                    <span>Includes Free Astro PDF Guide</span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-900">{meditation.price}</div>
                    <div className="text-xs text-gray-500">Instant download</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors duration-200">
                      <Play className="h-4 w-4" />
                    </button>
                    <button className="bg-gradient-to-r from-ethereal-700 to-blush-600 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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