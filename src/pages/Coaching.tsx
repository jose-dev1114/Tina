import { useState } from 'react';
import { Calendar, Clock, Star, Heart, CheckCircle, MessageCircle } from 'lucide-react';

interface Session {
  id: number;
  name: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  ideal: string;
  popular: boolean;
}

const Coaching = () => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const sessions = [
    {
      id: 1,
      name: "Sacred Discovery Session",
      duration: "30 minutes",
      price: "$88",
      description: "Perfect for newcomers seeking clarity on their spiritual path",
      features: [
        "Birth chart overview and key insights",
        "Personalized meditation recommendation",
        "Sacred space creation guidance",
        "Pathway for continued growth"
      ],
      ideal: "First-time seekers, those feeling lost or disconnected",
      popular: false
    },
    {
      id: 2,
      name: "Deep Soul Alignment",
      duration: "60 minutes",
      price: "$177",
      description: "Comprehensive session for profound transformation and healing",
      features: [
        "Complete birth chart reading",
        "Custom Lunar Nidra practice creation",
        "Emotional healing & release work",
        "Life purpose & soul mission clarity",
        "Follow-up email with resources"
      ],
      ideal: "Those ready for deep healing and major life transitions",
      popular: true
    },
    {
      id: 3,
      name: "Spiritual Mentorship Intensive",
      duration: "90 minutes",
      price: "$333",
      description: "Elite session for spiritual leaders and advanced practitioners",
      features: [
        "Advanced chart synthesis & timing",
        "Spiritual gifts activation",
        "Shadow work & integration",
        "Teaching & sharing your gifts",
        "30-day integration support",
        "Recording of the session"
      ],
      ideal: "Healers, coaches, and those called to serve others",
      popular: false
    }
  ];

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

        {/* Session Options */}
        <div className="mb-20">
          <h2 className="text-3xl font-serif font-bold text-primary-900 text-center mb-12">
            Choose Your Sacred Container
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {sessions.map((session) => (
              <div key={session.id} className={`relative bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 ${
                session.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
              }`}>
                {session.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold text-primary-700 mb-2">{session.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{session.description}</p>

                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{session.duration}</span>
                    </div>
                    <div className="text-3xl font-bold text-primary-700">{session.price}</div>
                  </div>

                  <div className="bg-primary-50 rounded-lg p-3 text-sm text-gray-700">
                    <strong>Perfect for:</strong> {session.ideal}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-purple-900 mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {session.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="bg-green-100 rounded-full p-1 mt-0.5">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  className={`w-full py-4 rounded-full font-medium text-lg transition-all duration-300 mb-4 ${
                    session.popular
                      ? 'bg-gradient-to-r from-ethereal-700 to-blush-600 text-white hover:shadow-xl'
                      : 'bg-ethereal-100 text-ethereal-900 hover:bg-ethereal-200'
                  }`}
                  onClick={() => setSelectedSession(session)}
                >
                  Book This Session
                </button>
                
                <p className="text-center text-xs text-gray-500">
                  Zoom session • Recording provided • 48hr cancellation
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Calendar Placeholder */}
        {selectedSession && (
          <div className="mb-20 bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-purple-900 mb-2">
                Book Your {selectedSession.name}
              </h3>
              <p className="text-gray-600">Choose a time that feels aligned for your sacred session</p>
            </div>
            
            {/* This would integrate with a real booking system like Calendly */}
            <div className="bg-gradient-to-br from-purple-50 to-rose-50 rounded-xl p-12 text-center">
              <Calendar className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-purple-900 mb-2">Calendar Integration</h4>
              <p className="text-gray-600 mb-6">
                In a live implementation, this would show Tina's available appointment slots via Calendly or similar booking platform.
              </p>
              <button
                className="bg-gradient-to-r from-ethereal-700 to-blush-600 text-white px-6 py-3 rounded-full font-medium mr-4"
              >
                View Available Times
              </button>
              <button 
                className="text-purple-600 hover:text-purple-800 font-medium"
                onClick={() => setSelectedSession(null)}
              >
                ← Choose Different Session
              </button>
            </div>
          </div>
        )}

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