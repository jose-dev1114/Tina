
import { Users, Star, Calendar, MessageCircle, Video, Gift, Check, Crown } from 'lucide-react';

const Community = () => {
  const membershipTiers = [
    {
      name: "Moon Circle",
      price: "$33",
      period: "per month",
      description: "Perfect for beginners seeking community and guidance",
      features: [
        "Weekly live group meditations with Tina",
        "Private community forum access",
        "Monthly moon phase meditation releases",
        "Member-only Discord channel",
        "Digital meditation library (20+ recordings)"
      ],
      popular: false
    },
    {
      name: "Soul Circle",
      price: "$67",
      period: "per month",
      description: "For dedicated practitioners ready to dive deeper",
      features: [
        "Everything in Moon Circle",
        "Bi-weekly Q&A + coaching calls with Tina",
        "Exclusive advanced meditations",
        "Personalized birth chart reading (quarterly)",
        "Early access to new programs",
        "Sacred journal & reflection prompts"
      ],
      popular: true
    },
    {
      name: "Lunar Priestess",
      price: "$144",
      period: "per month",
      description: "Elite mentorship for spiritual leaders and healers",
      features: [
        "Everything in Soul Circle",
        "Monthly 1:1 private session with Tina",
        "Teacher training & certification path",
        "Co-creation opportunities",
        "VIP retreat invitations",
        "Lifetime access to all digital content"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Soul Circle Member",
      text: "This community has become my spiritual home. The live meditations are transformative, and Tina's guidance has helped me understand my chart on a soul level.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      sign: "Scorpio Sun, Pisces Moon"
    },
    {
      name: "Luna Rodriguez",
      role: "Lunar Priestess Member",
      text: "The 1:1 sessions with Tina have been life-changing. I'm now teaching Lunar Nidra in my own practice, thanks to the certification program.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      sign: "Leo Sun, Cancer Moon"
    },
    {
      name: "Maya Patel",
      role: "Moon Circle Member",
      text: "I love the weekly group meditations! There's something magical about practicing together, even virtually. The community support is incredible.",
      image: "https://images.pexels.com/photos/1385472/pexels-photo-1385472.jpeg?auto=compress&cs=tinysrgb&w=400",
      sign: "Gemini Sun, Sagittarius Moon"
    }
  ];

  const upcomingEvents = [
    {
      title: "New Moon Manifestation Circle",
      date: "January 15, 2024",
      time: "7:00 PM EST",
      type: "Live Group Meditation"
    },
    {
      title: "Monthly Q&A with Tina",
      date: "January 20, 2024",
      time: "2:00 PM EST",
      type: "Soul Circle Only"
    },
    {
      title: "Full Moon Release Ceremony",
      date: "January 28, 2024",
      time: "8:00 PM EST",
      type: "All Members"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-rose-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-700 font-medium mb-4">
            <Users className="h-4 w-4" />
            <span>Sacred Community</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 mb-4">
            Join Our Sacred Circle
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Connect with like-minded souls on the path of conscious healing. Experience live group meditations, 
            receive ongoing guidance from Tina, and be part of a supportive spiritual community.
          </p>
          
          <div className="bg-gradient-to-r from-purple-100 to-rose-100 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-purple-900 mb-2">🌙 What Makes Our Community Special</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Unlike generic meditation apps, our community is built around your unique astrological blueprint. 
              Every practice, teaching, and connection is designed to support your personal spiritual evolution.
            </p>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-purple-900 text-center mb-12">
            Choose Your Sacred Path
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {membershipTiers.map((tier, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                tier.popular ? 'ring-2 ring-purple-500 transform scale-105' : ''
              }`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-ethereal-700 to-blush-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                      <Crown className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-purple-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold text-purple-900">{tier.price}</span>
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
        </div>

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
        <div className="bg-gradient-to-r from-ethereal-800 to-blush-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Your Sacred Community Awaits
            </h2>
            <p className="text-xl text-blush-100 mb-8 leading-relaxed">
              Stop walking the spiritual path alone. Join hundreds of conscious souls who support each other's
              growth and healing. Your transformation accelerates when you're held by community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-ethereal-900 px-8 py-4 rounded-full font-medium text-lg hover:bg-blush-50 transition-colors duration-300 flex items-center justify-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Start Your Journey Today</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white hover:text-ethereal-900 transition-colors duration-300">
                Ask Tina a Question
              </button>
            </div>
            <p className="text-sm text-rose-200 mt-6">
              30-day money-back guarantee • Join risk-free
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;