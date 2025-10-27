import { Link } from 'react-router-dom';
import { Moon, Heart, Star, Users, Zap, Eye, Compass, Leaf, Wind, Sparkles, Cloud, Feather, Flame } from 'lucide-react';
import OrganicShapes from '../components/OrganicShapes';
import WaveBottom from '../components/WaveBottom';
import WaveTop from '../components/WaveTop';
import AnimatedHeading from '../components/AnimatedHeading';
import MoonLogo from '../components/MoonLogo';
import MoonPhaseSelector from '../components/MoonPhaseSelector';

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

      {/* Hero Section - Chico-inspired design with solid lavender background */}
      <section className="relative overflow-hidden bg-primary-300 min-h-screen flex items-center">
        <WaveTop variant="primary-300" className="absolute top-0 left-0 right-0 z-0" />
        <OrganicShapes variant="hero" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-left animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-sm text-primary-500 font-medium mb-8 shadow-sm">
                <Moon className="h-4 w-4" />
                <span>Awakening Your Lunar Wisdom</span>
              </div>

              <AnimatedHeading
                staticText="Your New"
                animatedWords={["Morning Practice", "Evening Ritual", "Lunar\nSanctuary"]}
              />

              <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl leading-relaxed">
                Go beyond traditional meditation with personalized Yoga Nidra & Lunar Nidra practices,
                a better soul-aligned alternative.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/quiz"
                  className="bg-primary-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg uppercase tracking-wide"
                >
                  <span>FIND YOUR PRACTICE</span>
                </Link>

                <Link
                  to="/community"
                  className="bg-white/90 backdrop-blur-sm text-primary-600 px-8 py-4 rounded-full font-semibold text-base hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-white/50 shadow-sm"
                >
                  <Users className="h-5 w-5" />
                  <span>Join Our Circle</span>
                </Link>
              </div>

              <p className="text-sm text-gray-600">
                Not sure of your Moon sign?
                <a href="#" className="text-primary-600 hover:text-primary-700 underline ml-1 font-medium">Take our free quiz</a>
              </p>
            </div>

            {/* Right side - Interactive Moon Phase Selector */}
            <div className="relative animate-slide-up h-96 md:h-full min-h-96">
              <MoonPhaseSelector />
            </div>
          </div>
        </div>

        {/* Wave bottom border */}
        <WaveBottom variant="primary-50" className="z-10" />
      </section>

      {/* What is Lunar Nidra Section - Chico-inspired with organic shapes */}
      <section className="relative py-32 bg-primary-50 overflow-hidden">
        <OrganicShapes variant="section" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header with centered design */}
          <div className="text-center mb-20">
            <div className="inline-block relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative">
                <MoonLogo size={80} />
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary-700 mb-4">
              Soul-powered transformation
              <span className="block text-4xl md:text-5xl bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
                from 6 Sacred Practices
              </span>
            </h2>
          </div>

          {/* Clean benefits grid inspired by Chico's simple approach */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
            {[
              { title: "Deep Rest", description: "Profound relaxation beyond sleep", icon: Cloud },
              { title: "Soul Alignment", description: "Connect with your authentic self", icon: Compass },
              { title: "Emotional Healing", description: "Release what no longer serves", icon: Heart },
              { title: "Cosmic Connection", description: "Align with lunar rhythms", icon: Star },
              { title: "Inner Wisdom", description: "Access your intuitive guidance", icon: Eye },
              { title: "Spiritual Growth", description: "Expand your consciousness", icon: Flame }
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-400 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                      <IconComponent className="h-10 w-10 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-primary-700 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-primary-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* Central meditation visual with orbiting benefit icons */}
          <div className="flex justify-center mb-20">
            <div className="relative w-96 h-96 flex items-center justify-center">
              {/* Outer orbit ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary-200/30 opacity-50"></div>
              <div className="absolute inset-8 rounded-full border-2 border-primary-300/20 opacity-30"></div>

              {/* Icon 1 - Cloud (orbits) */}
              <div
                className="absolute w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  animation: 'orbit 20s linear infinite',
                  width: '56px',
                  height: '56px',
                  marginLeft: '-28px',
                  marginTop: '-28px'
                }}
              >
                <Cloud className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>

              {/* Icon 2 - Heart (orbits with delay) */}
              <div
                className="absolute w-14 h-14 bg-gradient-to-br from-primary-300 to-primary-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  animation: 'orbit 20s linear infinite',
                  animationDelay: '-5s',
                  width: '56px',
                  height: '56px',
                  marginLeft: '-28px',
                  marginTop: '-28px'
                }}
              >
                <Heart className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>

              {/* Icon 3 - Eye (orbits with delay) */}
              <div
                className="absolute w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  animation: 'orbit 20s linear infinite',
                  animationDelay: '-10s',
                  width: '56px',
                  height: '56px',
                  marginLeft: '-28px',
                  marginTop: '-28px'
                }}
              >
                <Eye className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>

              {/* Icon 4 - Flame (orbits with delay) */}
              <div
                className="absolute w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                style={{
                  animation: 'orbit 20s linear infinite',
                  animationDelay: '-15s',
                  width: '56px',
                  height: '56px',
                  marginLeft: '-28px',
                  marginTop: '-28px'
                }}
              >
                <Flame className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>

              {/* Central circle */}
              <div className="relative z-10 w-64 h-64 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-inner">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Moon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-primary-700">Lunar Nidra</h3>
                    <p className="text-xs text-primary-600">Sacred Practice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description section */}
          <div className="max-w-4xl mx-auto text-center pb-16">
            <h3 className="text-3xl font-serif font-bold text-primary-700 mb-6">
              Looks like meditation.
            </h3>
            <p className="text-xl text-primary-600 leading-relaxed mb-8">
              Say hello to Lunar Nidra, a champion for change in our spiritual routines.
              Enjoy the rich depth and perks of meditation <em>without</em> the mental effort.
            </p>
            <Link
              to="/learn"
              className="inline-flex items-center bg-primary-700 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-800 transition-all duration-300 shadow-lg"
            >
              <span>LEARN MORE</span>
            </Link>
          </div>
        </div>

        {/* Wave bottom border transitioning to primary-300 background */}
        <WaveBottom variant="primary-300" className="z-10" />
      </section>

      {/* Product Showcase Section - Chico-inspired */}
      <section className="relative py-32 bg-primary-300 overflow-hidden">
        {/* Wave top border */}
        <WaveTop variant="primary-300" className="z-10" />
        <OrganicShapes variant="section" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-black mb-8">
              A practice of Lunar Nidra a day, keeps the chaos away.
            </h2>
          </div>

          {/* Product cards inspired by Chico's flavor showcase */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              const colors = [
                { bg: 'bg-gradient-to-br from-primary-100 to-primary-200', border: 'border-primary-200', icon: 'text-primary-700' },
                { bg: 'bg-gradient-to-br from-primary-50 to-primary-100', border: 'border-primary-100', icon: 'text-primary-700' },
                { bg: 'bg-gradient-to-br from-primary-50 to-primary-100', border: 'border-primary-50', icon: 'text-primary-700' }
              ];
              const colorScheme = colors[index % 3];

              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="text-center">
                    <div className="text-sm font-medium text-primary-500 mb-2">Sacred Practice</div>
                    <h3 className="text-2xl font-serif font-bold text-primary-800 mb-6">{benefit.title}</h3>

                    {/* Product mockup */}
                    <div className="relative mb-8">
                      <div className={`w-48 h-64 ${colorScheme.bg} rounded-2xl mx-auto shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 border ${colorScheme.border}`}>
                        <div className="flex flex-col items-center justify-center h-full p-6">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
                            <IconComponent className={`h-8 w-8 ${colorScheme.icon}`} />
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-medium text-primary-700 mb-2">Lunar Nidra</div>
                            <div className="text-sm font-bold text-primary-700">{benefit.title}</div>
                          </div>
                        </div>
                      </div>

                      {/* Hand holding effect */}
                      <div className="absolute -bottom-4 -right-2 w-16 h-20 opacity-60">
                        <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-full transform rotate-12"></div>
                      </div>
                    </div>

                    <p className="text-primary-600 leading-relaxed mb-6">{benefit.description}</p>

                    <button className="w-full bg-primary-800 text-white py-4 rounded-full font-medium text-lg hover:bg-primary-700 transition-colors duration-300 shadow-lg">
                      EXPERIENCE NOW
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-primary-600 mb-6">Start your collection</p>
            <Link
              to="/shop"
              className="inline-flex items-center bg-white text-primary-700 px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-50 transition-all duration-300 shadow-lg border border-primary-200"
            >
              <span>VIEW ALL PRACTICES</span>
            </Link>
          </div>
        </div>

        {/* Wave bottom border transitioning to primary-50 background */}
        <WaveBottom variant="primary-50" className="z-10" />
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-primary-50 overflow-hidden">
        {/* Wave top border */}
        <WaveTop variant="primary-50" className="z-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary-700 mb-4">
              Sacred Transformations
            </h2>
            <p className="text-xl text-primary-600">
              Stories from our beautiful community of healing souls
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-primary-200">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-primary-700">{testimonial.name}</h4>
                    <p className="text-sm text-primary-600">{testimonial.sign}</p>
                  </div>
                </div>
                <p className="text-primary-600 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Wave bottom border */}
        <WaveBottom variant="primary-300" className="z-0 pointer-events-none" />
      </section>

      {/* FAQ Section - Chico-inspired */}
      <section className="relative py-32 bg-primary-300 overflow-hidden">
        {/* Wave top border */}
        <WaveTop variant="primary-300" className="z-10" />
        <OrganicShapes variant="accent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-8">
                What soul seekers are wondering...
              </h2>

              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-primary-800 group-hover:text-primary-600 transition-colors duration-200">
                      How does Lunar Nidra differ from regular meditation?
                    </h3>
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                      <span className="text-primary-600 font-bold">+</span>
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
                    <h3 className="font-medium text-primary-800 group-hover:text-primary-600 transition-colors duration-200">
                      Can we talk about the spiritual benefits?
                    </h3>
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-200">
                      <span className="text-primary-600 font-bold">+</span>
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
                  <div className="h-full bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <Moon className="h-10 w-10 text-primary-700" />
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
                  <div className="h-full bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-4 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
                      <Star className="h-6 w-6 text-primary-500" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-primary-800 text-center">Solar Practice</h4>
                    <p className="text-xs text-primary-600 text-center">Morning ritual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave bottom border */}
        <WaveBottom variant="primary-300" className="z-10" />
      </section>
    </div>
  );
};

export default HomePage;