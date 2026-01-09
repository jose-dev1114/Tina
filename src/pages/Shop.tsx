import { useState, useEffect } from 'react';
import { Star, Play, Download, ShoppingCart, Package, Music, Sparkles, Check, Clock, Infinity, Shield, Headphones, Heart, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types/database';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { useUser } from '@clerk/clerk-react';

const Shop = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState<'recordings' | 'cards'>('recordings');
  const { addToCart, cart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());
  const { isSignedIn, isLoaded } = useUser();

  // Scroll to top when component mounts and handle loading
  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Handle opening audio in new tab
  const handlePlayAudio = async (fileName: string) => {
    // Check if user is signed in
    if (!isLoaded) {
      toast.error('Loading... Please wait.');
      return;
    }

    if (!isSignedIn) {
      toast.error('Please sign in to play audio 🔒', {
        duration: 4000,
      });
      return;
    }

    try {
      toast.loading('Loading audio...', { id: 'audio-loading' });

      // Get download URL from Firebase Storage
      const audioRef = ref(storage, fileName);
      const url = await getDownloadURL(audioRef);

      // Open in new tab
      window.open(url, '_blank');

      toast.success('Opening audio in new tab! 🎵', { id: 'audio-loading' });
    } catch (error) {
      console.error('Error fetching audio URL:', error);
      toast.error('Failed to load audio', { id: 'audio-loading' });
    }
  };

  // Lunar Nidra Recordings - $5/month subscription access
  const lunarNidraRecordings = [
    {
      id: 'rec-1',
      title: 'Aries Full Moon',
      date: 'October 6, 2025',
      duration: '45 min',
      moonPhase: 'Full Moon',
      sign: 'Aries',
      fileName: 'Arie Full Moon LN 10.6.25.mp3',
      description: 'Channel the fiery energy of Aries Full Moon for courage and new beginnings.'
    },
    {
      id: 'rec-2',
      title: 'Gemini Full Moon',
      date: 'May 12, 2025',
      duration: '45 min',
      moonPhase: 'Full Moon',
      sign: 'Gemini',
      fileName: 'Gemini full moon 5.12.25 final.mp3',
      description: 'Embrace communication and curiosity with Gemini Full Moon energy.'
    },
    {
      id: 'rec-3',
      title: 'Cancer New Moon',
      date: 'June 24, 2025',
      duration: '45 min',
      moonPhase: 'New Moon',
      sign: 'Cancer',
      fileName: 'LN Cancer New Moon 6.24.25 w.music.mp3',
      description: 'Nurture your emotional depths with Cancer New Moon healing.'
    },
    {
      id: 'rec-4',
      title: 'Capricorn Full Moon',
      date: 'July 8, 2025',
      duration: '45 min',
      moonPhase: 'Full Moon',
      sign: 'Capricorn',
      fileName: 'LN Capricorn Full Moon - 7_8_25final.mp3',
      description: 'Ground yourself in Capricorn Full Moon wisdom and structure.'
    },
    {
      id: 'rec-5',
      title: 'Taurus Full Moon',
      date: 'November 5, 2025',
      duration: '45 min',
      moonPhase: 'Full Moon',
      sign: 'Taurus',
      fileName: 'LN Full Moon Taurus 11.5.25.mp3',
      description: 'Connect with abundance and stability through Taurus Full Moon.'
    },
    {
      id: 'rec-6',
      title: 'Gemini New Moon',
      date: 'May 26, 2025',
      duration: '45 min',
      moonPhase: 'New Moon',
      sign: 'Gemini',
      fileName: 'LN Gemini New Moon 5.26.25 final w.mc.mp3',
      description: 'Set intentions for communication and learning with Gemini New Moon.'
    },
    {
      id: 'rec-7',
      title: 'Sagittarius Full Moon',
      date: 'June 10, 2025',
      duration: '45 min',
      moonPhase: 'Full Moon',
      sign: 'Sagittarius',
      fileName: 'LN Sagittarius Full Moon - 6.10.25.mp3',
      description: 'Expand your horizons with Sagittarius Full Moon adventure.'
    },
    {
      id: 'rec-8',
      title: 'Scorpio New Moon',
      date: 'November 19, 2025',
      duration: '45 min',
      moonPhase: 'New Moon',
      sign: 'Scorpio',
      fileName: 'LN Scorpio NM 11.19.25 w_m final.mp3',
      description: 'Transform and release with powerful Scorpio New Moon energy.'
    },
    {
      id: 'rec-9',
      title: 'Virgo New Moon',
      date: 'August 22, 2025',
      duration: '45 min',
      moonPhase: 'New Moon',
      sign: 'Virgo',
      fileName: 'LN Virgo NM 8.22.25 - with music.mp3',
      description: 'Purify and organize your life with Virgo New Moon clarity.'
    },
    {
      id: 'rec-10',
      title: 'Aries New Moon',
      date: 'March 27, 2025',
      duration: '45 min',
      moonPhase: 'New Moon',
      sign: 'Aries',
      fileName: 'Lunar Nidra Aries New Moon w_music (ED) Final- 3.27.25.mp3',
      description: 'Ignite your passion and courage with Aries New Moon fire.'
    },
    {
      id: 'rec-11',
      title: 'Libra Full Moon',
      date: 'April 12, 2025',
      duration: '45 min',
      moonPhase: 'Full Moon',
      sign: 'Libra',
      fileName: 'Lunar Nidra Full Moon ED- Libra 4.12.25.mp3',
      description: 'Find balance and harmony with Libra Full Moon grace.'
    },
    {
      id: 'rec-12',
      title: 'Virgo Eclipse',
      date: 'March 13, 2025',
      duration: '45 min',
      moonPhase: 'Eclipse',
      sign: 'Virgo',
      fileName: 'Lunar Nidra Virgo Eclipse 3.13.25 (ED) Final.mp3',
      description: 'Experience profound transformation with Virgo Eclipse energy.'
    },
    {
      id: 'rec-13',
      title: 'Aquarius Full Moon',
      date: 'August 8, 2025',
      duration: '45 min',
      moonPhase: 'Full Moon',
      sign: 'Aquarius',
      fileName: 'N Full Moon Aquarius 8.8.2025 final.mp3',
      description: 'Awaken your unique vision with Aquarius Full Moon innovation.'
    },
    {
      id: 'rec-14',
      title: 'Leo New Moon',
      date: 'July 24, 2025',
      duration: '45 min',
      moonPhase: 'New Moon',
      sign: 'Leo',
      fileName: 'NM Leo LN 7.24.25 - with music.mp3',
      description: 'Shine your light with confident Leo New Moon energy.'
    },
    {
      id: 'rec-15',
      title: 'Libra New Moon',
      date: 'October 20, 2025',
      duration: '45 min',
      moonPhase: 'New Moon',
      sign: 'Libra',
      fileName: 'NM Libra Lunar Nidra final- 10_20_25with music.mp3',
      description: 'Create harmony and partnership with Libra New Moon balance.'
    },
    {
      id: 'rec-16',
      title: 'Pisces Lunar Eclipse',
      date: 'September 7, 2025',
      duration: '45 min',
      moonPhase: 'Eclipse',
      sign: 'Pisces',
      fileName: 'Pisces Lunar Eclipse 9.7.25 .mp3',
      description: 'Dive deep into spiritual waters with Pisces Lunar Eclipse.'
    },
    {
      id: 'rec-17',
      title: 'Scorpio Full Moon',
      date: 'May 12, 2025',
      duration: '45 min',
      moonPhase: 'Full Moon',
      sign: 'Scorpio',
      fileName: 'Scorpio Full Moon LN 5.12.25.final.mp3',
      description: 'Embrace transformation and depth with Scorpio Full Moon power.'
    },
    {
      id: 'rec-18',
      title: 'Taurus New Moon',
      date: 'April 27, 2025',
      duration: '45 min',
      moonPhase: 'New Moon',
      sign: 'Taurus',
      fileName: 'Taurus New Moon LN 4.27.25 w_music Final.mp3',
      description: 'Ground into abundance with Taurus New Moon stability.'
    },
    {
      id: 'rec-19',
      title: 'Virgo New Moon Solar Eclipse',
      date: 'September 20, 2025',
      duration: '45 min',
      moonPhase: 'Eclipse',
      sign: 'Virgo',
      fileName: 'Virgo New Moon Solar Eclips LN - 9_20_25 w_music.mp3',
      description: 'Purify and renew with Virgo Solar Eclipse transformation.'
    }
  ];
  
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

  const toggleDescription = (productId: string) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const isDescriptionExpanded = (productId: string) => {
    return expandedDescriptions.has(productId);
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-50 to-white border border-primary-200 px-5 py-2.5 rounded-full text-sm text-primary-700 font-semibold mb-6 shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>Premium Collection</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent mb-6 leading-tight">
            Free Lunar Nidra Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Access all meditation recordings for free. Discover sacred tools to deepen your spiritual practice.
          </p>
        </div>

        {/* Product Type Tabs */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedTab('recordings')}
            className={`px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2.5 ${
              selectedTab === 'recordings'
                ? 'bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-700 border border-gray-200 hover:border-primary-300 hover:shadow-md'
            }`}
          >
            <Headphones className="h-5 w-5" />
            <span>Digital Recordings</span>
          </button>
          <button
            onClick={() => setSelectedTab('cards')}
            className={`px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2.5 ${
              selectedTab === 'cards'
                ? 'bg-gradient-to-r from-primary-700 to-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-700 border border-gray-200 hover:border-primary-300 hover:shadow-md'
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

        {/* Free Access Banner for Recordings */}
        {selectedTab === 'recordings' && (
          <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 rounded-3xl p-8 md:p-10 text-white mb-12 shadow-2xl overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
            </div>
            {/* Subtle animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent"></div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-center mb-6 gap-3">
                <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl">
                  <Headphones className="h-10 w-10" />
                </div>
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-1">Lunar Nidra Library</h2>
                  <p className="text-white/90 text-base font-medium">Complete Moon Phase Collection</p>
                </div>
              </div>
              <p className="text-base mb-6 max-w-3xl mx-auto text-center text-white/90 leading-relaxed">
                Stream guided Lunar Nidra meditations aligned with every moon phase and astrological sign. Experience deep rest and transformation through the lunar cycle.
              </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 max-w-4xl mx-auto">
              {/* Card 1 - Free */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/20 backdrop-blur-md rounded-2xl p-7 text-center border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative inline-block mb-5">
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-lg opacity-50"></div>
                    <div className="relative bg-white/95 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Sparkles className="h-7 w-7 text-primary-600" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-1.5 tracking-tight">24</div>
                  <div className="text-sm text-white/90 font-semibold">Moon Phases</div>
                </div>
              </div>

              {/* Card 2 - Recordings */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/20 backdrop-blur-md rounded-2xl p-7 text-center border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative inline-block mb-5">
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-lg opacity-50"></div>
                    <div className="relative bg-white/95 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Music className="h-7 w-7 text-primary-600" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-1.5 tracking-tight">19+</div>
                  <div className="text-sm text-white/90 font-semibold">recordings</div>
                </div>
              </div>

              {/* Card 3 - Unlimited */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/20 backdrop-blur-md rounded-2xl p-7 text-center border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative inline-block mb-5">
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-lg opacity-50"></div>
                    <div className="relative bg-white/95 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Infinity className="h-7 w-7 text-primary-600" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-1.5 tracking-tight">Unlimited</div>
                  <div className="text-sm text-white/90 font-semibold">listening</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              {/* Free Access Message */}
              <div className="flex items-center justify-center space-x-3 text-white bg-white/15 backdrop-blur-md rounded-2xl py-4 px-6 max-w-lg mx-auto border border-white/30 shadow-xl mb-5">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <Heart className="h-5 w-5" />
                </div>
                <span className="text-base font-semibold">All meditations are free to stream!</span>
              </div>

              {/* New Meditations Notice */}
              <div className="flex items-center justify-center space-x-2 text-white/90">
                <Sparkles className="h-4 w-4" />
                <p className="text-sm font-medium">New meditations added monthly</p>
              </div>
            </div>
            </div>
          </div>
        )}



        {/* Recordings Grid */}
        {selectedTab === 'recordings' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lunarNidraRecordings.map((recording, index) => (
              <div
                key={recording.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group border border-gray-100 hover:border-primary-200 hover:-translate-y-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Recording Header with Image */}
                <div className="relative h-48 overflow-hidden">
                  {/* Background Image - Moon phase themed */}
                  <img
                    src={
                      recording.moonPhase === 'Full Moon' ? (
                        // Full Moon images - bright, prominent full moons
                        recording.sign === 'Aries' ? 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80' : // Red/orange full moon
                        recording.sign === 'Gemini' ? 'https://images.unsplash.com/photo-1509803874385-db7c23652552?w=800&q=80' : // Bright full moon
                        recording.sign === 'Capricorn' ? 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80' : // Full moon in night sky
                        recording.sign === 'Taurus' ? 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=800&q=80' : // Golden full moon
                        recording.sign === 'Sagittarius' ? 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=800&q=80' : // Full moon at dusk
                        recording.sign === 'Libra' ? 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80' : // Full moon rising
                        recording.sign === 'Scorpio' ? 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80' : // Full moon through clouds
                        recording.sign === 'Aquarius' ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' : // Full moon over landscape
                        'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80' // Default full moon
                      ) : recording.moonPhase === 'New Moon' ? (
                        // New Moon images - crescent moons prominently featured
                        recording.sign === 'Cancer' ? 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80' : // Crescent moon close-up
                        recording.sign === 'Gemini' ? 'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=800&q=80' : // Thin crescent moon
                        recording.sign === 'Scorpio' ? 'https://images.unsplash.com/photo-1505506874110-6a7a69069a08?w=800&q=80' : // Crescent moon in dark sky
                        recording.sign === 'Virgo' ? 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80' : // Crescent moon with stars
                        recording.sign === 'Aries' ? 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80' : // Moon in night
                        recording.sign === 'Leo' ? 'https://images.unsplash.com/photo-1509803874385-db7c23652552?w=800&q=80' : // Moon silhouette
                        recording.sign === 'Libra' ? 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80' : // Moon in starry sky
                        recording.sign === 'Taurus' ? 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=800&q=80' : // Moon at twilight
                        'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80' // Default crescent moon
                      ) : (
                        // Eclipse images - dramatic eclipse photos
                        recording.sign === 'Virgo' ? 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=800&q=80' : // Solar eclipse
                        recording.sign === 'Pisces' ? 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80' : // Lunar eclipse (red moon)
                        'https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=800&q=80' // Default eclipse
                      )
                    }
                    alt={`${recording.sign} ${recording.moonPhase}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                </div>

                {/* Recording Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-primary-700 bg-gradient-to-r from-primary-50 to-primary-100 px-3 py-1 rounded-full border border-primary-200 shadow-sm">
                      {recording.sign}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{recording.date}</span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                    {recording.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {recording.description}
                  </p>

                  {/* Recording Details */}
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                    <div className="flex items-center text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl">
                      <Clock className="h-3.5 w-3.5 mr-1.5 text-primary-600" />
                      <span className="font-medium">{recording.duration}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl">
                      <Music className="h-3.5 w-3.5 mr-1.5 text-primary-600" />
                      <span className="font-medium">With music</span>
                    </div>
                  </div>

                  {/* Play Button - Opens audio in new tab (requires login) */}
                  <button
                    onClick={() => handlePlayAudio(recording.fileName)}
                    className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 group/play ${
                      isSignedIn
                        ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600'
                        : 'bg-gray-400 text-white cursor-not-allowed opacity-75'
                    }`}
                  >
                    <div className="bg-white/20 p-1 rounded-full group-hover/play:scale-110 transition-transform">
                      {isSignedIn ? (
                        <Play className="h-4 w-4 fill-white" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </div>
                    <span>{isSignedIn ? 'Play' : 'Sign In to Play'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cards Products Grid */}
        {selectedTab === 'cards' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group border border-gray-100 hover:border-primary-200 hover:-translate-y-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Product Image */}
              <div className="relative h-72 overflow-hidden bg-gradient-to-br from-primary-50 via-purple-50 to-rose-50">
                {product.featured && (
                  <div className="absolute top-5 right-5 bg-gradient-to-r from-amber-400 to-amber-300 text-amber-900 px-4 py-2 rounded-2xl text-xs font-bold z-10 shadow-xl border border-amber-200 flex items-center space-x-1">
                    <Star className="h-3.5 w-3.5 fill-amber-900" />
                    <span>Featured</span>
                  </div>
                )}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product.type === 'physical' && (
                  <div className="absolute top-5 left-5 bg-gradient-to-r from-primary-600 to-primary-500 text-white px-4 py-2 rounded-2xl text-xs font-bold z-10 flex items-center space-x-1.5 shadow-xl">
                    <Package className="h-3.5 w-3.5" />
                    <span>Physical Product</span>
                  </div>
                )}
              </div>

              {/* Product Content */}
              <div className="p-7">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors duration-300">
                  {product.name}
                </h3>

                <div className="mb-5">
                  <p className={`text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                    isDescriptionExpanded(product.id) ? '' : 'line-clamp-3'
                  }`}>
                    {product.description}
                  </p>
                  {product.description.length > 150 && (
                    <button
                      onClick={() => toggleDescription(product.id)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 flex items-center space-x-1 transition-colors duration-200"
                    >
                      <span>{isDescriptionExpanded(product.id) ? 'Read Less' : 'Read More'}</span>
                      <span className={`transform transition-transform duration-200 ${
                        isDescriptionExpanded(product.id) ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    </button>
                  )}
                </div>

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
                    <>
                      <div className="flex items-center text-sm text-blue-600 font-medium">
                        <Package className="h-4 w-4 mr-2" />
                        <span>Ships within 3-5 business days</span>
                      </div>
                      <div className="flex items-center text-sm text-amber-600 font-medium mt-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Next ship date: January 5, 2026</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Price and Actions */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">${product.price}</div>
                      <div className="text-xs text-gray-500 font-medium mt-1">
                        {product.type === 'digital' ? 'Instant download' : 'Free shipping over $50'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={isInCart(product.id)}
                    className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-300 flex items-center justify-center space-x-2.5 ${
                      isInCart(product.id)
                        ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 cursor-not-allowed border-2 border-green-200'
                        : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                    }`}
                  >
                    {isInCart(product.id) ? (
                      <>
                        <div className="bg-green-200 p-1.5 rounded-full">
                          <Check className="h-5 w-5" />
                        </div>
                        <span>Added to Cart</span>
                      </>
                    ) : (
                        <>
                          <div className="bg-white/20 p-1.5 rounded-full">
                            <ShoppingCart className="h-5 w-5" />
                          </div>
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}



        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-xl p-8">
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {/* Badge 1 - Instant Delivery */}
            <div className="text-center group">
              <div className="relative inline-block mb-5">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Download className="h-9 w-9 text-white" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-700 mb-2">Instant Digital Delivery</h3>
              <p className="text-sm text-primary-600 leading-relaxed">Download immediately after purchase. No waiting, no shipping.</p>
            </div>

            {/* Badge 2 - Lifetime Access */}
            <div className="text-center group">
              <div className="relative inline-block mb-5">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Infinity className="h-9 w-9 text-white" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-700 mb-2">Lifetime Access</h3>
              <p className="text-sm text-primary-600 leading-relaxed">Download and keep forever. Practice whenever you need.</p>
            </div>

            {/* Badge 3 - Secure & Private */}
            <div className="text-center group">
              <div className="relative inline-block mb-5">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Shield className="h-9 w-9 text-white" strokeWidth={2} />
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-primary-700 mb-2">Secure & Private</h3>
              <p className="text-sm text-primary-600 leading-relaxed">Your purchase is protected with industry-standard encryption.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;