
import { Users, Star, Calendar, MessageCircle, Video, Gift, Check, Crown, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const membershipTiers = [
  //   {
  //     name: "Moon Circle",
  //     price: "$33",
  //     period: "per month",
  //     description: "Perfect for beginners seeking community and guidance",
  //     features: [
  //       "Weekly live group meditations with Tina",
  //       "Private community forum access",
  //       "Monthly moon phase meditation releases",
  //       "Member-only Discord channel",
  //       "Digital meditation library (20+ recordings)"
  //     ],
  //     popular: false
  //   },
  //   {
  //     name: "Soul Circle",
  //     price: "$67",
  //     period: "per month",
  //     description: "For dedicated practitioners ready to dive deeper",
  //     features: [
  //       "Everything in Moon Circle",
  //       "Bi-weekly Q&A + coaching calls with Tina",
  //       "Exclusive advanced meditations",
  //       "Personalized birth chart reading (quarterly)",
  //       "Early access to new programs",
  //       "Sacred journal & reflection prompts"
  //     ],
  //     popular: true
  //   },
  //   {
  //     name: "Lunar Priestess",
  //     price: "$144",
  //     period: "per month",
  //     description: "Elite mentorship for spiritual leaders and healers",
  //     features: [
  //       "Everything in Soul Circle",
  //       "Monthly 1:1 private session with Tina",
  //       "Teacher training & certification path",
  //       "Co-creation opportunities",
  //       "VIP retreat invitations",
  //       "Lifetime access to all digital content"
  //     ],
  //     popular: false
  //   }
  // ];

  const testimonials = [
    {
      name: "Jodi Anderson",
      role: "Community Member",
      text: "That Yoga Nidra was just what my soul needed to hear tonight, such a powerful and empowering message. My heart thanks you for your beautiful words.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      sign: "Soul Circle Member"
    },
    {
      name: "Kaarina Venalainen",
      role: "Virgo Lunar Eclipse Participant",
      text: "This was nothing short of pure bliss! You definitely hit the mark of presence and nourishment, all with your delightful voice. I swear I could hear your smile coming through.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      sign: "Community Member"
    },
    {
      name: "Community Member",
      role: "Full Moon Practice",
      text: "What a beautiful and relaxing full moon practice. I am very grateful for the blessings you share with us.",
      image: "https://images.pexels.com/photos/1385472/pexels-photo-1385472.jpeg?auto=compress&cs=tinysrgb&w=400",
      sign: "Lunar Nidra Member"
    }
  ];

  const upcomingEvents = [
    {
      title: "New Moon Manifestation",
      date: "Saturday January 17",
      time: "9:00am PST",
      type: "Live Group Meditation"
    },
    {
      title: "Full Moon Release Ceremony",
      date: "Saturday January 31",
      time: "9:00am PST",
      type: "All Members"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-700 font-medium mb-4">
            <Users className="h-4 w-4" />
            <span>Sacred Community</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
            Let's Build This Together
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            I'm creating a sacred space for us to practice Lunar Nidra together, connect deeply, and support
            each other's healing. Join as a founding member and help shape this community from the ground up.
          </p>

          <div className="bg-gradient-to-r from-purple-100 to-primary-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-primary-700 mb-2">✨ Why Join as a Founding Member?</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Be part of something special from day one. As a founding member, you'll have direct access to me through
              weekly calls, help shape our community culture, and receive exclusive benefits as we grow together.
            </p>
          </div>
        </div>

        {/* Skool Community Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Content */}
              <div className="p-12 flex flex-col justify-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-primary-100 px-4 py-2 rounded-full text-sm text-primary-700 font-medium mb-6 w-fit">
                  <Sparkles className="h-4 w-4" />
                  <span>Be a Founding Member</span>
                </div>

                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Lunar Nidra Community on Skool
                </h2>

                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  I'm building something special—a sacred space where we can practice Lunar Nidra together,
                  connect deeply, and support each other's healing journey. Join as a founding member!
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-1 mt-1">
                      <Check className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Weekly live calls with Tina</p>
                      <p className="text-sm text-gray-600">Connect directly, ask questions, and receive guidance</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-1 mt-1">
                      <Check className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Group Lunar Nidra sessions</p>
                      <p className="text-sm text-gray-600">Experience the power of meditating together</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-1 mt-1">
                      <Check className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Full library of 100+ recordings</p>
                      <p className="text-sm text-gray-600">Access to extensive meditation collection</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-1 mt-1">
                      <Check className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Private community forum</p>
                      <p className="text-sm text-gray-600">Share your journey with like-minded souls</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 rounded-full p-1 mt-1">
                      <Check className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Moon phase rituals & teachings</p>
                      <p className="text-sm text-gray-600">Align with lunar cycles for deeper transformation</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.skool.com/novanidracommunity/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <span>Become a Founding Member</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>

                <p className="text-sm text-gray-500 mt-4">
                  🍯 Pay what you can • Free to join • Help us grow together
                </p>
              </div>

              {/* Right Side - Visual */}
              <div className="bg-gradient-to-br from-purple-600 to-primary-700 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

                <div className="relative z-10 text-center">
                  {/* Skool Logo Text */}
                  <div className="mb-8">
                    <div className="text-6xl font-black mb-2" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                      Skool
                    </div>
                    <div className="text-purple-100 text-sm font-medium tracking-wider">
                      COMMUNITY PLATFORM
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <div className="text-4xl font-bold mb-2">✨ Founding Members</div>
                      <div className="text-purple-100">Join us from the beginning</div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <div className="text-5xl font-bold mb-2">100+</div>
                      <div className="text-purple-100">Yoga Nidra Recordings</div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                      <div className="text-3xl font-bold mb-2">🌙✨</div>
                      <div className="text-purple-100">"When in doubt, nidra out"</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Tiers */}
        {/* <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-purple-900 text-center mb-12">
            Choose Your Sacred Path
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                tier.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
              }`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                      <Crown className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary-700 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold text-primary-700">{tier.price}</span>
                    <span className="text-gray-500">{tier.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="bg-green-100 rounded-full p-1 mt-0.5">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 rounded-full font-medium text-lg transition-all duration-300 ${
                  tier.popular
                    ? 'bg-gradient-to-r from-ethereal-700 to-blush-600 text-white hover:shadow-xl'
                    : 'bg-ethereal-100 text-ethereal-900 hover:bg-ethereal-200'
                }`}>
                  Join the {tier.name}
                </button>
                
                <p className="text-center text-xs text-gray-500 mt-4">
                  Cancel anytime • No commitment
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Community Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-purple-900 text-center mb-12">
            Experience Sacred Connection
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-purple-100 to-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-3">Live Group Meditations</h3>
              <p className="text-gray-600 leading-relaxed">
                Join Tina every week for powerful group practices. Experience the amplified energy of meditating together.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-purple-100 to-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-3">Private Community Forum</h3>
              <p className="text-gray-600 leading-relaxed">
                Share insights, ask questions, and connect with fellow seekers in our sacred online space.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="bg-gradient-to-br from-purple-100 to-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-3">Exclusive Content</h3>
              <p className="text-gray-600 leading-relaxed">
                Access member-only meditations, teachings, and resources created specifically for our community.
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-purple-900 text-center mb-12">
            Upcoming Sacred Gatherings
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {upcomingEvents.map((event, index) => (
              <div key={index} className={`p-6 flex items-center justify-between ${
                index !== upcomingEvents.length - 1 ? 'border-b border-gray-100' : ''
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-purple-100 to-rose-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Member Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-purple-900 text-center mb-12">
            Voices from Our Sacred Circle
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-purple-900">{testimonial.name}</h4>
                    <p className="text-sm text-purple-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.sign}</p>
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

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-700 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Be a Founding Member?
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Join me in creating something beautiful. Together, we'll build a supportive space where
              healing happens, connections deepen, and transformation unfolds naturally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.skool.com/novanidracommunity/about"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-700 px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-50 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>Join the Community</span>
              </a>
              <button
                onClick={() => navigate('/learn')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white hover:text-primary-700 transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
            <p className="text-sm text-purple-100 mt-6">
              🍯 Pay what you can • Free to join • Let's grow together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;