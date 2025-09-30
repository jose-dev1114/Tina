import { Link } from 'react-router-dom';
import { Moon, Heart, Star, Users } from 'lucide-react';
import OrganicShapes from '../components/OrganicShapes';
import WaveBottom from '../components/WaveBottom';
import WaveTop from '../components/WaveTop';

const HomePage = () => {
  const benefits = [
    {
      icon: Moon,
      title: "Lunar-Aligned Healing",
      description: "Meditations synchronized with moon phases for deeper spiritual connection"
    },
    {
      icon: Heart,
      title: "Personalized to Your Soul",
      description: "Each practice tailored to your unique Sun and Moon sign combination"
    },
    {
      icon: Star,
      title: "Ancient Wisdom, Modern Practice",
      description: "Yoga Nidra techniques enhanced with astrological insights"
    },
    {
      icon: Users,
      title: "Sacred Community",
      description: "Join a supportive circle of like-minded souls on their healing journey"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      sign: "Scorpio Sun, Cancer Moon",
      text: "This meditation completely transformed my sleep and emotional healing. I finally feel aligned with my true self.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Luna C.",
      sign: "Pisces Sun, Virgo Moon",
      text: "The personalized approach made all the difference. I've never experienced such deep, restorative meditation.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Maya R.",
      sign: "Leo Sun, Aquarius Moon",
      text: "Tina's guidance helped me understand my chart on a soul level. The free PDF guide was incredibly insightful.",
      image: "https://images.pexels.com/photos/1385472/pexels-photo-1385472.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <div className="min-h-screen">

      {/* Hero Section - Chico-inspired design */}
      <section className="relative overflow-hidden bg-organic-gradient min-h-screen flex items-center">
        <OrganicShapes variant="hero" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-left animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full text-sm text-lavender-700 font-medium mb-8 shadow-sm">
                <Moon className="h-4 w-4" />
                <span>Awakening Your Lunar Wisdom</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-ethereal-800 mb-8 leading-tight">
                Your New
                <span className="block bg-gradient-to-r from-lavender-500 to-blush-400 bg-clip-text text-transparent">
                  Morning Practice.
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-ethereal-600 mb-10 max-w-2xl leading-relaxed">
                Go beyond traditional meditation with personalized Yoga Nidra & Lunar Nidra practices,
                a better soul-aligned alternative.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/quiz"
                  className="bg-ethereal-800 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-ethereal-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>FIND YOUR PRACTICE</span>
                </Link>

                <Link
                  to="/community"
                  className="bg-white/80 backdrop-blur-sm text-ethereal-800 px-8 py-4 rounded-full font-medium text-lg hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 border border-lavender-200 shadow-sm"
                >
                  <Users className="h-5 w-5" />
                  <span>Join Our Circle</span>
                </Link>
              </div>

              <p className="text-sm text-ethereal-500">
                Not sure of your Moon sign?
                <a href="#" className="text-lavender-600 hover:text-lavender-700 underline ml-1">Take our free quiz</a>
              </p>
            </div>

            {/* Right side - Product showcase inspired by Chico */}
            <div className="relative animate-slide-up">
              <div className="relative">
                {/* Main meditation product mockup */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-lavender-gradient rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Moon className="h-8 w-8 text-lavender-600" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-ethereal-800 mb-2">Lunar Nidra</h3>
                    <p className="text-sm text-ethereal-600 mb-4">Personalized for your Moon sign</p>
                    <div className="bg-white rounded-full px-4 py-2 text-xs font-medium text-lavender-700">
                      45 min • Deep Rest
                    </div>
                  </div>
                </div>

                {/* Secondary product */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-6 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-blush-gradient rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Star className="h-6 w-6 text-blush-500" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-ethereal-800 mb-1">Solar Practice</h4>
                    <p className="text-xs text-ethereal-600">Morning alignment</p>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-6 -left-6 bg-white rounded-full p-4 shadow-lg animate-float">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lavender-600">✨</div>
                    <div className="text-xs font-medium text-ethereal-700">Sacred</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom border */}
        <WaveBottom variant="white" className="z-10" />
      </section>

      {/* What is Lunar Nidra Section - Chico-inspired with organic shapes */}
      <section className="relative py-32 bg-white overflow-hidden">
        <OrganicShapes variant="section" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header with centered design */}
          <div className="text-center mb-20">
            <div className="inline-block">
              <div className="w-16 h-16 bg-lavender-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Moon className="h-8 w-8 text-lavender-600" />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-ethereal-800 mb-6">
              Soul-powered transformation
              <span className="block text-4xl md:text-5xl bg-gradient-to-r from-lavender-500 to-blush-400 bg-clip-text text-transparent">
                from 6 Sacred Practices
              </span>
            </h2>
          </div>

          {/* Clean benefits grid inspired by Chico's simple approach */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto">
            {[
              { title: "Deep Rest", description: "Profound relaxation beyond sleep" },
              { title: "Soul Alignment", description: "Connect with your authentic self" },
              { title: "Emotional Healing", description: "Release what no longer serves" },
              { title: "Cosmic Connection", description: "Align with lunar rhythms" },
              { title: "Inner Wisdom", description: "Access your intuitive guidance" },
              { title: "Spiritual Growth", description: "Expand your consciousness" }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-lavender-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-lavender-500 rounded-full"></div>
                  </div>
                </div>
                <h4 className="font-serif text-lg font-bold text-ethereal-800 mb-2">{benefit.title}</h4>
                <p className="text-sm text-ethereal-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Central meditation visual */}
          <div className="flex justify-center mb-20">
            <div className="relative">
              <div className="w-64 h-64 bg-lavender-gradient rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-lavender-gradient rounded-full flex items-center justify-center mx-auto mb-3">
                      <Moon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-ethereal-800">Lunar Nidra</h3>
                    <p className="text-xs text-ethereal-600">Sacred Practice</p>
                  </div>
                </div>
              </div>

              {/* Subtle floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blush-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-peach-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Description section */}
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-serif font-bold text-ethereal-800 mb-6">
              Looks like meditation.
            </h3>
            <p className="text-xl text-ethereal-600 leading-relaxed mb-8">
              Say hello to Lunar Nidra, a champion for change in our spiritual routines.
              Enjoy the rich depth and perks of meditation <em>without</em> the mental effort.
            </p>
            <Link
              to="/learn"
              className="inline-flex items-center bg-ethereal-800 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-ethereal-700 transition-all duration-300 shadow-lg"
            >
              <span>LEARN MORE</span>
            </Link>
          </div>
        </div>

        {/* Wave bottom border transitioning to ethereal-50 background */}
        <WaveBottom variant="ethereal-50" className="z-10" />
      </section>

      {/* Product Showcase Section - Chico-inspired */}
      <section className="py-32 bg-ethereal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-ethereal-800 mb-8">
              A practice of Lunar Nidra a day, keeps the chaos away.
            </h2>
          </div>

          {/* Product cards inspired by Chico's flavor showcase */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              const colors = [
                { bg: 'bg-lavender-gradient', border: 'border-lavender-200', icon: 'text-lavender-600' },
                { bg: 'bg-blush-gradient', border: 'border-blush-200', icon: 'text-blush-600' },
                { bg: 'bg-peach-gradient', border: 'border-peach-200', icon: 'text-peach-600' }
              ];
              const colorScheme = colors[index % 3];

              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="text-center">
                    <div className="text-sm font-medium text-ethereal-500 mb-2">Sacred Practice</div>
                    <h3 className="text-2xl font-serif font-bold text-ethereal-800 mb-6">{benefit.title}</h3>

                    {/* Product mockup */}
                    <div className="relative mb-8">
                      <div className={`w-48 h-64 ${colorScheme.bg} rounded-2xl mx-auto shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 border ${colorScheme.border}`}>
                        <div className="flex flex-col items-center justify-center h-full p-6">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                            <IconComponent className={`h-8 w-8 ${colorScheme.icon}`} />
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-medium text-ethereal-700 mb-2">Lunar Nidra</div>
                            <div className="text-sm font-bold text-ethereal-800">{benefit.title}</div>
                          </div>
                        </div>
                      </div>

                      {/* Hand holding effect */}
                      <div className="absolute -bottom-4 -right-2 w-16 h-20 opacity-60">
                        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-full transform rotate-12"></div>
                      </div>
                    </div>

                    <p className="text-ethereal-600 leading-relaxed mb-6">{benefit.description}</p>

                    <button className="w-full bg-ethereal-800 text-white py-4 rounded-full font-medium text-lg hover:bg-ethereal-700 transition-colors duration-300 shadow-lg">
                      EXPERIENCE NOW
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-ethereal-600 mb-6">Start your collection</p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-white text-ethereal-800 px-8 py-4 rounded-full font-medium text-lg hover:bg-ethereal-50 transition-all duration-300 shadow-lg border border-ethereal-200"
            >
              <span>VIEW ALL PRACTICES</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-purple-900 mb-4">
              Sacred Transformations
            </h2>
            <p className="text-xl text-gray-600">
              Stories from our beautiful community of healing souls
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-ethereal-50 to-blush-50 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-purple-900">{testimonial.name}</h4>
                    <p className="text-sm text-rose-600">{testimonial.sign}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Chico-inspired */}
      <section className="relative py-32 bg-blush-gradient overflow-hidden">
        {/* Wave top border */}
        <WaveTop variant="white" className="z-10" />
        <OrganicShapes variant="accent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-ethereal-800 mb-8">
                What soul seekers are wondering...
              </h2>

              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-ethereal-800 group-hover:text-lavender-600 transition-colors duration-200">
                      How does Lunar Nidra differ from regular meditation?
                    </h3>
                    <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center group-hover:bg-lavender-200 transition-colors duration-200">
                      <span className="text-lavender-600 font-bold">+</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-ethereal-800 group-hover:text-lavender-600 transition-colors duration-200">
                      Do I need to know my exact birth time?
                    </h3>
                    <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center group-hover:bg-lavender-200 transition-colors duration-200">
                      <span className="text-lavender-600 font-bold">+</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-ethereal-800 group-hover:text-lavender-600 transition-colors duration-200">
                      Is Lunar Nidra suitable for beginners?
                    </h3>
                    <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center group-hover:bg-lavender-200 transition-colors duration-200">
                      <span className="text-lavender-600 font-bold">+</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-ethereal-800 group-hover:text-lavender-600 transition-colors duration-200">
                      Can we talk about the spiritual benefits?
                    </h3>
                    <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center group-hover:bg-lavender-200 transition-colors duration-200">
                      <span className="text-lavender-600 font-bold">+</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-ethereal-800 group-hover:text-lavender-600 transition-colors duration-200">
                      How is Lunar Nidra... practiced?
                    </h3>
                    <div className="w-8 h-8 bg-lavender-100 rounded-full flex items-center justify-center group-hover:bg-lavender-200 transition-colors duration-200">
                      <span className="text-lavender-600 font-bold">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Visual element */}
            <div className="relative">
              <div className="relative">
                {/* Main meditation container mockup */}
                <div className="w-80 h-96 bg-white rounded-3xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500 mx-auto">
                  <div className="h-full bg-lavender-gradient rounded-3xl p-8 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <Moon className="h-10 w-10 text-lavender-600" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">Lunar Nidra</h3>
                    <p className="text-white/80 text-center text-sm mb-6">Personalized Sacred Practice</p>
                    <div className="bg-white/20 rounded-full px-6 py-2">
                      <span className="text-white text-sm font-medium">45 min journey</span>
                    </div>
                  </div>
                </div>

                {/* Floating meditation pod */}
                <div className="absolute -bottom-8 -left-8 w-32 h-40 bg-white rounded-2xl shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                  <div className="h-full bg-blush-gradient rounded-2xl p-4 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                      <Star className="h-6 w-6 text-blush-500" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-ethereal-800 text-center">Solar Practice</h4>
                    <p className="text-xs text-ethereal-600 text-center">Morning ritual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;