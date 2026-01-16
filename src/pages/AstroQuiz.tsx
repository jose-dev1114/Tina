import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Star, Moon, Sun, Download, ShoppingCart, X, Loader2, Calendar } from 'lucide-react';
import { geocodeBirthPlace } from '../utils/geocoding';
import { useAuth } from '../hooks/useClerkAuth';
import SignUpButton from '../components/auth/SignUpButton';
import SignInButton from '../components/auth/SignInButton';
import LocationAutocomplete from '../components/LocationAutocomplete';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface QuizData {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  spiritualGoals: string[];
  challenges: string[];
}

const AstroQuiz = () => {
  const { isSignedIn, loading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [quizData, setQuizData] = useState<QuizData>({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    spiritualGoals: [],
    challenges: []
  });
  const [showResults, setShowResults] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [tempBirthData, setTempBirthData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✨ NEW: Watch for user signup and save birth data
  useEffect(() => {
    const saveBirthDataAfterSignup = async () => {
      // Check if user just signed in AND we have pending birth data
      if (isSignedIn && tempBirthData && !showSignUpModal) {
        try {
          console.log('✨ User signed up! Saving birth data...');
          console.log('📋 Pending birth data:', tempBirthData);

          // Get geocoding data
          const geoData = await geocodeBirthPlace(
            tempBirthData.birthPlace,
            tempBirthData.birthDate,
            tempBirthData.birthTime
          );

          // Save birth data to user profile
          console.log('💾 Saving birth data to Firebase...');

          // ✨ Filter out undefined values from birthChartData
          const cleanBirthChartData = geoData.birthChart ?
            Object.fromEntries(
              Object.entries(geoData.birthChart).filter(([_, v]) => v !== undefined)
            ) as any : null;

          // Build update object with ALL birth chart data
          const updateData: any = {
            birthDate: tempBirthData.birthDate,
            birthTime: tempBirthData.birthTime,
            birthPlace: tempBirthData.birthPlace,
            sunSign: geoData.birthChart?.sunSign || '',
            moonSign: geoData.birthChart?.moonSign || '',
            risingSign: geoData.birthChart?.risingSign || '',
            spiritualGoals: tempBirthData.spiritualGoals,
            challenges: tempBirthData.challenges,
            hasCompletedAstroQuiz: true,
            // ✨ Always add the complete birthChartData object
            birthChartData: cleanBirthChartData || {}
          };

          console.log('📤 Signup flow - birthChartData:', cleanBirthChartData);
          await updateUserProfile(updateData);
          console.log('✅ Birth data saved successfully after signup!');

          // Clear temp data
          setTempBirthData(null);

          // ✨ NEW: Redirect to dashboard
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        } catch (error) {
          console.error('❌ Error saving birth data after signup:', error);
          toast.error('Error saving your birth information. Please try again.');
        }
      }
    };

    saveBirthDataAfterSignup();
  }, [isSignedIn, tempBirthData, showSignUpModal, updateUserProfile]);

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

  const handleSubmit = async () => {
    try {
      console.log('🚀 Reveal My Meditations clicked!');
      console.log('📋 Quiz Data:', quizData);

      // Validate required fields
      if (!quizData.birthDate || !quizData.birthPlace) {
        console.warn('⚠️ Missing required fields: Birth Date and Birth Place are required');
        toast.error('Please fill in your Birth Date and Birth Place');
        return;
      }

      // Check if user is logged in
      if (!isSignedIn) {
        console.log('👤 User not logged in - showing signup modal');
        // Save birth data temporarily
        setTempBirthData({
          birthDate: quizData.birthDate,
          birthTime: quizData.birthTime,
          birthPlace: quizData.birthPlace,
          spiritualGoals: quizData.spiritualGoals,
          challenges: quizData.challenges
        });

        // ✨ NEW: Add birth data to URL parameters for Clerk signup
        const params = new URLSearchParams({
          birthDate: quizData.birthDate,
          birthTime: quizData.birthTime || '',
          birthPlace: quizData.birthPlace,
          spiritualGoals: JSON.stringify(quizData.spiritualGoals),
          challenges: JSON.stringify(quizData.challenges)
        });
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        console.log('🔗 Birth data added to URL:', params.toString());

        setShowSignUpModal(true);
        return;
      }

      // User is logged in - proceed with geocoding and chart calculation
      setIsSubmitting(true);
      console.log('🔄 Geocoding birth place and calculating birth chart...');
      const geoData = await geocodeBirthPlace(
        quizData.birthPlace,
        quizData.birthDate,
        quizData.birthTime
      );

      // Log all the data
      console.log('📊 Complete Data:');
      console.log({
        birthDate: quizData.birthDate,
        birthTime: quizData.birthTime || 'Not provided (will use noon)',
        birthPlace: quizData.birthPlace,
        latitude: geoData.lat,
        longitude: geoData.lon,
        timezone: geoData.timezone,
        birthChart: geoData.birthChart,
        spiritualGoals: quizData.spiritualGoals,
        challenges: quizData.challenges
      });

      // Save birth data to user profile
      console.log('💾 Saving birth data to user profile...');

      // ✨ Filter out undefined values from birthChartData
      const cleanBirthChartData = geoData.birthChart ?
        Object.fromEntries(
          Object.entries(geoData.birthChart).filter(([_, v]) => v !== undefined)
        ) as any : null;

      console.log('🔍 cleanBirthChartData:', cleanBirthChartData);
      console.log('🔍 cleanBirthChartData keys:', cleanBirthChartData ? Object.keys(cleanBirthChartData) : 'null');

      // Build update object with ALL birth chart data
      const updateData: any = {
        birthDate: quizData.birthDate,
        birthTime: quizData.birthTime,
        birthPlace: quizData.birthPlace,
        sunSign: geoData.birthChart?.sunSign || '',
        moonSign: geoData.birthChart?.moonSign || '',
        risingSign: geoData.birthChart?.risingSign || '',
        spiritualGoals: quizData.spiritualGoals,
        challenges: quizData.challenges,
        hasCompletedAstroQuiz: true,
        // ✨ Always add the complete birthChartData object
        birthChartData: cleanBirthChartData || {}
      };

      console.log('📤 Final updateData being saved:', updateData);
      console.log('📤 birthChartData fields:', cleanBirthChartData ? Object.keys(cleanBirthChartData) : 'empty');
      await updateUserProfile(updateData);
      console.log('✅ Birth data saved successfully');

      // ✨ NEW: Redirect to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('❌ Error in handleSubmit:', error);
      setIsSubmitting(false);
      toast.error('Error processing your birth information. Please check the console for details.');
    }
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

  // Sign-up modal component
  const SignUpModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif font-bold text-primary-900">
            Join Our Sacred Community
          </h2>
          <button
            onClick={() => setShowSignUpModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Create an account to save your birth chart and get personalized meditation recommendations based on your unique astrological blueprint.
        </p>

        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-primary-900 mb-3">Your Birth Information:</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-medium">Birth Date:</span> {tempBirthData?.birthDate}</p>
            <p><span className="font-medium">Birth Time:</span> {tempBirthData?.birthTime || 'Not provided'}</p>
            <p><span className="font-medium">Birth Place:</span> {tempBirthData?.birthPlace}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          ✨ We'll save this information with your account so you can access your personalized meditations anytime.
        </p>

        <SignUpButton
          mode="modal"
          className="w-full bg-gradient-to-r from-primary-700 to-primary-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
          redirectUrl={`${window.location.pathname}?${new URLSearchParams({
            birthDate: tempBirthData?.birthDate || '',
            birthTime: tempBirthData?.birthTime || '',
            birthPlace: tempBirthData?.birthPlace || '',
            spiritualGoals: JSON.stringify(tempBirthData?.spiritualGoals || []),
            challenges: JSON.stringify(tempBirthData?.challenges || [])
          }).toString()}`}
        >
          <Star className="h-5 w-5" />
          <span>Create Sacred Account</span>
        </SignUpButton>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-4">
            Already have an account?
          </p>
          <SignInButton
            mode="modal"
            className="w-full bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-full font-medium hover:bg-primary-50 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Sign In</span>
          </SignInButton>
        </div>

        <button
          onClick={() => setShowSignUpModal(false)}
          className="w-full mt-4 text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-700 to-primary-600 text-white px-6 py-3 rounded-full mb-6">
              <Star className="h-5 w-5" />
              <span className="font-medium">Your Cosmic Blueprint Revealed</span>
            </div>

            <h1 className="text-4xl font-serif font-bold text-primary-900 mb-4">
              Your Personalized Meditations
            </h1>
            
            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className="text-center">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mb-2">
                  <Sun className="h-10 w-10 text-white" />
                </div>
                <p className="text-lg font-semibold text-primary-700">Sun in {mockResults.sunSign}</p>
                <p className="text-sm text-gray-600">Your core essence</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary-400 to-primary-600 w-20 h-20 rounded-full flex items-center justify-center mb-2">
                  <Moon className="h-10 w-10 text-white" />
                </div>
                <p className="text-lg font-semibold text-primary-900">Moon in {mockResults.moonSign}</p>
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
                    <button className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
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
              
              <button className="bg-white text-primary-700 px-6 py-3 rounded-full font-medium hover:bg-primary-50 transition-colors duration-300 border border-primary-200">
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
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              ← Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12">
      {/* Sign-up Modal */}
      {showSignUpModal && <SignUpModal />}

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-700 font-medium mb-4">
            <Moon className="h-4 w-4" />
            <span>Step {currentStep} of 4</span>
          </div>

          <h1 className="text-3xl font-serif font-bold text-primary-700 mb-2">
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
              className="bg-gradient-to-r from-primary-600 to-primary-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Quiz Steps */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-primary-700 mb-6 text-center">
                Your Cosmic Coordinates
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                We need your birth details to calculate your Sun and Moon signs accurately
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Date</label>
                  <div className="relative">
                    <DatePicker
                      selected={quizData.birthDate ? (() => {
                        // Parse the date string as local time to avoid timezone offset issues
                        const [year, month, day] = quizData.birthDate.split('-').map(Number);
                        return new Date(year, month - 1, day);
                      })() : null}
                      onChange={(date: Date | null) => {
                        if (date) {
                          const year = date.getFullYear();
                          const month = String(date.getMonth() + 1).padStart(2, '0');
                          const day = String(date.getDate()).padStart(2, '0');
                          setQuizData(prev => ({ ...prev, birthDate: `${year}-${month}-${day}` }));
                        } else {
                          setQuizData(prev => ({ ...prev, birthDate: '' }));
                        }
                      }}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select your birth date"
                      maxDate={new Date()}
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      yearDropdownItemNumber={100}
                      scrollableYearDropdown
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200 hover:border-primary-300 bg-white shadow-sm hover:shadow-md text-gray-700 font-medium cursor-pointer"
                      calendarClassName="custom-calendar"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Time (if known)</label>
                  <div className="relative">
                    <input
                      type="time"
                      value={quizData.birthTime}
                      onChange={(e) => setQuizData(prev => ({ ...prev, birthTime: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200 hover:border-primary-300 bg-white shadow-sm hover:shadow-md text-gray-700 font-medium cursor-pointer"
                      style={{
                        colorScheme: 'light',
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Birth time helps us be more accurate, but isn't required</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Birth Place</label>
                  <LocationAutocomplete
                    value={quizData.birthPlace}
                    onChange={(value) => setQuizData(prev => ({ ...prev, birthPlace: value }))}
                    placeholder="e.g., New York, USA"
                  />
                  <p className="text-sm text-gray-500 mt-1">Start typing to search for your birth city</p>
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
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-12 w-12 text-primary-600" />
              </div>

              <h2 className="text-2xl font-serif font-semibold text-primary-900 mb-4">
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
                  : 'text-primary-600 hover:text-primary-800'
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
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary-700 to-primary-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
              <span>{isSubmitting ? 'Processing...' : currentStep === 4 ? 'Reveal My Meditations' : 'Continue →'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AstroQuiz;