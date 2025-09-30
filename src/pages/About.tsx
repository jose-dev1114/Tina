
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-indigo-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-700 animate-pulse"></div>

        {/* Main symbol container */}
        <div className="relative bg-gradient-to-br from-slate-900/80 to-purple-900/80 backdrop-blur-sm border border-purple-300/30 rounded-full w-20 h-20 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
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
          <span className="text-2xl text-white font-light relative z-10 group-hover:text-purple-200 transition-colors duration-300">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-ethereal-50 via-lavender-50 to-blush-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-ethereal-700 font-medium mb-8">
            <Heart className="h-4 w-4" />
            <span>About Tina</span>
          </div>

          <img
            src="https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Tina"
            className="w-40 h-40 rounded-full object-cover mx-auto mb-8 shadow-2xl"
          />

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-ethereal-900 mb-8">
            Tina
          </h1>

          {/* Astral Signs Animation */}
          <div className="flex items-center justify-center space-x-8 mb-12">
            <AstralSign symbol="♒︎" sign="Sun" delay={0} />
            <AstralSign symbol="♍︎" sign="Moon" delay={500} />
            <AstralSign symbol="♌︎" sign="Rising" delay={1000} />
          </div>
        </div>

        {/* Personal Story Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl mb-16">
          <div className="prose prose-lg text-ethereal-700 leading-relaxed space-y-6 max-w-none">
            <p>
              I spent years building a successful career across continents. On the outside, everything looked fine, but something felt missing. I was disconnected from myself, and the life I had created didn't feel like it truly belonged to me.
            </p>

            <p>
              That quiet discomfort became a turning point. I began dedicating more time to yoga and meditation, searching for answers in many places, and eventually giving myself the space for self-inquiry. What started as a search for meaning became a deep conviction that the answers were already within me. I didn't need to become someone else. I just needed to be brave enough to be myself.
            </p>

            <p>
              I now believe our intuition is meant to be listened to. That what brings us joy is meant to lead the way. That kindness and laughter deserve space in our lives. And that we all have the right to rewrite our stories into lives we truly love.
            </p>

            <p className="text-xl font-medium text-ethereal-800 text-center py-4 border-t border-b border-ethereal-200 my-8">
              If you're in that space of not-quite-knowing, I want you to know you're not alone. I'd be honored to walk alongside you.
            </p>

            <div className="flex items-center justify-center space-x-2 text-ethereal-600 mb-6">
              <MapPin className="h-5 w-5" />
              <p className="text-center">
                Originally from the Netherlands, I am now based in the Bay Area, California.
              </p>
            </div>

            <p>
              When I'm not studying the stars or holding space for others, you'll likely find me with yarn in hand, riding my motorcycle along the coast, cooking something nourishing, or exploring new corners of the world.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-ethereal-100 to-lavender-100 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-ethereal-600 mr-2" />
              <h2 className="text-2xl font-serif font-bold text-ethereal-900">
                Let's Connect
              </h2>
            </div>

            <p className="text-lg text-ethereal-700 leading-relaxed mb-8 max-w-2xl mx-auto">
              Whether you're seeking guidance, community, or simply want to share your own journey,
              I'd love to hear from you. Every connection is a gift.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/community"
                className="bg-gradient-to-r from-ethereal-700 to-blush-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
              >
                Join Our Community
              </a>
              <a
                href="/coaching"
                className="border-2 border-ethereal-700 text-ethereal-700 px-8 py-3 rounded-full font-medium hover:bg-ethereal-50 transition-colors duration-300"
              >
                Work Together
              </a>
            </div>

            <p className="text-sm text-ethereal-500 mt-8 italic">
              With love and light,<br />
              Tina ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;