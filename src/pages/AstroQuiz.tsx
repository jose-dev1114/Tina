import { useState } from 'react';
import { Star, Moon, Sun, Download, ShoppingCart } from 'lucide-react';

interface QuizData {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  spiritualGoals: string[];
  challenges: string[];
}

const AstroQuiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    spiritualGoals: [],
    challenges: []
  });
  const [showResults, setShowResults] = useState(false);

  const spiritualGoalOptions = [
    'Deeper sleep and rest',
    'Emotional healing',
    'Spiritual awakening',
    'Stress relief',
    'Inner peace',
    'Self-discovery'
  ];

  const challengeOptions = [
    'Anxiety and worry',
    'Insomnia',
    'Emotional overwhelm',
    'Lack of purpose',
    'Difficulty letting go',
    'Feeling disconnected'
  ];

  const handleGoalToggle = (goal: string) => {
    setQuizData(prev => ({
      ...prev,
      spiritualGoals: prev.spiritualGoals.includes(goal)
        ? prev.spiritualGoals.filter(g => g !== goal)
        : [...prev.spiritualGoals, goal]
    }));
  };

  const handleChallengeToggle = (challenge: string) => {
    setQuizData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const mockResults = {
    sunSign: 'Leo',
    moonSign: 'Cancer',
    recommendations: [
      {
        id: 1,
        title: 'Leo Sun + Cancer Moon: Lunar Heart Healing',
        duration: '45 minutes',
        intention: 'Balance your radiant confidence with deep emotional nurturing',
        price: '$33',
        description: 'A powerful practice combining Leo\'s solar fire with Cancer\'s lunar wisdom for complete heart healing.'
      },
      {
        id: 2,
        title: 'Cancer Moon Deep Rest Meditation',
        duration: '35 minutes',
        intention: 'Create a sacred sanctuary within for emotional restoration',
        price: '$28',
        description: 'Specifically designed for Cancer Moon energy to release emotional tension and find inner peace.'
      },
      {
        id: 3,
        title: 'Leo Sun Confidence & Creativity Flow',
        duration: '40 minutes',
        intention: 'Ignite your inner flame and creative expression',
        price: '$30',
        description: 'Awaken your Leo Sun\'s natural radiance and creative power through deep meditative practice.'
      }
    ]
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ethereal-50 to-blush-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-ethereal-700 to-blush-600 text-white px-6 py-3 rounded-full mb-6">
              <Star className="h-5 w-5" />
              <span className="font-medium">Your Cosmic Blueprint Revealed</span>
            </div>
            
            <h1 className="text-4xl font-serif font-bold text-ethereal-900 mb-4">
              Your Personalized Meditations
            </h1>
            
            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className="text-center">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mb-2">
                  <Sun className="h-10 w-10 text-white" />
                </div>
                <p className="text-lg font-semibold text-ethereal-900">Sun in {mockResults.sunSign}</p>
                <p className="text-sm text-gray-600">Your core essence</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-400 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mb-2">
                  <Moon className="h-10 w-10 text-white" />
                </div>
                <p className="text-lg font-semibold text-ethereal-900">Moon in {mockResults.moonSign}</p>
                <p className="text-sm text-gray-600">Your emotional nature</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your cosmic blueprint, we've curated these meditations to support your unique energetic needs and spiritual journey.
            </p>
          </div>

          {/* Meditation Recommendations */}
          <div className="space-y-6 mb-12">
            {mockResults.recommendations.map((meditation, index) => (
              <div key={meditation.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-gradient-to-r from-ethereal-700 to-blush-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Recommended for You
                      </span>
                      {index === 0 && (
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                          Perfect Match
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-purple-900 mb-2">{meditation.title}</h3>
                    <p className="text-gray-600 mb-2">{meditation.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>⏱️ {meditation.duration}</span>
                      <span>🎯 {meditation.intention}</span>
                    </div>
                  </div>
                  
                  <div className="text-center lg:text-right">
                    <div className="text-2xl font-bold text-purple-900 mb-2">{meditation.price}</div>
                    <div className="text-sm text-green-600 font-medium mb-3">+ Free Astro PDF Guide</div>
                    <button className="bg-gradient-to-r from-ethereal-700 to-blush-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Free PDF Guide */}
          <div className="bg-gradient-to-br from-purple-100 to-rose-100 rounded-xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-ethereal-700 to-blush-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-purple-900 mb-4">
                Your Free Astrological Guide
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                With every meditation purchase, receive a personalized PDF guide explaining your {mockResults.sunSign} Sun and {mockResults.moonSign} Moon 
                placement, how the meditation works with your chart, plus intention-setting exercises and journaling prompts.
              </p>
              
              <button className="bg-white text-purple-900 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors duration-300 border border-purple-200">
                Preview Your Guide
              </button>
            </div>
          </div>

          {/* Retake Quiz */}
          <div className="text-center mt-12">
            <button 
              onClick={() => {
                setShowResults(false);
                setCurrentStep(1);
                setQuizData({
                  birthDate: '',
                  birthTime: '',
                  birthPlace: '',
                  spiritualGoals: [],
                  challenges: []
                });
              }}
              className="text-purple-600 hover:text-purple-800 font-medium"
            >
              ← Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-rose-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-700 font-medium mb-4">
            <Moon className="h-4 w-4" />
            <span>Step {currentStep} of 4</span>
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-purple-900 mb-2">
            Discover Your Sacred Practice
          </h1>
          <p className="text-gray-600">
            Let's create a meditation journey aligned with your unique soul blueprint
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-ethereal-700 to-blush-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Steps */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-purple-900 mb-6 text-center">
                Your Cosmic Coordinates
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                We need your birth details to calculate your Sun and Moon signs accurately
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
                  <input
                    type="date"
                    value={quizData.birthDate}
                    onChange={(e) => setQuizData(prev => ({ ...prev, birthDate: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Time (if known)</label>
                  <input
                    type="time"
                    value={quizData.birthTime}
                    onChange={(e) => setQuizData(prev => ({ ...prev, birthTime: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Birth time helps us be more accurate, but isn't required</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Place</label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    value={quizData.birthPlace}
                    onChange={(e) => setQuizData(prev => ({ ...prev, birthPlace: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-purple-900 mb-6 text-center">
                Your Spiritual Intentions
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                What are you seeking to cultivate in your life? (Select all that resonate)
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {spiritualGoalOptions.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      quizData.spiritualGoals.includes(goal)
                        ? 'border-purple-500 bg-purple-50 text-purple-900'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        quizData.spiritualGoals.includes(goal) ? 'bg-purple-500 border-purple-500' : 'border-gray-300'
                      }`}></div>
                      <span className="font-medium">{goal}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-purple-900 mb-6 text-center">
                Your Sacred Challenges
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                What would you like support in releasing or healing? (Select all that apply)
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {challengeOptions.map((challenge) => (
                  <button
                    key={challenge}
                    onClick={() => handleChallengeToggle(challenge)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      quizData.challenges.includes(challenge)
                        ? 'border-rose-500 bg-rose-50 text-rose-900'
                        : 'border-gray-200 hover:border-rose-300 hover:bg-rose-25'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        quizData.challenges.includes(challenge) ? 'bg-rose-500 border-rose-500' : 'border-gray-300'
                      }`}></div>
                      <span className="font-medium">{challenge}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-rose-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-12 w-12 text-purple-600" />
              </div>
              
              <h2 className="text-2xl font-serif font-semibold text-purple-900 mb-4">
                Ready to Discover Your Practice?
              </h2>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                We're about to reveal your personalized meditation recommendations based on your unique 
                astrological blueprint and spiritual intentions. Each practice comes with a free PDF guide 
                explaining how it works with your specific Sun and Moon signs.
              </p>
              
              <div className="bg-purple-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-purple-900 mb-3">What you'll receive:</h3>
                <ul className="text-left space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-purple-500" />
                    <span>Personalized meditation recommendations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Download className="h-4 w-4 text-purple-500" />
                    <span>Free astrological guide with each purchase</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Moon className="h-4 w-4 text-purple-500" />
                    <span>Intention-setting and journaling prompts</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-purple-600 hover:text-purple-800'
              }`}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>
            
            <button
              onClick={() => {
                if (currentStep === 4) {
                  handleSubmit();
                } else {
                  setCurrentStep(Math.min(4, currentStep + 1));
                }
              }}
              className="bg-gradient-to-r from-ethereal-700 to-blush-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              {currentStep === 4 ? 'Reveal My Meditations' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroQuiz;