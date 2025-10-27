import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useClerkAuth';
import { Moon, Sun, Star, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [chartLoading, setChartLoading] = useState(true);

  useEffect(() => {
    // Simulate chart loading
    if (userProfile?.birthChartData?.chartUrl) {
      setChartLoading(false);
    }
  }, [userProfile?.birthChartData?.chartUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your cosmic profile...</p>
        </div>
      </div>
    );
  }

  // Check if user has completed astro quiz
  if (!userProfile?.hasCompletedAstroQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Star className="h-16 w-16 text-yellow-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to Your Cosmic Journey</h1>
          <p className="text-white/80 mb-8">
            Complete the Astro Quiz to discover your birth chart and personalized meditations.
          </p>
          <button
            onClick={() => navigate('/quiz')}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Start Quiz</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  const birthChart = userProfile?.birthChartData;
  const chartUrl = birthChart?.chartUrl;
  const moonSign = birthChart?.moonSign || userProfile?.moonSign;
  const moonHouse = birthChart?.moonHouse;
  const sunSign = birthChart?.sunSign || userProfile?.sunSign;
  const risingSign = birthChart?.risingSign || userProfile?.risingSign;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ✨ Your Birth Chart
          </h1>
          <p className="text-white/80 text-lg">
            Discover your cosmic blueprint and personalized meditation journey
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Chart Image */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
            <div className="aspect-square bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center p-4">
              {chartLoading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white/60">Loading your natal wheel...</p>
                </div>
              ) : chartUrl ? (
                <img
                  src={chartUrl}
                  alt="Natal Wheel Chart"
                  className="w-full h-full object-contain"
                  onLoad={() => setChartLoading(false)}
                />
              ) : (
                <div className="text-center">
                  <Star className="h-16 w-16 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">Chart image not available</p>
                </div>
              )}
            </div>
          </div>

          {/* Birth Chart Information */}
          <div className="space-y-6">
            {/* Moon Sign Card */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Moon className="h-8 w-8 text-blue-300" />
                <h2 className="text-2xl font-bold text-white">Moon Sign</h2>
              </div>
              <div className="space-y-3">
                <div className="text-4xl font-bold text-blue-200">{moonSign || 'N/A'}</div>
                {moonHouse && (
                  <div className="flex items-center space-x-2 text-white/80">
                    <span className="text-sm">House:</span>
                    <span className="text-lg font-semibold text-blue-300">{moonHouse}</span>
                  </div>
                )}
                <p className="text-white/60 text-sm">
                  Your emotional nature and inner world
                </p>
              </div>
            </div>

            {/* Sun Sign Card */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Sun className="h-8 w-8 text-yellow-300" />
                <h2 className="text-2xl font-bold text-white">Sun Sign</h2>
              </div>
              <div className="text-4xl font-bold text-yellow-200">{sunSign || 'N/A'}</div>
              <p className="text-white/60 text-sm mt-3">
                Your core identity and life purpose
              </p>
            </div>

            {/* Rising Sign Card */}
            <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <Star className="h-8 w-8 text-pink-300" />
                <h2 className="text-2xl font-bold text-white">Rising Sign</h2>
              </div>
              <div className="text-4xl font-bold text-pink-200">{risingSign || 'N/A'}</div>
              <p className="text-white/60 text-sm mt-3">
                How others perceive you
              </p>
            </div>
          </div>
        </div>

        {/* Birth Information */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">Birth Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Birth Date */}
            <div className="flex items-start space-x-4">
              <Calendar className="h-6 w-6 text-primary-300 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-sm">Birth Date</p>
                <p className="text-white text-lg font-semibold">
                  {userProfile?.birthDate
                    ? new Date(userProfile.birthDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Birth Time */}
            <div className="flex items-start space-x-4">
              <Clock className="h-6 w-6 text-primary-300 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-sm">Birth Time</p>
                <p className="text-white text-lg font-semibold">
                  {userProfile?.birthTime || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Birth Place */}
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary-300 mt-1 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-sm">Birth Place</p>
                <p className="text-white text-lg font-semibold">
                  {userProfile?.birthPlace || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/meditations')}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-lg flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Explore Personalized Meditations</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

