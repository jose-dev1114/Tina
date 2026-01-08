import { Link } from 'react-router-dom';
import { Moon, Heart, Star, Users, Zap, Eye, Compass, Leaf, Wind, Sparkles, Cloud, Feather, Flame, ChevronDown, Waves, HeartHandshake, BookHeart } from 'lucide-react';
import { useState, useEffect } from 'react';
import OrganicShapes from '../components/OrganicShapes';
import WaveBottom from '../components/WaveBottom';
import WaveTop from '../components/WaveTop';
import AnimatedHeading from '../components/AnimatedHeading';
// import MoonLogo from '../components/MoonLogo';
import CardShuffle from '../components/CardShuffle';
import SkeletonLoader from '../components/SkeletonLoader';

const HomePage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when component mounts and handle loading
  useEffect(() => {
    window.scrollTo(0, 0);

    // Simulate loading time for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  const benefits = [
    {
      icon: Waves,
      title: "Lunar-Aligned Healing",
      description: "Meditations synchronized with moon phases for deeper spiritual connection",
      route: "/shop"
    },
    {
      icon: HeartHandshake,
      title: "Personalized to Your Soul",
      description: "Each practice tailored to your unique Sun and Moon sign combination",
      route: "/quiz"
    },
    {
      icon: BookHeart,
      title: "Ancient Wisdom, Modern Practice",
      description: "Yoga Nidra techniques enhanced with astrological insights",
      route: "/learn"
    },
    {
      icon: Users,
      title: "Sacred Community",
      description: "Join a supportive circle of like-minded souls on their healing journey",
      route: "/community"
    }
  ];

  const testimonials = [
    {
      name: "Jodi Anderson",
      sign: "Community Member",
      text: "That Yoga Nidra was just what my soul needed to hear tonight, such a powerful and empowering message. My heart thanks you for your beautiful words.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Kaarina Venalainen",
      sign: "Virgo Lunar Eclipse",
      text: "This was nothing short of pure bliss! You definitely hit the mark of presence and nourishment, all with your delightful voice. I swear I could hear your smile coming through.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Community Member",
      sign: "Full Moon Practice",
      text: "What a beautiful and relaxing full moon practice. I am very grateful for the blessings you share with us.",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const faqs = [
    {
      question: "How does Lunar Nidra differ from regular meditation?",
      answer: "Lunar Nidra combines the ancient practice of Yoga Nidra (yogic sleep) with astrological wisdom. Unlike traditional meditation where you focus on staying alert, Lunar Nidra guides you into a state between waking and sleeping—where deep healing happens. Each practice is personalized to your natal Moon placement or the current New or Full Moon, aligning your rest with cosmic cycles. It's meditation without the mental effort, perfect for those who struggle with traditional practices."
    },
    {
      question: "Do I need to know my exact birth time?",
      answer: "Knowing your birthdate, place, and exact birth time is wonderful for diving deep into your Natal Moon, but it is not a requirement. You can start your healing journey by aligning with the collective New Moon and Full Moon energy instead. If you do want to find your exact time, check your long-form birth certificate. (It is usually listed in a specific box labeled 'Time of Birth' or 'Hour' near your birth date)"
    },
    {
      question: "Is Lunar Nidra suitable for beginners?",
      answer: "Absolutely! Lunar Nidra is actually perfect for beginners because it requires no prior meditation experience. You simply lie down, listen, and let the practice guide you. There's no 'doing it wrong'—your only job is to rest and receive. Many people who've struggled with traditional meditation find Lunar Nidra to be a game-changer because it works with your natural state of relaxation rather than fighting against it."
    },
    {
      question: "Can we talk about the spiritual benefits?",
      answer: "Lunar Nidra opens doorways to profound spiritual experiences: deep emotional healing, connection to your higher self, access to intuitive wisdom, release of karmic patterns, and alignment with your soul's purpose. By working with your unique astrological blueprint and lunar rhythms, you're not just relaxing—you're recalibrating your entire energetic system. Many practitioners report enhanced intuition, vivid dreams, synchronicities, and a deeper sense of connection to the cosmos."
    },
    {
      question: "How is Lunar Nidra... practiced?",
      answer: "Lunar Nidra is practiced lying down in a comfortable position (savasana). You'll listen to a guided audio meditation personalized to your astrological signs. Each session lasts 30-45 minutes and takes you through stages of body awareness, breath work, visualization, and deep rest. You can practice anytime—morning for energizing, evening for deep sleep, or during specific moon phases for amplified effects. All you need is a quiet space, headphones, and an open heart."
    }
  ];

  // Show skeleton loader while loading
  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="min-h-screen opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.6s ease-in forwards' }}>

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

            {/* Right side - Card Shuffle Animation */}
            <div className="relative animate-slide-up h-96 md:h-full min-h-96">
              <CardShuffle />
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
              {/* <div className="relative">
                <MoonLogo size={80} />
              </div> */}
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary-700 mb-4">
              Soul-powered transformation
              <span className="block text-4xl md:text-5xl bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
                from 6 Sacred Practices
              </span>
            </h2>
          </div>

          {/* Clean benefits grid inspired by Chico's simple approach */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-20 max-w-5xl mx-auto">
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

          {/* Description section */}
          <div className="max-w-6xl mx-auto text-center pb-16">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              const colors = [
                { bg: 'bg-gradient-to-br from-primary-100 to-primary-200', border: 'border-primary-200', icon: 'text-primary-700' },
                { bg: 'bg-gradient-to-br from-primary-50 to-primary-100', border: 'border-primary-100', icon: 'text-primary-700' },
                { bg: 'bg-gradient-to-br from-primary-50 to-primary-100', border: 'border-primary-50', icon: 'text-primary-700' },
                { bg: 'bg-gradient-to-br from-primary-100 to-primary-150', border: 'border-primary-150', icon: 'text-primary-700' }
              ];
              const colorScheme = colors[index % 4];

              return (
                <div key={index} className={`${colorScheme.bg} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${colorScheme.border}`}>
                  <div className="text-center flex flex-col h-full">
                    <div className="text-sm font-medium text-primary-500 mb-2">Sacred Practice</div>
                    <h3 className="text-2xl font-serif font-bold text-primary-800 mb-6">{benefit.title}</h3>

                    {/* Large Icon */}
                    <div className="relative mb-8 flex justify-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110">
                        <IconComponent className={`h-16 w-16 ${colorScheme.icon}`} strokeWidth={1.5} />
                      </div>
                    </div>

                    <p className="text-primary-600 leading-relaxed mb-6 flex-grow">{benefit.description}</p>

                    <Link
                      to={benefit.route}
                      className="block w-full bg-primary-800 text-white py-4 rounded-full font-medium text-lg hover:bg-primary-700 transition-colors duration-300 shadow-lg mt-auto"
                    >
                      EXPERIENCE NOW
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-8">
                What soul seekers are wondering...
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-primary-800 group-hover:text-primary-600 transition-colors duration-200 pr-4">
                          {faq.question}
                        </h3>
                        <div className={`w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaqIndex === index ? 'bg-primary-200 rotate-180' : ''}`}>
                          <ChevronDown className="h-5 w-5 text-primary-600" />
                        </div>
                      </div>

                      {openFaqIndex === index && (
                        <div className="mt-4 pt-4 border-t border-primary-200 animate-fade-in">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Visual element */}
            <div className="relative flex items-end">
              {/* Single beautiful Lunar Nidra image - bottom-aligned with FAQ cards */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-700 group w-full">
                {/* Beautiful night meditation background image */}
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
                  alt="Peaceful nighttime Lunar Nidra meditation practice"
                  className="w-full h-[480px] object-cover object-bottom group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 via-primary-800/60 to-primary-900/80"></div>

                {/* Subtle animated glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Content overlay - centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-5xl font-serif font-bold text-white mb-4 drop-shadow-2xl">Lunar Nidra</h3>
                  <p className="text-white/95 text-xl leading-relaxed drop-shadow-lg">Personalized Sacred Practice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave bottom border */}
        {/* <WaveBottom variant="primary-300" className="z-10" /> */}
      </section>
    </div>
  );
};

export default HomePage;