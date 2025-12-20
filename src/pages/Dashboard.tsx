import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useClerkAuth';
import { Moon, Star, Calendar, MapPin, Clock, ArrowRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [chartLoading, setChartLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Simulate chart loading
    if (userProfile?.birthChartData?.chartUrl) {
      setChartLoading(false);
    }
  }, [userProfile?.birthChartData?.chartUrl]);

  // Download birth chart as PNG
  const handleDownloadChart = async () => {
    const chartUrl = userProfile?.birthChartData?.chartUrl;

    if (!chartUrl) {
      toast.error('Birth chart image not available');
      console.error('❌ No chart URL found');
      return;
    }

    try {
      setDownloading(true);
      console.log('📥 Downloading chart from:', chartUrl);

      // Fetch the image
      const response = await fetch(chartUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch chart image');
      }

      // Convert to blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `birth-chart-${userProfile?.birthDate || 'chart'}.png`;

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Birth chart downloaded successfully! 🎉');
      console.log('✅ Chart downloaded successfully');
    } catch (error) {
      console.error('❌ Error downloading chart:', error);
      toast.error('Failed to download chart. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

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

          {/* Moon Sign Card */}
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-center">
            <div className="flex items-center space-x-4 mb-6">
              <Moon className="h-12 w-12 text-blue-300" />
              <h2 className="text-3xl font-bold text-white">Moon Sign</h2>
            </div>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-blue-200">{moonSign || 'N/A'}</div>
              {moonHouse && (
                <div className="flex items-center space-x-2 text-white/80">
                  <span className="text-base">House:</span>
                  <span className="text-2xl font-semibold text-blue-300">{moonHouse}</span>
                </div>
              )}
              <p className="text-white/70 text-base leading-relaxed">
                Your emotional nature and inner world
              </p>
            </div>
          </div>
        </div>

        {/* Moon Phase Report */}
        {birthChart?.moonPhaseReport && (
          <div className="mb-12 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl border border-white/30 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
              <div className="flex items-center space-x-3">
                <Moon className="h-8 w-8 text-white" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Birth Moon Phase</h2>
                  <p className="text-white/80 text-sm mt-1">
                    {birthChart.moonPhaseReport.consideredDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Moon Phase Name */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-white/60 text-sm mb-2">Moon Phase</p>
                <p className="text-4xl font-bold text-white">
                  {birthChart.moonPhaseReport.moonPhase}
                </p>
              </div>

              {/* Significance */}
              {birthChart.moonPhaseReport.significance && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-lg font-semibold text-purple-200 mb-3">Significance</p>
                  <p className="text-white/80 leading-relaxed">
                    {birthChart.moonPhaseReport.significance}
                  </p>
                </div>
              )}

              {/* Personal Report */}
              {birthChart.moonPhaseReport.report && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-lg font-semibold text-purple-200 mb-3">Your Moon Phase Guidance</p>
                  <p className="text-white/80 leading-relaxed">
                    {birthChart.moonPhaseReport.report}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

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

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Download Chart Button */}
          <button
            onClick={handleDownloadChart}
            disabled={downloading || !chartUrl}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                <span>Download Birth Chart</span>
              </>
            )}
          </button>

          {/* Explore Meditations Button */}
          <button
            onClick={() => navigate('/meditations')}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-lg flex items-center justify-center space-x-2"
          >
            <span>Explore Personalized Meditations</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

