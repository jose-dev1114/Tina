
import { BookOpen, Play, Star, Clock, User, X, Sparkles, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Learn = () => {
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmittingNewsletter(true);

    try {
      // Simulate API call - Replace with actual newsletter API
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('🌙 Welcome to our sacred circle! Check your email for a special gift.', {
        duration: 5000,
      });

      setNewsletterEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmittingNewsletter(false);
    }
  };
  const featuredArticles = [
    {
      id: 1,
      slug: "what-is-yoga-nidra",
      title: "What is Yoga Nidra? A Complete Guide to Yogic Sleep",
      excerpt: "Discover the ancient practice of conscious sleep and how it can transform your life through deep relaxation and healing.",
      category: "Meditation",
      readTime: "8 min read",
      author: "Tina Maat",
      image: "https://images.pexels.com/photos/3820295/pexels-photo-3820295.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: 2,
      slug: "moon-sign-sleep-patterns",
      title: "How Your Moon Sign Affects Your Sleep Patterns",
      excerpt: "Learn how lunar energy influences your rest cycles and discover personalized sleep practices based on your Moon sign.",
      category: "Astrology",
      readTime: "12 min read",
      author: "Tina Maat",
      image: "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      slug: "sacred-sleep-space",
      title: "Creating a Sacred Sleep Space for Deep Rest",
      excerpt: "Transform your bedroom into a sanctuary that supports profound relaxation and spiritual connection.",
      category: "Spiritual Growth",
      readTime: "6 min read",
      author: "Tina Maat",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80"
    }
  ];

  const allArticles = [
    {
      slug: "lunar-nidra-vs-meditation",
      title: "Lunar Nidra vs Traditional Meditation: What's the Difference?",
      category: "Meditation",
      readTime: "10 min read",
      excerpt: "Understanding the unique benefits of astrologically-aligned meditation practices.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80"
    },
    {
      slug: "astral-projection-science",
      title: "The Science Behind Astral Projection During Yoga Nidra",
      category: "Sleep Science",
      readTime: "15 min read",
      excerpt: "Explore the neuroscience of consciousness during the liminal state.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80"
    },
    {
      slug: "calculate-moon-sign",
      title: "How to Calculate Your Moon Sign (Free Guide)",
      category: "Astrology",
      readTime: "5 min read",
      excerpt: "Step-by-step instructions for finding your lunar placement.",
      image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=400&q=80"
    },
    {
      slug: "cancer-moon-healing",
      title: "Emotional Healing Through Cancer Moon Meditations",
      category: "Spiritual Growth",
      readTime: "8 min read",
      excerpt: "Special considerations for water sign emotional processing.",
      image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&q=80"
    },
    {
      slug: "fire-sign-meditation",
      title: "Fire Sign Meditation: Working with Aries, Leo, and Sagittarius Energy",
      category: "Astrology",
      readTime: "12 min read",
      excerpt: "Techniques for channeling fiery energy into peaceful practice.",
      image: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=400&q=80"
    },
    {
      slug: "intention-setting-meditation",
      title: "The Role of Intention Setting in Personalized Meditation",
      category: "Meditation",
      readTime: "7 min read",
      excerpt: "How to align your practice with your soul's true desires.",
      image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=400&q=80"
    }
  ];

  const videos = [
    {
      title: "5-Minute Morning Moon Salutation",
      duration: "5:23",
      description: "Start your day with lunar energy alignment",
      thumbnail: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URL
    },
    {
      title: "Understanding Your Astrological Chart",
      duration: "18:45",
      description: "Learn to read your birth chart with Tina",
      thumbnail: "https://images.pexels.com/photos/1292843/pexels-photo-1292843.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URL
    },
    {
      title: "Breathwork for Each Zodiac Element",
      duration: "12:30",
      description: "Element-specific breathing techniques",
      thumbnail: "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=400",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video URL
    }
  ];

  const categories = [
    "All", "Meditation", "Astrology", "Sleep Science", "Astral Projection", "Spiritual Growth"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-700 font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Sacred Wisdom Library</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
            Resources & Grow
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Deepen your practice with articles, videos, and guides on meditation, astrology, 
            and conscious living. All the wisdom you need for your sacred journey.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticles[0] && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={featuredArticles[0].image} 
                  alt={featuredArticles[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-700 to-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Featured Article
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{featuredArticles[0].category}</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredArticles[0].readTime}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{featuredArticles[0].author}</span>
                  </span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-primary-700 mb-4">
                  {featuredArticles[0].title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredArticles[0].excerpt}
                </p>
                <Link
                  to={`/learn/${featuredArticles[0].slug}`}
                  className="bg-gradient-to-r from-primary-700 to-primary-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 self-start inline-block"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Videos Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary-700 mb-8 text-center">
            Sacred Teachings & Mini-Practices
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div
                key={index}
                onClick={() => setShowComingSoonModal(true)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="bg-gradient-to-r from-purple-600 to-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-2xl border-2 border-white/30 flex items-center space-x-2 animate-pulse">
                      <Sparkles className="h-4 w-4" />
                      <span>Coming Soon</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-primary-700 mb-2">{video.title}</h3>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary-700 mb-8 text-center">
            Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Heidi's Daily Moon Notes */}
            <a
              href="https://heidiroserobbins.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">Daily Practice</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3 leading-tight">Heidi's Daily Moon Notes</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  My mentor and friend, Heidi Rose Robbins, blends astrology and poetry for a gentle daily grounding. A beautiful way to stay tethered to the lunar rhythm.
                </p>
              </div>
            </a>

            {/* The Work of Byron Katie */}
            <a
              href="https://thework.com/books/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">Books</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3 leading-tight">The Work of Byron Katie</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  My go-to resource for over 20 years. The Work of Byron Katie offers a radical path to clarity, helping you dismantle painful beliefs and wake up to reality.
                </p>
              </div>
            </a>

            {/* Breaking the Habit of Being Yourself */}
            <a
              href="https://drjoedispenza.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">Books</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3 leading-tight">Breaking the Habit of Being Yourself</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The science behind the magic. Dr. Joe Dispenza explains the neuroscience of how we change, providing the intellectual framework for why practices like Lunar Nidra are so effective.
                </p>
              </div>
            </a>

            {/* Dr. Andrew Huberman - Yoga Nidra */}
            <a
              href="https://www.youtube.com/shorts/TGiAo39mkQw"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">Video</span>
                  <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3 leading-tight">Dr. Andrew Huberman on Yoga Nidra</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The science of rest. Dr. Andrew Huberman explains why the 'twilight state' of Yoga Nidra is so effective for calming the nervous system and quieting a busy mind.
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full font-medium transition-all duration-200 bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-700 border border-gray-200"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredArticles.slice(1).map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{article.category}</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3 leading-tight">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{article.excerpt}</p>
                <Link
                  to={`/learn/${article.slug}`}
                  className="text-primary-700 hover:text-primary-900 font-medium text-sm"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
          
          {allArticles.map((article, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{article.category}</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary-700 mb-3 leading-tight">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{article.excerpt}</p>
                <Link
                  to={`/learn/${article.slug}`}
                  className="text-primary-700 hover:text-primary-900 font-medium text-sm"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold mb-4">
              Never Miss Sacred Wisdom
            </h3>
            <p className="text-white/80 mb-6">
              Get our latest articles, moon phase reminders, and exclusive meditations delivered to your inbox with love.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your sacred email..."
                disabled={isSubmittingNewsletter}
                className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmittingNewsletter}
                className="bg-white text-primary-700 px-8 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingNewsletter ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Coming Soon Modal */}
        {showComingSoonModal && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setShowComingSoonModal(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-600 to-primary-600 text-white p-6 text-center relative">
                <button
                  onClick={() => setShowComingSoonModal(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Sparkles className="h-12 w-12" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-2xl mb-2">Coming Soon!</h3>
                <p className="text-purple-100">These videos are being created just for you</p>
              </div>

              {/* Modal Body */}
              <div className="p-6 text-center">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  I'm working on creating beautiful video content to support your practice.
                  Join our community to be notified when these teachings are released!
                </p>
                <a
                  href="/community"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-primary-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  <span>Join the Community</span>
                  <Sparkles className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;