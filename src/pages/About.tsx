
import { useEffect, useState } from 'react';
import { Heart, MapPin, Sparkles } from 'lucide-react';

// Astral Sign Animation Component
const AstralSign = ({ symbol, sign, delay }: { symbol: string; sign: string; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
      <div className="relative group">
        {/* Cosmic glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 via-primary-300/20 to-primary-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse"></div>

        {/* Main symbol container */}
        <div className="relative bg-gradient-to-br from-slate-900/80 to-primary-900/80 backdrop-blur-sm border border-primary-300/30 rounded-full w-20 h-20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
          {/* Twinkling stars */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Astrological symbol */}
          <span className="text-2xl text-white font-light relative z-10 group-hover:text-primary-200 transition-colors duration-300">
            {symbol}
          </span>
        </div>

        {/* Sign label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-slate-600 font-medium whitespace-nowrap">
          {sign}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when component mounts and handle loading
  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-12 animate-pulse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/60 px-4 py-2 rounded-full w-32 h-8 mx-auto"></div>
          </div>
          <div className="bg-white/80 rounded-3xl shadow-2xl overflow-hidden mb-16">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-[600px] lg:h-auto bg-primary-200/50"></div>
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="h-12 bg-primary-200/50 rounded-lg w-1/2 mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-primary-100/50 rounded w-full"></div>
                  <div className="h-4 bg-primary-100/50 rounded w-5/6"></div>
                  <div className="h-4 bg-primary-100/50 rounded w-full"></div>
                  <div className="h-4 bg-primary-100/50 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-700 font-medium">
            <Heart className="h-4 w-4" />
            <span>About Tina</span>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-16">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Image */}
            <div className="relative h-[400px] lg:h-auto lg:min-h-[600px] bg-primary-100">
              <img
                src="/img/tina.webp"
                alt="Tina"
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient overlay for better text visibility on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>

              {/* Astral Signs - Positioned over image on desktop */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex items-center space-x-6 bg-white/90 backdrop-blur-md rounded-full px-8 py-4 shadow-xl">
                <AstralSign symbol="♒︎" sign="Sun" delay={0} />
                <AstralSign symbol="♍︎" sign="Moon" delay={500} />
                <AstralSign symbol="♌︎" sign="Rising" delay={1000} />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-700 mb-6">
                Meet Tina
              </h1>

              {/* Astral Signs - Mobile version */}
              <div className="flex lg:hidden items-center justify-center space-x-8 mb-8 pb-8 border-b border-primary-200">
                <AstralSign symbol="♒︎" sign="Sun" delay={0} />
                <AstralSign symbol="♍︎" sign="Moon" delay={500} />
                <AstralSign symbol="♌︎" sign="Rising" delay={1000} />
              </div>

              <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6 max-w-none">
                <p>
                  I spent years building a successful career across continents. On the outside, everything looked fine, but something felt missing. I was disconnected from myself, and the life I had created didn't feel like it truly belonged to me.
                </p>

                <p>
                  That quiet discomfort became a turning point. I began dedicating more time to yoga and meditation, searching for answers in many places, and eventually giving myself the space for self-inquiry. What started as a search for meaning became a deep conviction that the answers were already within me. I didn't need to become someone else. I just needed to be brave enough to be myself.
                </p>

                <p>
                  I now believe our intuition is meant to be listened to. That what brings us joy is meant to lead the way. That kindness and laughter deserve space in our lives. And that we all have the right to rewrite our stories into lives we truly love.
                </p>

                <div className="bg-primary-50 rounded-2xl p-6 my-8 border-l-4 border-primary-400">
                  <p className="text-xl font-medium text-primary-800 italic mb-0">
                    "If you're in that space of not-quite-knowing, I want you to know you're not alone. I'd be honored to walk alongside you."
                  </p>
                </div>

                <div className="flex items-start space-x-3 text-primary-600 bg-primary-50/50 rounded-xl p-4">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <p className="mb-0">
                    Originally from the Netherlands, I am now based in the Bay Area, California.
                  </p>
                </div>

                <p>
                  When I'm not studying the stars or holding space for others, you'll likely find me with yarn in hand, riding my motorcycle along the coast, cooking something nourishing, or exploring new corners of the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-700">
                Let's Connect
              </h2>
            </div>

            <p className="text-lg text-primary-600 leading-relaxed mb-8 max-w-2xl mx-auto text-center">
              Whether you're seeking guidance, community, or simply want to share your own journey,
              I'd love to hear from you. Every connection is a gift.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/community"
                className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
              >
                Join Our Community
              </a>
              <a
                href="/coaching"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full font-medium hover:bg-primary-50 hover:scale-105 transition-all duration-300 text-center"
              >
                Work Together
              </a>
            </div>

            <p className="text-sm text-primary-500 mt-8 italic text-center">
              With love and light,<br />
              Tina ✨
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About;