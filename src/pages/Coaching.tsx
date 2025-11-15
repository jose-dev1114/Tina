import { Calendar, Clock, Star, Heart, CheckCircle, MessageCircle, Sparkles, Music, BookOpen, Moon } from 'lucide-react';


const Coaching = () => {
  const testimonials = [
    {
      name: "Jennifer L.",
      session: "Deep Soul Alignment",
      text: "Tina helped me understand why I've been struggling with traditional meditation. My personalized practice has completely transformed my relationship with myself and my spiritual path.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Michael R.",
      session: "Sacred Discovery",
      text: "In just 30 minutes, Tina gave me more clarity about my purpose than years of therapy. The meditation she recommended has become my daily anchor.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Diana K.",
      session: "Spiritual Mentorship",
      text: "As a fellow healer, I needed someone who could meet me at my level. Tina's depth of knowledge and intuitive insights helped me step into my full power.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const faqs = [
    {
      question: "What if I don't know my birth time?",
      answer: "While birth time gives us the most accurate reading, we can still do profound work with your birth date and location. I'll guide you through techniques to potentially discover your birth time, or we'll focus on the powerful insights available from your Sun and Moon signs."
    },
    {
      question: "How is this different from regular astrology readings?",
      answer: "My approach combines astrology with practical healing tools. You won't just learn about your chart—you'll receive personalized meditation practices, healing techniques, and actionable guidance for your spiritual evolution."
    },
    {
      question: "Do I need meditation experience?",
      answer: "Not at all! I work with complete beginners as well as advanced practitioners. Each session is tailored to meet you exactly where you are in your journey."
    },
    {
      question: "What happens during a session?",
      answer: "We begin with a brief check-in about your current challenges and intentions. Then I'll share insights from your birth chart, focusing on what serves your healing. We'll end with personalized practices you can immediately implement."
    },
    {
      question: "Can sessions be done remotely?",
      answer: "Yes! All sessions are conducted via Zoom, allowing us to connect intimately while you remain in your sacred space. The energy and transformation are just as powerful as in-person sessions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-700 font-medium mb-4">
            <Heart className="h-4 w-4" />
            <span>Sacred Space for You</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-900 mb-4">
            1:1 Coaching with Tina
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Step into sacred space for personalized guidance, deep healing, and cosmic alignment.
            Discover your unique path through astrology and conscious practice.
          </p>

          <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-primary-900 mb-2">✨ What Makes These Sessions Sacred</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              No pressure, no agenda—just sacred space held for your highest healing. Each session is intuitively 
              guided and deeply personalized to your soul's needs and cosmic blueprint.
            </p>
          </div>
        </div>

        {/* Our Healing Practices Offerings */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-4">
              Our Healing Practices Offerings
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Personalized astrological guidance and healing practices designed for your unique journey
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Offering 1: Sun • Moon • Rising Recording */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-center mb-2">
                  Sun • Moon • Rising Recording
                </h3>
                <p className="text-center text-yellow-50 text-sm">The Big Three</p>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">$97</div>
                  <p className="text-sm text-gray-600">20-minute personalized audio journey</p>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Offers insight into your astrological blueprint—personality traits, reactions, and how others may see you.
                </p>

                <div className="bg-primary-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-primary-900 mb-3 text-sm">Bonuses Included:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Journal prompts tailored for each placement</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">A prerecorded Lunar Nidra meditation</span>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
                  <Clock className="h-4 w-4" />
                  <span>Delivery: 2–3 weeks</span>
                </div>

                <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Purchase Now
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">Digital product • Stripe checkout</p>
              </div>
            </div>

            {/* Offering 2: Exploring Your Astrological Signature */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-white">
                <div className="flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-center mb-2">
                  Exploring Your Astrological Signature
                </h3>
                <p className="text-center text-primary-100 text-sm">Deep Dive Journey</p>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">$250</div>
                  <p className="text-sm text-gray-600">Three 60-minute sessions</p>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  Deep dive into Sun, Moon, Rising, then full chart themes and planetary influences.
                  Includes journal prompts + aligned Lunar Nidra practices.
                </p>

                <div className="bg-primary-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-primary-900 mb-3 text-sm">What You'll Explore:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Session 1: Sun, Moon, Rising deep dive</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Session 2: Full chart themes & patterns</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Session 3: Planetary influences & integration</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Custom journal prompts & Lunar Nidra practices</span>
                    </li>
                  </ul>
                </div>

                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Book First Session
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">Schedule via booking tool • Zoom sessions</p>
              </div>
            </div>

            {/* Offering 3: Personalised Lunar Nidra */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-center mb-4">
                  <Moon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-center mb-2">
                  Personalised Lunar Nidra
                </h3>
                <p className="text-center text-indigo-100 text-sm">Your Moon Placement Audio Journey</p>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">$97</div>
                  <p className="text-sm text-gray-600">20–30 min guided recording</p>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  A customized recording for your Moon placement. Helps reset the nervous system and connect to the Moon's elemental expression.
                </p>

                <div className="bg-indigo-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-indigo-900 mb-3 text-sm">After Purchase:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Complete a brief survey with your birth details</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Share any intentions or notes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">Receive your personalized recording</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                  <p className="text-xs text-yellow-800">
                    <strong>📋 Required:</strong> Birth date, time, location, and email (collected via survey after purchase)
                  </p>
                </div>

                <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Purchase Now
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">Digital product • Survey form after checkout</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-purple-900 text-center mb-12">
            Sacred Transformations
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
                    <p className="text-sm text-purple-600">{testimonial.session}</p>
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

        {/* What to Expect */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-serif font-bold text-purple-900 mb-6">
                  What to Expect
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-700 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">Sacred Preparation</h3>
                      <p className="text-gray-600 text-sm">After booking, you'll receive a brief intake form and guidance on preparing your sacred space.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-700 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">Heart-Centered Connection</h3>
                      <p className="text-gray-600 text-sm">We begin with grounding and intention-setting, creating safe space for your soul's truth to emerge.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-700 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">Cosmic Insights & Healing</h3>
                      <p className="text-gray-600 text-sm">Deep dive into your birth chart's wisdom, focusing on what serves your current growth and healing.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-purple-700 font-semibold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">Practical Magic</h3>
                      <p className="text-gray-600 text-sm">Receive personalized practices, tools, and resources to integrate your insights into daily life.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-64 lg:h-auto">
                <img 
                  src="https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Sacred space for healing" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-purple-900 text-center mb-12">
            Sacred Questions & Answers
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready for Sacred Alignment?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Your soul is calling you toward deeper understanding and healing. Trust that inner knowing
              and take the next step in your sacred journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <button className="bg-white text-primary-700 px-8 py-4 rounded-full font-medium text-lg hover:bg-primary-50 transition-colors duration-300 flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Book Your Session</span>
              </button>
              <button className="flex items-center space-x-2 text-primary-100 hover:text-white transition-colors duration-300">
                <MessageCircle className="h-5 w-5" />
                <span>Have questions? Message Tina</span>
              </button>
            </div>
            <p className="text-sm text-primary-100">
              Sessions are held in sacred confidence • All calls recorded for your reference
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coaching;